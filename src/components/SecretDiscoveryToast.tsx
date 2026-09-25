import React, { useState, useEffect } from 'react';
import { SecretDiscovery } from '../utils/easterEggs';
import { Sparkles, X, Heart, Compass, Check } from 'lucide-react';
import { triggerRomanticHearts } from './RomanticParticleSystem';

export const SecretDiscoveryToast: React.FC = () => {
  const [activeDiscovery, setActiveDiscovery] = useState<{
    discovery: SecretDiscovery;
    isNew: boolean;
    totalDiscovered: number;
  } | null>(null);

  useEffect(() => {
    const handleDiscovered = (e: Event) => {
      const customEvent = e as CustomEvent<{
        discovery: SecretDiscovery;
        isNew: boolean;
        totalDiscovered: number;
      }>;

      if (customEvent.detail) {
        setActiveDiscovery(customEvent.detail);
        triggerRomanticHearts(window.innerWidth / 2, 100);
      }
    };

    window.addEventListener('secret-egg-discovered', handleDiscovered);
    return () => {
      window.removeEventListener('secret-egg-discovered', handleDiscovered);
    };
  }, []);

  // Auto-dismiss after 7 seconds
  useEffect(() => {
    if (!activeDiscovery) return;
    const timer = setTimeout(() => {
      setActiveDiscovery(null);
    }, 7000);
    return () => clearTimeout(timer);
  }, [activeDiscovery]);

  if (!activeDiscovery) return null;

  return (
    <div
      className="fixed top-20 left-1/2 -translate-x-1/2 z-[9990] w-11/12 max-w-md pointer-events-auto select-none animate-fade-in"
      role="status"
      aria-live="polite"
    >
      <div className="relative rounded-2xl bg-gradient-to-br from-[#1d0620]/95 via-[#160419]/95 to-[#0e0211]/98 border border-[#D8B46A]/60 p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(216,180,106,0.3)] backdrop-blur-xl">
        {/* Soft corner accents */}
        <div className="absolute top-2 left-2 text-[#D8B46A]/40 text-[9px] font-mono pointer-events-none">
          ✦
        </div>
        <div className="absolute top-2 right-8 text-[#D8B46A]/40 text-[9px] font-mono pointer-events-none">
          ✦
        </div>

        {/* Dismiss Button */}
        <button
          onClick={() => setActiveDiscovery(null)}
          className="absolute top-2.5 right-2.5 p-1 rounded-full text-[#E89AAF]/70 hover:text-[#FFF4F1] hover:bg-[#7A1838]/40 transition-colors"
          aria-label="Dismiss discovery"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded-full bg-[#7A1838]/60 border border-[#D8B46A]/50 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-[#D8B46A] animate-pulse" />
          </div>
          <span className="font-cinzel text-[11px] font-bold tracking-[0.2em] text-[#D8B46A] uppercase">
            {activeDiscovery.isNew ? 'Hidden Memory Discovered' : 'Secret Memory Unveiled'}
          </span>
        </div>

        {/* The Poetic UI Message */}
        <p className="font-cormorant italic text-lg sm:text-xl text-[#FFF4F1] font-medium leading-relaxed my-2 pl-1 border-l-2 border-[#D8B46A]/50">
          “{activeDiscovery.discovery.message}”
        </p>

        {/* Footer Counter */}
        <div className="flex items-center justify-between pt-2 border-t border-[#7A1838]/40 text-xs mt-3">
          <div className="font-cinzel text-[10px] text-[#E89AAF] tracking-wider uppercase">
            {activeDiscovery.discovery.title}
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#120414] border border-[#D8B46A]/40 font-cinzel text-[10px] text-[#D8B46A] font-bold">
            <Heart className="w-2.5 h-2.5 fill-current text-[#E89AAF]" />
            <span>SECRET MEMORIES: {activeDiscovery.totalDiscovered} / 7</span>
          </div>
        </div>
      </div>
    </div>
  );
};
