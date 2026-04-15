import { env } from 'cloudflare:workers';
import { randomBytes } from 'node:crypto';
import { type Credentials, OAuth2Client } from 'google-auth-library';
import { decodeJwt } from 'jose';
import { log } from './utils';

export function auth_GetOauth2Client() {
  return new OAuth2Client({
    client_id: env.AUTH_GOOGLE_ID,
    client_secret: env.AUTH_GOOGLE_SECRET,
    redirectUri: `${env.FRONTEND_URL}/auth/callback/google`,
  });
}

export function auth_GetAuthorizeUrl(oauth2Client: OAuth2Client) {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.profile',
    include_granted_scopes: true,
    state: randomBytes(32).toString('hex'),
  });
}

export async function auth_GetAuthorizeTokens(
  oauth2Client: OAuth2Client,
  url: URL,
) {
  try {
    const error = url.searchParams.get('error');
    const code = url.searchParams.get('code');
    if (!error && code) {
      oauth2Client.transporter.defaults = {
        // Override encoding to prevent gzip response data
        headers: { 'Accept-Encoding': 'identity' },
      };
      const { tokens } = await oauth2Client.getToken(code);
      return JSON.parse(tokens as string) as Credentials;
    }
  } catch (error) {
    log('Error on oauth2Client.getToken:', error);
    return null;
  }
}

export async function auth_GetSessionId(req: Request) {
  const cookie = req.headers.get('cookie');
  const sessionId = cookie?.match(/auth_session=([^;]+)/)?.[1];
  return sessionId;
}

export async function auth_RefreshSession(
  oauth2Client: OAuth2Client,
  tokens: string,
) {
  oauth2Client.setCredentials(JSON.parse(tokens));
  const { token } = await oauth2Client.getAccessToken();
  return token;
}

export async function auth_GetSubjectId(oauth2Client: OAuth2Client) {
  const idToken = oauth2Client.credentials.id_token as string;
  return decodeJwt(idToken)?.sub as string;
}
