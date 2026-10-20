import { NextResponse } from 'next/server';
import { getSessionToken, isAlreadyRoasted } from '../../../../lib/session';
import { getUserProfile, getTopArtists, getTopTracks, extractTopGenres } from '../../../../lib/spotify';
import { buildRoastPrompt } from '../../../../lib/prompts';
import { generateRoast } from '../../../../lib/llm';

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
    const [profile, topArtists, topTracks] = await Promise.all([
      getUserProfile(token),
      getTopArtists(token, 20),
      getTopTracks(token, 20),
    ]);

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
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
