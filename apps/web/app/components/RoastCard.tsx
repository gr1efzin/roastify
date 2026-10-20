'use client';

import { useRef } from 'react';
import { toPng } from 'html-to-image';
import { motion } from 'motion/react';
import type { SpotifyData } from '../../lib/spotify';
import styles from './RoastCard.module.css';

interface Props {
  roast: string;
  data: SpotifyData;
}

export default function RoastCard({ roast, data }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    const url = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
    const a = document.createElement('a');
    a.download = 'roastify-card.png';
    a.href = url;
    a.click();
  };

  const avatar = data.profile.images?.[0]?.url;
  const topArtists = data.topArtists.slice(0, 5);
  const topGenre = data.topGenres[0] ?? 'unknown';

  return (
    <div className={styles.wrapper}>
      {/* The shareable card — captured by html-to-image */}
      <div ref={cardRef} className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.logo}>🔥 Roastify</span>
          <span className={styles.genre}>{topGenre}</span>
        </div>

        <div className={styles.profile}>
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatar} alt="" className={styles.avatar} />
          ) : (
            <div className={styles.avatarFallback}>🎧</div>
          )}
          <span className={styles.username}>@{data.profile.display_name}</span>
        </div>

        <p className={styles.roastText}>&quot;{roast}&quot;</p>

        <div className={styles.artists}>
          {topArtists.map((a) => (
            <span key={a.id} className={styles.artistChip}>{a.name}</span>
          ))}
        </div>

        <div className={styles.cardFooter}>
          <span>roastify.app</span>
        </div>
      </div>

      {/* Action buttons — outside the captured area */}
      <div className={styles.actions}>
        <motion.button
          className={styles.downloadBtn}
          onClick={handleDownload}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          ⬇ Download Card
        </motion.button>

        <motion.a
          href="/api/auth/logout"
          className={styles.logoutBtn}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Try Another Account
        </motion.a>
      </div>
    </div>
  );
}
