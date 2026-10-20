'use client';

export default function Particles() {
  // 20 particles with varying sizes, colors, speeds, drifts
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${(i * 17 + 5) % 100}%`,
    size: i % 3 === 0 ? '3px' : i % 5 === 0 ? '4px' : '2px',
    color: i % 3 === 0 ? 'var(--green)' : i % 3 === 1 ? 'var(--purple)' : 'var(--pink)',
    duration: `${6 + (i % 7)}s`,
    delay: `${(i * 0.7) % 5}s`,
    drift: `${(i % 2 === 0 ? 1 : -1) * (20 + (i * 13) % 60)}px`,
  }));

  return (
    <div className="particles" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: '-10px',
            width: p.size,
            height: p.size,
            background: p.color,
            '--duration': p.duration,
            '--delay': p.delay,
            '--drift': p.drift,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
