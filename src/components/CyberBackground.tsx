import { useMemo } from "react";

export default function CyberBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }).map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 12 + Math.random() * 14,
        size: 2 + Math.random() * 3,
      })),
    []
  );

  return (
    <div className="cyber-bg" aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className="cyber-particle"
          style={{
            left: `${p.left}%`,
            bottom: 0,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
