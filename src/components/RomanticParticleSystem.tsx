import React, { useEffect, useState } from 'react';

interface FloatingPetal {
  id: number;
  left: number; // percentage
  size: number;
  duration: number;
  delay: number;
  swayX: number;
  rotateDeg: number;
  opacity: number;
  color: string;
}

interface GlowingDustParticle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  driftY: number;
}

interface TwinkleStar {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

interface BokehCircle {
  id: number;
  left: number;
  top: number;
  size: number;
  color: string;
  duration: number;
}

interface InteractiveHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  vx: number;
}

export const RomanticParticleSystem: React.FC = () => {
  const [petals, setPetals] = useState<FloatingPetal[]>([]);
  const [dustParticles, setDustParticles] = useState<GlowingDustParticle[]>([]);
  const [stars, setStars] = useState<TwinkleStar[]>([]);
  const [bokeh, setBokeh] = useState<BokehCircle[]>([]);
  const [interactiveHearts, setInteractiveHearts] = useState<InteractiveHeart[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    if (mediaQuery.matches) return;

    // Detect mobile device width (reduce particle load significantly for smooth 60fps on mobile)
    const isMobile = window.innerWidth < 768;
    const petalCount = isMobile ? 4 : 12;
    const dustCount = isMobile ? 6 : 22;
    const starCount = isMobile ? 3 : 8;
    const bokehCount = isMobile ? 2 : 4;

    // 1. Slowly floating rose petals (lightweight SVG, varied drift)
    const petalColors = ['#E89AAF', '#C75D7D', '#B03A5B', '#F7D7DF', '#D8B46A'];
    const generatedPetals: FloatingPetal[] = Array.from({ length: petalCount }).map((_, i) => ({
      id: i,
      left: Math.random() * 96 + 2,
      size: Math.floor(Math.random() * 10) + (isMobile ? 10 : 12),
      duration: Math.random() * 8 + 14,
      delay: Math.random() * 10,
      swayX: Math.random() * 30 + 15,
      rotateDeg: Math.floor(Math.random() * 360),
      opacity: Math.random() * 0.4 + 0.3,
      color: petalColors[i % petalColors.length],
    }));
    setPetals(generatedPetals);

    // 2. Faint glowing dust particles (1px - 2.5px stardust)
    const generatedDust: GlowingDustParticle[] = Array.from({ length: dustCount }).map((_, i) => ({
      id: i,
      left: Math.random() * 98 + 1,
      top: Math.random() * 95 + 2,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 6 + 6,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.45 + 0.2,
      driftY: (Math.random() - 0.5) * 30,
    }));
    setDustParticles(generatedDust);

    // 3. Occasional small twinkling stars
    const generatedStars: TwinkleStar[] = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      left: Math.random() * 90 + 5,
      top: Math.random() * 85 + 5,
      size: Math.floor(Math.random() * 4) + 6,
      delay: Math.random() * 8,
      duration: Math.random() * 3 + 3,
      opacity: Math.random() * 0.4 + 0.3,
    }));
    setStars(generatedStars);

    // 4. Soft bokeh circles (large blurred glowing orbs in deep background)
    const bokehColors = ['rgba(122,24,56,0.18)', 'rgba(75,29,90,0.15)', 'rgba(216,180,106,0.12)', 'rgba(91,16,40,0.16)'];
    const generatedBokeh: BokehCircle[] = Array.from({ length: bokehCount }).map((_, i) => ({
      id: i,
      left: [15, 75, 30, 80][i],
      top: [20, 30, 70, 75][i],
      size: isMobile ? [200, 220][i % 2] : [280, 350, 320, 260][i],
      color: bokehColors[i % bokehColors.length],
      duration: 18 + i * 4,
    }));
    setBokeh(generatedBokeh);

    // Listen to custom event for interactive heart emission (e.g. clicking or hovering an important memory)
    const handleSpawnHearts = (e: CustomEvent<{ x?: number; y?: number }>) => {
      const clickX = e.detail?.x ?? window.innerWidth / 2;
      const clickY = e.detail?.y ?? window.innerHeight / 2;

      // Spawn 3 to 4 tiny hearts (subtle, NOT hundreds)
      const burst: InteractiveHeart[] = Array.from({ length: 3 }).map((_, idx) => ({
        id: Date.now() + idx + Math.random(),
        x: clickX + (Math.random() - 0.5) * 24,
        y: clickY - 10,
        size: Math.floor(Math.random() * 6) + 12,
        vx: (Math.random() - 0.5) * 30,
      }));

      setInteractiveHearts((prev) => [...prev.slice(-6), ...burst]);

      setTimeout(() => {
        setInteractiveHearts((prev) => prev.filter((h) => !burst.some((b) => b.id === h.id)));
      }, 1300);
    };

    window.addEventListener('spawn-romantic-hearts' as any, handleSpawnHearts);

    return () => {
      window.removeEventListener('spawn-romantic-hearts' as any, handleSpawnHearts);
    };
  }, []);

  if (reducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {/* 1. Deep Soft Bokeh Circles */}
      {bokeh.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full blur-[90px] animate-float-slow"
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            backgroundColor: b.color,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}

      {/* 2. Slowly Drifting Rose Petals */}
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
            fill={petal.color}
            className="filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
            style={{
              opacity: petal.opacity,
              transform: `rotate(${petal.rotateDeg}deg)`,
            }}
          >
            {/* Elegant curved organic rose petal shape */}
            <path d="M12 2 C6 5, 2 12, 2 19 C2 26, 7 30, 12 30 C17 30, 22 26, 22 19 C22 12, 18 5, 12 2 Z" />
            <path d="M12 5 C9 9, 8 16, 12 26" stroke="#FFF4F1" strokeWidth="0.6" opacity="0.3" fill="none" />
          </svg>
        </div>
      ))}

      {/* 3. Faint Glowing Dust / Stardust */}
      {dustParticles.map((dust) => (
        <div
          key={dust.id}
          className="absolute rounded-full bg-[#FFF4F1]"
          style={{
            left: `${dust.left}%`,
            top: `${dust.top}%`,
            width: `${dust.size}px`,
            height: `${dust.size}px`,
            opacity: dust.opacity,
            boxShadow: `0 0 4px #D8B46A`,
            animation: `dustFloat ${dust.duration}s ease-in-out infinite alternate`,
            animationDelay: `${dust.delay}s`,
          }}
        />
      ))}

      {/* 4. Occasional Small Twinkling Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute animate-star-twinkle"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            opacity: star.opacity,
          }}
        >
          <svg width={star.size} height={star.size} viewBox="0 0 24 24" fill="#D8B46A">
            <polygon points="12 2 14.5 9.5 22 12 14.5 14.5 12 22 9.5 14.5 2 12 9.5 9.5" />
          </svg>
        </div>
      ))}

      {/* 5. Interactive Tiny Heart Bursts (on hover or click) */}
      {interactiveHearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-heart"
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            transform: `translateX(${heart.vx}px)`,
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill="#E89AAF"
            className="filter drop-shadow-[0_0_8px_rgba(232,154,175,0.8)]"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

// Global helper to trigger the interactive heart emission
export const triggerRomanticHearts = (x?: number, y?: number) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('spawn-romantic-hearts', {
        detail: { x, y },
      })
    );
  }
};
