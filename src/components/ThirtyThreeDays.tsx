import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MEMORIES, Memory } from '../data/memories';
import { RoseHeaderFlourish, RoseCornerAccent } from './FlowerDecorations';
import { triggerRomanticHearts } from './RomanticParticleSystem';
import { RomanticButton } from './RomanticButton';
import { triggerEasterEggDiscovery } from '../utils/easterEggs';
import {
  Calendar as CalendarIcon,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Heart,
  Home,
  Sun,
  Flame,
  Clock,
  Compass,
  CheckCircle2,
} from 'lucide-react';

interface ThirtyThreeDaysProps {
  onContinueStory: () => void;
  onSelectMemory?: (memory: Memory) => void;
}

// Memory 22 in project data: "Thirty Three Days"
const MEMORY_22 = MEMORIES.find((m) => m.level === 22) || MEMORIES[21];

// Strict data discipline: Only populated days use facts from project data.
// Days without supplied content strictly display: "A day waiting for its memory."
interface DayMemoryEntry {
  dayNumber: number;
  dateLabel: string;
  title: string;
  isPopulated: boolean;
  narrative?: string;
  detailBullet?: string;
  image?: string;
}

const POPULATED_DAYS: Record<number, { title: string; dateLabel: string; narrative: string; detailBullet: string; image: string }> = {
  1: {
    title: 'The First Morning of Thirty-Three',
    dateLabel: 'Day 01 · April 2026',
    narrative:
      'The beginning of thirty-three uninterrupted days together. The suitcase unpacked, shoes resting side by side at the doorway, and the realization that everyday life would now be shared under one warm roof.',
    detailBullet: 'Day 01 of 33 continuous days together. The doorway and the quiet morning arrival.',
    image: '/scean 22.png',
  },
  7: {
    title: 'Meals & Domestic Warmth',
    dateLabel: 'Day 07 · April 2026',
    narrative:
      'Sharing South Indian meals together on banana leaves. Doing the dishes side by side, passing the salt across the counter, the smell of fresh food, and discovering that quiet ordinary routines are richer than any grand celebration.',
    detailBullet: 'Doing dishes together, warm kitchen steam, and side-by-side routines.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200&auto=format&fit=crop',
  },
  15: {
    title: 'Temples & Family Gatherings',
    dateLabel: 'Day 15 · April 2026',
    narrative:
      'Visiting ancient temples together with parents and siblings. Hearing the bronze bells chime in the sanctum breeze, receiving sacred blessings together, and feeling our families softly intertwine into one lifelong bond.',
    detailBullet: 'Ancient temple sanctums, family dinners, and blessings for our shared horizon.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
  },
  22: {
    title: 'Rooftop Sunsets in Vijayawada',
    dateLabel: 'Day 22 · May 2026',
    narrative:
      'Climbing up to the terrace at twilight to watch the sky soften into amber and lilac. Talking about the years ahead without watching the clock, wrapped in the warm evening breeze with nowhere else in the world to be.',
    detailBullet: 'Warm terrace twilight, looking over city lights, and unhurried conversations.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
  },
  33: {
    title: 'The Thirty-Third Sunset',
    dateLabel: 'Day 33 · May 2026',
    narrative:
      'Thirty-three days went by in what felt like one single heartbeat. We lived a lifetime in that month. Folding the linens, packing the bags, and holding hands with the quiet, unshakable certainty that our bond had become unbreakable.',
    detailBullet: 'The final evening of thirty-three days. A golden threshold into what comes next.',
    image: '/scean 22.png',
  },
};

