import { env } from "cloudflare:workers";
import { randomBytes } from "node:crypto";
import { OAuth2Client, type Credentials } from "google-auth-library";

export default {
  async fetch(req) {
    const url = new URL(req.url);
    log("pathname:", url.pathname);

    const oauth2Client = new OAuth2Client({
      client_id: env.AUTH_GOOGLE_ID,
      client_secret: env.AUTH_GOOGLE_SECRET,
      redirectUri: `${env.FRONTEND_URL}/auth/callback/google`,
    });

    if (url.pathname === "/auth/signin/google") {
      return Response.redirect(getAuthorizeUrl(oauth2Client));
    }

    if (url.pathname === "/auth/callback/google") {
      const headers = new Headers();
      headers.append("Location", env.FRONTEND_URL);

      const sessionId = await storeAuthTokens(oauth2Client, url);
      if (sessionId) {
        const cookie = `auth_session=${sessionId}; Path=/; SameSite=Lax; Secure; HttpOnly; SameSite=Lax;`;
        headers.append("Set-Cookie", cookie);
      }
      return new Response(null, { status: 302, headers });
    }

    const sessionTokens = await getSession(req);
    if (!sessionTokens) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (url.pathname === "/private/me") {
      const { access_token } = JSON.parse(sessionTokens) as Credentials;
      return fetch("https://openidconnect.googleapis.com/v1/userinfo", {
        headers: { Authorization: `Bearer ${access_token}` },
      });
    }

    if (url.pathname.startsWith("/private/exercises/")) {
      const muscle = url.pathname.substring("/private/exercises/".length);
      const { objects } = await listExercisesFromBucket(muscle);
      return Response.json({ exercises: objects.map((o) => o.key) });
    }

    if (url.pathname.startsWith("/private/images/")) {
      const imageKey = url.pathname.substring("/private/images/".length);
      const imageValue = await getImageFromBucket(imageKey);
      if (imageValue) {
        return new Response(imageValue, {
          status: 200,
          headers: {
            "Content-Type": "image/webp",
            "Cache-Control": "private, max-age=86400",
          },
        });
      }
    }

    return new Response("Not Found", { status: 404 });
  },
} as ExportedHandler<Env>;

function getAuthorizeUrl(oauth2Client: OAuth2Client) {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/userinfo.profile",
    include_granted_scopes: true,
    state: randomBytes(32).toString("hex"),
  });
}

async function storeAuthTokens(oauth2Client: OAuth2Client, url: URL) {
  try {
    const error = url.searchParams.get("error");
    const code = url.searchParams.get("code");
    if (!error && code) {
      oauth2Client.transporter.defaults = {
        // Override encoding to prevent gzip response data
        headers: { "Accept-Encoding": "identity" },
      };
      const { tokens } = await oauth2Client.getToken(code);
      return await generateSession(JSON.parse(tokens as string));
    }
  } catch (error) {
    log("Error on oauth2Client.getToken:", error);
    return null;
  }
}

async function generateSession(tokens: Credentials) {
  const sessionId = crypto.randomUUID();
  await env.WORKOUT_TRACKER_KV.put(sessionId, JSON.stringify(tokens));
  return sessionId;
}

async function getSession(req: Request) {
  const cookie = req.headers.get("cookie");
  const sessionId = cookie?.match(/auth_session=([^;]+)/)?.[1];
  return sessionId && (await env.WORKOUT_TRACKER_KV.get(sessionId));
}

async function listExercisesFromBucket(muscle: string) {
  return env.WORKOUT_TRACKER_BUCKET.list({ prefix: `${muscle}/` });
}

async function getImageFromBucket(imageKey: string) {
  const objectValue = await env.WORKOUT_TRACKER_BUCKET.get(imageKey);

  if (objectValue && "body" in objectValue) {
    return objectValue.body;
  }
}

function log(...args: any[]) {
  console.info("[worker:info]", new Date().toISOString(), "-", ...args);
}
