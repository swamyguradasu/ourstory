import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { validateMarriageDate, setGateUnlocked } from '../utils/dateGateUtils';
import { RoseCornerAccent, RoseHeaderFlourish } from './FlowerDecorations';
import { RomanticButton } from './RomanticButton';
import { Heart, Sparkles, Calendar, ArrowRight, Lock, Unlock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RomanticDateGateProps {
  onUnlock: () => void;
}

interface DriftPetal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export const RomanticDateGate: React.FC<RomanticDateGateProps> = ({ onUnlock }) => {
  const [inputDate, setInputDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [petals, setPetals] = useState<DriftPetal[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    if (!mediaQuery.matches) {
      // 8 delicate rose petals for a lightweight, serene background drift
      const colors = ['#E89AAF', '#F7D7DF', '#D8B46A', '#C75D7D'];
      const initialPetals: DriftPetal[] = Array.from({ length: 8 }).map((_, idx) => ({
        id: idx,
        left: 10 + (idx * 11) + (Math.random() * 5),
        size: 14 + (idx % 3) * 3,
        duration: 16 + (idx % 4) * 3, // 16s - 25s
        delay: idx * 1.8,
        color: colors[idx % colors.length],
      }));
      setPetals(initialPetals);
    }

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputDate.trim()) {
      setErrorMessage('Please enter the date to unlock our story.');
      return;
    }

    const isValid = validateMarriageDate(inputDate);

    if (isValid) {
      setErrorMessage('');
      setIsSuccess(true);
      setGateUnlocked();

      // Trigger soft celebratory confetti heart burst if motion is allowed
      if (!prefersReducedMotion) {
        try {
          confetti({
            particleCount: 35,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#E89AAF', '#D8B46A', '#FFF4F1', '#7A1838'],
          });
        } catch {
          // ignore
        }
      }

      // Transition smoothly to the main website
      setTimeout(() => {
        onUnlock();
      }, 1800);
    } else {
      setIsShaking(true);
      setErrorMessage('Not quite… think of the day that means the most to us.');
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 min-h-screen bg-gradient-to-b from-[#18061e] via-[#2a0e33] to-[#110515] text-[#FFF4F1] selection:bg-[#7A1838] overflow-y-auto"
    >
      {/* 1. DARK BURGUNDY AMBIENCE & FILM GRAIN */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 film-grain opacity-40" />
        <div className="absolute inset-0 cinematic-vignette opacity-70" />

        {/* Ambient Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7A1838]/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D8B46A]/15 rounded-full blur-[160px]" />
      </div>

      {/* 2. SUBTLE ROSE PETALS DRIFTING SLOWLY (RESPECTS REDUCED-MOTION) */}
      {!prefersReducedMotion && petals.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          {petals.map((petal) => (
            <div
              key={petal.id}
              className="absolute top-[-30px]"
              style={{
                left: `${petal.left}%`,
                animation: `gentlePetalDrift ${petal.duration}s ease-in-out infinite`,
                animationDelay: `${petal.delay}s`,
              }}
            >
              <svg
                width={petal.size}
                height={petal.size * 1.3}
                viewBox="0 0 24 32"
                fill="none"
                className="transform opacity-60 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
              >
                <path
                  d="M12 0C4 8 0 16 0 22C0 27.5228 5.37258 32 12 32C18.6274 32 24 27.5228 24 22C24 16 20 8 12 0Z"
                  fill={petal.color}
                  fillOpacity={0.65}
                />
                <path
                  d="M12 4C12 14 11 26 12 30"
                  stroke="#FFF4F1"
                  strokeWidth="0.75"
                  strokeOpacity="0.4"
                />
              </svg>
            </div>
          ))}
          <style>{`
            @keyframes gentlePetalDrift {
              0% {
                transform: translate3d(0, -30px, 0) rotate(0deg);
                opacity: 0;
              }
              15% {
                opacity: 0.7;
              }
              85% {
                opacity: 0.7;
              }
              100% {
                transform: translate3d(50px, 105vh, 0) rotate(180deg);
                opacity: 0;
              }
            }
          `}</style>
        </div>
      )}

      {/* CENTRAL ROMANTIC GATE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          x: isShaking ? [0, -10, 10, -8, 8, -4, 4, 0] : 0,
        }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-lg p-6 sm:p-10 rounded-3xl sm:rounded-[36px] bg-[#1a081c]/90 sm:bg-[#1a081c]/85 border border-[#D8B46A]/45 shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_45px_rgba(122,24,56,0.4)] backdrop-blur-2xl text-center my-auto"
      >
        {/* Subtle Decorative Rose Corners */}
        <RoseCornerAccent position="top-left" className="opacity-80" />
        <RoseCornerAccent position="top-right" className="opacity-80" />
        <RoseCornerAccent position="bottom-left" className="opacity-80" />
        <RoseCornerAccent position="bottom-right" className="opacity-80" />

        <div className="space-y-6">
          {/* SMALL GLOWING GOLDEN HEART / ROSE EMBLEM ABOVE TITLE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-14 h-14 rounded-full bg-[#241025] border border-[#D8B46A]/60 flex items-center justify-center shadow-[0_0_25px_rgba(216,180,106,0.35),inset_0_0_12px_rgba(232,154,175,0.25)] group">
              {isSuccess ? (
                <Unlock className="w-6 h-6 text-[#D8B46A] animate-bounce" />
              ) : (
                <div className="relative flex items-center justify-center">
                  {/* Glowing aura */}
                  <div className="absolute inset-0 w-8 h-8 rounded-full bg-[#D8B46A]/30 blur-md animate-pulse" />
                  <Heart className="w-6 h-6 text-[#D8B46A] fill-[#D8B46A]/25 relative z-10" />
                </div>
              )}
            </div>
          </motion.div>

          {/* 3. OUR STORY TITLE APPEARS */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-2"
          >
            <h1 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wider text-[#FFF4F1] drop-shadow-[0_4px_20px_rgba(122,24,56,0.6)]">
              OUR STORY
            </h1>

            <RoseHeaderFlourish className="my-2" />

            <p className="font-cormorant italic text-base sm:text-xl text-[#F7D7DF] leading-relaxed max-w-md mx-auto">
              “Some memories are too precious to open without remembering the day that changed everything.”
            </p>
          </motion.div>

          {/* 4. CLUE APPEARS BENEATH IT */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="p-4 sm:p-6 rounded-2xl bg-[#120514]/80 border border-[#7A1838]/50 shadow-inner space-y-2"
          >
            <div className="text-xs sm:text-sm font-cinzel font-bold text-[#D8B46A] tracking-wider flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E89AAF]" />
              <span>A little question before our story begins…</span>
            </div>

            <p className="font-cormorant italic text-lg sm:text-2xl text-[#FFF4F1] font-medium">
              “What is our marriage date?”
            </p>
          </motion.div>

          {/* 5. DATE FIELD & ENTER OUR STORY BUTTON FADE IN */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                <div className="space-y-1.5 text-left">
                  <label
                    htmlFor="gate-date-input"
                    className="block text-[11px] font-cinzel tracking-wider text-[#E89AAF] uppercase pl-2"
                  >
                    Enter Date (DD/MM/YYYY)
                  </label>

                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D8B46A]" />
                    <input
                      id="gate-date-input"
                      type="text"
                      placeholder="DD/MM/YYYY (e.g. 18/02/2026)"
                      value={inputDate}
                      onChange={(e) => {
                        setInputDate(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      autoFocus
                      className="w-full pl-11 pr-4 min-h-[48px] py-3 rounded-2xl bg-[#120514]/95 border border-[#7A1838]/70 focus:border-[#D8B46A] focus:outline-none text-sm text-[#FFF4F1] placeholder-[#E89AAF]/40 tracking-wider shadow-inner transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Gentle Error Message on Wrong Date */}
                <AnimatePresence>
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3 rounded-xl bg-[#3A0718]/85 border border-[#E89AAF]/40 text-xs sm:text-sm font-cormorant italic text-[#F7D7DF]"
                    >
                      {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <RomanticButton
                  type="submit"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4 text-[#D8B46A]" />}
                  className="w-full justify-center shadow-[0_0_25px_rgba(122,24,56,0.7)]"
                >
                  ENTER OUR STORY
                </RomanticButton>
              </form>
            ) : (
              /* EXACT REQUESTED SUCCESS MESSAGE */
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="py-4 space-y-2.5"
              >
                <div className="text-xs font-cinzel font-bold text-[#D8B46A] tracking-widest uppercase animate-pulse">
                  ✦ SACRED DATE REMEMBERED ✦
                </div>
                <p className="font-cormorant italic text-xl sm:text-2xl text-[#FFF4F1] leading-relaxed">
                  “Some days become memories. Some become the beginning of everything.”
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* FOOTNOTE */}
          <div className="pt-2 text-[10px] font-cinzel text-[#E89AAF]/60 tracking-[0.2em] uppercase">
            A Keepsake Sanctuary Built With Love
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
