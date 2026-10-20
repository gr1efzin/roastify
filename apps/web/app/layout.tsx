import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Roastify — Get Your Spotify Taste Roasted 🔥',
  description: 'Connect your Spotify and let AI brutally roast your music taste. Share the burn with friends.',
  openGraph: {
    title: 'Roastify',
    description: 'Your music taste is about to get roasted 🔥',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
