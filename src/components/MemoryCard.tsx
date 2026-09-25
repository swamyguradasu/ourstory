import React, { useState } from 'react';
import { Memory } from '../data/memories';
import { Calendar, MapPin, Sparkles, BookOpen, Music, Heart, ArrowUpRight } from 'lucide-react';
import { RoseCornerAccent } from './FlowerDecorations';
import { triggerRomanticHearts } from './RomanticParticleSystem';

interface MemoryCardProps {
  memory: Memory;
  onSelect: (memory: Memory) => void;
  index: number;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({ memory, onSelect, index }) => {
  const [imageError, setImageError] = useState(false);

  // Alternate tilt for natural scrapbook feel
  const tilts = ['rotate-1', '-rotate-1', 'rotate-0', '-rotate-1.5', 'rotate-1.5'];
  const tiltClass = tilts[index % tilts.length];
  const levelFormatted = memory.level < 10 ? `0${memory.level}` : `${memory.level}`;

  const handleClick = (e: React.MouseEvent) => {
    triggerRomanticHearts(e.clientX, e.clientY);
    onSelect(memory);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={(e) => {
        if (Math.random() > 0.6) {
          triggerRomanticHearts(e.clientX, e.clientY);
        }
      }}
      className={`relative group bg-[#1d0b20]/95 hover:bg-[#270e2b] border border-[#7A1838]/40 hover:border-[#D8B46A]/85 rounded-2xl p-4 sm:p-5 transition-all duration-500 shadow-[0_15px_35px_rgba(0,0,0,0.8)] hover:shadow-[0_25px_55px_rgba(0,0,0,0.95),0_0_25px_rgba(216,180,106,0.35)] cursor-pointer flex flex-col justify-between ${tiltClass} hover:rotate-0 hover:-translate-y-1`}
    >
      {/* Tiny decorative rose appearing on hover */}
      <RoseCornerAccent position="top-right" className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Decorative Washi Tape Graphic */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#D8B46A]/25 backdrop-blur-sm border-t border-b border-[#D8B46A]/40 -rotate-1 group-hover:rotate-0 transition-transform pointer-events-none z-20" />

      <div>
        {/* Top Header metadata */}
        <div className="flex items-center justify-between text-[11px] mb-2.5">
          <span className="font-cinzel font-bold text-[#D8B46A] tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D8B46A]" />
            SCENE {levelFormatted}
          </span>
          <span className="text-[#E89AAF] font-medium tracking-wide">
            {memory.date}
          </span>
        </div>

        {/* Cinematic Artwork Container */}
        <div className="w-full h-48 sm:h-52 rounded-xl bg-[#140715] border border-[#7A1838]/40 relative overflow-hidden mb-3.5 group-hover:border-[#D8B46A]/60 transition-colors shadow-inner">
          {!imageError ? (
            <img
              src={memory.image}
              alt={`${memory.title} - ${memory.shortTitle}`}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#3A0718] via-[#241025] to-[#4B1D5A]">
              <Sparkles className="w-8 h-8 text-[#D8B46A] mb-2 opacity-80" />
              <div className="font-cinzel text-xs font-bold text-[#FFF4F1] tracking-wider">
                {memory.title}
              </div>
              <div className="font-cormorant italic text-xs text-[#E89AAF] mt-1">
                {memory.location}
              </div>
            </div>
          )}

          {/* Vignette Overlay & Category Stamp */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#120812]/90 via-transparent to-transparent pointer-events-none" />

          {/* Level Badge Overlay */}
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#120812]/85 backdrop-blur-md border border-[#D8B46A]/40 text-[10px] font-cinzel font-bold text-[#D8B46A] shadow">
            {levelFormatted}
          </div>

          {/* Location Badge Overlay */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] text-[#FFF4F1]/90">
            <span className="flex items-center gap-1 font-sans truncate max-w-[70%]">
              <MapPin className="w-3 h-3 text-[#D8B46A] shrink-0" />
              <span className="truncate">{memory.location}</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-[#7A1838]/85 text-[#FFF4F1] text-[9px] font-cinzel shrink-0">
              {memory.categoryLabel}
            </span>
          </div>
        </div>

        {/* Title & Short Title */}
        <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#FFF4F1] group-hover:text-[#D8B46A] transition-colors leading-snug mb-1">
          {memory.title}
        </h3>

        <div className="text-xs text-[#D8B46A] font-cormorant italic font-medium mb-2.5">
          {memory.shortTitle}
        </div>

        {/* Poetic Caption */}
        <p className="font-cormorant italic text-sm text-[#F7D7DF]/90 line-clamp-2 mb-3 leading-relaxed">
          {memory.caption}
        </p>

        {/* Handwritten Note Strip */}
        <div className="p-2.5 rounded-lg bg-[#180a19] border border-[#7A1838]/30 mb-3">
          <p className="font-handwriting text-lg text-[#F7D7DF] line-clamp-2 leading-snug">
            “{memory.handwrittenNote}”
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="pt-2.5 border-t border-[#7A1838]/30 flex items-center justify-between text-xs text-[#E89AAF]">
        <span className="text-[11px] font-cinzel text-[#FFF4F1]/70">
          {memory.chapter}
        </span>
        <span className="font-cinzel text-[11px] text-[#D8B46A] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-semibold">
          Open Scene <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};
