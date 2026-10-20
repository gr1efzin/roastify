'use client';

import { useRef } from 'react';
import { toPng } from 'html-to-image';
import type { SpotifyData } from '../../lib/spotify';
import styles from './RoastCard.module.css';

export default function RoastCard({ roast, data }: { roast: string; data: SpotifyData }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const topArtists = data.topArtists.slice(0, 5);
  const topTracks = data.topTracks.slice(0, 3);
  const topGenre = data.topGenres[0] ?? 'unfiled';

  const handleDownload = async () => {
    if (!cardRef.current) return;
    const url = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
    const a = document.createElement('a');
    a.download = 'roastify.png';
    a.href = url;
    a.click();
  };

  return (
    <div className={styles.wrapper}>
      <div ref={cardRef} className={styles.card}>
        <p className={styles.logo}>Roastify</p>
        <p className={styles.username}>{data.profile.display_name}</p>
        <p className={styles.roastText}>{roast}</p>
        <ol className={styles.evidence}>
          {topArtists.map((a) => (
            <li key={a.id}>{a.name}</li>
          ))}
        </ol>
        <ul className={styles.tracks}>
          {topTracks.map((t) => (
            <li key={t.id}>
              {t.name}
              {t.artists[0] ? ` - ${t.artists[0].name}` : ''}
            </li>
          ))}
        </ul>
        <p className={styles.cardFooter}>
          {topGenre}
          <span>roastify.app</span>
        </p>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.downloadBtn} onClick={handleDownload}>
          <span className={styles.downloadInner}>Save the roast</span>
        </button>
        <a href="/api/auth/logout" className={styles.logoutLink}>
          Different account
        </a>
      </div>
    </div>
  );
}
