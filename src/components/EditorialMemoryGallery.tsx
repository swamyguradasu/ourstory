import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MEMORIES, Memory } from '../data/memories';
import { RoseHeaderFlourish, RoseCornerAccent } from './FlowerDecorations';
import { triggerRomanticHearts } from './RomanticParticleSystem';
import { RomanticButton } from './RomanticButton';
import { Search, Sparkles, X, Shuffle, Calendar, ArrowRight, Compass, Heart, Camera } from 'lucide-react';
import { triggerEasterEggDiscovery } from '../utils/easterEggs';

interface EditorialMemoryGalleryProps {
  onSelectMemory: (memory: Memory) => void;
}

export type GalleryFilterType =
  | 'ALL'
  | 'BEGINNING'
  | 'COLLEGE'
  | 'GIFTS'
  | 'JOURNEYS'
  | 'FAMILY'
  | 'MILESTONES'
  | 'DISTANCE'
  | 'REUNION'
  | 'FINAL';

const FILTER_TAGS: { id: GalleryFilterType; label: string }[] = [
  { id: 'ALL', label: 'ALL' },
  { id: 'BEGINNING', label: 'BEGINNING' },
  { id: 'COLLEGE', label: 'COLLEGE' },
  { id: 'GIFTS', label: 'GIFTS' },
  { id: 'JOURNEYS', label: 'JOURNEYS' },
  { id: 'FAMILY', label: 'FAMILY' },
  { id: 'MILESTONES', label: 'MILESTONES' },
  { id: 'DISTANCE', label: 'DISTANCE' },
  { id: 'REUNION', label: 'REUNION' },
  { id: 'FINAL', label: 'FINAL' },
];

