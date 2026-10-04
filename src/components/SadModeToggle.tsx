import React from 'react';
import { Moon } from 'lucide-react';
import { useSadMode } from '../context/SadModeContext';

export const SadModeToggle: React.FC = () => {
  const { isSadMode, toggleSadMode } = useSadMode();

  return (
    <button
      onClick={toggleSadMode}
      className={`relative group flex items-center gap-2.5 pl-3 pr-3.5 sm:pr-4 py-2 rounded-full border transition-all duration-300 shadow-xl cursor-pointer select-none ${
        isSadMode
          ? 'bg-gradient-to-r from-[#0d1f35]/95 to-[#1c081e]/95 border-[#64B5F6] shadow-[0_0_22px_rgba(100,181,246,0.45),0_0_12px_rgba(30,58,138,0.5)] scale-105'
          : 'bg-[#1c081e]/90 hover:bg-[#250a22] border-[#7A1838]/60 hover:border-[#64B5F6]/60 text-[#E89AAF] hover:text-[#FFF4F1]'
      }`}
      aria-label={isSadMode ? 'Disable Sad Mode' : 'Enable Sad Mode'}
      aria-pressed={isSadMode}
      title={
        isSadMode
          ? 'Sad Mode is ON — Showing the unspoken emotional layer'
          : 'Sad Mode is OFF — Click to reveal melancholic memories'
      }
    >
      {/* Icon Circle */}
      <div
        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
          isSadMode
            ? 'bg-[#102a4e] border border-[#64B5F6] text-[#E0F2FE] shadow-[0_0_10px_rgba(100,181,246,0.6)]'
            : 'bg-[#140614] border border-[#7A1838]/40 text-[#90CAF9]'
        }`}
      >
        <Moon
          className={`w-3.5 h-3.5 transition-transform duration-500 ${
            isSadMode ? 'text-[#64B5F6] -rotate-12 scale-110' : 'text-[#90CAF9]'
          }`}
        />
      </div>

      {/* STATE TEXT: "SAD MODE ON" or "SAD MODE OFF" */}
      <div className="flex flex-col items-start leading-tight">
        <span
          className={`font-cinzel text-[10px] sm:text-[11px] font-bold tracking-wider ${
            isSadMode ? 'text-[#64B5F6]' : 'text-[#E89AAF]'
          }`}
        >
          {isSadMode ? 'SAD MODE ON' : 'SAD MODE OFF'}
        </span>

        {/* SUBTLE INDICATOR WHEN SAD MODE IS ON */}
        {isSadMode ? (
          <div className="flex items-center gap-1 mt-0.5" aria-hidden="true">
            <span className="w-1.5 h-1.5 rounded-full bg-[#64B5F6] animate-pulse" />
            <span className="text-[9px] font-cormorant italic text-[#90CAF9] tracking-wide">
              Melancholy layer
            </span>
          </div>
        ) : (
          <span className="text-[9px] font-cormorant italic text-[#E89AAF]/60">
            Unspoken chapters
          </span>
        )}
      </div>
    </button>
  );
};
