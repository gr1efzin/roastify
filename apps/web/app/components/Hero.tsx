'use client';

import { motion } from 'motion/react';
import styles from './Hero.module.css';

export default function Hero({ error }: { error?: string }) {
  return (
    <main className={styles.hero}>
      <motion.div
        className={styles.badge}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🔥 Powered by Spotify + AI
      </motion.div>

      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        Your music taste is about to get{' '}
        <span className="gradient-text">roasted.</span>
      </motion.h1>

      <motion.p
        className={styles.subtitle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
      >
        Connect your Spotify. We&apos;ll analyze your top artists, tracks, and genres —
        then let AI tear your taste apart. Ruthlessly.
      </motion.p>

      {error && (
        <motion.p
          className={styles.error}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error === 'access_denied' && 'Spotify access was denied.'}
          {error === 'state_mismatch' && 'Security check failed. Please try again.'}
          {error === 'token_exchange_failed' && 'Could not connect to Spotify. Please try again.'}
        </motion.p>
      )}

      <motion.a
        href="/api/auth/login"
        className={styles.loginBtn}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.06, boxShadow: '0 0 40px var(--green-glow)' }}
        whileTap={{ scale: 0.96 }}
      >
        <SpotifyIcon />
        Login with Spotify
      </motion.a>

      <motion.p
        className={styles.disclaimer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        We don&apos;t store any of your data.
      </motion.p>

      {/* Preview card */}
      <motion.div
        className={`glass ${styles.previewCard}`}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <p className={styles.previewLabel}>Example roast 🔥</p>
        <p className={styles.previewText}>
          &quot;You listen to Imagine Dragons unironically in 2024? Bold move.
          Your Spotify Wrapped must look like a suburban dad&apos;s gym playlist.
          At least your top genre being &apos;post-teen pop&apos; explains a lot.
          Genuinely impressed you found 20 songs that all sound exactly the same.&quot;
        </p>
      </motion.div>
    </main>
  );
}

function SpotifyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}
