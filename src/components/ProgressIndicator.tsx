import React, { useState, useEffect } from 'react';
import {
  getDiscoveredMemoryIds,
  TOTAL_MEMORIES,
  resetJourneyProgress,
  unlockAllJourneyProgress,
} from '../utils/journeyProgress';
import { MEMORIES, Memory } from '../data/memories';
import { Heart, Sparkles, Check, ChevronUp, ChevronDown, RotateCcw, Compass, MapPin } from 'lucide-react';
import { triggerRomanticHearts } from './RomanticParticleSystem';

interface ProgressIndicatorProps {
  currentTab: string;
  onSelectMemory?: (memory: Memory) => void;
  onNavigateTab?: (tab: 'home' | 'map' | 'story' | 'thirtythree' | 'distance' | 'memories' | 'vault') => void;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  onSelectMemory,
  onNavigateTab,
}) => {
  const [discoveredIds, setDiscoveredIds] = useState<string[]>(() => getDiscoveredMemoryIds());
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [justCompleted, setJustCompleted] = useState<boolean>(false);

  useEffect(() => {
    const handleProgressUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{
        discoveredIds: string[];
        totalCount: number;
        isComplete: boolean;
        isNew: boolean;
      }>;
      if (customEvent.detail) {
        setDiscoveredIds(customEvent.detail.discoveredIds);
        if (customEvent.detail.isComplete && customEvent.detail.isNew) {
          setJustCompleted(true);
          triggerRomanticHearts(window.innerWidth / 2, window.innerHeight / 2);
        }
      }
    };

    window.addEventListener('journey-progress-updated', handleProgressUpdate);
    return () => window.removeEventListener('journey-progress-updated', handleProgressUpdate);
  }, []);

  const total = TOTAL_MEMORIES; // 25
  const count = Math.min(discoveredIds.length, total);
  const percentage = Math.round((count / total) * 100);
  const isComplete = count >= total;

  // SVG Circular progress math
  const radius = 17;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <>
      {/* ============================================================== */}
      {/* FLOATING GLOBAL PROGRESS PILL (Fixed at bottom-left)            */}
      {/* ============================================================== */}
      <div
        className="fixed bottom-4 left-4 z-40 select-none pointer-events-auto"
        role="region"
        aria-label="Journey Progress"
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full backdrop-blur-xl transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.85)] border cursor-pointer group ${
            isComplete
              ? 'bg-gradient-to-r from-[#20071c]/95 via-[#340b20]/95 to-[#1c0618]/95 border-[#D8B46A] shadow-[0_0_25px_rgba(216,180,106,0.35)]'
              : 'bg-[#140616]/90 hover:bg-[#1f0922] border-[#D8B46A]/40 hover:border-[#D8B46A]'
          }`}
          title="Click to view all discovered memories in this chapter"
          aria-expanded={isExpanded}
        >
          {/* 1. Subtle Circular Progress Indicator */}
          <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
            <svg className="w-10 h-10 -rotate-90 transform" viewBox="0 0 42 42">
              {/* Background Track Circle */}
              <circle
                cx="21"
                cy="21"
                r={radius}
                className="stroke-[#7A1838]/40"
                strokeWidth="2.5"
                fill="none"
              />
              {/* Foreground Animated Progress Circle */}
              <circle
                cx="21"
                cy="21"
                r={radius}
                stroke={isComplete ? '#D8B46A' : '#E89AAF'}
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                fill="none"
                className="transition-all duration-700 ease-out filter drop-shadow-[0_0_4px_rgba(216,180,106,0.8)]"
              />
            </svg>

            {/* Centered Indicator Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              {isComplete ? (
                <Sparkles className="w-3.5 h-3.5 text-[#D8B46A] animate-pulse" />
              ) : (
                <span className="font-mono text-[10px] font-bold text-[#FFF4F1]">
                  {count}
                </span>
              )}
            </div>
          </div>

          {/* 2. Text Stack */}
          <div className="text-left leading-tight">
            {/* Top Line: 25 MEMORIES · ONE STORY (or THE MAP IS COMPLETE when 25/25) */}
            <div className="flex items-center gap-1.5 font-cinzel text-[10px] font-bold tracking-[0.18em] text-[#D8B46A] uppercase">
              {isComplete ? (
                <span className="text-[#FFF4F1] flex items-center gap-1">
                  ✦ THE MAP IS COMPLETE ✦
                </span>
              ) : (
                <>
                  <span>25 MEMORIES</span>
                  <span className="text-[#7A1838]">·</span>
                  <span>ONE STORY</span>
                </>
              )}
            </div>

            {/* Bottom Line: MEMORIES DISCOVERED X / 25 */}
            <div className="font-cormorant text-xs sm:text-sm text-[#F7D7DF] font-medium tracking-wide flex items-center gap-1.5">
              {isComplete ? (
                <span className="italic text-[#E89AAF] text-xs">
                  Every memory in this chapter has been discovered.
                </span>
              ) : (
                <>
                  <span className="uppercase font-cinzel text-[10px] text-[#E89AAF]/90 tracking-wider">
                    MEMORIES DISCOVERED
                  </span>
                  <span className="font-mono text-xs font-bold text-[#FFF4F1] bg-[#7A1838]/70 px-1.5 py-0.2 rounded">
                    {count} / {total}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* 3. Subtle expand toggle chevron */}
          <div className="text-[#E89AAF] group-hover:text-[#FFF4F1] transition-transform ml-1">
            {isExpanded ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5" />
            )}
          </div>
        </button>

        {/* ============================================================== */}
        {/* EXPANDED JOURNEY COMPENDIUM DRAWER                             */}
        {/* ============================================================== */}
        {isExpanded && (
          <div className="absolute bottom-14 left-0 w-80 sm:w-96 rounded-2xl bg-[#140616]/95 border border-[#D8B46A]/60 shadow-[0_20px_50px_rgba(0,0,0,0.95)] backdrop-blur-2xl p-4 text-[#FFF4F1] animate-fade-in z-50">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#7A1838]/50 pb-2.5 mb-3">
              <div>
                <div className="font-cinzel text-xs font-bold tracking-[0.2em] text-[#D8B46A] uppercase flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#D8B46A]" />
                  <span>The Sacred Odyssey</span>
                </div>
                <div className="font-cormorant italic text-xs text-[#E89AAF]">
                  {isComplete
                    ? 'Every memory in this chapter has been discovered.'
                    : `${count} of ${total} memories opened across our map`}
                </div>
              </div>

              <div className="text-right">
                <span className="font-mono text-xs font-bold text-[#D8B46A]">
                  {percentage}%
                </span>
              </div>
            </div>

            {/* Quick 25-Node Grid of All Memories */}
            <div className="mb-3">
              <div className="text-[10px] font-cinzel font-bold text-[#E89AAF] uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>The 25 Chapters</span>
                <span className="font-normal text-[9px] lowercase italic text-[#FFF4F1]/60">
                  click any to view
                </span>
              </div>

              <div className="grid grid-cols-5 gap-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                {MEMORIES.map((m) => {
                  const isOpened = discoveredIds.includes(m.id);
                  return (
                    <button
                      key={m.id}
                      onClick={() => {
                        if (onSelectMemory) onSelectMemory(m);
                        setIsExpanded(false);
                      }}
                      className={`p-1.5 rounded-lg text-center border transition-all text-xs font-mono cursor-pointer ${
                        isOpened
                          ? 'bg-[#7A1838]/40 border-[#D8B46A]/50 text-[#FFF4F1] hover:bg-[#7A1838]/70 hover:border-[#D8B46A]'
                          : 'bg-[#120514]/60 border-[#7A1838]/20 text-[#E89AAF]/40 hover:text-[#FFF4F1] hover:border-[#E89AAF]/50'
                      }`}
                      title={`Scene ${m.level}: ${m.title} (${isOpened ? 'Discovered' : 'Not yet opened'})`}
                    >
                      <div className="flex items-center justify-center gap-0.5">
                        <span>{m.level < 10 ? `0${m.level}` : m.level}</span>
                        {isOpened && (
                          <span className="w-1 h-1 rounded-full bg-[#D8B46A]" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer Actions: Map link + Reset / Preview */}
            <div className="pt-2 border-t border-[#7A1838]/40 flex items-center justify-between text-[11px] font-cinzel">
              {onNavigateTab && (
                <button
                  onClick={() => {
                    onNavigateTab('map');
                    setIsExpanded(false);
                  }}
                  className="text-[#D8B46A] hover:text-[#FFF4F1] underline transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <MapPin className="w-3 h-3" />
                  <span>Open Story Map</span>
                </button>
              )}

              <div className="flex items-center gap-2">
                {isComplete ? (
                  <button
                    onClick={() => resetJourneyProgress()}
                    className="text-[#E89AAF]/70 hover:text-[#FFF4F1] text-[10px] transition-colors cursor-pointer"
                    title="Reset progress to explore anew"
                  >
                    Reset
                  </button>
                ) : (
                  <button
                    onClick={() => unlockAllJourneyProgress()}
                    className="text-[#D8B46A]/80 hover:text-[#FFF4F1] text-[10px] underline transition-colors cursor-pointer"
                    title="Discover all 25 memories for demonstration"
                  >
                    Discover All (25/25)
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
