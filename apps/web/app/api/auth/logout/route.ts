import { NextResponse } from 'next/server';

export async function GET() {
  const base = process.env.NEXT_PUBLIC_BASE_URL!;
  const res = NextResponse.redirect(base);
  res.cookies.delete('spotify_session');
  res.cookies.delete('roast_used');
  return res;
}
