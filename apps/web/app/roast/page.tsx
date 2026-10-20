'use client';

import { useEffect, useState } from 'react';
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

  if (state === 'loading') {
    return (
      <main>
        <RoastLoading />
      </main>
    );
  }

  if (state === 'done' && result) {
    return (
      <main className={styles.page}>
        <div className={styles.result}>
          <a href="/" className={styles.brand}>
            Roastify
          </a>
          <header className={styles.header}>
            <h1 className={styles.title}>{result.data.profile.display_name}</h1>
            <p className={styles.sub}>Here is your roast. Last six months. Nothing was stored.</p>
          </header>

          <ul className={styles.artistRow}>
            {result.data.topArtists.slice(0, 5).map((artist) => (
              <li key={artist.id} className={styles.artistCard}>
                {artist.images?.[0]?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={artist.images[0].url} alt={artist.name} className={styles.artistImg} />
                ) : (
                  <div className={styles.artistImgFallback} />
                )}
                <span className={styles.artistName}>{artist.name}</span>
              </li>
            ))}
          </ul>

          <RoastCard roast={result.roast} data={result.data} />
        </div>
      </main>
    );
  }

  if (state === 'used') {
    return (
      <main className={styles.messageBox}>
        <h1>Already roasted in this browser</h1>
        <p>One roast per browser. Open another if you want a second copy.</p>
        <a href="/" className={styles.homeLink}>
          <span className={styles.homeLinkInner}>Back</span>
        </a>
      </main>
    );
  }

  return (
    <main className={styles.messageBox}>
      <h1>Could not finish the roast</h1>
      <p>{errorMsg}</p>
      <a href="/" className={styles.homeLink}>
        <span className={styles.homeLinkInner}>Try again</span>
      </a>
    </main>
  );
}
