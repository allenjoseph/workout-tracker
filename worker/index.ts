import { env } from 'cloudflare:workers';
import {
  auth_GetAuthorizeTokens,
  auth_GetAuthorizeUrl,
  auth_GetOauth2Client,
  auth_GetSessionId,
  auth_GetSubjectId,
  auth_RefreshSession,
} from './lib/auth';
import {
  db_AddExercise,
  db_AddWorkout,
  db_GetExercises,
  db_GetWorkouts,
  type Exercise,
} from './lib/db';

export default {
  async fetch(req) {
    const url = new URL(req.url);
    const method = req.method;

    const oauth2Client = auth_GetOauth2Client();

    if (url.pathname === '/auth/signin/google') {
      return Response.redirect(auth_GetAuthorizeUrl(oauth2Client));
    }

    if (url.pathname === '/auth/callback/google') {
      const headers = new Headers();
      headers.append('Location', env.FRONTEND_URL);

      const tokens = await auth_GetAuthorizeTokens(oauth2Client, url);
      if (tokens) {
        const sessionId = crypto.randomUUID();
        await env.WORKOUT_TRACKER_KV.put(sessionId, JSON.stringify(tokens));
        const cookie = `auth_session=${sessionId}; Path=/; SameSite=Lax; Secure; HttpOnly; SameSite=Lax;`;
        headers.append('Set-Cookie', cookie);
      }
      return new Response(null, { status: 302, headers });
    }

    const sessionId = await auth_GetSessionId(req);
    if (!sessionId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const tokens = await env.WORKOUT_TRACKER_KV.get(sessionId);
    if (!tokens) {
      return new Response('Unauthorized', { status: 401 });
    }

    const accessToken = await auth_RefreshSession(oauth2Client, tokens);

    if (url.pathname === '/private/me' && method === 'GET') {
      return fetch('https://openidconnect.googleapis.com/v1/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    }

    if (url.pathname.startsWith('/private/images/') && method === 'GET') {
      const objectKey = url.pathname.substring('/private/images/'.length);
      const objectValue = await env.WORKOUT_TRACKER_BUCKET.get(objectKey);
      if (objectValue && 'body' in objectValue) {
        return new Response(objectValue.body, {
          status: 200,
          headers: {
            'Content-Type': 'image/webp',
            'Cache-Control': 'private, max-age=86400',
          },
        });
      }
    }

    if (url.pathname.startsWith('/private/exercises/') && method === 'GET') {
      const prefix = `${url.pathname.substring('/private/exercises/'.length)}/`;
      const { objects } = await env.WORKOUT_TRACKER_BUCKET.list({ prefix });
      return Response.json({ exercises: objects.map((o) => o.key) });
    }

    if (url.pathname === '/private/workouts' && method === 'GET') {
      const userId = await auth_GetSubjectId(oauth2Client);
      const result = await db_GetWorkouts(userId);
      return result.success
        ? Response.json(result.results)
        : new Response('Bad Request', { status: 400 });
    }

    if (url.pathname === '/private/workouts' && method === 'POST') {
      const uuid = crypto.randomUUID();
      const userId = await auth_GetSubjectId(oauth2Client);
      const success = await db_AddWorkout(uuid, userId);
      return success
        ? Response.json({ uuid })
        : new Response('Bad Request', { status: 400 });
    }

    if (url.pathname.startsWith('/private/workouts/') && method === 'GET') {
      const workoutId = url.pathname.split('/')[3];
      if (workoutId) {
        const result = await db_GetExercises(workoutId);
        return result.success
          ? Response.json(result.results)
          : new Response('Bad Request', { status: 400 });
      }
    }

    if (url.pathname === '/private/workouts/exercises' && method === 'POST') {
      const exercise = await req.json<Exercise>();
      const success = await db_AddExercise(exercise);
      return success
        ? Response.json(exercise)
        : new Response('Bad Request', { status: 400 });
    }

    return new Response('Not Found', { status: 404 });
  },
} as ExportedHandler<Env>;
