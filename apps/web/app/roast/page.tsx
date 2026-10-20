'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import axios from 'axios';
import RoastLoading from '../components/RoastLoading';
import RoastCard from '../components/RoastCard';
import type { SpotifyData } from '../../lib/spotify';
import styles from './page.module.css';

interface RoastResult {
  roast: string;
  data: SpotifyData;
}

export default function RoastPage() {
  const [state, setState] = useState<'loading' | 'done' | 'error' | 'used'>('loading');
  const [result, setResult] = useState<RoastResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    axios
      .post<RoastResult>('/api/roast')
      .then((res) => {
        setResult(res.data);
        setState('done');
      })
      .catch((err) => {
        if (err.response?.status === 429) {
          setState('used');
        } else if (err.response?.status === 401) {
          window.location.href = '/';
        } else {
          setErrorMsg(err.response?.data?.error ?? 'Something went wrong.');
          setState('error');
        }
      });
  }, []);

  return (
    <main className={styles.page}>
      <AnimatePresence mode="wait">
        {state === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <RoastLoading />
          </motion.div>
        )}

        {state === 'done' && result && (
          <motion.div
            key="done"
            className={styles.resultWrapper}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.div
              className={styles.header}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <h1 className={styles.title}>
                <span className="gradient-text">Here&apos;s your roast</span> 🔥
              </h1>
              <p className={styles.sub}>
                Powered by Cohere · Your data was not stored
              </p>
            </motion.div>

            {/* Staggered top artists */}
            <motion.div
              className={styles.artistRow}
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
              }}
            >
              {result.data.topArtists.slice(0, 5).map((artist) => (
                <motion.div
                  key={artist.id}
                  className={styles.artistCard}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  {artist.images?.[0]?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={artist.images[0].url} alt={artist.name} className={styles.artistImg} />
                  ) : (
                    <div className={styles.artistImgFallback}>🎤</div>
                  )}
                  <span className={styles.artistName}>{artist.name}</span>
                </motion.div>
              ))}
            </motion.div>

            <RoastCard roast={result.roast} data={result.data} />
          </motion.div>
        )}

        {state === 'used' && (
          <motion.div
            key="used"
            className={styles.messageBox}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className={styles.messageEmoji}>😈</p>
            <h2>Already roasted!</h2>
            <p>You&apos;ve used your roast in this browser. Try a different browser for a fresh one.</p>
            <a href="/" className={styles.homeLink}>← Back home</a>
          </motion.div>
        )}

        {state === 'error' && (
          <motion.div
            key="error"
            className={styles.messageBox}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className={styles.messageEmoji}>💀</p>
            <h2>Something went wrong</h2>
            <p>{errorMsg}</p>
            <a href="/" className={styles.homeLink}>← Try again</a>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
