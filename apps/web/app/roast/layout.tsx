import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your roast',
  description: 'The roast written from your Spotify library.',
  robots: { index: false },
};

export default function RoastLayout({ children }: { children: React.ReactNode }) {
  return children;
}
