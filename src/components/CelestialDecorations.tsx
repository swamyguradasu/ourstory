import React from 'react';

// Delicate Moonlight Corner Filigree for Sad Cards
export const MoonCornerAccent: React.FC<{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position = 'top-right', className = '' }) => {
  const getRotationClass = () => {
    switch (position) {
      case 'top-left':
        return 'top-0 left-0 -scale-x-100';
      case 'top-right':
        return 'top-0 right-0';
      case 'bottom-left':
        return 'bottom-0 left-0 rotate-180';
      case 'bottom-right':
        return 'bottom-0 right-0 -scale-y-100';
      default:
        return 'top-0 right-0';
    }
  };

  return (
    <div
      className={`absolute pointer-events-none w-16 h-16 sm:w-20 sm:h-20 ${getRotationClass()} ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full opacity-60">
        {/* Outer Corner Frame */}
        <path
          d="M10 2 C 50 2, 98 50, 98 90"
          stroke="#64B5F6"
          strokeWidth="1.2"
          strokeOpacity="0.45"
          fill="none"
        />
        <path
          d="M20 2 C 55 2, 98 55, 98 80"
          stroke="#90CAF9"
          strokeWidth="0.8"
          strokeOpacity="0.3"
          strokeDasharray="2 2"
          fill="none"
        />

        {/* Crescent Moon Silhouette */}
        <path
          d="M82 18 C 76 18, 70 24, 70 30 C 70 36, 76 42, 82 42 C 78 39, 76 35, 76 30 C 76 25, 78 21, 82 18 Z"
          fill="#64B5F6"
          fillOpacity="0.75"
        />

        {/* Tiny Starlight Sparkles */}
        <circle cx="88" cy="12" r="1.5" fill="#E0F2FE" />
        <circle cx="62" cy="24" r="1" fill="#90CAF9" fillOpacity="0.8" />
        <circle cx="85" cy="52" r="1.2" fill="#64B5F6" fillOpacity="0.6" />
        <circle cx="50" cy="14" r="0.8" fill="#90CAF9" fillOpacity="0.5" />

        {/* 4-Point Starlight */}
        <path
          d="M72 12 Q 72 16 76 16 Q 72 16 72 20 Q 72 16 68 16 Q 72 16 72 12 Z"
          fill="#E0F2FE"
          fillOpacity="0.8"
        />
      </svg>
    </div>
  );
};

// Delicate Tiny Moon Waypoint Node SVG for the Blue Timeline Line
export const TinyMoonNode: React.FC<{
  level: number;
  isSelected?: boolean;
  isHovered?: boolean;
}> = ({ level, isSelected, isHovered }) => {
  const levelFormatted = level < 10 ? `0${level}` : `${level}`;

  return (
    <div
      className={`relative w-8 h-8 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-500 z-20 ${
        isSelected || isHovered
          ? 'scale-125 bg-gradient-to-br from-[#1e3a8a] via-[#0f2744] to-[#071322] border-2 border-[#64B5F6] shadow-[0_0_25px_rgba(100,181,246,0.9),0_0_15px_rgba(144,202,249,0.7)]'
          : 'bg-[#0a1526] border-2 border-[#64B5F6]/60 hover:border-[#64B5F6] shadow-[0_0_15px_rgba(0,0,0,0.8)]'
      }`}
    >
      {/* Outer subtle pulse */}
      {(isHovered || isSelected) && (
        <span className="absolute -inset-2 rounded-full bg-[#64B5F6]/30 animate-ping pointer-events-none" />
      )}

      {/* Tiny Moon Silhouette SVG */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className={`transition-colors duration-300 ${
          isHovered || isSelected ? 'text-[#E0F2FE]' : 'text-[#90CAF9]'
        }`}
      >
        {/* Crescent moon path */}
        <path
          d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
          fill="#1e3a8a"
          fillOpacity="0.6"
          stroke="#64B5F6"
          strokeWidth="1.5"
        />
        {/* Tiny star */}
        <circle cx="17" cy="7" r="1.2" fill="#E0F2FE" />
      </svg>

      {/* Level number floating badge */}
      <span className="absolute -bottom-2 -right-1 px-1.5 py-0.2 rounded-full bg-[#070f1e] border border-[#64B5F6]/80 text-[8px] font-cinzel font-bold text-[#64B5F6] shadow">
        {levelFormatted}
      </span>
    </div>
  );
};
