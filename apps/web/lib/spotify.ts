import axios from 'axios';

const spotifyApi = axios.create({ baseURL: 'https://api.spotify.com/v1' });

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` };
}

export async function getUserProfile(token: string) {
  const { data } = await spotifyApi.get('/me', { headers: authHeaders(token) });
  return data;
}

export async function getRecentlyPlayed(token: string, limit = 50) {
  const { data } = await spotifyApi.get('/me/player/recently-played', {
    params: { limit },
    headers: authHeaders(token),
  });
  // Returns unique tracks + unique artists derived from play history
  const tracks: SpotifyTrack[] = [];
  const artistMap = new Map<string, SpotifyArtist>();
  const seen = new Set<string>();
  for (const item of data.items as { track: SpotifyTrack }[]) {
    if (!seen.has(item.track.id)) {
      seen.add(item.track.id);
      tracks.push(item.track);
    }
    for (const a of item.track.artists) {
      if (!artistMap.has(a.id)) {
        artistMap.set(a.id, { id: a.id, name: a.name, genres: [], images: [], popularity: 0 });
      }
    }
  }
  return { tracks, artists: [...artistMap.values()] };
}

export async function getTopArtists(token: string, limit = 20) {
  const { data } = await spotifyApi.get('/me/top/artists', {
    params: { time_range: 'medium_term', limit },
    headers: authHeaders(token),
  });
  return data.items as SpotifyArtist[];
}

export async function getTopTracks(token: string, limit = 20) {
  const { data } = await spotifyApi.get('/me/top/tracks', {
    params: { time_range: 'medium_term', limit },
    headers: authHeaders(token),
  });
  return data.items as SpotifyTrack[];
}

export function extractTopGenres(artists: SpotifyArtist[]): string[] {
  const counts = new Map<string, number>();
  for (const artist of artists) {
    for (const genre of artist.genres) {
      counts.set(genre, (counts.get(genre) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([g]) => g);
}

// Minimal types we actually use
export interface SpotifyArtist {
  id: string;
  name: string;
  genres: string[];
  images: { url: string }[];
  popularity: number;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { id: string; name: string }[];
  album: { images: { url: string }[] };
}

export interface SpotifyProfile {
  id: string;
  display_name: string;
  images: { url: string }[];
}

export interface SpotifyData {
  profile: SpotifyProfile;
  topArtists: SpotifyArtist[];
  topTracks: SpotifyTrack[];
  topGenres: string[];
}
