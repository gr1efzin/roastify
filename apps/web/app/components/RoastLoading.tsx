'use client';

import { useEffect, useState } from 'react';
import Disc from './Disc';
import styles from './RoastLoading.module.css';

const LINES = [
  'Reading your Spotify.',
  'Counting the skips you did not make.',
  'Writing the roast.',
];

export default function RoastLoading() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setI((n) => (n + 1) % LINES.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.disc} aria-hidden="true">
        <Disc spin />
      </div>
      <p className={styles.title}>{LINES[i]}</p>
    </div>
  );
}
