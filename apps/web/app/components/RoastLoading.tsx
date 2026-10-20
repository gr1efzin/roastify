'use client';

import { motion } from 'motion/react';
import styles from './RoastLoading.module.css';

export default function RoastLoading() {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.vinyl}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      >
        🎵
      </motion.div>
      <p className={styles.title}>Analyzing your questionable taste…</p>
      <div className={styles.dots}>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className={styles.dot}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  );
}
