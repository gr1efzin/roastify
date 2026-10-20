import { NextResponse } from 'next/server';
import { getSessionToken, isAlreadyRoasted } from '../../../lib/session';
import { getUserProfile, getTopArtists, getTopTracks, getRecentlyPlayed, extractTopGenres } from '../../../lib/spotify';
import { buildRoastPrompt } from '../../../lib/prompts';
import { generateRoast } from '../../../lib/llm';

export async function POST() {
  // Rate limit: one roast per browser
  if (await isAlreadyRoasted()) {
    return NextResponse.json(
      { error: "You've already been roasted! Try a different browser 😈" },
      { status: 429 }
    );
  }

  const token = await getSessionToken();
  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const profile = await getUserProfile(token);

    let topArtists, topTracks;
    try {
      [topArtists, topTracks] = await Promise.all([
        getTopArtists(token, 20),
        getTopTracks(token, 20),
      ]);
    } catch (e: unknown) {
      const status = (e as { response?: { status: number } }).response?.status;
      if (status === 403) {
        // shortcut: no Premium — use recently-played instead, genres will be empty
        const recent = await getRecentlyPlayed(token, 50);
        topArtists = recent.artists;
        topTracks = recent.tracks;
      } else {
        throw e;
      }
    }

    const topGenres = extractTopGenres(topArtists);
    const spotifyData = { profile, topArtists, topTracks, topGenres };
    const prompt = buildRoastPrompt(spotifyData);
    const roast = await generateRoast(prompt);

    const res = NextResponse.json({ roast, data: spotifyData });
    res.cookies.set('roast_used', '1', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });
    return res;
  } catch (err: unknown) {
    // Log the full upstream error so we can debug in the terminal
    const axiosErr = err as { response?: { status: number; data: unknown }; message?: string };
    if (axiosErr.response) {
      console.error('[roast] upstream error', axiosErr.response.status, JSON.stringify(axiosErr.response.data));
    } else {
      console.error('[roast] error', axiosErr.message);
    }
    const message = axiosErr.response?.data
      ? JSON.stringify(axiosErr.response.data)
      : (axiosErr.message ?? 'Unknown error');
    const status = axiosErr.response?.status ?? 500;
    return NextResponse.json({ error: message }, { status });
  }
}
