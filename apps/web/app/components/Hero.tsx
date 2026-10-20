import SpotifyMark from './SpotifyMark';
import styles from './Hero.module.css';

const ERRORS: Record<string, string> = {
  access_denied: 'Spotify access was denied.',
  state_mismatch: 'Security check failed. Try again.',
  token_exchange_failed: 'Could not connect to Spotify. Try again.',
};

const CHARGES = [
  'Imagine Dragons, unironically',
  'the skip you never hit',
  'post-teen pop as a personality',
  'gym TV energy',
  'lo-fi at 3am, again',
  'a Wrapped you would hide',
];

export default function Hero({ error }: { error?: string }) {
  const ticker = [...CHARGES, ...CHARGES].join('  ·  ');

  return (
    <main>
      <section className={styles.stage}>
        <p className={styles.brand}>Roastify</p>

        <div className={styles.punch}>
          <h1 className={styles.headline}>
            Imagine Dragons.
            <br />
            In 2026.
          </h1>
          <p className={styles.bit}>
            That is not a phase, that is a lease. Your top twenty sounds like a suburban gym that
            lost the remote. Post-teen pop as a personality is a choice, and you keep pressing play
            like anyone asked for an encore.
          </p>
          <p className={styles.lead}>
            That was a sample. Connect Spotify. We read your top artists, tracks, and genres from
            the last six months, then roast the library. Nothing is stored.
          </p>
          <a href="/api/auth/login" className={styles.cta}>
            <span className={styles.ctaInner}>
              <SpotifyMark size={22} fill="#041208" />
              Roast my Spotify
            </span>
          </a>
          {error && <p className={styles.error}>{ERRORS[error] ?? 'Something went wrong.'}</p>}
        </div>

        <div className={styles.ticker} aria-hidden="true">
          <p className={styles.tickerTrack}>{ticker}</p>
          <p className={styles.tickerTrack}>{ticker}</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>Spotify is theirs. The roast is yours.</p>
      </footer>
    </main>
  );
}