export const EditorialMemoryGallery: React.FC<EditorialMemoryGalleryProps> = ({ onSelectMemory }) => {
  const [activeFilter, setActiveFilter] = useState<GalleryFilterType>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Filter memories matching selected tag & search query
  const filteredMemories = useMemo(() => {
    return MEMORIES.filter((mem) => {
      // 1. Tag filtering
      let matchesFilter = true;
      const lvl = mem.level;

      switch (activeFilter) {
        case 'BEGINNING':
          matchesFilter = lvl >= 1 && lvl <= 5;
          break;
        case 'COLLEGE':
          matchesFilter = [1, 2, 3, 4, 5, 9, 17, 23].includes(lvl);
          break;
        case 'GIFTS':
          matchesFilter = [8, 10, 29, 31].includes(lvl);
          break;
        case 'JOURNEYS':
          matchesFilter = [13, 14, 15, 18, 22].includes(lvl);
          break;
        case 'FAMILY':
          matchesFilter = [12, 26].includes(lvl);
          break;
        case 'MILESTONES':
          matchesFilter = [8, 10, 11, 12, 16, 19, 20, 21, 25, 27, 29, 31].includes(lvl);
          break;
        case 'DISTANCE':
          matchesFilter = [6, 24, 28].includes(lvl);
          break;
        case 'REUNION':
          matchesFilter = [7, 30, 32].includes(lvl);
          break;
        case 'FINAL':
          matchesFilter = lvl === 32;
          break;
        case 'ALL':
        default:
          matchesFilter = true;
          break;
      }

      if (!matchesFilter) return false;

      // 2. Search query filtering
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const titleMatch = (mem.timelineTitle || mem.title).toLowerCase().includes(q);
      const dateMatch = mem.date.toLowerCase().includes(q);
      const chapterMatch = (mem.chapter || '').toLowerCase().includes(q) || `chapter ${mem.level}`.includes(q);
      const keywordMatch =
        mem.shortTitle.toLowerCase().includes(q) ||
        mem.location.toLowerCase().includes(q) ||
        mem.description.toLowerCase().includes(q) ||
        mem.caption.toLowerCase().includes(q) ||
        mem.handwrittenNote.toLowerCase().includes(q);

      return titleMatch || dateMatch || chapterMatch || keywordMatch;
    });
  }, [activeFilter, searchQuery]);

  // Random Memory Selector Action
  const handleRandomMemory = (e: React.MouseEvent) => {
    triggerRomanticHearts(e.clientX, e.clientY);
    const randomIndex = Math.floor(Math.random() * MEMORIES.length);
    const randomMem = MEMORIES[randomIndex];
    onSelectMemory(randomMem);
  };

  // Determine card layout size while maintaining strict chronological order
  const getCardLayoutClass = (level: number, totalFiltered: number) => {
    if (totalFiltered <= 4) {
      return 'col-span-1 h-[360px] xs:h-[400px] sm:h-[440px]';
    }

    // Key iconic milestones as Grand Feature Cards
    if (level === 1 || level === 8 || level === 11 || level === 20 || level === 32) {
      return 'col-span-1 sm:col-span-2 h-[380px] xs:h-[420px] sm:h-[480px] lg:h-[520px]';
    }
    if (level === 10 || level === 17 || level === 22 || level === 29 || level === 30 || level === 31) {
      return 'col-span-1 sm:col-span-2 h-[360px] xs:h-[400px] sm:h-[460px]';
    }
    // Medium Cards
    if ([2, 4, 6, 9, 12, 13, 14, 16, 18, 19, 23, 25, 27].includes(level)) {
      return 'col-span-1 h-[360px] xs:h-[390px] sm:h-[440px]';
    }
    // Small Memory Tiles
    return 'col-span-1 h-[340px] xs:h-[370px] sm:h-[400px]';
  };

  return (
    <div className="relative w-full min-h-screen py-12 sm:py-20 lg:py-24 px-3 sm:px-6 lg:px-8 selection:bg-[#7A1838]">
      <div className="max-w-7xl mx-auto relative z-20">
        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D8B46A]/30 bg-[#241025]/70 backdrop-blur-md mb-3 shadow-[0_0_15px_rgba(216,180,106,0.15)]">
            <button
              onClick={() => triggerEasterEggDiscovery('camera')}
              className="text-[#D8B46A] hover:text-[#FFF4F1] hover:scale-110 transition-transform cursor-pointer"
              title="A vintage camera lens"
              role="button"
              aria-label="Vintage camera"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-semibold tracking-[0.25em] text-[#E89AAF] uppercase font-cinzel">
              The Keepsake Folio
            </span>
          </div>

          <RoseHeaderFlourish className="mb-3" />

          <h1 className="font-cinzel text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-bold tracking-wider text-[#FFF4F1] drop-shadow-[0_8px_30px_rgba(122,24,56,0.6)] mb-3">
            MEMORIES
          </h1>

          <p className="font-cormorant italic text-xl sm:text-3xl text-[#F7D7DF] font-medium leading-relaxed max-w-2xl mx-auto">
            “Some moments deserve to be kept forever.”
          </p>

          <div className="mt-3 flex items-center justify-center gap-3 text-xs sm:text-sm font-cinzel tracking-[0.2em] text-[#D8B46A]">
            <span>{MEMORIES.length} CANONICAL SCENES</span>
            <span className="text-[#E89AAF]">·</span>
            <span>CHRONOLOGICAL FOLIO</span>
          </div>
        </div>

        {/* SEARCH & "GET LOST IN A MEMORY" ACTION BAR */}
        <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-5 max-w-5xl mx-auto">
          {/* Subtle Search Field */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D8B46A]" />
            <input
              type="text"
              placeholder="Search a memory…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 min-h-[44px] py-2.5 rounded-full bg-[#1e0a20]/90 border border-[#7A1838]/60 focus:border-[#D8B46A] focus:outline-none text-xs sm:text-sm text-[#FFF4F1] placeholder-[#E89AAF]/50 tracking-wider shadow-inner backdrop-blur-md transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#E89AAF] hover:text-[#FFF4F1] transition-colors p-1"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* "GET LOST IN A MEMORY" RANDOM MEMORY BUTTON */}
          <RomanticButton
            onClick={handleRandomMemory}
            variant="primary"
            size="sm"
            icon={<Shuffle className="w-4 h-4 text-[#D8B46A]" />}
            className="w-full sm:w-auto shadow-[0_0_20px_rgba(122,24,56,0.6)]"
          >
            GET LOST IN A MEMORY
          </RomanticButton>
        </div>

        {/* SUBTLE CATEGORY FILTER BUTTONS (Swipeable on mobile) */}
        <div className="mb-8 flex items-center gap-2 overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-center max-w-4xl mx-auto py-1">
          {FILTER_TAGS.map((tag) => {
            const isActive = activeFilter === tag.id;
            return (
              <button
                key={tag.id}
                onClick={() => setActiveFilter(tag.id)}
                className={`min-h-[40px] px-4 py-2 rounded-full text-xs font-cinzel tracking-[0.15em] transition-all duration-300 border cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#7A1838] to-[#5B1028] text-[#FFF4F1] border-[#D8B46A] shadow-[0_0_15px_rgba(216,180,106,0.4)] scale-105'
                    : 'bg-[#1e0a20]/70 text-[#E89AAF]/80 hover:text-[#FFF4F1] border-[#7A1838]/40 hover:border-[#D8B46A]/60'
                }`}
              >
                <span>{tag.label}</span>
              </button>
            );
          })}
        </div>

        {/* GALLERY COUNTER STRIP */}
        <div className="mb-6 sm:mb-8 flex items-center justify-between text-xs text-[#E89AAF] border-b border-[#7A1838]/40 pb-3">
          <div className="font-cinzel tracking-wider text-[#D8B46A] text-[11px] sm:text-xs">
            SHOWING <span className="font-bold text-[#FFF4F1]">{filteredMemories.length}</span> OF {MEMORIES.length} CHRONOLOGICAL MEMORIES
          </div>
          <div className="font-cormorant italic text-sm text-[#F7D7DF]/70 hidden sm:block">
            September 2024 — September 2026
          </div>
        </div>

        {/* EDITORIAL MASONRY GALLERY (CHRONOLOGICAL PRESERVATION) */}
        {filteredMemories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredMemories.map((memory) => {
              const levelFormatted = memory.level < 10 ? `0${memory.level}` : `${memory.level}`;
              const displayTitle = memory.timelineTitle || memory.title;
              const cardClass = getCardLayoutClass(memory.level, filteredMemories.length);
              const isHovered = hoveredId === memory.id;

              return (
                <motion.div
                  key={memory.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className={`relative group ${cardClass} rounded-2xl sm:rounded-[28px] overflow-hidden border border-[#7A1838]/40 hover:border-[#D8B46A]/85 bg-[#120812] cursor-pointer shadow-[0_15px_35px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_60px_rgba(122,24,56,0.5),0_0_30px_rgba(216,180,106,0.35)] transition-all duration-500 hover:-translate-y-1`}
                  onClick={(e) => {
                    triggerRomanticHearts(e.clientX, e.clientY);
                    onSelectMemory(memory);
                  }}
                  onMouseEnter={() => setHoveredId(memory.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Subtle Corner Rose Accent appearing on hover */}
                  <RoseCornerAccent
                    position="top-right"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
                  />

                  {/* BACKGROUND CINEMATIC IMAGE WITH SLOW ZOOM */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <img
                      src={memory.image}
                      alt={displayTitle}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  {/* DARK CINEMATIC GRADIENT & VIGNETTE OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e040f]/95 via-[#0e040f]/45 to-transparent pointer-events-none transition-opacity duration-500 group-hover:from-[#0e040f]/98 group-hover:via-[#0e040f]/60" />

                  {/* WARM ROSE VIGNETTE ON HOVER */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7A1838]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* TOP BADGE: CHAPTER NUMBER & DATE */}
                  <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 z-20 flex items-center justify-between pointer-events-none">
                    <div className="px-2.5 py-1 rounded-full bg-[#120812]/85 backdrop-blur-md border border-[#D8B46A]/50 text-[10px] sm:text-xs font-cinzel font-bold text-[#D8B46A] tracking-[0.18em] shadow-md">
                      CHAPTER {levelFormatted}
                    </div>

                    <div className="px-2.5 py-1 rounded-full bg-[#120812]/85 backdrop-blur-md border border-[#E89AAF]/30 text-[10px] sm:text-xs text-[#E89AAF] font-medium tracking-wide flex items-center gap-1 shadow-md">
                      <Calendar className="w-3 h-3 text-[#D8B46A]" />
                      <span>{memory.date}</span>
                    </div>
                  </div>

                  {/* BOTTOM EDITORIAL OVERLAY CONTENT */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-7 z-20 flex flex-col justify-end space-y-2">
                    {/* Chapter / Location subtitle */}
                    <div className="flex items-center gap-1.5 text-xs font-cormorant italic text-[#E89AAF]/90 line-clamp-1">
                      <Compass className="w-3.5 h-3.5 text-[#D8B46A] shrink-0" />
                      <span>{memory.location}</span>
                    </div>

                    {/* Prominent Title */}
                    <h3 className="font-cinzel text-lg sm:text-2xl lg:text-3xl font-bold tracking-wide text-[#FFF4F1] group-hover:text-[#D8B46A] transition-colors leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                      {displayTitle}
                    </h3>

                    {/* Short Story Hook */}
                    <p className="text-xs sm:text-sm text-[#FFF4F1]/85 font-sans font-light line-clamp-2 leading-relaxed">
                      {memory.caption.replace(/^“|”$/g, '')}
                    </p>

                    {/* "OPEN MEMORY" BUTTON (ALWAYS VISIBLE & TAP-FRIENDLY ON MOBILE) */}
                    <div className="pt-2">
                      <div className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-full bg-gradient-to-r from-[#7A1838] to-[#5B1028] border border-[#D8B46A]/60 text-xs font-cinzel font-bold tracking-widest text-[#FFF4F1] uppercase shadow-[0_0_15px_rgba(122,24,56,0.6)] group-hover:shadow-[0_0_25px_rgba(216,180,106,0.5)] transition-all duration-300">
                        <span>OPEN MEMORY</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#D8B46A] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* BEAUTIFUL EMPTY STATE */
          <div className="text-center py-20 p-8 rounded-3xl bg-[#1e0a20]/60 border border-[#7A1838]/40 max-w-lg mx-auto shadow-2xl backdrop-blur-md">
            <div className="w-16 h-16 rounded-full bg-[#140616] border border-[#D8B46A]/50 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(216,180,106,0.3)]">
              <span className="text-3xl select-none" role="img" aria-label="rose">
                🌹
              </span>
            </div>

            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#FFF4F1] mb-2">
              No Whispered Memories Found
            </h3>

            <p className="font-cormorant italic text-base text-[#F7D7DF]/85 mb-6 max-w-sm mx-auto leading-relaxed">
              No moments in our journal match “{searchQuery}” in the {activeFilter} collection.
            </p>

            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('ALL');
              }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#7A1838] to-[#5B1028] hover:from-[#921E44] hover:to-[#7A1838] border border-[#D8B46A]/60 text-xs font-cinzel font-bold text-[#FFF4F1] tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(122,24,56,0.5)] cursor-pointer"
            >
              SHOW ALL {MEMORIES.length} MEMORIES
            </button>
          </div>
        )}

        {/* BOTTOM ORNAMENT FOOTNOTE */}
        <div className="mt-24 text-center max-w-xl mx-auto pt-10 border-t border-[#7A1838]/40">
          <RoseHeaderFlourish className="mb-3" />
          <p className="font-cormorant italic text-lg sm:text-xl text-[#F7D7DF]">
            “Every frame a breath. Every chapter an eternal promise.”
          </p>
          <div className="text-xs font-cinzel text-[#D8B46A] tracking-[0.25em] mt-2">
            SEPTEMBER 2024 — SEPTEMBER 2026
          </div>
        </div>
      </div>
    </div>
  );
};
