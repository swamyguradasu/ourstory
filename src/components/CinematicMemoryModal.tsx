import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Memory, MEMORIES } from '../data/memories';
import { X, ChevronLeft, ChevronRight, Compass, Maximize2, Minimize2, Sparkles, Volume2 } from 'lucide-react';

interface CinematicMemoryModalProps {
  memory: Memory | null;
  onClose: () => void;
  onSelectMemory: (mem: Memory) => void;
}

export const CinematicMemoryModal: React.FC<CinematicMemoryModalProps> = ({
  memory,
  onClose,
  onSelectMemory,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setImageError(false);
    setIsZoomed(false);
    // Scroll modal to top when memory changes
    if (cardRef.current) {
      cardRef.current.scrollTop = 0;
    }
  }, [memory?.id]);

  // Keyboard navigation: Escape to return to map, ArrowLeft for Prev, ArrowRight for Next
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (!memory) return;
      const currentIndex = MEMORIES.findIndex((m) => m.id === memory.id);
      if (e.key === 'ArrowRight' && currentIndex < MEMORIES.length - 1) {
        onSelectMemory(MEMORIES[currentIndex + 1]);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onSelectMemory(MEMORIES[currentIndex - 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [memory, onClose, onSelectMemory]);

  if (!memory) return null;

  const currentIndex = MEMORIES.findIndex((m) => m.id === memory.id);
  const prevMemory = currentIndex > 0 ? MEMORIES[currentIndex - 1] : null;
  const nextMemory = currentIndex < MEMORIES.length - 1 ? MEMORIES[currentIndex + 1] : null;
  const levelFormatted = memory.level < 10 ? `0${memory.level}` : `${memory.level}`;

  // Format Engraved / Handwritten style date (e.g. "31 JANUARY 2025" or "SEPTEMBER 2024")
  const formatEngravedDate = (rawDate: string) => {
    return rawDate.toUpperCase();
  };

  // Chapter label (e.g. "CHAPTER 08 · THE BANGLES")
  const chapterFormatted = `CHAPTER ${levelFormatted} · ${memory.mapLocationName || memory.shortTitle.toUpperCase()}`;

  // Subtle Parallax on Mouse Move over image
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cinematic-memory-title"
      >
        {/* Backdrop (Slow Darkening + Blur + Ambient Rose Glow) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="fixed inset-0 bg-[#0e040f]/95 backdrop-blur-2xl pointer-events-auto"
        >
          {/* Ambient nebulas */}
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[500px] bg-[#7A1838]/25 rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[450px] bg-[#4B1D5A]/30 rounded-full blur-[140px] pointer-events-none" />
        </motion.div>

        {/* Main Cinematic Glass Card (Full Screen on Mobile) */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[92vh] overflow-y-auto bg-[#1a081c] sm:bg-[#1a081c]/92 sm:border sm:border-[#D8B46A]/45 rounded-none sm:rounded-[36px] shadow-[0_30px_90px_rgba(0,0,0,0.95)] backdrop-blur-3xl text-[#FFF4F1] my-auto scrollbar-thin flex flex-col"
        >
          {/* Sticky Top Bar (Contains Chapter & Direct Close Button) */}
          <div className="sticky top-0 z-40 px-4 sm:px-8 py-3 sm:py-4 bg-[#140616]/98 backdrop-blur-xl border-b border-[#7A1838]/50 flex items-center justify-between">
            {/* Top Chapter Label with decorative rose */}
            <div className="flex items-center gap-2 text-xs font-cinzel text-[#D8B46A] tracking-[0.15em] sm:tracking-[0.2em] font-bold truncate pr-2">
              <span className="text-sm select-none shrink-0" role="img" aria-label="rose">
                🌹
              </span>
              <span className="truncate">{chapterFormatted}</span>
            </div>

            {/* Quick Back to Map Close Button (44px min touch target) */}
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-full bg-[#241025] hover:bg-[#7A1838] border border-[#D8B46A]/60 text-[#FFF4F1] hover:text-[#D8B46A] transition-all cursor-pointer shadow-md shrink-0"
              title="Return to Map (Esc)"
              aria-label="Return to Map"
            >
              <span className="text-[11px] font-cinzel font-bold tracking-wider hidden xs:inline">
                CLOSE
              </span>
              <X className="w-4 h-4 text-[#D8B46A]" />
            </button>
          </div>

          <div className="p-4 sm:p-8 md:p-12 space-y-6 sm:space-y-8 flex-1">
            {/* TOP HEADER: LEVEL 01 & ENGRAVED DATE */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.35 }}
              className="flex items-center justify-between text-xs sm:text-sm"
            >
              <div className="flex items-center gap-1.5 sm:gap-2 font-cinzel font-bold text-[#D8B46A] tracking-[0.2em]">
                <span className="w-2 h-2 rounded-full bg-[#D8B46A] animate-pulse" />
                <span>LEVEL {levelFormatted}</span>
              </div>
              <div className="font-cinzel text-[11px] sm:text-xs font-semibold tracking-[0.15em] text-[#E89AAF] uppercase border-b border-[#D8B46A]/30 pb-0.5">
                {formatEngravedDate(memory.date)}
              </div>
            </motion.div>

            {/* TITLE (Avoid awkward wrapping on mobile) */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="space-y-1"
            >
              <h2
                id="cinematic-memory-title"
                className="font-cinzel text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#FFF4F1] via-[#F7D7DF] to-[#D8B46A] leading-tight break-words"
              >
                {memory.mapLocationName || memory.title.toUpperCase()}
              </h2>
              <div className="font-cormorant italic text-sm sm:text-base text-[#E89AAF]/90">
                “{memory.shortTitle}” · {memory.location}
              </div>
            </motion.div>

            {/* MAIN CINEMATIC ARTWORK FRAME */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.45 }}
              className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D8B46A]/50 bg-[#0d040f] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(122,24,56,0.3)] group"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className={`relative w-full flex items-center justify-center transition-all duration-300 ${isZoomed ? 'min-h-[440px] sm:min-h-[580px]' : 'min-h-[240px] xs:min-h-[280px] sm:min-h-[440px] md:min-h-[520px]'}`}>
                {!imageError ? (
                  <motion.img
                    src={memory.image}
                    alt={`${memory.title} - ${memory.shortTitle}`}
                    loading="eager"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    animate={{
                      scale: isZoomed ? 1.08 : 1.01,
                      x: mousePos.x * 8,
                      y: mousePos.y * 8,
                    }}
                    transition={{
                      scale: { duration: 6, ease: 'linear', repeat: Infinity, repeatType: 'reverse' },
                      x: { duration: 0.2, ease: 'easeOut' },
                      y: { duration: 0.2, ease: 'easeOut' },
                    }}
                    className="w-full h-auto max-h-[55vh] sm:max-h-[70vh] object-contain transition-transform"
                  />
                ) : (
                  <div className="w-full py-16 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#3A0718] via-[#241025] to-[#4B1D5A]">
                    <Sparkles className="w-10 h-10 text-[#D8B46A] mb-2 opacity-90" />
                    <h3 className="font-cinzel text-xl font-bold text-[#FFF4F1] mb-1">{memory.title}</h3>
                    <p className="font-cormorant italic text-sm text-[#E89AAF] max-w-md">{memory.caption}</p>
                  </div>
                )}

                {/* Cinematic Vignette Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#140616]/80 via-transparent to-[#140616]/30" />

                {/* Zoom Toggle Button */}
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="absolute top-3 right-3 min-w-[40px] min-h-[40px] flex items-center justify-center p-2 rounded-xl bg-[#120812]/85 text-[#D8B46A] hover:text-[#FFF4F1] border border-[#D8B46A]/40 transition-colors backdrop-blur-md cursor-pointer shadow-lg"
                  title={isZoomed ? "Reset Scale" : "Enlarge Image"}
                  aria-label="Toggle image zoom"
                >
                  {isZoomed ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                {/* Location Badge on Artwork */}
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-[#120812]/85 backdrop-blur-md border border-[#D8B46A]/30 text-[10px] sm:text-xs font-cinzel text-[#D8B46A] flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#D8B46A]" />
                  <span>{memory.location}</span>
                </div>
              </div>
            </motion.div>

            {/* SHORT STORY PARAGRAPH */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="space-y-4 max-w-3xl mx-auto"
            >
              <div className="text-sm sm:text-base md:text-lg leading-relaxed text-[#FFF4F1]/95 font-sans font-light">
                <p>{memory.description}</p>
              </div>
            </motion.div>

            {/* HIGHLIGHTED HANDWRITTEN-STYLE QUOTE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="relative max-w-2xl mx-auto p-4 sm:p-7 rounded-2xl bg-gradient-to-r from-[#2a0e28] via-[#3d1326] to-[#2a0e28] border-l-4 border-[#D8B46A] shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
            >
              <p className="font-handwriting text-xl sm:text-3xl text-[#FFF4F1] leading-relaxed tracking-wide text-center">
                “{memory.caption.replace(/^“|”$/g, '')}”
              </p>
            </motion.div>

            {/* BOTTOM NAVIGATION (Touch-friendly 44px+ buttons) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="pt-4 sm:pt-6 border-t border-[#7A1838]/40 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pb-4"
            >
              {/* PREVIOUS MEMORY */}
              {prevMemory ? (
                <button
                  onClick={() => onSelectMemory(prevMemory)}
                  className="w-full sm:w-auto min-h-[48px] px-5 py-3 rounded-2xl bg-[#241025] hover:bg-[#7A1838] border border-[#7A1838]/50 hover:border-[#D8B46A]/60 text-xs font-cinzel font-bold text-[#E89AAF] hover:text-[#FFF4F1] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md group"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span>PREVIOUS MEMORY</span>
                </button>
              ) : (
                <div className="hidden sm:block w-36" />
              )}

              {/* BACK TO MAP (CENTER BUTTON) */}
              <button
                onClick={onClose}
                className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-2xl bg-gradient-to-r from-[#7A1838] to-[#5B1028] hover:from-[#921E44] hover:to-[#7A1838] border border-[#D8B46A]/60 text-xs font-cinzel font-bold text-[#FFF4F1] tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(122,24,56,0.5)] flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
              >
                <Compass className="w-4 h-4 text-[#D8B46A]" />
                <span>BACK TO MAP</span>
              </button>

              {/* NEXT MEMORY */}
              {nextMemory ? (
                <button
                  onClick={() => onSelectMemory(nextMemory)}
                  className="w-full sm:w-auto min-h-[48px] px-5 py-3 rounded-2xl bg-[#241025] hover:bg-[#7A1838] border border-[#7A1838]/50 hover:border-[#D8B46A]/60 text-xs font-cinzel font-bold text-[#E89AAF] hover:text-[#FFF4F1] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md group"
                >
                  <span>NEXT MEMORY</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <div className="hidden sm:block w-36" />
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
