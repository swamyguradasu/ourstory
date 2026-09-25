import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MEMORIES, Memory } from '../data/memories';
import { RoseHeaderFlourish, RoseCornerAccent } from './FlowerDecorations';
import { triggerRomanticHearts } from './RomanticParticleSystem';
import { RomanticButton } from './RomanticButton';
import { triggerEasterEggDiscovery } from '../utils/easterEggs';
import {
  Moon,
  Sparkles,
  Calendar,
  Compass,
  ArrowRight,
  Heart,
  Clock,
  MapPin,
  Flame,
  Stars,
  ShieldCheck,
} from 'lucide-react';

interface DistanceChapterProps {
  onContinue: (memory: Memory) => void;
  onSelectMemory?: (memory: Memory) => void;
}

// Target reunion memory: Scene 24 (September 19, 2026)
const REUNION_MEMORY = MEMORIES.find((m) => m.level === 24) || MEMORIES[23];

// Key anchor memories that kept the bond strong during the silence
const KEEPSAKE_MEMORIES = [
  { level: 1, label: 'The First Morning', date: 'Sep 2024', image: '/scean 1.png' },
  { level: 4, label: 'Our First Picture', date: 'Oct 2024', image: '/scean 4.png' },
  { level: 8, label: 'The Bangles', date: 'Jan 2025', image: '/scean 8.png' },
  { level: 11, label: 'Vijayawada Hackathon', date: 'Dec 2025', image: '/scean 11.png' },
  { level: 13, label: 'Train Home', date: 'Dec 2025', image: '/scean 13.png' },
  { level: 15, label: 'Antarvedi Shore', date: 'Jan 2026', image: '/scean 15.png' },
  { level: 17, label: 'Our Chosen Day', date: 'Feb 2026', image: '/scean 17.png' },
  { level: 22, label: 'Thirty Three Days', date: 'May 2026', image: '/scean 22.png' },
];

