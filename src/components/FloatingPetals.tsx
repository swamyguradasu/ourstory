import React, { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: number; // percentage (0 - 100)
  size: number;
  duration: number;
  delay: number;
  rotateStart: number;
  rotateEnd: number;
  swayAmount: number;
  color: string;
}

export const FloatingPetals: React.FC = () => {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    if (!mediaQuery.matches) {
      // Generate 18 distinct rose/sakura petals
      const colors = ['#E89AAF', '#F7D7DF', '#D8B46A', '#C75D7D', '#B03A5B'];
      const generatedPetals: Petal[] = Array.from({ length: 18 }).map((_, index) => ({
        id: index,
        left: Math.random() * 100,
        size: Math.floor(Math.random() * 12) + 10,
        duration: Math.random() * 10 + 12, // 12s - 22s
        delay: Math.random() * 12,
        rotateStart: Math.floor(Math.random() * 360),
        rotateEnd: Math.floor(Math.random() * 720) - 360,
        swayAmount: Math.random() * 60 + 20,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      setPetals(generatedPetals);
    }

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (reducedMotion || petals.length === 0) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden" 
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute top-[-40px]"
          style={{
            left: `${petal.left}%`,
            animation: `petalFall ${petal.duration}s ease-in-out infinite`,
            animationDelay: `${petal.delay}s`,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 24 32"
            fill="none"
            className="transform opacity-70 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
            style={{
              animation: `petalRotate ${petal.duration * 0.6}s linear infinite`,
            }}
          >
            <path
              d="M12 0C4 8 0 16 0 22C0 27.5228 5.37258 32 12 32C18.6274 32 24 27.5228 24 22C24 16 20 8 12 0Z"
              fill={petal.color}
              fillOpacity={0.65}
            />
            {/* Subtle petal vein line */}
            <path
              d="M12 4C12 14 11 26 12 30"
              stroke="#FFF4F1"
              strokeWidth="0.75"
              strokeOpacity="0.4"
            />
          </svg>
        </div>
      ))}
      <style>{`
        @keyframes petalFall {
          0% {
            transform: translate3d(0, -30px, 0);
            opacity: 0;
          }
          10% {
            opacity: 0.85;
          }
          90% {
            opacity: 0.85;
          }
          100% {
            transform: translate3d(60px, 105vh, 0);
            opacity: 0;
          }
        }
        @keyframes petalRotate {
          0% {
            transform: rotate(0deg) rotateX(0deg);
          }
          50% {
            transform: rotate(180deg) rotateX(70deg);
          }
          100% {
            transform: rotate(360deg) rotateX(0deg);
          }
        }
      `}</style>
    </div>
  );
};
