import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';
import { encryptToken } from '../../../../lib/session';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  const base = process.env.NEXT_PUBLIC_BASE_URL!;
  const store = await cookies();

  if (error || !code) {
    return NextResponse.redirect(`${base}/?error=access_denied`);
  }

  // CSRF check
  const savedState = store.get('spotify_state')?.value;
  if (!savedState || savedState !== state) {
    return NextResponse.redirect(`${base}/?error=state_mismatch`);
  }

  try {
    const { data: tokens } = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: `${base}/api/auth/callback`, // must match exactly what's in Spotify dashboard
        client_id: process.env.SPOTIFY_CLIENT_ID!,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const encrypted = encryptToken(tokens.access_token);
    const res = NextResponse.redirect(`${base}/roast`);

    res.cookies.set('spotify_session', encrypted, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: tokens.expires_in,
      path: '/',
    });
    res.cookies.delete('spotify_state');

    return res;
  } catch {
    return NextResponse.redirect(`${base}/?error=token_exchange_failed`);
  }
}
