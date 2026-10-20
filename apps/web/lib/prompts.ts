import type { SpotifyData } from './spotify';

export function buildRoastPrompt(data: SpotifyData): string {
  const artists = data.topArtists.slice(0, 8).map((a) => a.name).join(', ');
  const tracks = data.topTracks
    .slice(0, 5)
    .map((t) => `"${t.name}" by ${t.artists[0]?.name}`)
    .join(', ');
  const genres = data.topGenres.join(', ');
  const name = data.profile.display_name || 'this person';

  return `You are a savage, witty comedy roast writer. Roast ${name}'s Spotify music taste in 150-200 words. Be brutal, clever, and funny — like a comedy roast, not cyberbullying. Reference their specific artists and genres. End with one savage backhanded compliment. No intro or preamble, just the roast.

Their data:
- Top Artists: ${artists}
- Top Tracks: ${tracks}  
- Top Genres: ${genres}`;
}
