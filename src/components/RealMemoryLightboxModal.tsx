import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryMediaItem } from '../data/realMemories';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Sparkles,
  Film,
  Image as ImageIcon,
  Compass,
  Calendar,
  Heart,
} from 'lucide-react';
import { RoseCornerAccent } from './FlowerDecorations';

interface RealMemoryLightboxModalProps {
  item: GalleryMediaItem | null;
  allItems: GalleryMediaItem[];
  onClose: () => void;
  onNavigate: (item: GalleryMediaItem) => void;
}

export const RealMemoryLightboxModal: React.FC<RealMemoryLightboxModalProps> = ({
  item,
  allItems,
  onClose,
  onNavigate,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setImageError(false);
    setIsZoomed(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [item?.id]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (!item || allItems.length <= 1) return;
      const idx = allItems.findIndex((x) => x.id === item.id);
      if (e.key === 'ArrowRight' && idx < allItems.length - 1) {
        onNavigate(allItems[idx + 1]);
      } else if (e.key === 'ArrowLeft' && idx > 0) {
        onNavigate(allItems[idx - 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, allItems, onClose, onNavigate]);

  if (!item) return null;

  const currentIndex = allItems.findIndex((x) => x.id === item.id);
  const prevItem = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextItem = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;
  const isClosing = item.groupKey === '34thday';

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
        aria-labelledby="lightbox-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-0 bg-[#070208]/95 backdrop-blur-2xl pointer-events-auto"
          onClick={onClose}
        >
          {/* Ambient Lighting Glows */}
          <div
            className={`absolute top-1/4 left-1/4 w-[600px] h-[500px] ${
              isClosing ? 'bg-[#1e3a8a]/25' : 'bg-[#7A1838]/30'
            } rounded-full blur-[170px] pointer-events-none`}
          />
          <div
            className={`absolute bottom-1/4 right-1/4 w-[500px] h-[450px] ${
              isClosing ? 'bg-[#3b82f6]/15' : 'bg-[#D8B46A]/15'
            } rounded-full blur-[150px] pointer-events-none`}
          />
        </motion.div>

        {/* Main Lightbox Frame */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`relative z-10 w-full h-full sm:h-auto sm:max-w-5xl sm:max-h-[94vh] overflow-y-auto ${
            isClosing
              ? 'bg-[#08101d] sm:bg-[#08101d]/95 sm:border sm:border-[#64B5F6]/50 shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_50px_rgba(30,58,138,0.35)]'
              : 'bg-[#18071a] sm:bg-[#18071a]/95 sm:border sm:border-[#D8B46A]/45 shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_50px_rgba(122,24,56,0.35)]'
          } rounded-none sm:rounded-[32px] backdrop-blur-3xl text-[#FFF4F1] my-auto scrollbar-thin flex flex-col transition-colors duration-500`}
        >
          {/* Top Sticky Bar */}
          <div className="sticky top-0 z-40 px-4 sm:px-8 py-3.5 bg-[#120514]/98 backdrop-blur-xl border-b border-[#7A1838]/50 flex items-center justify-between">
            {/* Title & Counter */}
            <div className="flex items-center gap-3 truncate pr-2">
              <span
                className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-cinzel font-bold tracking-[0.2em] uppercase border ${
                  isClosing
                    ? 'bg-[#0e213d] text-[#64B5F6] border-[#64B5F6]/50 shadow-[0_0_12px_rgba(100,181,246,0.3)]'
                    : 'bg-[#2a0e28] text-[#D8B46A] border-[#D8B46A]/50 shadow-[0_0_12px_rgba(216,180,106,0.2)]'
                }`}
              >
                {item.type === 'video' ? 'VIDEO RECORDING' : 'PHOTOGRAPH'}
              </span>

              {allItems.length > 1 && (
                <span className="text-xs font-cinzel text-[#E89AAF] hidden sm:inline">
                  {currentIndex + 1} of {allItems.length}
                </span>
              )}
            </div>

            {/* Quick Close Button */}
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] rounded-full bg-[#241025] hover:bg-[#7A1838] border border-[#D8B46A]/60 text-[#FFF4F1] hover:text-[#D8B46A] transition-all cursor-pointer shadow-md shrink-0 group"
              title="Close (Escape)"
              aria-label="Close lightbox"
            >
              <span className="text-[11px] font-cinzel font-bold tracking-wider hidden xs:inline">
                CLOSE
              </span>
              <X className="w-4 h-4 text-[#D8B46A] group-hover:rotate-90 transition-transform" />
            </button>
          </div>

          <div className="p-4 sm:p-8 space-y-6 flex-1">
            {/* Main Media Viewport */}
            <div
              className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border ${
                isClosing ? 'border-[#64B5F6]/50 bg-[#060c16]' : 'border-[#D8B46A]/50 bg-[#0d040f]'
              } shadow-[0_20px_50px_rgba(0,0,0,0.95)] group flex items-center justify-center`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative w-full flex items-center justify-center min-h-[260px] xs:min-h-[340px] sm:min-h-[480px] md:min-h-[560px]">
                {item.type === 'image' && (
                  <>
                    {!imageError ? (
                      <motion.img
                        key={item.url}
                        src={item.url}
                        alt={item.title}
                        loading="eager"
                        referrerPolicy="no-referrer"
                        onError={() => setImageError(true)}
                        animate={{
                          scale: isZoomed ? 1.08 : 1.0,
                          x: mousePos.x * 6,
                          y: mousePos.y * 6,
                        }}
                        transition={{
                          x: { duration: 0.2, ease: 'easeOut' },
                          y: { duration: 0.2, ease: 'easeOut' },
                        }}
                        className={`w-full h-auto max-h-[62vh] sm:max-h-[76vh] object-contain transition-transform ${
                          isClosing ? 'brightness-[0.95] saturate-[0.95]' : ''
                        }`}
                      />
                    ) : (
                      <div className="w-full py-20 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#2a0e28] to-[#120514]">
                        <Sparkles className="w-12 h-12 text-[#D8B46A] mb-3 opacity-90 animate-pulse" />
                        <h4 className="font-cinzel text-lg font-bold text-[#FFF4F1] mb-1">
                          {item.title}
                        </h4>
                        <span className="text-[11px] text-[#E89AAF]/60 font-mono mt-2">
                          {item.filename}
                        </span>
                      </div>
                    )}
                  </>
                )}

                {item.type === 'video' && (
                  <div className="w-full max-h-[65vh] sm:max-h-[78vh] flex items-center justify-center bg-black/90 p-2 sm:p-4">
                    <video
                      ref={videoRef}
                      key={item.url}
                      src={item.url}
                      poster={item.poster}
                      controls
                      playsInline
                      preload="metadata"
                      controlsList="nodownload"
                      className="w-full h-auto max-h-[60vh] sm:max-h-[72vh] rounded-xl object-contain shadow-2xl"
                    >
                      <source src={item.url} type="video/mp4" />
                      Your browser does not support video playback.
                    </video>
                  </div>
                )}

                {/* Left/Right Media Arrows */}
                {prevItem && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(prevItem);
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#120514]/85 hover:bg-[#7A1838] border border-[#D8B46A]/60 text-[#FFF4F1] hover:text-[#D8B46A] flex items-center justify-center backdrop-blur-md shadow-xl transition-all cursor-pointer z-30"
                    title="Previous photo (Left arrow)"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}

                {nextItem && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(nextItem);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#120514]/85 hover:bg-[#7A1838] border border-[#D8B46A]/60 text-[#FFF4F1] hover:text-[#D8B46A] flex items-center justify-center backdrop-blur-md shadow-xl transition-all cursor-pointer z-30"
                    title="Next photo (Right arrow)"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}

                {/* Zoom Toggle for Images */}
                {item.type === 'image' && !imageError && (
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="absolute top-3 right-3 min-w-[40px] min-h-[40px] flex items-center justify-center p-2 rounded-xl bg-[#120514]/85 text-[#D8B46A] hover:text-[#FFF4F1] border border-[#D8B46A]/40 transition-colors backdrop-blur-md cursor-pointer shadow-lg z-30"
                    title={isZoomed ? 'Reset Scale' : 'Zoom Image'}
                    aria-label="Toggle zoom"
                  >
                    {isZoomed ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>

            {/* Information & Caption */}
            <div className="space-y-2 text-center max-w-2xl mx-auto">
              <h3
                id="lightbox-title"
                className={`font-cinzel text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-transparent bg-clip-text ${
                  isClosing
                    ? 'bg-gradient-to-r from-[#E0F2FE] via-[#90CAF9] to-[#64B5F6]'
                    : 'bg-gradient-to-r from-[#FFF4F1] via-[#F7D7DF] to-[#D8B46A]'
                }`}
              >
                {item.title}
              </h3>

              {item.caption && (
                <p
                  className={`font-cormorant italic text-base sm:text-lg ${
                    isClosing ? 'text-[#90CAF9]' : 'text-[#E89AAF]'
                  } leading-relaxed`}
                >
                  “{item.caption.replace(/^“|”$/g, '')}”
                </p>
              )}

              <div className="pt-2 text-[11px] font-mono text-[#E89AAF]/60 tracking-wider">
                {item.filename}
              </div>
            </div>

            {/* Bottom Nav Buttons (One-Handed Mobile Support) */}
            <div className="pt-4 border-t border-[#7A1838]/40 flex items-center justify-between gap-3 pb-2">
              {prevItem ? (
                <button
                  onClick={() => onNavigate(prevItem)}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-[#241025] hover:bg-[#7A1838] border border-[#7A1838]/50 text-xs font-cinzel font-bold text-[#E89AAF] hover:text-[#FFF4F1] transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden xs:inline">PREVIOUS</span>
                </button>
              ) : (
                <div className="w-20" />
              )}

              <button
                onClick={onClose}
                className="min-h-[44px] px-6 py-2 rounded-xl bg-gradient-to-r from-[#7A1838] to-[#5B1028] border border-[#D8B46A]/60 text-xs font-cinzel font-bold text-[#FFF4F1] tracking-widest uppercase transition-all shadow-md cursor-pointer hover:scale-102"
              >
                BACK TO GALLERY
              </button>

              {nextItem ? (
                <button
                  onClick={() => onNavigate(nextItem)}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-[#241025] hover:bg-[#7A1838] border border-[#7A1838]/50 text-xs font-cinzel font-bold text-[#E89AAF] hover:text-[#FFF4F1] transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span className="hidden xs:inline">NEXT</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="w-20" />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
