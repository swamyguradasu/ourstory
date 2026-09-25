import React, { useState } from 'react';
import { Memory } from '../data/memories';
import { MapStoryIcon } from './MapStoryIcons';
import { Lock, Sparkles, Heart } from 'lucide-react';

interface MapNodeProps {
  memory: Memory;
  isSelected: boolean;
  isHovered: boolean;
  isLocked?: boolean;
  onSelect: (memory: Memory) => void;
  onHover: (memory: Memory | null) => void;
}

export const MapNode: React.FC<MapNodeProps> = ({
  memory,
  isSelected,
  isHovered,
  isLocked = false,
  onSelect,
  onHover,
}) => {
  const [thumbError, setThumbError] = useState(false);
  const levelFormatted = memory.level < 10 ? `0${memory.level}` : `${memory.level}`;
  const locationLabel = memory.mapLocationName || memory.title.toUpperCase();
  const iconType = memory.mapIcon || 'heart';

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(memory);
  };

  return (
    <div
      data-memory-node="true"
      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-30 transition-transform duration-300"
      style={{
        left: `${memory.coordinates.x}%`,
        top: `${memory.coordinates.y}%`,
      }}
      onClick={handleClick}
      onMouseEnter={() => onHover(memory)}
      onMouseLeave={() => onHover(null)}
      role="button"
      tabIndex={0}
      aria-label={`Open scene ${memory.level}: ${locationLabel}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(memory);
        }
      }}
    >
      {/* Floating upward heart when hovered */}
      {isHovered && !isLocked && (
        <div className="absolute -top-3 left-1/2 pointer-events-none animate-float-heart z-50">
          <Heart className="w-3.5 h-3.5 text-[#E89AAF] fill-[#E89AAF] drop-shadow-[0_0_8px_rgba(232,154,175,0.9)]" />
        </div>
      )}

      {/* Nearby sparkle dust particles on hover */}
      {isHovered && !isLocked && (
        <>
          <span className="absolute -top-3 -left-3 w-1.5 h-1.5 rounded-full bg-[#D8B46A] animate-ping pointer-events-none" />
          <span className="absolute -bottom-2 -right-3 w-1 h-1 rounded-full bg-[#E89AAF] animate-ping pointer-events-none delay-100" />
          <span className="absolute top-2 -right-4 w-1.5 h-1.5 rounded-full bg-[#FFF4F1] animate-pulse pointer-events-none" />
        </>
      )}

      {/* Outer Pulse Halo on Selected / Hovered */}
      {(isSelected || isHovered) && !isLocked && (
        <div
          className="absolute -inset-3 sm:-inset-4 rounded-full pointer-events-none animate-soft-halo opacity-60"
          style={{
            background: `radial-gradient(circle, ${memory.colorAccent || '#E89AAF'}40 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Main Node Emblem */}
      <div
        className={`relative w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center transition-all duration-300 ${
          isLocked
            ? 'bg-[#180a19]/90 border border-[#7A1838]/40 opacity-60 shadow-none'
            : isSelected
            ? 'scale-[1.12] bg-gradient-to-br from-[#7A1838] via-[#5B1028] to-[#241025] border-2 border-[#D8B46A] shadow-[0_0_25px_rgba(216,180,106,0.9),inset_0_0_12px_rgba(216,180,106,0.4)]'
            : isHovered
            ? 'scale-[1.08] bg-gradient-to-br from-[#5B1028] via-[#3A0718] to-[#241025] border-2 border-[#E89AAF] shadow-[0_0_20px_rgba(232,154,175,0.8),inset_0_0_8px_rgba(232,154,175,0.4)]'
            : 'scale-100 bg-[#241025]/95 border border-[#D8B46A]/50 hover:border-[#D8B46A] shadow-[0_4px_16px_rgba(0,0,0,0.8)]'
        }`}
      >
        {/* Parchment ring border accent */}
        <div className="absolute inset-0.5 rounded-full border border-dashed border-[#D8B46A]/30 pointer-events-none" />

        {/* Level badge circle on top right */}
        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#120812] border border-[#D8B46A]/80 flex items-center justify-center text-[9px] font-cinzel font-bold text-[#D8B46A] shadow">
          {levelFormatted}
        </div>

        {/* Center Storybook Icon */}
        <div className="relative z-10 flex flex-col items-center justify-center text-[#FFF4F1] group-hover:text-[#D8B46A] transition-colors">
          {isLocked ? (
            <Lock className="w-4 h-4 text-[#E89AAF]/60" />
          ) : (
            <MapStoryIcon
              type={iconType}
              className={`w-5 h-5 sm:w-5.5 sm:h-5.5 ${
                isSelected ? 'text-[#D8B46A]' : isHovered ? 'text-[#E89AAF]' : 'text-[#D8B46A]'
              }`}
              size={20}
            />
          )}
        </div>
      </div>

      {/* Hand-drawn storybook waypoint label underneath */}
      <div className="mt-2 text-center whitespace-nowrap pointer-events-none select-none max-w-[130px] mx-auto">
        <span
          className={`block text-[10px] sm:text-[11px] font-cinzel font-bold tracking-wider leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] ${
            isLocked
              ? 'text-[#F7D7DF]/50'
              : isSelected
              ? 'text-[#D8B46A]'
              : isHovered
              ? 'text-[#FFF4F1]'
              : 'text-[#F7D7DF]'
          }`}
        >
          {locationLabel}
        </span>
        <span className="block text-[8px] sm:text-[9px] font-cormorant italic text-[#E89AAF]/80 tracking-wide mt-0.5">
          {memory.date}
        </span>
      </div>

      {/* Floating Hover Tooltip Card */}
      {isHovered && (
        <div
          className={`absolute left-1/2 -translate-x-1/2 pointer-events-none z-50 w-64 sm:w-72 bg-[#1b0a1d]/98 border border-[#D8B46A]/70 rounded-2xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_20px_rgba(122,24,56,0.5)] backdrop-blur-xl animate-fadeIn ${
            memory.coordinates.y > 55 ? 'bottom-full mb-3' : 'top-full mt-3'
          }`}
        >
          {/* Subtle top indicator arrow */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1b0a1d] border-[#D8B46A]/70 rotate-45 ${
              memory.coordinates.y > 55 ? '-bottom-1.5 border-r border-b' : '-top-1.5 border-l border-t'
            }`}
          />

          {/* Thumbnail preview */}
          <div className="relative w-full h-24 rounded-xl overflow-hidden mb-2 bg-[#120812] border border-[#7A1838]/50">
            {!thumbError ? (
              <img
                src={memory.image}
                alt={memory.title}
                onError={() => setThumbError(true)}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-gradient-to-br from-[#3A0718] via-[#241025] to-[#4B1D5A]">
                <Sparkles className="w-5 h-5 text-[#D8B46A] mb-1" />
                <span className="text-[10px] font-cinzel text-[#FFF4F1] font-bold line-clamp-1">
                  {memory.shortTitle}
                </span>
              </div>
            )}
            <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-[#120812]/85 border border-[#D8B46A]/40 text-[9px] font-cinzel font-bold text-[#D8B46A]">
              SCENE {levelFormatted}
            </div>
            <div className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded bg-[#7A1838]/85 text-[8px] font-cinzel text-[#FFF4F1]">
              {memory.categoryLabel}
            </div>
          </div>

          {/* Card Meta */}
          <div className="text-[9px] font-cinzel text-[#D8B46A] tracking-widest uppercase mb-0.5">
            LOCATION #{levelFormatted} · {memory.date}
          </div>
          <h4 className="font-cinzel text-xs sm:text-sm font-bold text-[#FFF4F1] leading-tight mb-1">
            {locationLabel}
          </h4>
          <p className="font-cormorant italic text-xs text-[#E89AAF] line-clamp-2 mb-2 leading-relaxed">
            “{memory.shortTitle}”
          </p>

          <div className="pt-1.5 border-t border-[#7A1838]/40 flex items-center justify-between text-[9px] text-[#FFF4F1]/70">
            <span className="truncate max-w-[150px]">{memory.location}</span>
            <span className="text-[#D8B46A] font-cinzel font-bold flex items-center gap-1">
              Click to Open
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
