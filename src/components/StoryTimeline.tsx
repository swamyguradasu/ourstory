import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MEMORIES, Memory } from '../data/memories';
import { MapStoryIcon } from './MapStoryIcons';
import { RoseHeaderFlourish, RoseCornerAccent } from './FlowerDecorations';
import { TinyMoonNode } from './CelestialDecorations';
import { SadStoryCard } from './SadStoryCard';
import { useSadMode } from '../context/SadModeContext';
import { triggerRomanticHearts } from './RomanticParticleSystem';
import { ThenNowComparison } from './ThenNowComparison';
import { Sparkles, Calendar, ArrowRight, Compass, Moon, Heart } from 'lucide-react';

interface StoryTimelineProps {
  onSelectMemory: (memory: Memory) => void;
}

// Delicate Tiny Rose Waypoint Node SVG
const TinyRoseNode: React.FC<{
  level: number;
  isSelected?: boolean;
  isHovered?: boolean;
}> = ({ level, isSelected, isHovered }) => {
  const levelFormatted = level < 10 ? `0${level}` : `${level}`;

  return (
    <div
      className={`relative w-8 h-8 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-500 z-20 ${
        isSelected || isHovered
          ? 'scale-125 bg-gradient-to-br from-[#7A1838] via-[#5B1028] to-[#241025] border-2 border-[#D8B46A] shadow-[0_0_25px_rgba(216,180,106,0.9),0_0_15px_rgba(232,154,175,0.7)]'
          : 'bg-[#1e0a20] border-2 border-[#D8B46A]/60 hover:border-[#D8B46A] shadow-[0_0_15px_rgba(0,0,0,0.8)]'
      }`}
    >
      {/* Outer subtle pulse */}
      {(isHovered || isSelected) && (
        <span className="absolute -inset-2 rounded-full bg-[#E89AAF]/30 animate-ping pointer-events-none" />
      )}

      {/* Tiny Blooming Rose Silhouette SVG */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className={`transition-colors duration-300 ${
          isHovered || isSelected ? 'text-[#FFF4F1]' : 'text-[#E89AAF]'
        }`}
      >
        <path
          d="M12 4C8.5 4 6 6.5 6 10C6 14.5 12 20 12 20C12 20 18 14.5 18 10C18 6.5 15.5 4 12 4Z"
          fill="#7A1838"
          fillOpacity="0.5"
        />
        <path
          d="M12 7C9.5 7 8 8.5 8 11C8 14 12 17.5 12 17.5C12 17.5 16 14 16 11C16 8.5 14.5 7 12 7Z"
          fill="#E89AAF"
          fillOpacity="0.3"
        />
        <circle cx="12" cy="11" r="1.5" fill="#D8B46A" />
      </svg>

      {/* Level number floating badge */}
      <span className="absolute -bottom-2 -right-1 px-1.5 py-0.2 rounded-full bg-[#120812] border border-[#D8B46A]/80 text-[8px] font-cinzel font-bold text-[#D8B46A] shadow">
        {levelFormatted}
      </span>
    </div>
  );
};

export const StoryTimeline: React.FC<StoryTimelineProps> = ({ onSelectMemory }) => {
  const { isSadMode } = useSadMode();
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Track currently visible chapter on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.45;
      let currentIndex = 0;

      for (let i = 0; i < itemRefs.current.length; i++) {
        const el = itemRefs.current[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          if (scrollY >= top) {
            currentIndex = i;
          }
        }
      }
      setActiveChapterIndex(currentIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeMemory = MEMORIES[activeChapterIndex] || MEMORIES[0];
  const activeLevelFormatted = activeMemory.level < 10 ? `0${activeMemory.level}` : `${activeMemory.level}`;

  return (
    <div className="relative w-full py-12 sm:py-16 selection:bg-[#7A1838]">
      {/* FLOATING ACTIVE CHAPTER HUD INDICATOR */}
      <div className="fixed top-20 right-4 sm:right-8 z-40 hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-[#1e0a20]/90 border border-[#D8B46A]/50 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_15px_rgba(122,24,56,0.3)] backdrop-blur-xl transition-all duration-300">
        <span className="w-2 h-2 rounded-full bg-[#E89AAF] animate-pulse" />
        <span className="text-[11px] font-cinzel font-bold text-[#D8B46A] tracking-[0.2em] uppercase">
          CHAPTER {activeLevelFormatted} OF {MEMORIES.length}
        </span>
        <span className="text-xs text-[#FFF4F1]/60">·</span>
        <span className="text-xs font-cormorant italic text-[#FFF4F1] truncate max-w-[200px]">
          {activeMemory.timelineTitle || activeMemory.title}
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* TIMELINE HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D8B46A]/30 bg-[#241025]/70 backdrop-blur-md mb-3 shadow-[0_0_15px_rgba(216,180,106,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-[#D8B46A]" />
            <span className="text-xs font-semibold tracking-[0.25em] text-[#E89AAF] uppercase font-cinzel">
              Chronological Odyssey
            </span>
          </div>

          <RoseHeaderFlourish className="mb-3" />

          <h1 className="font-cinzel text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-bold tracking-wider text-[#FFF4F1] drop-shadow-[0_8px_30px_rgba(122,24,56,0.6)] mb-3">
            OUR STORY
          </h1>

          <p className="font-cormorant italic text-xl sm:text-3xl text-[#F7D7DF] font-medium leading-relaxed max-w-2xl mx-auto">
            “A journey measured not in distance, but in memories.”
          </p>

          <div className="mt-3 flex items-center justify-center gap-3 text-xs sm:text-sm font-cinzel tracking-[0.2em] text-[#D8B46A]">
            <span>{MEMORIES.length} CANONICAL CHAPTERS</span>
            <span className="text-[#E89AAF]">·</span>
            <span>SEPTEMBER 2024 — 2026</span>
          </div>

          {/* Melancholic Sad Mode Notice Badge (Subtle when enabled) */}
          {isSadMode && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1628]/85 border border-[#64B5F6]/50 shadow-[0_0_15px_rgba(100,181,246,0.25)] text-xs font-cinzel text-[#90CAF9]"
            >
              <Moon className="w-3.5 h-3.5 text-[#64B5F6]" />
              <span className="tracking-widest uppercase text-[11px] font-bold">
                Sad Mode Active · Melancholic Chapter Layer Visible
              </span>
            </motion.div>
          )}
        </div>

        {/* VERTICAL CINEMATIC TIMELINE STRUCTURE */}
        <div className="relative">
          {/* GLOWING RED / ROSE CENTRAL TIMELINE LINE */}
          {/* Desktop: Central (left-1/2); Mobile: Aligned to left-4 sm:left-6 */}
          <div className="absolute top-8 bottom-8 left-4 sm:left-6 md:left-1/2 -translate-x-1/2 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-[#D8B46A] via-[#E89AAF] to-[#7A1838] shadow-[0_0_15px_rgba(232,154,175,0.7),0_0_25px_rgba(122,24,56,0.5)] z-0" />

          {/* Secondary atmospheric soft glow tube */}
          <div className="absolute top-8 bottom-8 left-4 sm:left-6 md:left-1/2 -translate-x-1/2 w-5 sm:w-8 -translate-x-1/2 rounded-full bg-[#7A1838]/20 blur-md pointer-events-none z-0" />

          {/* TIMELINE CHAPTERS LIST */}
          <div className="space-y-12 sm:space-y-20">
            {MEMORIES.map((memory, index) => {
              const chapterNumber = index + 1;
              const isEven = index % 2 === 0;
              const levelFormatted = chapterNumber < 10 ? `0${chapterNumber}` : `${chapterNumber}`;
              const displayTitle = memory.timelineTitle || memory.title;
              const isHovered = hoveredId === memory.id;
              const hasSadMemory = Boolean(isSadMode && memory.sadMemory?.enabled);

              return (
                <div
                  key={memory.id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className="relative flex flex-col md:flex-row items-center w-full"
                  onMouseEnter={() => setHoveredId(memory.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* CENTRAL / LEFT TIMELINE WAYPOINT NODE (MOON FOR SAD, ROSE FOR NORMAL) */}
                  <div className="absolute left-4 sm:left-6 md:left-1/2 -translate-x-1/2 z-30 cursor-pointer top-6 md:top-1/2 md:-translate-y-1/2">
                    <div
                      onClick={(e) => {
                        triggerRomanticHearts(e.clientX, e.clientY);
                        onSelectMemory(memory);
                      }}
                    >
                      {hasSadMemory ? (
                        <TinyMoonNode
                          level={chapterNumber}
                          isSelected={activeChapterIndex === index}
                          isHovered={isHovered}
                        />
                      ) : (
                        <TinyRoseNode
                          level={chapterNumber}
                          isSelected={activeChapterIndex === index}
                          isHovered={isHovered}
                        />
                      )}
                    </div>
                  </div>

                  {/* SINGLE CARD PER CHAPTER:
                      - If hasSadMemory is true: renders ONLY the Melancholy Layer Card (SadStoryCard)
                      - If hasSadMemory is false: renders the standard Chapter Card (or Chapter 22 Keepsake UI)
                  */}
                  <motion.div
                    initial={{ opacity: 0, y: 25, x: isEven ? -15 : 15 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={`w-full pl-11 sm:pl-16 pr-2 sm:pr-4 md:px-0 md:w-1/2 ${
                      isEven
                        ? 'md:pr-12 md:text-right order-1'
                        : 'md:pl-12 md:ml-auto md:text-left order-1'
                    }`}
                  >
                    {hasSadMemory ? (
                      /* ============================================================== */
                      /* MELANCHOLY LAYER CARD ONLY (WHEN SAD MODE IS ON FOR THIS MEMORY)*/
                      /* ============================================================== */
                      <SadStoryCard
                        memory={memory}
                        isOppositeSide={!isEven}
                        onSelectMemory={onSelectMemory}
                      />
                    ) : memory.isSpecialMemory ? (
                      /* ============================================================== */
                      /* CHAPTER 22: OUR MOST PRECIOUS PROMISE — PREMIUM MEMORY BOOK UI */
                      /* ============================================================== */
                      <div
                        onClick={(e) => {
                          triggerRomanticHearts(e.clientX, e.clientY);
                          onSelectMemory(memory);
                        }}
                        className="relative group transition-all duration-500 cursor-pointer hover:-translate-y-1 rounded-3xl sm:rounded-[36px] p-5 sm:p-8 md:p-9 bg-gradient-to-br from-[#2c0821]/98 via-[#430d2c]/98 to-[#1a0518]/98 border border-[#D8B46A]/80 hover:border-[#FFF4F1] shadow-[0_25px_65px_rgba(0,0,0,0.95),0_0_35px_rgba(216,180,106,0.35),0_0_25px_rgba(122,24,56,0.6),inset_0_0_35px_rgba(216,180,106,0.12)] hover:shadow-[0_30px_80px_rgba(216,180,106,0.65),inset_0_0_45px_rgba(216,180,106,0.2)] overflow-hidden -ml-1 -mr-1 sm:mx-0"
                      >
                        {/* Subtle Animated Gold Border Shimmer Line */}
                        <div className="absolute inset-0 rounded-3xl sm:rounded-[36px] border border-[#D8B46A]/30 pointer-events-none group-hover:border-[#D8B46A]/60 transition-colors duration-500" />

                        {/* Background Warm-Gold Radial Illumination */}
                        <div
                          className="absolute -top-20 -left-20 w-64 h-64 bg-radial from-[#D8B46A]/25 via-[#7A1838]/20 to-transparent rounded-full blur-3xl pointer-events-none group-hover:from-[#D8B46A]/35 transition-all duration-700"
                          aria-hidden="true"
                        />
                        <div
                          className="absolute -bottom-20 -right-20 w-64 h-64 bg-radial from-[#E89AAF]/20 via-[#480d2b]/25 to-transparent rounded-full blur-3xl pointer-events-none"
                          aria-hidden="true"
                        />

                        {/* Tiny Golden Sparkle Particles */}
                        <div className="absolute top-4 left-6 w-1 h-1 rounded-full bg-[#D8B46A] opacity-70 animate-ping pointer-events-none" />
                        <div className="absolute top-12 right-12 w-1.5 h-1.5 rounded-full bg-[#FFF4F1] opacity-75 animate-pulse pointer-events-none" />
                        <div className="absolute bottom-8 left-12 w-1 h-1 rounded-full bg-[#E89AAF] opacity-60 animate-pulse pointer-events-none" />
                        <div className="absolute bottom-16 right-8 w-1 h-1 rounded-full bg-[#D8B46A] opacity-75 animate-ping pointer-events-none" />

                        {/* Elegant Gold Decorative Corner Accents */}
                        <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-[#D8B46A]/80 rounded-tl pointer-events-none" />
                        <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-[#D8B46A]/80 rounded-tr pointer-events-none" />
                        <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-[#D8B46A]/80 rounded-bl pointer-events-none" />
                        <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-[#D8B46A]/80 rounded-br pointer-events-none" />

                        {/* Subtle Rose Motif Flourish */}
                        <RoseCornerAccent
                          position={isEven ? 'top-left' : 'top-right'}
                          className="opacity-75 group-hover:opacity-100 scale-110 transition-opacity duration-500"
                        />

                        {/* BADGE: A MEMORY WE HOLD CLOSE */}
                        <div
                          className={`flex items-center gap-2 mb-3.5 ${
                            isEven ? 'md:justify-end' : 'md:justify-start'
                          }`}
                        >
                          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#D8B46A] via-[#F5C77E] to-[#D8B46A] text-[#140614] text-[10px] font-cinzel font-extrabold tracking-[0.22em] uppercase shadow-[0_0_20px_rgba(216,180,106,0.7)]">
                            <Sparkles className="w-3 h-3 text-[#140614]" />
                            <span>A MEMORY WE HOLD CLOSE</span>
                            <Heart className="w-3 h-3 fill-[#7A1838] text-[#7A1838] animate-pulse" />
                          </div>
                        </div>

                        {/* Header Row: Chapter Number, Glowing Heart Emblem & Date */}
                        <div
                          className={`flex flex-wrap items-center gap-2.5 sm:gap-3.5 mb-3 text-xs ${
                            isEven ? 'md:justify-end' : 'md:justify-start'
                          }`}
                        >
                          <div className="flex items-center gap-2 font-cinzel font-bold text-[#D8B46A] tracking-[0.2em]">
                            {/* Glowing Heart Emblem */}
                            <span className="relative flex items-center justify-center">
                              <Heart className="w-3.5 h-3.5 fill-[#D8B46A] text-[#D8B46A] animate-pulse" />
                              <span className="absolute -inset-1 rounded-full bg-[#D8B46A]/30 blur-xs animate-ping pointer-events-none" />
                            </span>
                            <span>CHAPTER {levelFormatted}</span>
                          </div>
                          <span className="text-[#7A1838] font-bold">·</span>
                          <div className="flex items-center gap-1.5 text-[#E89AAF] font-medium tracking-wide">
                            <Calendar className="w-3.5 h-3.5 text-[#D8B46A]" />
                            <span>{memory.date}</span>
                          </div>
                        </div>

                        {/* Chapter Title in Elegant Serif with Breathing Room */}
                        <div
                          className={`flex items-center gap-3 mb-4 ${
                            isEven ? 'md:flex-row-reverse' : 'flex-row'
                          }`}
                        >
                          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#7A1838] via-[#5B1028] to-[#241025] border-2 border-[#D8B46A] flex items-center justify-center shrink-0 text-[#D8B46A] group-hover:text-[#FFF4F1] shadow-[0_0_20px_rgba(216,180,106,0.6)]">
                            <MapStoryIcon type={memory.mapIcon || 'heart'} size={19} />
                          </div>

                          <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold tracking-wider leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFF4F1] via-[#F7D7DF] to-[#D8B46A]">
                            {displayTitle}
                          </h3>
                        </div>

                        {/* PREMIUM CINEMATIC FRAMED IMAGE AREA */}
                        <div className="relative w-full rounded-2xl p-1 bg-gradient-to-br from-[#D8B46A]/60 via-[#7A1838]/40 to-[#D8B46A]/60 shadow-[0_0_25px_rgba(122,24,56,0.6)] mb-4">
                          <div className="relative w-full h-52 xs:h-60 sm:h-76 rounded-xl overflow-hidden bg-[#140616]">
                            <img
                              src={memory.image}
                              alt={displayTitle}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                            />

                            {/* Cinematic Vignette */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#140616]/80 via-transparent to-transparent pointer-events-none" />

                            {/* Location Badge */}
                            <div
                              className={`absolute bottom-2.5 ${
                                isEven ? 'right-2.5' : 'left-2.5'
                              } px-3 py-1 rounded-lg bg-[#120812]/90 backdrop-blur-md border border-[#D8B46A]/50 text-[10px] sm:text-xs font-cinzel text-[#D8B46A] flex items-center gap-1.5 shadow-md`}
                            >
                              <Compass className="w-3.5 h-3.5 text-[#D8B46A]" />
                              <span>{memory.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* TEXT AREA WITH GENEROUS BREATHING ROOM */}
                        <div className="my-3.5 space-y-2.5">
                          <p className="text-xs sm:text-sm leading-relaxed text-[#FFF4F1]/95 font-sans font-light">
                            {memory.description}
                          </p>

                          <div className="pt-2 border-t border-[#D8B46A]/25">
                            <p className="font-cormorant italic text-sm sm:text-base text-[#E89AAF] leading-relaxed">
                              “{memory.caption.replace(/^“|”$/g, '')}”
                            </p>
                          </div>
                        </div>

                        {/* Explore Memory Action Prompt */}
                        <div
                          className={`pt-3 border-t border-[#D8B46A]/30 flex items-center gap-2 min-h-[44px] text-xs font-cinzel font-bold text-[#D8B46A] group-hover:text-[#FFF4F1] transition-colors ${
                            isEven ? 'md:justify-end' : 'md:justify-start'
                          }`}
                        >
                          <span className="tracking-widest uppercase">Open Memory Experience</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#D8B46A] group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    ) : (
                      /* ============================================================== */
                      /* STANDARD OUR STORY CARD (CHAPTERS 1-21 AND 23-35)              */
                      /* ============================================================== */
                      <div
                        onClick={(e) => {
                          triggerRomanticHearts(e.clientX, e.clientY);
                          onSelectMemory(memory);
                        }}
                        className="relative group transition-all duration-300 cursor-pointer hover:-translate-y-1 overflow-hidden bg-[#1d0b20]/95 hover:bg-[#280f2d] border border-[#7A1838]/45 hover:border-[#D8B46A]/85 rounded-2xl sm:rounded-[24px] p-4 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_50px_rgba(122,24,56,0.45)]"
                      >
                        {/* Subtle rose filigree on card corner */}
                        <RoseCornerAccent
                          position={isEven ? 'top-left' : 'top-right'}
                          className="opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                        />

                        {/* Header Row: Chapter Number & Date */}
                        <div
                          className={`flex flex-wrap items-center gap-2 sm:gap-3 mb-2.5 text-xs ${
                            isEven ? 'md:justify-end' : 'md:justify-start'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 font-cinzel font-bold text-[#D8B46A] tracking-[0.18em]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D8B46A] animate-pulse" />
                            <span>CHAPTER {levelFormatted}</span>
                          </div>
                          <span className="text-[#7A1838] font-bold">·</span>
                          <div className="flex items-center gap-1 text-[#E89AAF] font-medium tracking-wide">
                            <Calendar className="w-3 h-3 text-[#D8B46A]" />
                            <span>{memory.date}</span>
                          </div>
                        </div>

                        {/* Title & Icon Header */}
                        <div
                          className={`flex items-center gap-2.5 mb-3 ${
                            isEven ? 'md:flex-row-reverse' : 'flex-row'
                          }`}
                        >
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#120812] border border-[#D8B46A]/50 flex items-center justify-center shrink-0 text-[#D8B46A] group-hover:text-[#FFF4F1] group-hover:border-[#D8B46A] transition-colors shadow">
                            <MapStoryIcon type={memory.mapIcon || 'heart'} size={15} />
                          </div>

                          <h3 className="font-cinzel text-lg sm:text-2xl font-bold tracking-wide text-[#FFF4F1] group-hover:text-[#D8B46A] transition-colors leading-tight">
                            {displayTitle}
                          </h3>
                        </div>

                        {/* Thumbnail Artwork */}
                        <div className="relative w-full h-44 xs:h-52 sm:h-64 rounded-xl overflow-hidden mb-3 sm:mb-4 bg-[#140616] border border-[#7A1838]/40 shadow-inner group-hover:border-[#D8B46A]/60 transition-colors">
                          <img
                            src={memory.image}
                            alt={displayTitle}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                          />

                          {/* Cinematic Vignette */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#140616]/75 via-transparent to-transparent pointer-events-none" />

                          {/* Location badge */}
                          <div
                            className={`absolute bottom-2.5 ${
                              isEven ? 'right-2.5' : 'left-2.5'
                            } px-2.5 py-1 rounded-lg bg-[#120812]/90 backdrop-blur-md border border-[#D8B46A]/40 text-[10px] sm:text-xs font-cinzel text-[#D8B46A] flex items-center gap-1.5 shadow-md`}
                          >
                            <Compass className="w-3.5 h-3.5 text-[#D8B46A]" />
                            <span>{memory.location}</span>
                          </div>
                        </div>

                        {/* Short Description */}
                        <p className="text-xs sm:text-sm leading-relaxed text-[#FFF4F1]/90 font-sans font-light mb-2.5 line-clamp-2">
                          {memory.description}
                        </p>

                        {/* Poetic Quote Hook */}
                        <p className="font-cormorant italic text-xs sm:text-sm text-[#E89AAF] mb-3 line-clamp-2">
                          “{memory.caption.replace(/^“|”$/g, '')}”
                        </p>

                        {/* Action Prompt */}
                        <div
                          className={`pt-2.5 border-t border-[#7A1838]/30 flex items-center gap-1.5 min-h-[44px] text-xs font-cinzel font-bold text-[#D8B46A] group-hover:text-[#FFF4F1] transition-colors ${
                            isEven ? 'md:justify-end' : 'md:justify-start'
                          }`}
                        >
                          <span className="tracking-widest uppercase">Open Memory Experience</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#D8B46A] group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CULMINATING THEN → NOW COMPARISON SLIDER */}
        <div className="mt-16 sm:mt-24">
          <ThenNowComparison />
        </div>

        {/* TIMELINE BOTTOM FOOTNOTE */}
        <div className="mt-20 text-center max-w-xl mx-auto pt-10 border-t border-[#7A1838]/40">
          <RoseHeaderFlourish className="mb-3" />
          <p className="font-cormorant italic text-lg sm:text-xl text-[#F7D7DF]">
            “{MEMORIES.length} milestones. Countless whispered words. One unbroken journey.”
          </p>
          <div className="text-xs font-cinzel text-[#D8B46A] tracking-[0.25em] mt-2">
            SEPTEMBER 2024 — SEPTEMBER 2026
          </div>
        </div>
      </div>
    </div>
  );
};
