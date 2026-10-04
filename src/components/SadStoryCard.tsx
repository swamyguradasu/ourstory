import React from 'react';
import { motion } from 'motion/react';
import { Memory } from '../data/memories';
import { MoonCornerAccent } from './CelestialDecorations';
import { triggerRomanticHearts } from './RomanticParticleSystem';
import { Moon, Calendar, Compass, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

interface SadStoryCardProps {
  memory: Memory;
  isOppositeSide?: boolean; // For desktop: true if on right side, false if on left side
  onSelectMemory: (memory: Memory) => void;
}

export const SadStoryCard: React.FC<SadStoryCardProps> = ({
  memory,
  isOppositeSide = false,
  onSelectMemory,
}) => {
  const sadData = memory.sadMemory;
  if (!sadData || !sadData.enabled) return null;

  const levelFormatted = memory.level < 10 ? `0${memory.level}` : `${memory.level}`;
  const displayTitle = sadData.title || memory.timelineTitle || memory.title;
  const displayDate = sadData.date || memory.date;
  const displayLocation = sadData.location || memory.location;
  const displayImage = sadData.image || memory.image;

  // On desktop: if isOppositeSide is false, card is on the left (text right-aligned)
  // If isOppositeSide is true, card is on the right (text left-aligned)
  const isLeftAlignOnDesktop = isOppositeSide;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <div
        onClick={(e) => {
          triggerRomanticHearts(e.clientX, e.clientY);
          onSelectMemory(memory);
        }}
        className="relative group bg-gradient-to-b from-[#0a1424]/95 via-[#0b1b30]/95 to-[#070e1a]/98 hover:from-[#0d1d34] hover:to-[#091526] border border-[#1e3a5f]/60 hover:border-[#64B5F6]/85 rounded-2xl sm:rounded-[24px] p-4 sm:p-6 transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_50px_rgba(20,50,90,0.5)] cursor-pointer hover:-translate-y-1 overflow-hidden"
      >
        {/* Melancholic Celestial Corner Accent */}
        <MoonCornerAccent
          position={!isLeftAlignOnDesktop ? 'top-left' : 'top-right'}
          className="opacity-40 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Ambient Moon Mist Texture (Subtle glow) */}
        <div
          className="absolute -top-16 -right-16 w-36 h-36 bg-[#64B5F6]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#64B5F6]/20 transition-all duration-700"
          aria-hidden="true"
        />

        {/* Header Row: Chapter & Melancholy Mood Badge */}
        <div
          className={`flex flex-wrap items-center gap-2 sm:gap-3 mb-2.5 text-xs ${
            !isLeftAlignOnDesktop ? 'md:justify-end' : 'md:justify-start'
          }`}
        >
          <div className="flex items-center gap-1.5 font-cinzel font-bold text-[#64B5F6] tracking-[0.18em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#64B5F6] animate-pulse" />
            <span>CHAPTER {levelFormatted}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#132a4a]/80 border border-[#64B5F6]/40 text-[#90CAF9] font-sans font-normal tracking-normal uppercase">
              Melancholy Layer
            </span>
          </div>
          <span className="text-[#1e3a5f] font-bold">·</span>
          <div className="flex items-center gap-1 text-[#90CAF9] font-medium tracking-wide">
            <Calendar className="w-3 h-3 text-[#64B5F6]" />
            <span>{displayDate}</span>
          </div>
        </div>

        {/* Title & Moon Icon Header */}
        <div
          className={`flex items-center gap-2.5 mb-3 ${
            !isLeftAlignOnDesktop ? 'md:flex-row-reverse' : 'flex-row'
          }`}
        >
          {/* Moon Icon Badge */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#070f1e] border border-[#64B5F6]/50 flex items-center justify-center shrink-0 text-[#64B5F6] group-hover:text-[#E0F2FE] group-hover:border-[#64B5F6] transition-colors shadow">
            <Moon className="w-3.5 h-3.5 text-[#64B5F6] group-hover:scale-110 transition-transform" />
          </div>

          {/* Title */}
          <h3 className="font-cinzel text-lg sm:text-2xl font-bold tracking-wide text-[#E2E8F0] group-hover:text-[#90CAF9] transition-colors leading-tight">
            {displayTitle}
          </h3>
        </div>

        {/* CINEMATIC THUMBNAIL ARTWORK (Cool Melancholic Filter) */}
        <div className="relative w-full h-44 xs:h-52 sm:h-64 rounded-xl overflow-hidden mb-3 sm:mb-4 bg-[#070d18] border border-[#1e3a5f]/50 shadow-inner group-hover:border-[#64B5F6]/60 transition-colors">
          <img
            src={displayImage}
            alt={displayTitle}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out brightness-[0.88] saturate-[0.85] contrast-[1.05]"
          />

          {/* Cool Moonlight Cinematic Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070e1a]/85 via-transparent to-[#1e3a8a]/10 pointer-events-none" />

          {/* Location badge over artwork */}
          <div
            className={`absolute bottom-2.5 ${
              !isLeftAlignOnDesktop ? 'right-2.5' : 'left-2.5'
            } px-2 py-0.5 rounded-lg bg-[#070f1e]/85 backdrop-blur-md border border-[#64B5F6]/30 text-[10px] font-cinzel text-[#90CAF9] flex items-center gap-1.5`}
          >
            <Compass className="w-3 h-3 text-[#64B5F6]" />
            <span>{displayLocation}</span>
          </div>

          {/* Unspoken / Sad Mood Tag Top */}
          <div
            className={`absolute top-2.5 ${
              !isLeftAlignOnDesktop ? 'left-2.5' : 'right-2.5'
            } px-2 py-0.5 rounded-full bg-[#0a1628]/90 backdrop-blur-md border border-[#64B5F6]/40 text-[9px] font-cinzel text-[#E0F2FE] tracking-widest uppercase flex items-center gap-1 shadow-md`}
          >
            <Sparkles className="w-2.5 h-2.5 text-[#64B5F6]" />
            <span>UNSPOKEN MEMORY</span>
          </div>
        </div>

        {/* SHORT MELANCHOLIC DESCRIPTION */}
        <p className="text-xs sm:text-sm leading-relaxed text-[#CFD8DC] font-sans font-light mb-2.5 line-clamp-2">
          {sadData.description}
        </p>

        {/* Poetic Quote Hook */}
        <p className="font-cormorant italic text-xs sm:text-sm text-[#90CAF9] mb-3 line-clamp-1">
          {sadData.caption}
        </p>

        {/* Explore Memory Action Prompt */}
        <div
          className={`pt-2.5 border-t border-[#1e3a5f]/40 flex items-center gap-1.5 min-h-[44px] text-xs font-cinzel font-bold text-[#64B5F6] group-hover:text-[#E0F2FE] transition-colors ${
            !isLeftAlignOnDesktop ? 'md:justify-end' : 'md:justify-start'
          }`}
        >
          <span className="tracking-widest uppercase">Read Melancholic Memory</span>
          {!isLeftAlignOnDesktop ? (
            <ArrowRight className="w-3.5 h-3.5 text-[#64B5F6] group-hover:-translate-x-1 transition-transform md:hidden" />
          ) : null}
          <ArrowRight className="w-3.5 h-3.5 text-[#64B5F6] group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};