export const ThirtyThreeDays: React.FC<ThirtyThreeDaysProps> = ({
  onContinueStory,
  onSelectMemory,
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [illuminatedCount, setIlluminatedCount] = useState<number>(0);

  // Opening animation: softly illuminate numbers from 1 to 33
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setIlluminatedCount(current);
      if (current >= 33) {
        clearInterval(interval);
      }
    }, 45); // Smooth cascading illumination across 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  const currentDayData = POPULATED_DAYS[selectedDay] || null;
  const isPopulated = !!currentDayData;

  const handleSelectDay = (day: number, e?: React.MouseEvent) => {
    if (e) triggerRomanticHearts(e.clientX, e.clientY);
    setSelectedDay(day);
  };

  const dayFormatted = selectedDay < 10 ? `0${selectedDay}` : `${selectedDay}`;

  return (
    <div className="relative w-full min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8 selection:bg-[#7A1838]">
      {/* WARM HOUSE-LIKE LIGHTING AMBIENCE */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#d97706]/15 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#7A1838]/25 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[500px] bg-[#F5C77E]/10 rounded-full blur-[190px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-20">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D8B46A]/40 bg-[#2b141e]/85 backdrop-blur-md mb-3 shadow-[0_0_20px_rgba(216,180,106,0.25)]">
            <button
              onClick={() => triggerEasterEggDiscovery('house')}
              className="text-[#F5C77E] hover:text-[#FFF4F1] hover:scale-125 transition-all cursor-pointer"
              title="A quiet hearth"
              role="button"
              aria-label="Shared hearth"
            >
              <Home className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-semibold tracking-[0.25em] text-[#F5C77E] uppercase font-cinzel">
              Special Interactive Chapter
            </span>
          </div>

          <RoseHeaderFlourish className="mb-3" />

          <h1 className="font-cinzel text-5xl sm:text-7xl lg:text-8xl font-bold tracking-wider text-[#FFF4F1] drop-shadow-[0_8px_35px_rgba(122,24,56,0.7)] mb-3">
            33 DAYS
          </h1>

          <p className="font-cormorant italic text-2xl sm:text-3xl lg:text-4xl text-[#F7D7DF] font-medium leading-relaxed max-w-2xl mx-auto">
            “Thirty-three ordinary days that somehow became extraordinary.”
          </p>

          <div className="mt-4 flex items-center justify-center gap-3 text-xs sm:text-sm font-cinzel tracking-[0.25em] text-[#D8B46A]">
            <span>APRIL — MAY 2026</span>
            <span className="text-[#E89AAF]">·</span>
            <span>CHAPTER XXII CHRONICLE</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* OPENING ANIMATION: ILLUMINATING CALENDAR (1 to 33)             */}
        {/* ============================================================== */}
        <div className="mb-14 bg-gradient-to-br from-[#240e1a]/90 via-[#1e0a17]/95 to-[#150613]/98 border border-[#D8B46A]/45 rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl relative overflow-hidden">
          <RoseCornerAccent position="top-right" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#7A1838]/40">
            <div className="flex items-center gap-2.5">
              <CalendarIcon className="w-4 h-4 text-[#D8B46A]" />
              <span className="font-cinzel text-sm sm:text-base font-bold text-[#FFF4F1] tracking-wider">
                THE THIRTY-THREE DAY CHRONICLE
              </span>
            </div>
            <span className="text-xs font-cormorant italic text-[#E89AAF]">
              Click any day or milestone below to turn the page
            </span>
          </div>

          {/* 33-DAY ILLUMINATED CALENDAR MATRIX */}
          <div className="grid grid-cols-6 sm:grid-cols-11 gap-2 sm:gap-3">
            {Array.from({ length: 33 }, (_, i) => i + 1).map((day) => {
              const isIlluminated = day <= illuminatedCount;
              const isSelected = selectedDay === day;
              const hasContent = !!POPULATED_DAYS[day];
              const dayStr = day < 10 ? `0${day}` : `${day}`;

              return (
                <button
                  key={day}
                  onClick={(e) => handleSelectDay(day, e)}
                  className={`relative group aspect-square rounded-xl sm:rounded-2xl flex flex-col items-center justify-center p-1 sm:p-2 transition-all duration-300 border cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#7A1838] via-[#5B1028] to-[#3a0b18] border-[#D8B46A] shadow-[0_0_20px_rgba(216,180,106,0.8),0_0_10px_rgba(232,154,175,0.6)] scale-110 z-10'
                      : isIlluminated
                      ? 'bg-[#180816]/80 hover:bg-[#250d22] border-[#7A1838]/40 hover:border-[#D8B46A]/70 text-[#FFF4F1]'
                      : 'bg-[#120412]/40 border-transparent text-[#FFF4F1]/20'
                  }`}
                >
                  {/* Subtle golden halo for milestone days */}
                  {hasContent && (
                    <span
                      className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${
                        isSelected ? 'bg-[#FFF4F1] animate-ping' : 'bg-[#D8B46A]'
                      }`}
                      title="Key milestone documented"
                    />
                  )}

                  <span
                    className={`font-cinzel text-xs sm:text-sm font-bold tracking-wider transition-colors ${
                      isSelected
                        ? 'text-[#FFF4F1]'
                        : isIlluminated
                        ? 'text-[#D8B46A] group-hover:text-[#FFF4F1]'
                        : 'text-[#FFF4F1]/20'
                    }`}
                  >
                    {dayStr}
                  </span>

                  <span
                    className={`text-[8px] sm:text-[9px] uppercase tracking-widest font-mono mt-0.5 ${
                      isSelected ? 'text-[#F5C77E]' : 'text-[#E89AAF]/60'
                    }`}
                  >
                    DAY
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Click Waypoint Buttons Required */}
          <div className="mt-8 pt-5 border-t border-[#7A1838]/40 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-cinzel text-xs text-[#E89AAF] tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D8B46A]" />
              KEY MILESTONES:
            </span>

            <div className="flex flex-wrap items-center gap-2">
              {[1, 7, 15, 22, 33].map((milestone) => {
                const milestoneStr = milestone < 10 ? `0${milestone}` : `${milestone}`;
                const isActive = selectedDay === milestone;
                return (
                  <button
                    key={milestone}
                    onClick={(e) => handleSelectDay(milestone, e)}
                    className={`px-3 py-1 rounded-full text-xs font-cinzel font-bold tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
                      isActive
                        ? 'bg-[#7A1838] text-[#FFF4F1] border-[#D8B46A] shadow-[0_0_12px_rgba(216,180,106,0.6)]'
                        : 'bg-[#1a0818]/90 text-[#E89AAF] hover:text-[#FFF4F1] border-[#7A1838]/50 hover:border-[#D8B46A]/60'
                    }`}
                  >
                    DAY {milestoneStr}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* HORIZONTAL / SCRAPBOOK-STYLE MEMORY LEAF (PAGE-TURN FEELING)   */}
        {/* ============================================================== */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDay}
              initial={{ opacity: 0, rotateY: -8, x: 20 }}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              exit={{ opacity: 0, rotateY: 8, x: -20 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="bg-gradient-to-br from-[#260f1e]/95 via-[#1f0a18]/95 to-[#160614]/98 border-2 border-[#D8B46A]/50 rounded-[32px] p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(122,24,56,0.35)] relative overflow-hidden"
              style={{
                boxShadow:
                  '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 25px rgba(216, 180, 106, 0.25), inset 0 1px 1px rgba(255, 244, 241, 0.1)',
              }}
            >
              <RoseCornerAccent position="top-left" />

              {/* Scrapbook leaf header: Day number and navigation */}
              <div className="flex items-center justify-between mb-8 border-b border-[#7A1838]/40 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#140614] border border-[#D8B46A]/60 flex items-center justify-center text-[#D8B46A] shadow-inner font-cinzel font-bold text-lg">
                    {dayFormatted}
                  </div>
                  <div>
                    <div className="text-[10px] font-cinzel text-[#E89AAF] tracking-[0.2em] uppercase">
                      Thirty-Three Days Chronicle
                    </div>
                    <div className="text-base font-cinzel font-bold text-[#FFF4F1]">
                      DAY {dayFormatted} OF 33
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={selectedDay <= 1}
                    onClick={(e) => handleSelectDay(selectedDay - 1, e)}
                    className="w-9 h-9 rounded-full bg-[#160817] border border-[#7A1838]/40 hover:border-[#D8B46A] flex items-center justify-center text-[#E89AAF] hover:text-[#FFF4F1] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Previous Day"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    disabled={selectedDay >= 33}
                    onClick={(e) => handleSelectDay(selectedDay + 1, e)}
                    className="w-9 h-9 rounded-full bg-[#160817] border border-[#7A1838]/40 hover:border-[#D8B46A] flex items-center justify-center text-[#E89AAF] hover:text-[#FFF4F1] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Next Day"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* SCRAPBOOK BODY CONTENT */}
              {isPopulated && currentDayData ? (
                /* POPULATED DAY CONTENT (Strict facts from project data) */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Artwork Column */}
                  <div className="lg:col-span-6 relative">
                    <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-[#D8B46A]/60 shadow-[0_15px_35px_rgba(0,0,0,0.8)] bg-[#120412] group">
                      <img
                        src={currentDayData.image}
                        alt={currentDayData.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#120412]/80 via-transparent to-transparent pointer-events-none" />

                      <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-[#120412]/85 backdrop-blur-md border border-[#D8B46A]/40 text-xs font-cinzel text-[#D8B46A]">
                        {currentDayData.dateLabel}
                      </div>
                    </div>
                  </div>

                  {/* Narrative Column */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7A1838]/30 border border-[#D8B46A]/40 text-xs font-cinzel text-[#D8B46A]">
                      <Sparkles className="w-3 h-3" />
                      <span>Documented Milestone</span>
                    </div>

                    <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#FFF4F1] leading-tight">
                      {currentDayData.title}
                    </h2>

                    <p className="font-sans text-sm sm:text-base text-[#FFF4F1]/90 font-light leading-relaxed">
                      {currentDayData.narrative}
                    </p>

                    <div className="p-4 rounded-xl bg-[#140614]/80 border border-[#7A1838]/40 text-xs font-cormorant italic text-[#F7D7DF] leading-relaxed">
                      “{currentDayData.detailBullet}”
                    </div>

                    {/* Link to Scene 22 in Memory Modal if available */}
                    {onSelectMemory && (
                      <div className="pt-2">
                        <button
                          onClick={() => onSelectMemory(MEMORY_22)}
                          className="inline-flex items-center gap-2 text-xs font-cinzel font-bold text-[#D8B46A] hover:text-[#FFF4F1] tracking-widest uppercase transition-colors cursor-pointer"
                        >
                          <span>Open Chapter XXII Sanctuary</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* UNPOPULATED DAY (STRICT REQUIREMENT: "A day waiting for its memory.") */
                <div className="py-16 text-center max-w-md mx-auto space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#180718] border border-[#D8B46A]/40 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(216,180,106,0.2)]">
                    <span className="text-2xl select-none" role="img" aria-label="rose">
                      🌹
                    </span>
                  </div>

                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#FFF4F1]">
                    Day {dayFormatted}
                  </h3>

                  <p className="font-cormorant italic text-2xl sm:text-3xl text-[#F7D7DF] font-medium leading-relaxed">
                    “A day waiting for its memory.”
                  </p>

                  <p className="text-xs text-[#E89AAF]/70 font-sans leading-relaxed">
                    One of thirty-three unrecorded ordinary days that quietly wove two lives together.
                  </p>
                </div>
              )}

              {/* ============================================================== */}
              {/* SPECIAL FINALE AT DAY 33                                      */}
              {/* ============================================================== */}
              {selectedDay === 33 && (
                <div className="mt-10 pt-8 border-t border-[#D8B46A]/40 text-center max-w-2xl mx-auto space-y-6 animate-fade-in">
                  <RoseHeaderFlourish className="mb-2" />

                  <blockquote className="font-cormorant italic text-2xl sm:text-3xl lg:text-4xl text-[#FFF4F1] font-medium leading-relaxed drop-shadow-[0_2px_15px_rgba(122,24,56,0.6)]">
                    “Some chapters don't end because they're finished.
                    <br />
                    They end because a new chapter is waiting.”
                  </blockquote>

                  <div className="pt-4 flex justify-center">
                    <RomanticButton
                      onClick={onContinueStory}
                      variant="primary"
                      size="lg"
                      icon={<ArrowRight className="w-4 h-4 text-[#D8B46A]" />}
                      className="shadow-[0_0_30px_rgba(122,24,56,0.8),0_0_20px_rgba(216,180,106,0.5)]"
                    >
                      CONTINUE THE STORY →
                    </RomanticButton>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM ORNAMENT FOOTNOTE */}
        <div className="mt-20 text-center max-w-xl mx-auto pt-10 border-t border-[#7A1838]/40">
          <RoseHeaderFlourish className="mb-3" />
          <p className="font-cormorant italic text-lg sm:text-xl text-[#F7D7DF]">
            “Thirty-three sunrises. One unbroken heartbeat.”
          </p>
          <div className="text-xs font-cinzel text-[#D8B46A] tracking-[0.25em] mt-2">
            CHAPTER XXII · APRIL — MAY 2026
          </div>
        </div>
      </div>
    </div>
  );
};
