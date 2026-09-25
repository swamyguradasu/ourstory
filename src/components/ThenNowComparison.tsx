import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MEMORIES } from '../data/memories';
import { Sparkles, Heart, ChevronLeft, ChevronRight, Compass, Calendar, MoveHorizontal } from 'lucide-react';
import { RoseHeaderFlourish, RoseCornerAccent } from './FlowerDecorations';
import { triggerRomanticHearts } from './RomanticParticleSystem';

interface ThenNowComparisonProps {
  className?: string;
  onExploreStory?: () => void;
}

export const ThenNowComparison: React.FC<ThenNowComparisonProps> = ({
  className = '',
  onExploreStory,
}) => {
  // Slider position percentage (0 to 100). Default is 50%
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scene 1 and Final Scene details
  const scene01 = MEMORIES[0]; // First Morning — September 2024
  const sceneFinal = MEMORIES[MEMORIES.length - 1]; // Our Story — September 2026

  const scene01Image = scene01?.image || '/scean 1.png';
  const sceneFinalImage = sceneFinal?.image || '/scean 25.png';
  const finalLevel = sceneFinal?.level || 32;

  // Calculate position from mouse or touch event
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPos(percentage);
    if (!hasInteracted) setHasInteracted(true);
  }, [hasInteracted]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updatePosition(e.clientX);
    triggerRomanticHearts(e.clientX, e.clientY);
  };

  // Touch drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches[0]) {
      updatePosition(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    if (e.touches[0]) {
      updatePosition(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Window listeners for smooth mouse dragging outside the bounding box
  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    };

    const handleWindowMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleWindowMouseMove);
      window.addEventListener('mouseup', handleWindowMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
    };
  }, [isDragging, updatePosition]);

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPos((prev) => Math.max(prev - 5, 0));
    } else if (e.key === 'ArrowRight') {
      setSliderPos((prev) => Math.min(prev + 5, 100));
    }
  };

  return (
    <section
      className={`relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto ${className}`}
      aria-label="Then and Now comparison"
    >
      {/* Decorative ambient backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-radial from-[#7A1838]/20 via-[#4B1D5A]/10 to-transparent blur-3xl pointer-events-none" />

      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D8B46A]/40 bg-[#241025]/80 backdrop-blur-md mb-3 shadow-[0_0_20px_rgba(216,180,106,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-[#D8B46A] animate-pulse" />
          <span className="text-xs font-semibold tracking-[0.25em] text-[#E89AAF] uppercase font-cinzel">
            The Two-Year Horizon
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#D8B46A] animate-pulse" />
        </div>

        <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-[#FFF4F1] tracking-wide mb-3">
          THEN <span className="text-[#D8B46A] font-cormorant italic px-2">→</span> NOW
        </h2>

        <RoseHeaderFlourish className="my-3" />

        {/* TOP LABEL METADATA: THEN (September 2024) */}
        <div className="flex items-center justify-center gap-6 mt-4 font-cinzel text-sm sm:text-base">
          <div className="text-right">
            <span className="block text-[11px] font-bold tracking-[0.25em] text-[#E89AAF] uppercase">
              THE BEGINNING
            </span>
            <span className="font-bold text-[#D8B46A] text-base sm:text-lg">THEN</span>
            <span className="block font-cormorant italic text-xs sm:text-sm text-[#FFF4F1]/80">
              September 2024
            </span>
          </div>

          <div className="w-8 h-[1px] bg-gradient-to-r from-[#D8B46A] to-[#E89AAF]" />

          <div className="text-left">
            <span className="block text-[11px] font-bold tracking-[0.25em] text-[#E89AAF] uppercase">
              THE MASTERPIECE
            </span>
            <span className="font-bold text-[#D8B46A] text-base sm:text-lg">NOW</span>
            <span className="block font-cormorant italic text-xs sm:text-sm text-[#FFF4F1]/80">
              September 2026
            </span>
          </div>
        </div>
      </div>

      {/* QUICK PRESET TOGGLE PILLS */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <button
          onClick={() => setSliderPos(100)}
          className={`px-3.5 py-1 rounded-full text-xs font-cinzel tracking-wider border transition-all ${
            sliderPos === 100
              ? 'bg-[#7A1838] border-[#D8B46A] text-[#FFF4F1]'
              : 'bg-[#1a081c]/60 border-[#7A1838]/40 text-[#E89AAF] hover:text-[#FFF4F1]'
          }`}
        >
          Scene 01 (Then)
        </button>
        <button
          onClick={() => setSliderPos(50)}
          className={`px-3.5 py-1 rounded-full text-xs font-cinzel tracking-wider border transition-all ${
            sliderPos === 50
              ? 'bg-[#7A1838] border-[#D8B46A] text-[#FFF4F1]'
              : 'bg-[#1a081c]/60 border-[#7A1838]/40 text-[#E89AAF] hover:text-[#FFF4F1]'
          }`}
        >
          50 / 50 Comparison
        </button>
        <button
          onClick={() => setSliderPos(0)}
          className={`px-3.5 py-1 rounded-full text-xs font-cinzel tracking-wider border transition-all ${
            sliderPos === 0
              ? 'bg-[#7A1838] border-[#D8B46A] text-[#FFF4F1]'
              : 'bg-[#1a081c]/60 border-[#7A1838]/40 text-[#E89AAF] hover:text-[#FFF4F1]'
          }`}
        >
          Scene {finalLevel} (Now)
        </button>
      </div>

      {/* ============================================================== */}
      {/* COMPARISON SLIDER FRAME                                        */}
      {/* ============================================================== */}
      <div className="relative group">
        <RoseCornerAccent position="top-left" className="z-30" />
        <RoseCornerAccent position="top-right" className="z-30" />
        <RoseCornerAccent position="bottom-left" className="z-30" />
        <RoseCornerAccent position="bottom-right" className="z-30" />

        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="slider"
          aria-valuenow={Math.round(sliderPos)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Drag slider horizontally to compare Then and Now"
          className="relative w-full h-[320px] xs:h-[380px] sm:h-[480px] md:h-[540px] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#D8B46A]/60 shadow-[0_25px_70px_rgba(0,0,0,0.95),inset_0_0_50px_rgba(0,0,0,0.8)] cursor-ew-resize select-none focus:outline-none focus:ring-2 focus:ring-[#D8B46A] touch-none"
        >
          {/* 1. RIGHT SIDE IMAGE: NOW (Final Scene) */}
          <div className="absolute inset-0 w-full h-full bg-[#180a19] overflow-hidden select-none">
            <img
              src={sceneFinalImage}
              alt={`Now — Scene ${finalLevel}: Our Story, September 2026`}
              className="w-full h-full object-cover object-center pointer-events-none select-none"
              loading="eager"
            />
            {/* Soft vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#120812]/80 via-transparent to-black/30 pointer-events-none" />

            {/* In-frame Right Label (NOW) */}
            <div className="absolute top-2.5 right-2.5 sm:top-6 sm:right-6 z-10 pointer-events-none text-right">
              <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-[#120812]/85 backdrop-blur-md border border-[#D8B46A]/50 shadow-lg">
                <span className="block text-[9px] sm:text-[10px] font-cinzel font-bold text-[#E89AAF] tracking-widest uppercase">
                  NOW
                </span>
                <span className="font-cinzel text-[11px] sm:text-sm font-bold text-[#FFF4F1]">
                  Scene {finalLevel} · Our Story
                </span>
                <span className="block text-[9px] sm:text-[10px] font-mono text-[#D8B46A]">
                  September 2026
                </span>
              </div>
            </div>
          </div>

          {/* 2. LEFT SIDE IMAGE: THE BEGINNING / THEN (Scene 01) */}
          <div
            className="absolute inset-0 w-full h-full bg-[#180a19] overflow-hidden select-none pointer-events-none"
            style={{
              clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
            }}
          >
            <img
              src={scene01Image}
              alt="The Beginning — Scene 01: First Morning, September 2024"
              className="w-full h-full object-cover object-center pointer-events-none select-none"
              loading="eager"
            />
            {/* Soft vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#120812]/80 via-transparent to-black/30 pointer-events-none" />

            {/* In-frame Left Label (THE BEGINNING) */}
            <div className="absolute top-2.5 left-2.5 sm:top-6 sm:left-6 z-10 pointer-events-none text-left">
              <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-[#120812]/85 backdrop-blur-md border border-[#D8B46A]/50 shadow-lg">
                <span className="block text-[9px] sm:text-[10px] font-cinzel font-bold text-[#E89AAF] tracking-widest uppercase">
                  THE BEGINNING
                </span>
                <span className="font-cinzel text-[11px] sm:text-sm font-bold text-[#FFF4F1]">
                  Scene 01 · First Morning
                </span>
                <span className="block text-[9px] sm:text-[10px] font-mono text-[#D8B46A]">
                  September 2024
                </span>
              </div>
            </div>
          </div>

          {/* 3. VERTICAL DIVIDER LINE WITH SOFT ROSE-GOLD GLOW */}
          <div
            className="absolute top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#FFF4F1] via-[#D8B46A] to-[#E89AAF] shadow-[0_0_15px_rgba(216,180,106,0.8),0_0_30px_rgba(232,154,175,0.6)] pointer-events-none -translate-x-1/2 z-20"
            style={{ left: `${sliderPos}%` }}
          />

          {/* 4. DRAGGABLE ROSE-GOLD HANDLE WITH TINY HEART ICON */}
          <div
            className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-transform duration-100 ${
              isDragging ? 'scale-110' : 'hover:scale-105'
            }`}
            style={{ left: `${sliderPos}%` }}
          >
            {/* Outer Rose-Gold Halo */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full p-[2px] bg-gradient-to-br from-[#E89AAF] via-[#D8B46A] to-[#7A1838] shadow-[0_0_25px_rgba(232,154,175,0.8),0_0_15px_rgba(216,180,106,0.9)]">
              {/* Inner Dark Enamel Center */}
              <div className="w-full h-full rounded-full bg-[#1c081e] flex items-center justify-center border border-[#FFF4F1]/40 text-[#FFF4F1]">
                <ChevronLeft className="w-3.5 h-3.5 text-[#D8B46A]/80 -mr-1" />
                <Heart className="w-4 h-4 fill-[#E89AAF] text-[#E89AAF] animate-pulse" />
                <ChevronRight className="w-3.5 h-3.5 text-[#D8B46A]/80 -ml-1" />
              </div>
            </div>
          </div>

          {/* 5. INTERACTION INSTRUCTION WATERMARK */}
          {!hasInteracted && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-bounce">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#120812]/90 border border-[#D8B46A]/50 text-xs font-cinzel text-[#FFF4F1] shadow-2xl backdrop-blur-md">
                <MoveHorizontal className="w-3.5 h-3.5 text-[#D8B46A]" />
                <span>Drag or swipe slider to compare</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* BELOW SECTION: POETIC CAPTION & METRICS                        */}
      {/* ============================================================== */}
      <div className="mt-8 sm:mt-10 text-center max-w-xl mx-auto">
        <p className="font-cormorant italic text-xl sm:text-2xl text-[#FFF4F1] font-medium leading-relaxed mb-3">
          “Two points on a map.
          <br />
          A whole story between them.”
        </p>

        <div className="inline-flex items-center gap-3 text-xs font-cinzel text-[#D8B46A]">
          <span>730 DAYS</span>
          <span className="text-[#7A1838]">✦</span>
          <span>{MEMORIES.length} CANONICAL CHAPTERS</span>
          <span className="text-[#7A1838]">✦</span>
          <span>1,840 MILES</span>
        </div>

        {onExploreStory && (
          <div className="mt-6">
            <button
              onClick={onExploreStory}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#7A1838] to-[#5B1028] hover:from-[#8d1d42] hover:to-[#6a1330] border border-[#D8B46A]/60 text-xs font-cinzel font-bold text-[#FFF4F1] tracking-widest uppercase shadow-lg transition-all"
            >
              <span>Walk Through The {MEMORIES.length} Moments</span>
              <ChevronRight className="w-4 h-4 text-[#D8B46A]" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