export const DistanceChapter: React.FC<DistanceChapterProps> = ({
  onContinue,
  onSelectMemory,
}) => {
  // Animation phase:
  // 0: Initial stopped path
  // 1: "Sometimes the map has quiet roads."
  // 2: Calendar transition through 60 days
  // 3: "Two months."
  // 4: "But the memories stayed." (Thumbnails bloom)
  // 5: New glowing route bridges to September 19, 2026
  const [phase, setPhase] = useState<number>(0);
  const [calendarDay, setCalendarDay] = useState<number>(1);
  const [calendarMonth, setCalendarMonth] = useState<'June' | 'July' | 'August' | 'September'>('June');
  const [routeRevealed, setRouteRevealed] = useState<boolean>(false);

  // Progressive cinematic timeline transition
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1000); // 1. Quiet roads
    const t2 = setTimeout(() => setPhase(2), 2600); // 2. Days start passing
    const t3 = setTimeout(() => setPhase(3), 5200); // 3. "Two months."
    const t4 = setTimeout(() => setPhase(4), 7200); // 4. "Memories stayed"
    const t5 = setTimeout(() => {
      setPhase(5);
      setRouteRevealed(true);
    }, 9200); // 5. Golden reunion route illuminates

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  // Calendar day ticker during phase 2 & 3
  useEffect(() => {
    let day = 1;
    let monthIdx = 0;
    const months: ('June' | 'July' | 'August' | 'September')[] = ['June', 'July', 'August', 'September'];

    const timer = setInterval(() => {
      day += 2;
      if (day > 30) {
        day = 1;
        monthIdx = (monthIdx + 1) % months.length;
        setCalendarMonth(months[monthIdx]);
      }
      setCalendarDay(day);
    }, 120);

    return () => clearInterval(timer);
  }, []);

  const handleContinueClick = (e: React.MouseEvent) => {
    triggerRomanticHearts(e.clientX, e.clientY);
    onContinue(REUNION_MEMORY);
  };

  return (
    <div className="relative w-full min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8 selection:bg-[#7A1838] overflow-hidden">
      {/* SOFT MOONLIGHT & NIGHT SKY ATMOSPHERE */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-[#2e0842]/40 via-[#450a30]/30 to-transparent rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-[#1a082b]/60 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[550px] h-[550px] bg-[#3d0928]/40 rounded-full blur-[160px] pointer-events-none" />

      {/* SUBTLE RAIN-LIKE LIGHT PARTICLES (GRACEFUL STREAKS) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[1px] bg-gradient-to-b from-transparent via-[#E89AAF]/80 to-transparent"
            style={{
              height: `${40 + (i % 5) * 20}px`,
              left: `${(i * 5.7) % 100}%`,
              top: `${(i * 11) % 90}%`,
              animation: `pulse ${(i % 3) + 2}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-20">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D8B46A]/40 bg-[#1d082b]/80 backdrop-blur-md mb-3 shadow-[0_0_20px_rgba(216,180,106,0.2)]">
            <button
              onClick={() => triggerEasterEggDiscovery('star')}
              className="text-[#E6E6FA] hover:text-[#D8B46A] hover:scale-125 transition-all cursor-pointer"
              title="A silent starlit night"
              role="button"
              aria-label="Undated star"
            >
              <Stars className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-semibold tracking-[0.25em] text-[#E89AAF] uppercase font-cinzel">
              Chapter XXIII · The Quiet Interlude
            </span>
          </div>

          <RoseHeaderFlourish className="mb-3" />

          <h1 className="font-cinzel text-4xl xs:text-5xl sm:text-7xl lg:text-8xl font-bold tracking-wider text-[#FFF4F1] drop-shadow-[0_8px_35px_rgba(75,29,90,0.8)] mb-3">
            DISTANCE
          </h1>

          <p className="font-cormorant italic text-2xl sm:text-3xl text-[#F7D7DF] font-medium leading-relaxed max-w-2xl mx-auto">
            “Between thirty-three days together and the stone pavilion on the hill.”
          </p>

          <div className="mt-4 flex items-center justify-center gap-3 text-xs sm:text-sm font-cinzel tracking-[0.25em] text-[#D8B46A]">
            <span>JUNE — JULY 2026</span>
            <span className="text-[#E89AAF]">·</span>
            <span>SIXTY DAYS OF PATIENCE</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* CINEMATIC MAP PATH SEQUENCE: A ROAD THAT PAUSES & RECONNECTS   */}
        {/* ============================================================== */}
        <div className="relative mb-14 bg-gradient-to-br from-[#1b0625]/95 via-[#16041f]/95 to-[#0f0216]/98 border border-[#7A1838]/50 rounded-[32px] p-6 sm:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(75,29,90,0.4)] backdrop-blur-xl overflow-hidden">
          <RoseCornerAccent position="top-right" />
          <RoseCornerAccent position="bottom-left" />

          {/* POETIC NARRATIVE SEQUENCE */}
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-4 min-h-[140px] flex flex-col items-center justify-center">
            {/* Step 1: “Sometimes the map has quiet roads.” */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: phase >= 1 ? 1 : 0.2, y: phase >= 1 ? 0 : 15 }}
              transition={{ duration: 0.8 }}
              className="font-cormorant italic text-2xl sm:text-3xl text-[#F7D7DF] font-light leading-relaxed"
            >
              “Sometimes the map has quiet roads.”
            </motion.p>

            {/* Step 2 & 3: “Two months.” */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: phase >= 3 ? 1 : 0, scale: phase >= 3 ? 1 : 0.95 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 justify-center"
            >
              <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D8B46A]" />
              <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-widest text-[#FFF4F1] drop-shadow-[0_0_20px_rgba(216,180,106,0.4)]">
                TWO MONTHS.
              </h2>
              <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D8B46A]" />
            </motion.div>

            {/* Step 4: “But the memories stayed.” */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 10 }}
              transition={{ duration: 0.8 }}
              className="font-cormorant italic text-xl sm:text-2xl text-[#E89AAF] font-medium"
            >
              “But the memories stayed.”
            </motion.p>
          </div>

          {/* ============================================================== */}
          {/* THE MAP VOID: TWO DISTANT GLOWING POINTS & SUDDEN GAP          */}
          {/* ============================================================== */}
          <div className="relative w-full h-44 sm:h-56 my-8 rounded-2xl bg-[#0d0213]/90 border border-[#4B1D5A]/40 flex items-center justify-between px-6 sm:px-14 overflow-hidden">
            {/* Ambient starlight in the gap */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(122,24,56,0.15),transparent_70%)] pointer-events-none" />

            {/* LEFT GLOWING POINT: May 2026 (The Thirty-Three Days Departure) */}
            <div className="relative z-20 flex flex-col items-center">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#240a20] border-2 border-[#D8B46A] flex items-center justify-center shadow-[0_0_25px_rgba(216,180,106,0.8)]">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#D8B46A]" />
                <span className="absolute -inset-1 rounded-full border border-[#D8B46A]/40 animate-ping pointer-events-none" />
              </div>
              <div className="mt-2 text-center">
                <div className="font-cinzel text-xs sm:text-sm font-bold text-[#FFF4F1] tracking-wider">
                  MAY 2026
                </div>
                <div className="text-[10px] font-mono text-[#E89AAF]">Day 33 Shared Life</div>
              </div>
            </div>

            {/* THE CENTRAL GAP / BROKEN PATH */}
            <div className="relative flex-1 mx-4 sm:mx-10 h-1 flex items-center">
              {/* Left path that suddenly STOPS */}
              <div className="w-1/4 h-1 bg-gradient-to-r from-[#D8B46A] to-[#E89AAF] rounded-full shadow-[0_0_10px_rgba(232,154,175,0.8)]" />

              {/* THE GAP (Quiet void with floating calendar indicator) */}
              <div className="flex-1 relative flex items-center justify-center">
                {/* The quiet emptiness */}
                <div className="w-full border-t border-dashed border-[#7A1838]/50" />

                {/* THE PASSING DAYS CALENDAR BADGE */}
                <div className="absolute px-3 py-1.5 rounded-full bg-[#180820]/95 border border-[#D8B46A]/60 shadow-[0_0_20px_rgba(0,0,0,0.9)] flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#D8B46A] animate-pulse" />
                  <span className="font-mono text-[11px] sm:text-xs text-[#FFF4F1] font-bold tracking-wider">
                    {calendarMonth.toUpperCase()} {calendarDay < 10 ? `0${calendarDay}` : calendarDay}
                  </span>
                  <span className="text-[10px] font-cinzel text-[#E89AAF] hidden sm:inline">· 60 DAYS</span>
                </div>

                {/* THE NEW GLOWING ROUTE (Reveals at phase 5) */}
                {routeRevealed && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                    className="absolute inset-0 h-1.5 bg-gradient-to-r from-[#E89AAF] via-[#D8B46A] to-[#FFF4F1] rounded-full shadow-[0_0_20px_rgba(216,180,106,1),0_0_35px_rgba(232,154,175,0.8)] origin-left"
                  />
                )}
              </div>

              {/* Right arrival segment */}
              <div className="w-1/4 h-1 bg-gradient-to-r from-[#E89AAF] to-[#D8B46A] rounded-full opacity-60" />
            </div>

            {/* RIGHT GLOWING POINT: SEPTEMBER 19, 2026 */}
            <div className="relative z-20 flex flex-col items-center">
              <div
                className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-700 ${
                  routeRevealed
                    ? 'bg-gradient-to-br from-[#7A1838] to-[#5B1028] border-2 border-[#D8B46A] shadow-[0_0_35px_rgba(216,180,106,0.9),0_0_20px_rgba(232,154,175,0.8)] scale-110'
                    : 'bg-[#180820] border-2 border-[#7A1838]/60 text-[#E89AAF]'
                }`}
              >
                <Stars className="w-5 h-5 sm:w-6 sm:h-6 text-[#D8B46A] animate-pulse" />
              </div>
              <div className="mt-2 text-center">
                <div className="font-cinzel text-xs sm:text-sm font-bold text-[#D8B46A] tracking-wider">
                  SEPTEMBER 19, 2026
                </div>
                <div className="text-[10px] font-mono text-[#FFF4F1]">The Reunion Pavilion</div>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* MEMORY THUMBNAILS SLOWLY APPEARING AROUND THE PATH             */}
          {/* ============================================================== */}
          <div className="mt-10">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#7A1838]/40 text-xs">
              <span className="font-cinzel text-[#D8B46A] tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D8B46A]" />
                THE KEEPSAKES THAT CROSSED THE DISTANCE
              </span>
              <span className="font-cormorant italic text-[#E89AAF]">
                Photographs on the bedspread, ticket stubs in the drawer
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {KEEPSAKE_MEMORIES.map((k, idx) => {
                const isVisible = phase >= 4;
                return (
                  <motion.div
                    key={k.level}
                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                    animate={{
                      opacity: isVisible ? 1 : 0.15,
                      y: isVisible ? 0 : 15,
                      scale: isVisible ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group relative bg-[#120414] border border-[#7A1838]/40 hover:border-[#D8B46A] rounded-xl overflow-hidden p-1.5 shadow-md hover:shadow-[0_0_15px_rgba(216,180,106,0.4)] transition-all cursor-pointer"
                    onClick={() => {
                      const found = MEMORIES.find((m) => m.level === k.level);
                      if (found && onSelectMemory) onSelectMemory(found);
                    }}
                  >
                    <div className="w-full aspect-square rounded-lg overflow-hidden bg-[#18081a] relative mb-1.5">
                      <img
                        src={k.image}
                        alt={k.label}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-1 left-1 px-1 rounded bg-[#120414]/85 text-[8px] font-cinzel text-[#D8B46A]">
                        #{k.level}
                      </div>
                    </div>
                    <div className="text-[10px] font-cinzel font-bold text-[#FFF4F1] truncate group-hover:text-[#D8B46A]">
                      {k.label}
                    </div>
                    <div className="text-[8px] text-[#E89AAF]/70 font-mono">{k.date}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ============================================================== */}
          {/* THE DESTINATION: REUNION AT SEPTEMBER 19, 2026                 */}
          {/* ============================================================== */}
          <div className="mt-12 pt-8 border-t border-[#D8B46A]/40 text-center max-w-xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7A1838]/40 border border-[#D8B46A]/50 text-xs font-cinzel text-[#D8B46A] tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>THE DESTINATION AHEAD</span>
            </div>

            <h3 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#FFF4F1] tracking-wide">
              SEPTEMBER 19, 2026
            </h3>

            <p className="font-cormorant italic text-lg sm:text-xl text-[#F7D7DF] leading-relaxed">
              “The stone pavilion on the hilltop. The sunset setting the river ablaze.
              Distance finally ending in the sweetest reunion.”
            </p>

            {/* CONTINUE BUTTON */}
            <div className="pt-2 flex justify-center">
              <RomanticButton
                onClick={handleContinueClick}
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4 text-[#D8B46A]" />}
                className="shadow-[0_0_35px_rgba(122,24,56,0.9),0_0_20px_rgba(216,180,106,0.6)] px-10"
              >
                CONTINUE →
              </RomanticButton>
            </div>
          </div>
        </div>

        {/* BOTTOM ORNAMENT FOOTNOTE */}
        <div className="mt-20 text-center max-w-xl mx-auto pt-10 border-t border-[#7A1838]/40">
          <RoseHeaderFlourish className="mb-3" />
          <p className="font-cormorant italic text-lg sm:text-xl text-[#F7D7DF]">
            “Sixty days of distance. A lifetime of quiet devotion.”
          </p>
          <div className="text-xs font-cinzel text-[#D8B46A] tracking-[0.25em] mt-2">
            CHAPTER XXIII · JUNE — SEPTEMBER 2026
          </div>
        </div>
      </div>
    </div>
  );
};
