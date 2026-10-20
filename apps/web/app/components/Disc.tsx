import { useId } from 'react';
import styles from './Disc.module.css';

export default function Disc({ spin = false }: { spin?: boolean }) {
  const uid = useId().replace(/:/g, '');
  const clip = `${uid}-face`;
  const fill = `${uid}-fill`;
  const grooves = [88, 100, 112, 124, 136, 148, 160, 172];

  return (
    <svg
      className={`${styles.disc} ${spin ? styles.spin : ''}`}
      viewBox="0 0 400 400"
      role="img"
      aria-label="Burned mix CD"
    >
      <defs>
        <clipPath id={clip}>
          <circle cx="200" cy="200" r="186" />
        </clipPath>
        <radialGradient id={fill} cx="34%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#3a241c" />
          <stop offset="42%" stopColor="#1a1410" />
          <stop offset="100%" stopColor="#0c0808" />
        </radialGradient>
      </defs>

      <path
        fill={`url(#${fill})`}
        d="M200 14
           A186 186 0 1 1 372 246
           C354 258 348 278 362 296
           C376 316 368 340 346 354
           A186 186 0 0 1 200 14Z"
      />

      <g clipPath={`url(#${clip})`} stroke="#2a1c18" strokeWidth="1" fill="none">
        {grooves.map((r) => (
          <circle key={r} cx="200" cy="200" r={r} />
        ))}
      </g>

      <ellipse
        cx="148"
        cy="112"
        rx="96"
        ry="34"
        fill="#f3e4da"
        opacity="0.08"
        transform="rotate(-26 148 112)"
      />

      <circle cx="200" cy="200" r="78" fill="#e8d2c4" />
      <circle cx="200" cy="200" r="74" fill="none" stroke="#14080c" strokeWidth="1.5" />
      <circle cx="200" cy="200" r="14" fill="#14080c" />

      <text
        className={styles.sharpie}
        x="200"
        y="168"
        textAnchor="middle"
        dominantBaseline="central"
        transform="rotate(-8 200 168)"
      >
        SKIP
      </text>
      <text className={styles.mix} x="200" y="242" textAnchor="middle" dominantBaseline="central">
        MIX 04
      </text>

      <path
        fill="#0c0808"
        opacity="0.55"
        d="M350 250 C356 268 368 292 354 318 C338 340 320 350 346 354 C368 340 376 316 372 246 C360 248 352 248 350 250Z"
      />
    </svg>
  );
}
