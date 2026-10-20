import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import crypto from 'crypto';

export async function GET() {
  const state = crypto.randomUUID();
  const scopes = 'user-read-private user-read-email user-top-read user-read-recently-played';
  const base = process.env.NEXT_PUBLIC_BASE_URL!;

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    scope: scopes,
    redirect_uri: `${base}/api/auth/callback`,
    state,
  });

  const store = await cookies();
  store.set('spotify_state', state, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 300, // 5 minutes — enough time to complete the flow
    path: '/',
  });

  redirect(`https://accounts.spotify.com/authorize?${params}`);
}
