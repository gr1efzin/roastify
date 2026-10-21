import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { getBaseUrl } from '../lib/baseUrl';

const tanker = localFont({
  src: './fonts/Tanker-Regular.woff2',
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Roastify: we roast your Spotify',
    template: '%s | Roastify',
  },
  description:
    'Connect Spotify. We pull your top artists, tracks, and genres, then roast your taste.',
  metadataBase: new URL(getBaseUrl()),
  openGraph: {
    title: 'Roastify: we roast your Spotify',
    description: 'Connect Spotify. We roast your taste.',
    type: 'website',
    siteName: 'Roastify',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roastify: we roast your Spotify',
    description: 'Connect Spotify. We roast your taste.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#14080c',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={tanker.variable}>
      <body>
        <div className="atmosphere" aria-hidden="true" />
        <div className="shell">{children}</div>
      </body>
    </html>
  );
}
