import React from 'react';
import { triggerEasterEggDiscovery } from '../utils/easterEggs';

// Delicate horizontal header flourish with centered rose and leaf tendrils
export const RoseHeaderFlourish: React.FC<{ className?: string }> = ({ className = "my-4" }) => {
  return (
    <div className={`flex items-center justify-center gap-3 select-none ${className}`}>
      {/* Left vine with delicate leaves */}
      <svg width="120" height="24" viewBox="0 0 120 24" fill="none" className="text-[#D8B46A] opacity-70 pointer-events-none">
        <path d="M0 12 H70 C80 12, 90 8, 100 12" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M40 12 Q48 4, 52 12" fill="currentColor" fillOpacity="0.4" />
        <path d="M75 12 Q82 6, 88 12" fill="currentColor" fillOpacity="0.4" />
        <circle cx="108" cy="12" r="2" fill="currentColor" />
        <circle cx="116" cy="12" r="1.5" fill="currentColor" />
      </svg>

      {/* Center Blooming Rose SVG (Hidden Discovery 3) */}
      <div
        className="relative text-[#E89AAF] hover:text-[#FFF4F1] hover:scale-110 transition-all cursor-pointer pointer-events-auto"
        onClick={() => triggerEasterEggDiscovery('rose')}
        title="A delicate pressed rose"
        role="button"
        aria-label="Pressed rose"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="filter drop-shadow-[0_0_8px_rgba(232,154,175,0.6)]">
          {/* Outer Petals */}
          <path d="M12 4C8.5 4 6 6.5 6 10C6 14.5 12 20 12 20C12 20 18 14.5 18 10C18 6.5 15.5 4 12 4Z" fill="#7A1838" fillOpacity="0.45" />
          <path d="M12 7C9.5 7 8 8.5 8 11C8 14 12 17.5 12 17.5C12 17.5 16 14 16 11C16 8.5 14.5 7 12 7Z" fill="#E89AAF" fillOpacity="0.3" />
          {/* Inner Rose Spiral */}
          <path d="M12 9C10.5 9 10 10 10 11.5C10 13 12 14.5 12 14.5C12 14.5 14 13 14 11.5C14 10 13.5 9 12 9Z" stroke="#D8B46A" strokeWidth="1.2" />
          <circle cx="12" cy="11.5" r="1" fill="#D8B46A" />
        </svg>
      </div>

      {/* Right vine with delicate leaves */}
      <svg width="120" height="24" viewBox="0 0 120 24" fill="none" className="text-[#D8B46A] opacity-70 scale-x-[-1] pointer-events-none">
        <path d="M0 12 H70 C80 12, 90 8, 100 12" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M40 12 Q48 4, 52 12" fill="currentColor" fillOpacity="0.4" />
        <path d="M75 12 Q82 6, 88 12" fill="currentColor" fillOpacity="0.4" />
        <circle cx="108" cy="12" r="2" fill="currentColor" />
        <circle cx="116" cy="12" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
};

// Corner accent for Memory Cards and Parchment panels
export const RoseCornerAccent: React.FC<{ position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'; className?: string }> = ({
  position = 'top-right',
  className = ""
}) => {
  const rotation = {
    'top-left': 'top-1.5 left-1.5',
    'top-right': 'top-1.5 right-1.5 scale-x-[-1]',
    'bottom-left': 'bottom-1.5 left-1.5 scale-y-[-1]',
    'bottom-right': 'bottom-1.5 right-1.5 scale-x-[-1] scale-y-[-1]',
  }[position];

  return (
    <div className={`absolute ${rotation} pointer-events-none select-none z-20 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" className="text-[#D8B46A] opacity-60">
        <path d="M2 18 C 2 8, 8 2, 18 2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M2 28 C 2 14, 14 2, 28 2" stroke="#E89AAF" strokeWidth="0.8" strokeDasharray="2 2" />
        {/* Tiny Rose Bud */}
        <circle cx="9" cy="9" r="3.5" fill="#7A1838" stroke="currentColor" strokeWidth="1" />
        <path d="M7.5 9 C 7.5 8, 10.5 8, 10.5 9 C 10.5 10, 8.5 10.5, 9 11" stroke="#E89AAF" strokeWidth="0.8" />
        <circle cx="9" cy="9" r="1" fill="#D8B46A" />
      </svg>
    </div>
  );
};

// Timeline separator crest
export const RoseTimelineSeparator: React.FC<{ title?: string; className?: string }> = ({ title, className = "my-10" }) => {
  return (
    <div className={`flex items-center justify-center gap-4 pointer-events-none select-none ${className}`}>
      <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent via-[#7A1838]/60 to-[#D8B46A]/60" />
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e0a20] border border-[#D8B46A]/40 shadow-[0_0_15px_rgba(216,180,106,0.2)]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E89AAF" strokeWidth="1.5">
          <path d="M12 4C8.5 4 6 6.5 6 10C6 14.5 12 20 12 20C12 20 18 14.5 18 10C18 6.5 15.5 4 12 4Z" fill="#7A1838" fillOpacity="0.4" />
          <circle cx="12" cy="10" r="2" fill="#D8B46A" />
        </svg>
        {title && (
          <span className="text-[10px] font-cinzel font-bold text-[#D8B46A] tracking-[0.2em] uppercase">
            {title}
          </span>
        )}
      </div>
      <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent via-[#7A1838]/60 to-[#D8B46A]/60" />
    </div>
  );
};

// Regal Botanical Rose Seal for Epilogue and Final Chapter
export const RoseFinalChapterSeal: React.FC<{ className?: string; interactive?: boolean }> = ({
  className = "",
  interactive = true,
}) => {
  return (
    <div
      onClick={interactive ? () => triggerEasterEggDiscovery('heart') : undefined}
      className={`relative flex items-center justify-center select-none ${
        interactive ? 'cursor-pointer hover:scale-105 transition-transform' : 'pointer-events-none'
      } ${className}`}
      title={interactive ? 'The final seal of the map' : undefined}
      role={interactive ? 'button' : undefined}
      aria-label={interactive ? 'Final seal heart' : undefined}
    >
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className="filter drop-shadow-[0_0_20px_rgba(216,180,106,0.5)]">
        {/* Wreath branches */}
        <circle cx="36" cy="36" r="32" stroke="#D8B46A" strokeWidth="1.2" strokeDasharray="3 3" />
        <circle cx="36" cy="36" r="26" stroke="#E89AAF" strokeWidth="0.8" opacity="0.6" />
        {/* Botanical leaves around ring */}
        <path d="M14 36 Q18 30, 24 36" stroke="#D8B46A" strokeWidth="1" fill="#D8B46A" fillOpacity="0.3" />
        <path d="M58 36 Q54 30, 48 36" stroke="#D8B46A" strokeWidth="1" fill="#D8B46A" fillOpacity="0.3" />
        <path d="M36 14 Q30 18, 36 24" stroke="#D8B46A" strokeWidth="1" fill="#D8B46A" fillOpacity="0.3" />
        <path d="M36 58 Q42 54, 36 48" stroke="#D8B46A" strokeWidth="1" fill="#D8B46A" fillOpacity="0.3" />
        {/* Center Grand Rose */}
        <circle cx="36" cy="36" r="14" fill="#5B1028" stroke="#D8B46A" strokeWidth="1.5" />
        <path d="M36 26 C30 26 26 30 26 35 C26 42 36 48 36 48 C36 48 46 42 46 35 C46 30 42 26 36 26 Z" fill="#7A1838" stroke="#E89AAF" strokeWidth="1.2" />
        <circle cx="36" cy="35" r="3" fill="#D8B46A" />
      </svg>
    </div>
  );
};
