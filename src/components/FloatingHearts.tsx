import React, { useEffect, useState } from 'react';

interface HeartParticle {
  id: number;
  left: number;
  bottom: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    if (!mediaQuery.matches) {
      const list: HeartParticle[] = Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        left: Math.random() * 96 + 2,
        bottom: -20,
        size: Math.floor(Math.random() * 8) + 8, // 8px - 16px tiny subtle
        duration: Math.random() * 12 + 16,
        delay: Math.random() * 16,
        opacity: Math.random() * 0.4 + 0.25,
      }));
      setHearts(list);
    }
  }, []);

  if (reducedMotion || hearts.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.left}%`,
            bottom: `${heart.bottom}px`,
            animation: `heartAscend ${heart.duration}s ease-in-out infinite`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-[#E89AAF]/40 filter drop-shadow-[0_0_8px_rgba(232,154,175,0.4)]"
            style={{ opacity: heart.opacity }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
      <style>{`
        @keyframes heartAscend {
          0% {
            transform: translate3d(0, 0, 0) scale(0.6);
            opacity: 0;
          }
          20% {
            opacity: 0.6;
          }
          80% {
            opacity: 0.5;
          }
          100% {
            transform: translate3d(-30px, -110vh, 0) scale(1.1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
