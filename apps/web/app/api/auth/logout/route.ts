import { NextResponse } from 'next/server';
import { getBaseUrl } from '../../../../lib/baseUrl';

export async function GET() {
  const base = getBaseUrl();
  const res = NextResponse.redirect(base);
  res.cookies.delete('spotify_session');
  res.cookies.delete('roast_used');
  return res;
}
