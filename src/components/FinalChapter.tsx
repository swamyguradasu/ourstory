import React, { useState, useEffect } from 'react';
import { TIMELINE_STATS, MEMORIES } from '../data/memories';
import { Sparkles, Heart, Compass, Star, ArrowRight, Play, Lock, Unlock, CheckCircle } from 'lucide-react';
import { RoseFinalChapterSeal, RoseHeaderFlourish } from './FlowerDecorations';
import { RomanticButton } from './RomanticButton';
import { FinalStoryExperience } from './FinalStoryExperience';
import { getDiscoveredMemoryIds, TOTAL_MEMORIES, unlockAllJourneyProgress } from '../utils/journeyProgress';
import confetti from 'canvas-confetti';

interface FinalChapterProps {
  onExploreMap: () => void;
  onOpenVault: () => void;
}

export const FinalChapter: React.FC<FinalChapterProps> = ({ onExploreMap, onOpenVault }) => {
  const [pledged, setPledged] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [showFullFinalExperience, setShowFullFinalExperience] = useState(false);
  const [discoveredIds, setDiscoveredIds] = useState<string[]>(() => getDiscoveredMemoryIds());

  const masterwork = MEMORIES[MEMORIES.length - 1]; // Scene 25: Our Story

  // Track discovered memories reactively from window events and localStorage
  useEffect(() => {
    const handleProgressUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ discoveredIds: string[] }>;
      if (customEvent.detail?.discoveredIds) {
        setDiscoveredIds(customEvent.detail.discoveredIds);
      } else {
        setDiscoveredIds(getDiscoveredMemoryIds());
      }
    };

    window.addEventListener('journey-progress-updated', handleProgressUpdate);
    return () => window.removeEventListener('journey-progress-updated', handleProgressUpdate);
  }, []);

  const count = Math.min(discoveredIds.length, TOTAL_MEMORIES);
  const isComplete = count >= TOTAL_MEMORIES;
  const progressPercent = Math.round((count / TOTAL_MEMORIES) * 100);

  // SVG Circular progress math for the section
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  const handlePledge = () => {
    setPledged(true);
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#D8B46A', '#E89AAF', '#F7D7DF', '#7A1838'],
      });
    } catch {
      // ignore
    }
  };

  const handleLaunchExperience = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D8B46A', '#E89AAF', '#7A1838'],
      });
    } catch {
      // ignore
    }
    setShowFullFinalExperience(true);
  };

  // If active in full experience mode, display the cinematic sequence
  if (showFullFinalExperience) {
    return (
      <section className="relative w-full bg-[#08020a] border-t border-[#7A1838]/40">
        <FinalStoryExperience
          onBackToMap={() => {
            setShowFullFinalExperience(false);
            onExploreMap();
          }}
          onExploreAgain={() => {
            // Can replay sequence
          }}
        />
      </section>
    );
  }

  return (
    <section className={`relative w-full py-24 px-4 sm:px-6 lg:px-8 border-t border-[#7A1838]/40 overflow-hidden transition-all duration-1000 ${
      isComplete
        ? 'bg-gradient-to-b from-[#180720] via-[#3d0e26] to-[#5b1532]'
        : 'bg-gradient-to-b from-[#100618] via-[#360f22] to-[#501a2f]'
    }`}>
      {/* Background glow and subtle vignette - intensified when complete */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[170px] pointer-events-none transition-all duration-1000 ${
        isComplete
          ? 'w-[950px] h-[650px] bg-gradient-to-r from-[#D8B46A]/25 via-[#E89AAF]/25 to-[#7A1838]/35'
          : 'w-[850px] h-[550px] bg-gradient-to-r from-[#5B1028]/35 via-[#7A1838]/25 to-[#4B1D5A]/35'
      }`} />
      <div className="absolute inset-0 film-grain pointer-events-none opacity-30" />
      <div className="absolute inset-0 cinematic-vignette pointer-events-none opacity-50" />

      <div className="max-w-4xl mx-auto text-center relative z-20 space-y-8">
        {/* Regal Botanical Rose Seal with enhanced halo when completed */}
        <div className="relative inline-block">
          {isComplete && (
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#D8B46A]/40 to-[#E89AAF]/40 blur-xl animate-pulse pointer-events-none" />
          )}
          <RoseFinalChapterSeal className="mb-2 relative z-10" />
        </div>

        {/* Milestone Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D8B46A]/40 bg-[#241025]/80 backdrop-blur-md">
          <Star className="w-3.5 h-3.5 text-[#D8B46A] fill-current" />
          <span className="text-xs font-semibold tracking-[0.25em] text-[#D8B46A] uppercase font-cinzel">
            The Two-Year Horizon · September 2024 — 2026
          </span>
        </div>

        {/* Decorative Blooming Rose Flourish */}
        <RoseHeaderFlourish />

        {/* ============================================================== */}
        {/* UNLOCKED VISUAL TREATMENT: "THE MAP IS COMPLETE"               */}
        {/* ============================================================== */}
        {isComplete ? (
          <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#250820]/95 via-[#350d24]/95 to-[#1c0617]/95 border-2 border-[#D8B46A] shadow-[0_0_40px_rgba(216,180,106,0.35),inset_0_0_25px_rgba(216,180,106,0.15)] text-center relative overflow-hidden animate-fade-in">
            {/* Shimmering corner accents */}
            <div className="absolute top-2 left-3 text-[#D8B46A]/60 text-xs font-mono pointer-events-none">✦</div>
            <div className="absolute top-2 right-3 text-[#D8B46A]/60 text-xs font-mono pointer-events-none">✦</div>
            <div className="absolute bottom-2 left-3 text-[#D8B46A]/60 text-xs font-mono pointer-events-none">✦</div>
            <div className="absolute bottom-2 right-3 text-[#D8B46A]/60 text-xs font-mono pointer-events-none">✦</div>

            {/* Subtle Circular Progress Indicator for 25 / 25 */}
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-12 h-12 -rotate-90 transform" viewBox="0 0 44 44">
                  <circle cx="22" cy="22" r={radius} className="stroke-[#7A1838]/50" strokeWidth="2.5" fill="none" />
                  <circle
                    cx="22"
                    cy="22"
                    r={radius}
                    stroke="#D8B46A"
                    strokeWidth="3"
                    strokeDasharray={circumference}
                    strokeDashoffset={0}
                    fill="none"
                    className="filter drop-shadow-[0_0_6px_rgba(216,180,106,0.9)]"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#D8B46A] animate-pulse" />
                </div>
              </div>
            </div>

            {/* Title: THE MAP IS COMPLETE */}
            <div className="inline-flex items-center gap-2 px-5 py-1 rounded-full bg-[#120514] border border-[#D8B46A] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#D8B46A]" />
              <h3 className="font-cinzel text-base sm:text-lg font-bold tracking-[0.25em] text-[#FFF4F1] uppercase">
                THE MAP IS COMPLETE
              </h3>
              <Sparkles className="w-3.5 h-3.5 text-[#D8B46A]" />
            </div>

            {/* Poetic Collection Message */}
            <p className="font-cormorant italic text-xl sm:text-2xl text-[#FFF4F1] font-medium leading-relaxed max-w-xl mx-auto my-2">
              “Every memory in this chapter has been discovered.”
            </p>

            <p className="font-cormorant text-sm sm:text-base text-[#F7D7DF]/90 max-w-lg mx-auto">
              All twenty-five moments on our parchment have been unlocked and remembered.
              Yet the true map does not end here—every tomorrow is waiting to be written.
            </p>

            {/* Enter Final Experience Button */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <RomanticButton
                onClick={handleLaunchExperience}
                variant="primary"
                size="md"
                icon={<Play className="w-4 h-4 fill-current text-[#D8B46A]" />}
                className="shadow-[0_0_25px_rgba(216,180,106,0.5)]"
              >
                PLAY UNLOCKED FINAL ODYSSEY
              </RomanticButton>
            </div>
          </div>
        ) : (
          /* JOURNEY IN PROGRESS BANNER (< 25) */
          <div className="max-w-xl mx-auto p-5 rounded-2xl bg-[#140616]/90 border border-[#D8B46A]/50 shadow-[0_0_25px_rgba(216,180,106,0.2)] flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4 text-left">
              {/* Circular Progress SVG */}
              <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                <svg className="w-12 h-12 -rotate-90 transform" viewBox="0 0 44 44">
                  <circle cx="22" cy="22" r={radius} className="stroke-[#7A1838]/40" strokeWidth="2.5" fill="none" />
                  <circle
                    cx="22"
                    cy="22"
                    r={radius}
                    stroke="#E89AAF"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    fill="none"
                    className="transition-all duration-700 filter drop-shadow-[0_0_4px_rgba(232,154,175,0.7)]"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-xs font-bold text-[#FFF4F1]">
                    {count}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-cinzel font-bold text-[#D8B46A] tracking-wider uppercase">
                  <span>MEMORIES DISCOVERED</span>
                  <span className="font-mono bg-[#7A1838]/80 text-[#FFF4F1] px-2 py-0.5 rounded-full text-[11px]">
                    {count} / {TOTAL_MEMORIES}
                  </span>
                </div>
                <p className="text-xs text-[#E89AAF] font-cormorant italic mt-0.5">
                  Open and explore all 25 memories across the map to unveil the completed seal.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <RomanticButton
                onClick={onExploreMap}
                variant="secondary"
                size="sm"
                icon={<Compass className="w-3.5 h-3.5" />}
              >
                OPEN MAP
              </RomanticButton>
              <button
                onClick={() => unlockAllJourneyProgress()}
                className="text-[10px] text-[#D8B46A]/70 hover:text-[#FFF4F1] underline font-cinzel cursor-pointer"
                title="Unlock all for preview"
              >
                Preview Complete
              </button>
            </div>
          </div>
        )}

        {/* Masterpiece Showcase Frame */}
        {masterwork && (
          <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden border border-[#D8B46A]/50 shadow-[0_25px_65px_rgba(0,0,0,0.9)] bg-[#180819] p-2 group hover:border-[#D8B46A] transition-colors">
            {!imgError ? (
              <img
                src={masterwork.image}
                alt="Scene 25 — Our Story Canonical Artwork"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-auto rounded-xl object-contain max-h-[380px] mx-auto group-hover:scale-[1.02] transition-transform duration-700"
              />
            ) : (
              <div className="w-full py-16 px-6 flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#3A0718] via-[#241025] to-[#4B1D5A] rounded-xl">
                <Star className="w-10 h-10 text-[#D8B46A] mb-3 fill-current opacity-90" />
                <div className="font-cinzel text-lg font-bold text-[#FFF4F1] tracking-wider mb-1">
                  {masterwork.title}
                </div>
                <div className="font-cormorant italic text-sm text-[#E89AAF]">
                  “{masterwork.caption}”
                </div>
              </div>
            )}
            <div className="p-3 text-center">
              <div className="text-[11px] font-cinzel text-[#D8B46A] tracking-widest uppercase">
                SCENE 25 · THE MASTERWORK
              </div>
              <div className="font-cormorant italic text-sm text-[#F7D7DF] mt-0.5">
                “A map of the moments that became our story.”
              </div>
            </div>
          </div>
        )}

        {/* Epilogue Title */}
        <h2 className="font-cinzel text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-bold tracking-wider text-[#FFF4F1] leading-tight">
          Where Memory Becomes Forever
        </h2>

        {/* Quote */}
        <p className="font-cormorant italic text-xl sm:text-3xl text-[#F7D7DF] max-w-2xl mx-auto leading-relaxed">
          “This map is not merely where we have walked. It is the compass pointing toward every tomorrow we will build together.”
        </p>

        {/* Milestone Stat Counters */}
        <div className="pt-4 pb-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-[#E89AAF]">
          <div>
            <div className="font-cinzel text-2xl sm:text-3xl font-bold text-[#D8B46A] tabular-nums">
              {TIMELINE_STATS.totalDays}
            </div>
            <div className="text-[11px] font-medium tracking-widest uppercase mt-0.5 text-[#FFF4F1]/70">
              Days Together
            </div>
          </div>
          <span className="text-[#7A1838] text-xl">·</span>
          <div>
            <div className="font-cinzel text-2xl sm:text-3xl font-bold text-[#D8B46A] tabular-nums">
              {TIMELINE_STATS.chaptersCount}
            </div>
            <div className="text-[11px] font-medium tracking-widest uppercase mt-0.5 text-[#FFF4F1]/70">
              Living Scenes
            </div>
          </div>
          <span className="text-[#7A1838] text-xl">·</span>
          <div>
            <div className="font-cinzel text-2xl sm:text-3xl font-bold text-[#D8B46A] tabular-nums">
              {TIMELINE_STATS.distanceOvercome}
            </div>
            <div className="text-[11px] font-medium tracking-widest uppercase mt-0.5 text-[#FFF4F1]/70">
              Miles Defeated
            </div>
          </div>
        </div>

        {/* Interactive Pledge & Journey Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <RomanticButton
            onClick={handlePledge}
            variant="primary"
            size="md"
            icon={<Heart className={`w-4 h-4 ${pledged ? 'fill-current text-[#D8B46A]' : ''}`} />}
          >
            {pledged ? 'COVENANT SEALED FOREVER 🌹' : 'SEAL OUR PROMISE'}
          </RomanticButton>

          <RomanticButton
            onClick={onExploreMap}
            variant="secondary"
            size="md"
            icon={<Compass className="w-4 h-4" />}
          >
            EXPLORE THE STORY MAP
          </RomanticButton>

          <RomanticButton
            onClick={onOpenVault}
            variant="glass"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            OPEN SECRET VAULT
          </RomanticButton>
        </div>

        {/* Forward-Looking Footnote */}
        <div className="pt-8 border-t border-[#7A1838]/30 text-xs font-cormorant italic text-[#E89AAF]/70">
          “The map continues…” · September 2024 — September 2026
        </div>
      </div>
    </section>
  );
};
