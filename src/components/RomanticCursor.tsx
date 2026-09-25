import React, { useEffect, useState, useRef } from 'react';

type CursorTargetType = 'default' | 'hoverable' | 'memory-node' | 'button' | 'image';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

interface MapSparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const RomanticCursor: React.FC = () => {
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [targetType, setTargetType] = useState<CursorTargetType>('default');
  const [isOverMap, setIsOverMap] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);
  const [sparkles, setSparkles] = useState<MapSparkle[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  // References for high performance RAF lerp without React re-render thrashing
  const mouseCoordsRef = useRef({ x: -100, y: -100 });
  const followerCoordsRef = useRef({ x: -100, y: -100 });
  const followerElemRef = useRef<HTMLDivElement | null>(null);
  const coreElemRef = useRef<HTMLDivElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastSparkleTimeRef = useRef<number>(0);

  useEffect(() => {
    // 1. PERFORMANCE & MOBILE UX: Check if touch device, coarse pointer, screen width under 1024px, or prefers reduced motion
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const isSmallScreen = window.innerWidth < 1024;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Only enable on desktop with fine mouse pointer, wide screen (1024px+), and no reduced motion
    if (hasTouch || isCoarsePointer || !isFinePointer || isSmallScreen || prefersReducedMotion) {
      setIsDisabled(true);
      document.body.classList.remove('custom-cursor-active');
      return;
    }

    setIsDisabled(false);

    // Apply custom-cursor-active to document body
    document.body.classList.add('custom-cursor-active');

    // 2. High-performance trailing follower loop with requestAnimationFrame
    let isRunning = true;
    const updateFollower = () => {
      if (!isRunning) return;

      const targetX = mouseCoordsRef.current.x;
      const targetY = mouseCoordsRef.current.y;
      const curX = followerCoordsRef.current.x;
      const curY = followerCoordsRef.current.y;

      // Smooth lerp (0.2 factor for organic, floating feel)
      const nextX = curX + (targetX - curX) * 0.22;
      const nextY = curY + (targetY - curY) * 0.22;

      followerCoordsRef.current = { x: nextX, y: nextY };

      if (followerElemRef.current) {
        followerElemRef.current.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;
      }

      animFrameRef.current = requestAnimationFrame(updateFollower);
    };

    animFrameRef.current = requestAnimationFrame(updateFollower);

    // 3. Mouse move handler: update target and inspect hovered elements
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      mouseCoordsRef.current = { x, y };

      if (coreElemRef.current) {
        coreElemRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      setCoords({ x, y });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if over interactive map
      const overMap = Boolean(
        target.closest('[data-story-map="true"]') ||
        target.closest('.memory-map-container') ||
        target.closest('#story-map')
      );
      setIsOverMap(overMap);

      // Sparkle trail over map (throttled to max 1 sparkle every 55ms, max 6 in array)
      if (overMap) {
        const now = performance.now();
        if (now - lastSparkleTimeRef.current > 55) {
          lastSparkleTimeRef.current = now;
          const colors = ['#D8B46A', '#E89AAF', '#FFF4F1', '#F7D7DF'];
          const newSparkle: MapSparkle = {
            id: Date.now() + Math.random(),
            x,
            y,
            size: 6 + Math.random() * 4,
            color: colors[Math.floor(Math.random() * colors.length)],
          };

          setSparkles((prev) => {
            const trimmed = prev.length >= 6 ? prev.slice(prev.length - 5) : prev;
            return [...trimmed, newSparkle];
          });

          // Clean up sparkle after 500ms animation
          setTimeout(() => {
            setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
          }, 500);
        }
      }

      // Check target hierarchy:
      // Priority 1: Memory Node
      const isMemoryNode = Boolean(
        target.closest('[data-memory-node="true"]') ||
        target.closest('[data-node="memory"]') ||
        target.closest('.memory-map-node') ||
        target.closest('[aria-label*="Scene"]') ||
        target.closest('[aria-label*="scene"]')
      );
      if (isMemoryNode) {
        setTargetType('memory-node');
        return;
      }

      // Priority 2: Button
      const isButton = Boolean(
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.romantic-btn') ||
        target.closest('input[type="button"]') ||
        target.closest('input[type="submit"]')
      );
      if (isButton) {
        setTargetType('button');
        return;
      }

      // Priority 3: Image / Card Media
      const isImage = Boolean(
        target.tagName === 'IMG' ||
        target.closest('img') ||
        target.closest('picture') ||
        target.closest('[data-card-image="true"]') ||
        target.closest('.memory-card-image')
      );
      if (isImage) {
        setTargetType('image');
        return;
      }

      // Priority 4: Generic Hoverable (Links, inputs, dropdowns, clickables)
      const isHoverable = Boolean(
        target.closest('a') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea') ||
        target.closest('.cursor-pointer')
      );
      if (isHoverable) {
        setTargetType('hoverable');
        return;
      }

      // Fallback: Default
      setTargetType('default');
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // 4. Click ripple effect (max 3 in queue)
    const handleMouseDown = (e: MouseEvent) => {
      const newRipple: ClickRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };

      setRipples((prev) => [...prev.slice(-2), newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown, { passive: true });

    return () => {
      isRunning = false;
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Return nothing on mobile/touch or when cursor leaves window
  if (isDisabled || !isVisible) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ============================================================== */}
      {/* 1. CLICK: TINY RADIAL HEART RIPPLE                             */}
      {/* ============================================================== */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: ripple.x,
            top: ripple.y,
            animation: 'romanticHeartRipple 0.6s cubic-bezier(0.1, 0.8, 0.3, 1) forwards',
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#E89AAF"
            strokeWidth="1.5"
            className="filter drop-shadow-[0_0_10px_rgba(232,154,175,0.9)]"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}

      {/* ============================================================== */}
      {/* 2. MAP: SUBTLE FADING SPARKLE TRAIL                            */}
      {/* ============================================================== */}
      {sparkles.map((sp) => (
        <div
          key={sp.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: sp.x,
            top: sp.y,
            animation: 'mapSparkleFade 0.5s ease-out forwards',
          }}
        >
          {/* Delicate 4-pointed golden sparkle */}
          <svg
            width={sp.size}
            height={sp.size}
            viewBox="0 0 24 24"
            fill={sp.color}
            className="filter drop-shadow-[0_0_6px_rgba(216,180,106,0.8)]"
          >
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        </div>
      ))}

      {/* ============================================================== */}
      {/* 3. SMOOTH TRAILING FOLLOWER (LERP ANIMATED ON GPU)             */}
      {/* Handles: BUTTON rose glow, IMAGE light reflection, HOVER circle */}
      {/* ============================================================== */}
      <div
        ref={followerElemRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-none"
      >
        {/* BUTTON: Soft rose glow follows cursor */}
        {targetType === 'button' && (
          <div className="w-14 h-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,154,175,0.4)_0%,rgba(122,24,56,0.2)_45%,transparent_70%)] blur-sm filter drop-shadow-[0_0_12px_rgba(232,154,175,0.6)] animate-pulse" />
        )}

        {/* IMAGE: Subtle light reflection follows cursor */}
        {targetType === 'image' && (
          <div className="w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.45)_0%,rgba(247,215,223,0.2)_40%,transparent_70%)] blur-[2px] filter drop-shadow-[0_0_10px_rgba(255,244,241,0.5)]" />
        )}

        {/* HOVERABLE: Small transparent circle expands around the pointer */}
        {targetType === 'hoverable' && (
          <div className="w-9 h-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D8B46A]/80 bg-[#D8B46A]/10 shadow-[0_0_15px_rgba(216,180,106,0.5)] transition-transform duration-200 scale-100" />
        )}

        {/* DEFAULT / MEMORY NODE: Subtle trailing ring */}
        {(targetType === 'default' || targetType === 'memory-node') && (
          <div className="w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E89AAF]/40 bg-[#7A1838]/10 shadow-[0_0_8px_rgba(232,154,175,0.3)]" />
        )}
      </div>

      {/* ============================================================== */}
      {/* 4. EXACT POINTER CORE (FOLLOWS CURSOR DIRECTLY)               */}
      {/* DEFAULT: Small glowing rose dot                                */}
      {/* MEMORY NODE: Cursor becomes a tiny heart                       */}
      {/* ============================================================== */}
      <div
        ref={coreElemRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-none"
      >
        {targetType === 'memory-node' ? (
          /* MEMORY NODE: Tiny glowing rose heart */
          <div className="flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="#E89AAF"
              stroke="#FFF4F1"
              strokeWidth="0.8"
              className="filter drop-shadow-[0_0_10px_rgba(232,154,175,1),0_0_6px_rgba(216,180,106,0.9)] animate-pulse"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        ) : (
          /* DEFAULT & ALL OTHER MODES: Small glowing rose dot */
          <div className="flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
            <div
              className={`rounded-full transition-all duration-150 ${
                targetType === 'button'
                  ? 'w-2.5 h-2.5 bg-[#FFF4F1] shadow-[0_0_10px_rgba(255,244,241,1),0_0_14px_rgba(232,154,175,0.9)]'
                  : targetType === 'hoverable'
                  ? 'w-2 h-2 bg-[#D8B46A] shadow-[0_0_8px_rgba(216,180,106,1)]'
                  : 'w-2 h-2 bg-[#E89AAF] shadow-[0_0_8px_rgba(232,154,175,0.9),0_0_12px_rgba(216,180,106,0.6)]'
              }`}
            />
          </div>
        )}
      </div>
    </div>
  );
};
