import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MEMORIES } from '../data/memories';
import { RoseHeaderFlourish, RoseFinalChapterSeal } from './FlowerDecorations';
import { triggerRomanticHearts } from './RomanticParticleSystem';
import { RomanticButton } from './RomanticButton';
import { Sparkles, ArrowRight, MapPin, Compass, RotateCcw, Heart, Stars } from 'lucide-react';

interface FinalStoryExperienceProps {
  onBackToMap: () => void;
  onExploreAgain?: () => void;
  isModal?: boolean;
}

export const FinalStoryExperience: React.FC<FinalStoryExperienceProps> = ({
  onBackToMap,
  onExploreAgain,
  isModal = false,
}) => {
  // Cinematic progression phases:
  // 0: Deep darkness
  // 1: First point appears
  // 2: Second point appears
  // 3: All 25 points illuminate sequentially
  // 4: Full map & routes glow, camera zooms out
  // 5: Crossfade to Scene 25 artwork & Title / Subtitle
  // 6: Lines 1 & 2 appear
  // 7: Lines 3 & 4 appear
  // 8: Line 5 appears
  // 9: "THIS IS OUR STORY." and action buttons
  const [phase, setPhase] = useState<number>(0);
  const [illuminatedPoints, setIlluminatedPoints] = useState<number>(0);
  const [artworkLoaded, setArtworkLoaded] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);

  // Master Scene 25
  const scene25 = MEMORIES.find((m) => m.level === 25) || MEMORIES[24];

  // Start sequence on mount
  useEffect(() => {
    // Reset state
    setPhase(0);
    setIlluminatedPoints(0);

    const t1 = setTimeout(() => {
      setPhase(1);
      setIlluminatedPoints(1);
    }, 700);

    const t2 = setTimeout(() => {
      setPhase(2);
      setIlluminatedPoints(2);
    }, 1500);

    // Phase 3: Sequentially illuminate points 3 to 25
    const t3 = setTimeout(() => {
      setPhase(3);
      let count = 2;
      const pointInterval = setInterval(() => {
        count++;
        setIlluminatedPoints(count);
        if (count >= 25) {
          clearInterval(pointInterval);
        }
      }, 90);
    }, 2400);

    // Phase 4: Full map glow & camera zoom out
    const t4 = setTimeout(() => setPhase(4), 5000);

    // Phase 5: Transition to Scene 25 Artwork & Title
    const t5 = setTimeout(() => setPhase(5), 7200);

    // Phase 6: Line 1 & Line 2
    const t6 = setTimeout(() => setPhase(6), 8800);

    // Phase 7: Line 3 & Line 4
    const t7 = setTimeout(() => setPhase(7), 11000);

    // Phase 8: Line 5
    const t8 = setTimeout(() => setPhase(8), 13200);

    // Phase 9: "THIS IS OUR STORY." & Actions
    const t9 = setTimeout(() => setPhase(9), 15400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
      clearTimeout(t8);
      clearTimeout(t9);
    };
  }, []);

  const handleRestart = (e: React.MouseEvent) => {
    triggerRomanticHearts(e.clientX, e.clientY);
    setPhase(0);
    setIlluminatedPoints(0);
    setTimeout(() => {
      setPhase(1);
      setIlluminatedPoints(1);
    }, 400);
    if (onExploreAgain) onExploreAgain();
  };

  const handleBackToMapClick = (e: React.MouseEvent) => {
    triggerRomanticHearts(e.clientX, e.clientY);
    onBackToMap();
  };

  // SVG route path connecting all 25 memories
  const pathD = MEMORIES.map((m, idx) => {
    const cmd = idx === 0 ? 'M' : 'L';
    return `${cmd} ${m.coordinates.x * 10} ${m.coordinates.y * 5}`;
  }).join(' ');

  return (
    <div
      className={`relative w-full ${
        isModal ? 'min-h-[85vh]' : 'min-h-screen'
      } bg-[#08020a] text-[#FFF4F1] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 overflow-hidden selection:bg-[#7A1838]`}
    >
      {/* ============================================================== */}
      {/* SUBTLE ANIMATED ROSE PETAL DRIFT                                */}
      {/* ============================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-70">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${8 + (i % 4) * 3}px`,
              height: `${12 + (i % 4) * 4}px`,
              background: 'radial-gradient(ellipse at 30% 30%, #E89AAF, #7A1838)',
              borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
              left: `${(i * 6.4 + 3) % 96}%`,
              top: '-20px',
              opacity: 0.25 + (i % 3) * 0.2,
              animation: `driftDown ${9 + (i % 6) * 2}s linear infinite`,
              animationDelay: `${(i * 0.8) % 7}s`,
              transform: `rotate(${i * 25}deg)`,
            }}
          />
        ))}
      </div>

      {/* AMBIENT SOFT EMBER GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-r from-[#5B1028]/25 via-[#7A1838]/15 to-[#3a082c]/25 rounded-full blur-[180px] pointer-events-none" />

      {/* ============================================================== */}
      {/* MAP ILLUMINATION & CAMERA SLOW ZOOM OUT                        */}
      {/* ============================================================== */}
      <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center z-20">
        {phase < 5 ? (
          /* PHASES 0 TO 4: STARFIELD & MAP ILLUMINATION */
          <motion.div
            initial={{ scale: 1.25, opacity: 0.9 }}
            animate={{
              scale: phase >= 4 ? 1.0 : 1.2,
              opacity: phase >= 1 ? 1 : 0.2,
            }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
            className="relative w-full aspect-[16/9] max-w-3xl rounded-3xl border border-[#7A1838]/40 bg-[#0d030f]/80 p-4 sm:p-8 flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.95)]"
          >
            {/* Ambient map grid texture */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#D8B46A_1px,transparent_1px)] [background-size:24px_24px]" />

            {/* Glowing Map SVG Path */}
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full relative z-10 transition-opacity duration-1000"
              style={{ opacity: phase >= 4 ? 0.95 : 0.3 }}
            >
              <defs>
                <linearGradient id="finalPathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D8B46A" />
                  <stop offset="50%" stopColor="#E89AAF" />
                  <stop offset="100%" stopColor="#D8B46A" />
                </linearGradient>
                <filter id="finalGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Glowing Route connecting nodes */}
              {phase >= 4 && (
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke="url(#finalPathGradient)"
                  strokeWidth="3"
                  filter="url(#finalGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.8, ease: 'easeInOut' }}
                />
              )}

              {/* 25 Illumination Points */}
              {MEMORIES.map((m, idx) => {
                const isLit = idx < illuminatedPoints;
                const isFirst = idx === 0;
                const isSecond = idx === 1;

                if (!isLit) return null;

                const posX = m.coordinates.x * 10;
                const posY = m.coordinates.y * 5;

                return (
                  <g key={m.id} className="transition-all duration-500">
                    {/* Soft glowing halo */}
                    <circle
                      cx={posX}
                      cy={posY}
                      r={isFirst || isSecond || idx === 24 ? 9 : 6}
                      fill="#D8B46A"
                      opacity="0.3"
                      className="animate-ping"
                    />
                    {/* Core illuminated star point */}
                    <circle
                      cx={posX}
                      cy={posY}
                      r={isFirst || isSecond || idx === 24 ? 5 : 3.5}
                      fill="#FFF4F1"
                      stroke="#D8B46A"
                      strokeWidth="1.5"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Status caption during illumination */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#120414]/90 border border-[#D8B46A]/40 text-xs font-cinzel text-[#D8B46A] tracking-widest uppercase">
              {phase < 3
                ? 'Illuminating memory path…'
                : phase < 4
                ? `Tracing 25 Sacred Locations (${illuminatedPoints}/25)`
                : 'All paths unified · The entire map awakens'}
            </div>
          </motion.div>
        ) : (
          /* ============================================================== */
          /* PHASES 5+: FINAL ANIME ARTWORK (SCENE 25) & CINEMATIC LINES   */
          /* ============================================================== */
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="w-full text-center space-y-8"
          >
            {/* REGAL SEAL */}
            <RoseFinalChapterSeal className="mb-2" />

            {/* MASTERWORK ARTWORK CONTAINER: SCENE 25 */}
            <div className="max-w-2xl mx-auto rounded-3xl overflow-hidden border-2 border-[#D8B46A]/60 shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_35px_rgba(216,180,106,0.3)] bg-[#120412] p-2.5 sm:p-3 relative group">
              <div className="w-full aspect-[16/10] max-h-[420px] rounded-2xl overflow-hidden bg-[#160618] relative">
                {!imgError ? (
                  <img
                    src={scene25.image}
                    alt="Scene 25 — Our Story Final Masterwork"
                    loading="eager"
                    referrerPolicy="no-referrer"
                    onLoad={() => setArtworkLoaded(true)}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#300a1e] via-[#1a0515] to-[#120412]">
                    <Stars className="w-12 h-12 text-[#D8B46A] mb-3 animate-pulse" />
                    <div className="font-cinzel text-xl font-bold text-[#FFF4F1] tracking-wider mb-2">
                      Our Story
                    </div>
                    <div className="font-cormorant italic text-sm text-[#F7D7DF]">
                      “A map of the moments that became our story.”
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#120412]/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-cinzel text-[#D8B46A]">
                  <span className="tracking-widest">CHAPTER XXV · THE MASTERWORK</span>
                  <span className="text-[#FFF4F1] font-mono">SEPTEMBER 2026</span>
                </div>
              </div>
            </div>

            {/* TITLE & SUBTITLE REQUIRED */}
            <div className="space-y-2 pt-2">
              <h1 className="font-cinzel text-4xl sm:text-6xl lg:text-7xl font-bold tracking-wider text-[#FFF4F1] drop-shadow-[0_8px_30px_rgba(122,24,56,0.7)]">
                OUR STORY
              </h1>
              <p className="font-cormorant italic text-xl sm:text-2xl lg:text-3xl text-[#D8B46A] font-medium tracking-wide">
                “September 2024 — September 2026”
              </p>
            </div>

            <RoseHeaderFlourish className="my-2" />

            {/* ============================================================== */}
            {/* THE FIVE CINEMATIC LINES DISPLAYED ONE AT A TIME                */}
            {/* ============================================================== */}
            <div className="max-w-2xl mx-auto space-y-4 min-h-[190px] flex flex-col items-center justify-center px-4">
              {/* Line 1: “Every story has a beginning.” */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: phase >= 6 ? 1 : 0, y: phase >= 6 ? 0 : 12 }}
                transition={{ duration: 0.9 }}
                className="font-cormorant italic text-2xl sm:text-3xl text-[#FFF4F1]/90 leading-relaxed font-light"
              >
                “Every story has a beginning.”
              </motion.p>

              {/* Line 2: “Some begin with a single moment.” */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: phase >= 6 ? 1 : 0, y: phase >= 6 ? 0 : 12 }}
                transition={{ duration: 0.9, delay: 0.4 }}
                className="font-cormorant italic text-xl sm:text-2xl text-[#F7D7DF]/85 leading-relaxed font-light"
              >
                “Some begin with a single moment.”
              </motion.p>

              {/* Line 3: “Some grow through ordinary days.” */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: phase >= 7 ? 1 : 0, y: phase >= 7 ? 0 : 12 }}
                transition={{ duration: 0.9 }}
                className="font-cormorant italic text-xl sm:text-2xl text-[#E89AAF] leading-relaxed font-light"
              >
                “Some grow through ordinary days.”
              </motion.p>

              {/* Line 4: “Some survive distance.” */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: phase >= 7 ? 1 : 0, y: phase >= 7 ? 0 : 12 }}
                transition={{ duration: 0.9, delay: 0.4 }}
                className="font-cormorant italic text-xl sm:text-2xl text-[#D8B46A] leading-relaxed font-light"
              >
                “Some survive distance.”
              </motion.p>

              {/* Line 5: “And some are made from hundreds of little memories.” */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: phase >= 8 ? 1 : 0, y: phase >= 8 ? 0 : 12 }}
                transition={{ duration: 0.9 }}
                className="font-cormorant italic text-2xl sm:text-3xl text-[#FFF4F1] leading-relaxed font-medium"
              >
                “And some are made from hundreds of little memories.”
              </motion.p>
            </div>

            {/* ============================================================== */}
            {/* CLIMAX: “THIS IS OUR STORY.”                                    */}
            {/* ============================================================== */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: phase >= 9 ? 1 : 0, scale: phase >= 9 ? 1 : 0.95 }}
              transition={{ duration: 1.2 }}
              className="pt-6 pb-2"
            >
              <div className="inline-flex items-center gap-3 justify-center mb-6">
                <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#D8B46A]" />
                <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-[0.2em] text-[#FFF4F1] drop-shadow-[0_0_25px_rgba(216,180,106,0.6)]">
                  THIS IS OUR STORY.
                </h2>
                <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#D8B46A]" />
              </div>

              {/* ACTION BUTTONS REQUIRED: "EXPLORE AGAIN" & "BACK TO THE MAP" */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-md mx-auto">
                <RomanticButton
                  onClick={handleRestart}
                  variant="secondary"
                  size="md"
                  icon={<RotateCcw className="w-4 h-4 text-[#D8B46A]" />}
                  className="w-full sm:w-auto"
                >
                  EXPLORE AGAIN
                </RomanticButton>

                <RomanticButton
                  onClick={handleBackToMapClick}
                  variant="primary"
                  size="md"
                  icon={<Compass className="w-4 h-4 text-[#D8B46A]" />}
                  className="w-full sm:w-auto shadow-[0_0_25px_rgba(122,24,56,0.7)]"
                >
                  BACK TO THE MAP
                </RomanticButton>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* AT THE VERY BOTTOM: "The map continues…"                        */}
        {/* Strictly forward-looking (no implication of ending)             */}
        {/* ============================================================== */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-[#7A1838]/40 text-center max-w-lg mx-auto z-20">
          <p className="font-cinzel text-sm sm:text-base text-[#D8B46A] tracking-[0.3em] uppercase mb-1 font-bold">
            The map continues…
          </p>
          <p className="font-cormorant italic text-sm sm:text-base text-[#F7D7DF]/80 leading-relaxed">
            This digital journal preserves our first two canonical years. Every tomorrow remains an open road waiting to be walked together.
          </p>
        </div>
      </div>

      {/* Global CSS animation for driftDown */}
      <style>{`
        @keyframes driftDown {
          0% {
            transform: translateY(-20px) rotate(0deg);
          }
          100% {
            transform: translateY(105vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};
