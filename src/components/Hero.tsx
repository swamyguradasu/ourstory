import React, { useState } from 'react';
import { ArrowRight, Compass, ChevronDown, Sparkles } from 'lucide-react';
import { RomanticButton } from './RomanticButton';
import { RoseHeaderFlourish } from './FlowerDecorations';

interface HeroProps {
  onEnterStory: () => void;
  onExploreMap: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onEnterStory, onExploreMap }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleEnterClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onEnterStory();
    }, 450);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1a081a] via-[#350b1a] to-[#120812] selection:bg-[#7A1838]">
      {/* Dynamic Animated Romantic Backdrop */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-transform duration-700 ease-out ${
          isTransitioning ? 'scale-110 filter blur-sm opacity-60' : 'scale-100 filter blur-0 opacity-100'
        }`}
      >
        {/* Radial Atmospheric Gradients: Dark Burgundy, Wine, Plum, Deep Purple */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[600px] bg-gradient-to-tr from-[#5B1028]/50 via-[#7A1838]/35 to-[#4B1D5A]/30 rounded-full blur-[130px] animate-pulse-glow" />
        <div className="absolute bottom-10 left-1/4 w-[550px] h-[450px] bg-gradient-to-r from-[#241025]/85 via-[#3A0718]/65 to-[#4B1D5A]/45 rounded-full blur-[110px]" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-gradient-to-br from-[#7A1838]/40 via-[#E89AAF]/15 to-transparent rounded-full blur-[95px]" />

        {/* Cinematic Anime Twilight Illustration Elements (SVG Vector art) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <svg
            className="w-full h-full max-w-6xl object-cover"
            viewBox="0 0 1200 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Golden celestial gradient */}
              <radialGradient id="celestialCore" cx="600" cy="400" r="350" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#D8B46A" stopOpacity="0.18" />
                <stop offset="50%" stopColor="#7A1838" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#120812" stopOpacity="0" />
              </radialGradient>
              {/* Constellation line glow */}
              <linearGradient id="lineGlow" x1="200" y1="200" x2="1000" y2="600" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#E89AAF" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#D8B46A" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#E89AAF" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Glowing Celestial Field */}
            <circle cx="600" cy="400" r="350" fill="url(#celestialCore)" />

            {/* Subtle Constellation Geometric Rings */}
            <circle cx="600" cy="400" r="280" stroke="#D8B46A" strokeWidth="0.75" strokeDasharray="4 8" strokeOpacity="0.25" />
            <circle cx="600" cy="400" r="190" stroke="#E89AAF" strokeWidth="0.5" strokeDasharray="2 6" strokeOpacity="0.2" />
            <circle cx="600" cy="400" r="390" stroke="#D8B46A" strokeWidth="0.5" strokeOpacity="0.15" />

            {/* Story Orbit Trail Lines */}
            <path
              d="M150 480 Q 380 220, 600 400 T 1050 320"
              stroke="url(#lineGlow)"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
            <path
              d="M200 350 Q 550 520, 850 280 T 1100 480"
              stroke="#D8B46A"
              strokeWidth="0.8"
              strokeDasharray="3 5"
              strokeOpacity="0.3"
            />

            {/* Faint Stars in the field */}
            <circle cx="280" cy="220" r="2" fill="#FFF4F1" opacity="0.8" className="animate-star-twinkle" />
            <circle cx="450" cy="180" r="1.5" fill="#D8B46A" opacity="0.9" />
            <circle cx="720" cy="190" r="2.5" fill="#E89AAF" opacity="0.75" />
            <circle cx="890" cy="260" r="1.5" fill="#FFF4F1" opacity="0.85" />
            <circle cx="980" cy="420" r="2" fill="#D8B46A" opacity="0.7" />
            <circle cx="340" cy="540" r="1.5" fill="#FFF4F1" opacity="0.6" />
            <circle cx="780" cy="580" r="2" fill="#E89AAF" opacity="0.8" />
          </svg>
        </div>

        {/* Film Grain & Vignette Texture */}
        <div className="absolute inset-0 film-grain" />
        <div className="absolute inset-0 cinematic-vignette" />
      </div>

      {/* Main Center Content */}
      <div 
        className={`relative z-20 max-w-4xl mx-auto px-6 text-center transition-all duration-700 ${
          isTransitioning ? 'opacity-0 scale-95 -translate-y-4' : 'opacity-100 scale-100 translate-y-0'
        }`}
      >
        {/* Subtle romantic kicker */}
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full border border-[#D8B46A]/25 bg-[#241025]/50 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#D8B46A]" />
          <span className="text-xs font-semibold tracking-[0.25em] text-[#E89AAF] uppercase">
            A Journey of Two Souls
          </span>
        </div>

        {/* Decorative Blooming Rose Flourish */}
        <RoseHeaderFlourish className="mb-4" />

        {/* Grand Title: OUR STORY */}
        <h1 className="font-cinzel text-4xl xs:text-5xl sm:text-7xl lg:text-8xl font-bold tracking-[0.12em] xs:tracking-[0.18em] text-[#FFF4F1] drop-shadow-[0_8px_30px_rgba(122,24,56,0.6)] mb-4">
          OUR STORY
        </h1>

        {/* Subtitle */}
        <p className="font-cormorant italic text-xl xs:text-2xl sm:text-3xl lg:text-4xl text-[#F7D7DF] font-normal tracking-wide max-w-2xl mx-auto mb-4 leading-relaxed">
          “A map of the moments that became our story.”
        </p>

        {/* Time Span Metadata */}
        <div className="flex items-center justify-center gap-3 text-xs sm:text-sm font-medium tracking-[0.3em] text-[#D8B46A] mb-8">
          <span>September 2024</span>
          <span className="text-[#E89AAF] opacity-60">—</span>
          <span>September 2026</span>
        </div>

        {/* Call to action buttons with RomanticButton */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 max-w-md mx-auto">
          {/* Primary Button: ENTER OUR STORY */}
          <RomanticButton
            onClick={handleEnterClick}
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            ENTER OUR STORY
          </RomanticButton>

          {/* Secondary Button: EXPLORE THE MAP */}
          <RomanticButton
            onClick={onExploreMap}
            variant="secondary"
            size="md"
            icon={<Compass className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            EXPLORE THE MAP
          </RomanticButton>
        </div>
      </div>

      {/* Bottom Center Scroll Indicator */}
      <div 
        onClick={onExploreMap}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer text-[#E89AAF]/60 hover:text-[#D8B46A] transition-colors z-20 group"
      >
        <span className="text-[10px] tracking-[0.3em] font-medium uppercase group-hover:tracking-[0.35em] transition-all">
          SCROLL TO UNVEIL
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#D8B46A]" />
      </div>
    </section>
  );
};

