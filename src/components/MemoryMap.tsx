import React, { useState, useRef, useEffect } from 'react';
import { MEMORIES, Memory } from '../data/memories';
import { MapNode } from './MapNode';
import { triggerEasterEggDiscovery } from '../utils/easterEggs';
import { Compass, ZoomIn, ZoomOut, RotateCcw, Sparkles, Navigation, Heart, Lock, Unlock, ArrowRight } from 'lucide-react';

interface MemoryMapProps {
  onSelectMemory: (memory: Memory) => void;
  selectedMemoryId?: string | null;
}

export const MemoryMap: React.FC<MemoryMapProps> = ({
  onSelectMemory,
  selectedMemoryId,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const [hoveredMemory, setHoveredMemory] = useState<Memory | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [adventureMode, setAdventureMode] = useState<boolean>(false);
  const [transitioningNode, setTransitioningNode] = useState<Memory | null>(null);
  // Unlocked memory IDs in adventure mode (defaults to all unlocked as requested)
  const [unlockedIds, setUnlockedIds] = useState<string[]>(() => MEMORIES.map((m) => m.id));

  // Canvas dimensions for SVG coordinate system
  const CANVAS_WIDTH = 1600;
  const CANVAS_HEIGHT = 950;

  // Compute total unlocked count
  const unlockedCount = adventureMode ? unlockedIds.length : MEMORIES.length;
  const progressPercent = Math.round((unlockedCount / MEMORIES.length) * 100);

  // Filter memories by category if chosen
  const filteredMemories = activeCategory === 'all'
    ? MEMORIES
    : MEMORIES.filter((m) => m.category === activeCategory);

  // Generate continuous serpentine hand-drawn path connecting all 25 waypoints in sequence
  const pathD = MEMORIES.reduce((acc, mem, index) => {
    const x = (mem.coordinates.x / 100) * CANVAS_WIDTH;
    const y = (mem.coordinates.y / 100) * CANVAS_HEIGHT;
    if (index === 0) return `M ${x} ${y}`;

    const prev = MEMORIES[index - 1];
    const prevX = (prev.coordinates.x / 100) * CANVAS_WIDTH;
    const prevY = (prev.coordinates.y / 100) * CANVAS_HEIGHT;

    // Organic hand-drawn bezier curves with slight curvature variations
    const dx = x - prevX;
    const dy = y - prevY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Natural curve offsets
    const normalX = -dy / dist;
    const normalY = dx / dist;
    const bend = ((index % 2 === 0 ? 1 : -1) * dist * 0.18);

    const cp1x = prevX + dx * 0.4 + normalX * bend;
    const cp1y = prevY + dy * 0.2 + normalY * bend;
    const cp2x = prevX + dx * 0.7 - normalX * bend * 0.5;
    const cp2y = prevY + dy * 0.8 - normalY * bend * 0.5;

    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`;
  }, '');

  // Handle memory selection with camera-like zoom transition toward selected node
  const handleSelect = (mem: Memory) => {
    if (adventureMode && !unlockedIds.includes(mem.id)) {
      return;
    }
    // 1. Zoom toward selected node coordinate
    setTransitioningNode(mem);

    // Center scroll on node
    scrollToCoordinate(mem.coordinates.x);

    // 2. Open cinematic full-screen memory experience
    setTimeout(() => {
      onSelectMemory(mem);
      setTransitioningNode(null);
    }, 450);
  };

  // Center on specific memory coordinate
  const scrollToCoordinate = (xPercent: number) => {
    if (scrollWrapperRef.current) {
      const scrollPos = (xPercent / 100) * (CANVAS_WIDTH * zoomLevel) - scrollWrapperRef.current.clientWidth / 2;
      scrollWrapperRef.current.scrollTo({ left: Math.max(0, scrollPos), behavior: 'smooth' });
    }
  };

  // Categories filter list
  const categories = [
    { id: 'all', label: 'All 25 Locations' },
    { id: 'college', label: 'College Days' },
    { id: 'friendship', label: 'Deepening Bond' },
    { id: 'milestones', label: 'Milestones' },
    { id: 'journey', label: 'Travel & Hackathon' },
    { id: 'commitments', label: 'Sacred Vows' },
    { id: 'family', label: 'Family Circle' },
    { id: 'distance', label: 'Distance' },
    { id: 'reunion', label: 'The Reunion' },
  ];

  return (
    <section className="relative w-full py-12 sm:py-16 px-3 sm:px-6 lg:px-8 bg-[#120812] overflow-hidden select-none">
      {/* Background ambient color nebulas */}
      <div className="absolute top-1/4 left-1/4 w-[700px] h-[550px] bg-[#5B1028]/25 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[750px] h-[600px] bg-[#4B1D5A]/25 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#7A1838]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-20 space-y-6">
        {/* MAP HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge & Journey Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D8B46A]/35 bg-[#241025]/85 backdrop-blur-md mb-4 shadow-[0_0_15px_rgba(216,180,106,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-[#D8B46A]" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#D8B46A] uppercase font-cinzel">
              OUR STORY · 25 memories • one journey
            </span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-wider text-[#FFF4F1] leading-tight mb-2">
            OUR STORY
          </h2>
          <p className="font-cormorant italic text-xl sm:text-2xl lg:text-3xl text-[#F7D7DF] font-medium leading-relaxed">
            “Every place on this map holds a piece of us.”
          </p>
        </div>

        {/* MAP PROGRESS BAR & CONTROLS HUD */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#1f0b21]/90 border border-[#7A1838]/50 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.7)] flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Progress Tracker Readout */}
          <div className="w-full md:w-auto flex-1 max-w-md">
            <div className="flex items-center justify-between text-xs font-cinzel font-bold text-[#D8B46A] mb-1.5 tracking-wider">
              <span className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#D8B46A]" />
                JOURNEY PROGRESSION
              </span>
              <span className="text-[#FFF4F1] tabular-nums">
                {unlockedCount} / {MEMORIES.length} MEMORIES
              </span>
            </div>

            {/* Glowing animated progress line */}
            <div className="relative w-full h-2.5 rounded-full bg-[#120812] border border-[#7A1838]/60 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#7A1838] via-[#E89AAF] to-[#D8B46A] transition-all duration-700 ease-out animate-progress-glow"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Category Filter Pills & Mode Toggle (Swipeable horizontal chips on mobile) */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar py-1">
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`min-h-[40px] px-3.5 py-2 rounded-full text-xs font-cinzel font-semibold tracking-wider transition-all duration-300 border cursor-pointer shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-[#7A1838] text-[#FFF4F1] border-[#D8B46A]/80 shadow-[0_0_12px_rgba(216,180,106,0.35)]'
                    : 'bg-[#241025]/60 text-[#E89AAF]/80 hover:text-[#FFF4F1] border-[#7A1838]/40 hover:border-[#D8B46A]/40'
                }`}
              >
                {cat.label}
              </button>
            ))}

            {/* Quick jump to start / end */}
            <button
              onClick={() => scrollToCoordinate(7)}
              className="min-h-[40px] px-3 py-2 rounded-xl bg-[#241025] hover:bg-[#7A1838] text-xs font-cinzel text-[#D8B46A] border border-[#D8B46A]/30 transition-colors shrink-0"
              title="Jump to Start"
            >
              Start
            </button>
            <button
              onClick={() => scrollToCoordinate(94)}
              className="min-h-[40px] px-3 py-2 rounded-xl bg-[#241025] hover:bg-[#7A1838] text-xs font-cinzel text-[#D8B46A] border border-[#D8B46A]/30 transition-colors shrink-0"
              title="Jump to Finale"
            >
              Finale
            </button>
          </div>
        </div>

        {/* Mobile Swipe Hint Badge */}
        <div className="md:hidden flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#1b081e]/90 border border-[#D8B46A]/30 text-[11px] font-cinzel text-[#E89AAF] mx-auto w-fit shadow-md">
          <Compass className="w-3.5 h-3.5 text-[#D8B46A] animate-pulse" />
          <span>Swipe to pan map horizontally ↔ • Tap to open</span>
        </div>

        {/* ILLUSTRATED FANTASY PARCHMENT MAP CANVAS */}
        <div
          ref={containerRef}
          data-story-map="true"
          className="relative w-full rounded-2xl sm:rounded-3xl border-2 border-[#D8B46A]/60 overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95),inset_0_0_60px_rgba(36,16,37,0.8)] bg-[#180a19]"
        >
          {/* Parchment Deckled Edge & Vintage Vignette Overlay */}
          <div className="absolute inset-0 pointer-events-none z-20 shadow-[inset_0_0_80px_rgba(18,8,18,0.9),inset_0_0_30px_rgba(122,24,56,0.35)]" />
          <div className="absolute inset-0 pointer-events-none z-20 border-4 sm:border-8 border-[#241025]/40 rounded-2xl sm:rounded-3xl" />

          {/* Corner Ornamental Scrollwork (Romantic Storybook Flourishes) */}
          <div className="absolute top-3 left-3 z-30 pointer-events-none opacity-60 text-[#D8B46A]">
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 24C4 12.9543 12.9543 4 24 4" />
              <path d="M4 36C4 18.3269 18.3269 4 36 4" strokeDasharray="2 3" />
              <circle cx="8" cy="8" r="3" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute top-3 right-3 z-30 pointer-events-none opacity-60 text-[#D8B46A]">
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M44 24C44 12.9543 35.0457 4 24 4" />
              <path d="M44 36C44 18.3269 29.6731 4 12 4" strokeDasharray="2 3" />
              <circle cx="40" cy="8" r="3" fill="currentColor" />
            </svg>
          </div>

          {/* Floating HUD controls (Zoom in, Zoom out, Reset) with 44px touch targets */}
          <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-40 flex items-center gap-1.5 sm:gap-2 bg-[#120812]/92 backdrop-blur-md border border-[#D8B46A]/40 rounded-2xl p-1 shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 1.4))}
              className="min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center p-2 text-[#E89AAF] hover:text-[#FFF4F1] hover:bg-[#7A1838]/60 rounded-xl transition-colors cursor-pointer"
              title="Zoom In"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.8))}
              className="min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center p-2 text-[#E89AAF] hover:text-[#FFF4F1] hover:bg-[#7A1838]/60 rounded-xl transition-colors cursor-pointer"
              title="Zoom Out"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center p-2 text-[#E89AAF] hover:text-[#FFF4F1] hover:bg-[#7A1838]/60 rounded-xl transition-colors cursor-pointer"
              title="Reset Zoom"
              aria-label="Reset zoom"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Realm Banners floating atop map */}
          <div className="absolute top-5 left-5 z-30 hidden sm:flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-full bg-[#120812]/90 backdrop-blur-md border border-[#D8B46A]/50 text-xs font-cinzel font-bold text-[#D8B46A] flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#E89AAF] animate-pulse" />
              <span>THE SACRED ODYSSEY (SEPTEMBER 2024 — 2026)</span>
            </div>
          </div>

          {/* Outer scrollable viewport for responsive pan and touch scroll */}
          <div
            ref={scrollWrapperRef}
            className="w-full overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing scrollbar-thin touch-pan-x touch-pan-y"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <div
              className="relative min-w-[1200px] sm:min-w-[1400px] md:min-w-[1600px] h-[520px] sm:h-[680px] md:h-[750px] transition-all duration-500 ease-out origin-center"
              style={{
                transformOrigin: transitioningNode ? `${transitioningNode.coordinates.x}% ${transitioningNode.coordinates.y}%` : 'center center',
                transform: transitioningNode ? `scale(${zoomLevel * 1.85})` : `scale(${zoomLevel})`,
                filter: transitioningNode ? 'blur(3px)' : 'none',
              }}
            >
              {/* Camera Zoom & Darkening Soft Rose Overlay */}
              <div
                className={`absolute inset-0 z-50 pointer-events-none transition-opacity duration-500 bg-[#120812]/80 backdrop-blur-sm flex items-center justify-center ${
                  transitioningNode ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {transitioningNode && (
                  <div className="flex flex-col items-center gap-3 animate-fadeIn">
                    <div className="relative">
                      <Sparkles className="w-8 h-8 text-[#D8B46A] animate-spin" />
                      <span className="absolute -top-3 -right-2 text-xl">🌹</span>
                    </div>
                    <span className="font-cinzel text-xs font-bold text-[#D8B46A] tracking-[0.25em] uppercase">
                      Entering {transitioningNode.mapLocationName || transitioningNode.title}...
                    </span>
                  </div>
                )}
              </div>

              {/* SVG STORYBOOK MAP ARTWORK LAYER */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Parchment gradient wash */}
                  <linearGradient id="parchmentNight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1a0a1c" />
                    <stop offset="25%" stopColor="#250f28" />
                    <stop offset="50%" stopColor="#1b081e" />
                    <stop offset="75%" stopColor="#220d26" />
                    <stop offset="100%" stopColor="#150617" />
                  </linearGradient>

                  {/* River water gradient */}
                  <linearGradient id="riverGleam" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3A0718" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#4B1D5A" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#241025" stopOpacity="0.3" />
                  </linearGradient>

                  {/* Red/Wine Glowing Dotted Journey Path Gradient */}
                  <linearGradient id="journeyPathGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#D8B46A" />
                    <stop offset="20%" stopColor="#E89AAF" />
                    <stop offset="45%" stopColor="#7A1838" />
                    <stop offset="70%" stopColor="#E89AAF" />
                    <stop offset="100%" stopColor="#D8B46A" />
                  </linearGradient>

                  {/* Red dashed glow filter */}
                  <filter id="pathGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Base Parchment Atmosphere */}
                <rect width={CANVAS_WIDTH} height={CANVAS_HEIGHT} fill="url(#parchmentNight)" />

                {/* Topographic Contour Lines (Storybook Cartography) */}
                <g opacity="0.16" stroke="#D8B46A" strokeWidth="0.75" fill="none">
                  <path d="M -50 200 C 300 120, 600 280, 1000 160 S 1500 240, 1650 180" />
                  <path d="M -50 380 C 250 480, 750 320, 1150 440 S 1450 320, 1650 400" />
                  <path d="M -50 620 C 350 540, 700 720, 1200 610 S 1500 700, 1650 640" />
                  <path d="M -50 820 C 400 780, 850 880, 1300 800 S 1550 840, 1650 820" />
                </g>

                {/* Shimmering River of Longing (winding through realms) */}
                <path
                  d="M 120 0 C 180 300, 320 450, 480 520 S 780 480, 920 620 S 1200 850, 1350 950"
                  stroke="url(#riverGleam)"
                  strokeWidth="32"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.45"
                />
                <path
                  d="M 120 0 C 180 300, 320 450, 480 520 S 780 480, 920 620 S 1200 850, 1350 950"
                  stroke="#E89AAF"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  fill="none"
                  opacity="0.3"
                />

                {/* Hand-Drawn Illustrated Mountain Silhouettes (Whispering Ridges) */}
                <g opacity="0.3" stroke="#D8B46A" strokeWidth="1" fill="#241025">
                  {/* Western Peaks */}
                  <polygon points="50,180 90,110 130,180" />
                  <polygon points="110,185 150,125 190,185" />
                  <polygon points="170,190 205,140 240,190" />
                  {/* Hatching on mountains */}
                  <line x1="90" y1="110" x2="90" y2="180" strokeDasharray="2 3" />
                  <line x1="150" y1="125" x2="150" y2="185" strokeDasharray="2 3" />

                  {/* Central Ridge Peaks */}
                  <polygon points="620,180 665,95 710,180" />
                  <polygon points="690,185 735,115 780,185" />
                  <polygon points="760,190 800,135 840,190" />
                  <line x1="665" y1="95" x2="665" y2="180" strokeDasharray="2 3" />

                  {/* Eastern Reunion Peaks */}
                  <polygon points="1380,240 1430,140 1480,240" />
                  <polygon points="1460,245 1510,165 1560,245" />
                  <line x1="1430" y1="140" x2="1430" y2="240" strokeDasharray="2 3" />
                </g>

                {/* Hand-drawn Whimsical Trees and Whispering Groves */}
                <g opacity="0.35" stroke="#E89AAF" strokeWidth="0.8" fill="none">
                  {/* Campus Grove */}
                  <circle cx="160" cy="270" r="14" fill="#3A0718" fillOpacity="0.4" />
                  <circle cx="185" cy="280" r="12" fill="#3A0718" fillOpacity="0.4" />
                  <circle cx="210" cy="265" r="15" fill="#3A0718" fillOpacity="0.4" />
                  {/* Temple Coast Palms */}
                  <circle cx="840" cy="780" r="16" fill="#4B1D5A" fillOpacity="0.4" />
                  <circle cx="875" cy="790" r="13" fill="#4B1D5A" fillOpacity="0.4" />
                  <circle cx="910" cy="775" r="15" fill="#4B1D5A" fillOpacity="0.4" />
                </g>

                {/* Delicate Hand-Drawn Clouds & Breeze Swirls */}
                <g opacity="0.25" stroke="#F7D7DF" strokeWidth="1" fill="none">
                  <path d="M 280 100 Q 310 80, 340 100 Q 370 80, 400 100 Q 340 120, 280 100 Z" />
                  <path d="M 980 140 Q 1010 120, 1040 140 Q 1070 120, 1100 140 Q 1040 160, 980 140 Z" />
                  <path d="M 1250 680 Q 1280 660, 1310 680 Q 1340 660, 1370 680 Q 1310 700, 1250 680 Z" />
                </g>

                {/* Hand-Drawn Birds Soaring in Flight */}
                <g opacity="0.45" stroke="#D8B46A" strokeWidth="1.25" fill="none">
                  <path d="M 320 160 Q 330 150, 340 160 Q 350 150, 360 160" />
                  <path d="M 345 175 Q 352 167, 360 175 Q 368 167, 375 175" />
                  <path d="M 1120 220 Q 1130 210, 1140 220 Q 1150 210, 1160 220" />
                  <path d="M 1145 235 Q 1152 227, 1160 235 Q 1168 227, 1175 235" />
                </g>

                {/* Hand-drawn Whimsical Little Stars */}
                <g opacity="0.4" fill="#D8B46A">
                  <polygon points="460,110 462,116 468,118 462,120 460,126 458,120 452,118 458,116" />
                  <polygon points="820,80 822,86 828,88 822,90 820,96 818,90 812,88 818,86" />
                  <polygon points="1280,180 1282,185 1287,187 1282,189 1280,194 1278,189 1273,187 1278,185" />
                  <polygon points="560,840 562,845 567,847 562,849 560,854 558,849 553,847 558,845" />
                  <polygon points="1060,820 1062,825 1067,827 1062,829 1060,834 1058,829 1053,827 1058,825" />
                </g>

                {/* Hand-Drawn Storybook Roses in Corners */}
                <g opacity="0.35" stroke="#E89AAF" strokeWidth="1" fill="#7A1838">
                  <circle cx="80" cy="850" r="16" />
                  <path d="M 80 840 Q 90 850, 80 860 Q 70 850, 80 840 Z" fill="#E89AAF" fillOpacity="0.4" />
                  <path d="M 60 850 Q 80 830, 95 860" fill="none" stroke="#D8B46A" />
                  <circle cx="1520" cy="820" r="16" />
                  <path d="M 1520 810 Q 1530 820, 1520 830 Q 1510 820, 1520 810 Z" fill="#E89AAF" fillOpacity="0.4" />
                </g>

                {/* CONTINUOUS HAND-DRAWN GLOWING DOTTED JOURNEY PATH */}
                {/* 1. Underlying Dark Mask Route */}
                <path
                  d={pathD}
                  stroke="#120812"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.8"
                />

                {/* 2. Soft Red/Wine Outer Halo Glow */}
                <path
                  d={pathD}
                  stroke="#7A1838"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.5"
                  filter="url(#pathGlowFilter)"
                />

                {/* 3. The Canonical Animated Glowing Red/Rose Dotted Treasure Map Path */}
                <path
                  d={pathD}
                  stroke="url(#journeyPathGlow)"
                  strokeWidth="3.2"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="8 12"
                  className="animate-map-dash"
                />

                {/* Antique Ornamental Compass Rose in Lower Left (Hidden Discovery 1) */}
                <g
                  transform="translate(130, 720) scale(0.85)"
                  opacity="0.55"
                  className="cursor-pointer group hover:opacity-100 transition-opacity"
                  onClick={() => triggerEasterEggDiscovery('compass')}
                  role="button"
                  aria-label="Ancient map compass"
                >
                  {/* Outer delicate rings */}
                  <circle cx="0" cy="0" r="70" stroke="#D8B46A" strokeWidth="1.2" strokeDasharray="4 4" fill="none" className="group-hover:stroke-[#FFF4F1] transition-colors" />
                  <circle cx="0" cy="0" r="54" stroke="#E89AAF" strokeWidth="0.8" fill="none" />
                  <circle cx="0" cy="0" r="38" stroke="#D8B46A" strokeWidth="0.5" fill="none" />
                  {/* Compass Stars Points */}
                  <polygon points="0,-65 10,-15 0,0" fill="#D8B46A" />
                  <polygon points="0,-65 -10,-15 0,0" fill="#7A1838" />
                  <polygon points="0,65 10,15 0,0" fill="#7A1838" />
                  <polygon points="0,65 -10,15 0,0" fill="#D8B46A" />
                  <polygon points="65,0 15,10 0,0" fill="#D8B46A" />
                  <polygon points="65,0 15,-10 0,0" fill="#7A1838" />
                  <polygon points="-65,0 -15,10 0,0" fill="#7A1838" />
                  <polygon points="-65,0 -15,-10 0,0" fill="#D8B46A" />
                  {/* Diagonal star points */}
                  <polygon points="40,-40 10,-5 0,0" fill="#E89AAF" opacity="0.7" />
                  <polygon points="-40,-40 -5,-10 0,0" fill="#E89AAF" opacity="0.7" />
                  <polygon points="40,40 5,10 0,0" fill="#E89AAF" opacity="0.7" />
                  <polygon points="-40,40 -10,5 0,0" fill="#E89AAF" opacity="0.7" />
                  {/* Center fleur ring */}
                  <circle cx="0" cy="0" r="6" fill="#D8B46A" />
                  {/* Cardinal letterings */}
                  <text x="-5" y="-72" fill="#D8B46A" fontSize="13" fontFamily="Cinzel" fontWeight="bold">N</text>
                  <text x="75" y="4" fill="#D8B46A" fontSize="13" fontFamily="Cinzel" fontWeight="bold">E</text>
                  <text x="-4" y="82" fill="#D8B46A" fontSize="13" fontFamily="Cinzel" fontWeight="bold">S</text>
                  <text x="-86" y="4" fill="#D8B46A" fontSize="13" fontFamily="Cinzel" fontWeight="bold">W</text>
                </g>

                {/* Tiny Train Carriage resting near the coastal rails (Hidden Discovery 2) */}
                <g
                  transform="translate(630, 480) scale(0.95)"
                  className="cursor-pointer group opacity-60 hover:opacity-100 transition-all"
                  onClick={() => triggerEasterEggDiscovery('train')}
                  role="button"
                  aria-label="Tiny railway carriage"
                >
                  <rect x="0" y="0" width="26" height="13" rx="2" fill="#241025" stroke="#D8B46A" strokeWidth="1" className="group-hover:stroke-[#E89AAF] transition-colors" />
                  <rect x="3" y="3" width="5" height="4" rx="0.5" fill="#D8B46A" opacity="0.8" />
                  <rect x="10" y="3" width="5" height="4" rx="0.5" fill="#D8B46A" opacity="0.8" />
                  <rect x="17" y="3" width="5" height="4" rx="0.5" fill="#D8B46A" opacity="0.8" />
                  <circle cx="6" cy="14" r="2.5" fill="#7A1838" stroke="#D8B46A" strokeWidth="0.8" />
                  <circle cx="20" cy="14" r="2.5" fill="#7A1838" stroke="#D8B46A" strokeWidth="0.8" />
                </g>

                {/* Hand-Drawn Banner Ribbons for Realm Legend */}
                <g transform="translate(680, 880)" opacity="0.4">
                  <path d="M -150 0 L 150 0 L 170 -12 L 150 -24 L -150 -24 L -170 -12 Z" fill="#241025" stroke="#D8B46A" strokeWidth="0.8" />
                  <text x="0" y="-8" fill="#D8B46A" fontSize="10" fontFamily="Cinzel" textAnchor="middle" letterSpacing="3">
                    CHART OF SACRED DESTINIES
                  </text>
                </g>
              </svg>

              {/* INTERACTIVE MAP NODES LAYER (All 25 Waypoints) */}
              {filteredMemories.map((mem) => {
                const isLocked = adventureMode && !unlockedIds.includes(mem.id);
                return (
                  <MapNode
                    key={mem.id}
                    memory={mem}
                    isSelected={selectedMemoryId === mem.id}
                    isHovered={hoveredMemory?.id === mem.id}
                    isLocked={isLocked}
                    onSelect={handleSelect}
                    onHover={setHoveredMemory}
                  />
                );
              })}
            </div>
          </div>

          {/* MAP FOOTER BAR */}
          <div className="px-6 py-4 bg-[#140616]/95 border-t border-[#7A1838]/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E89AAF] relative z-20">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <Sparkles className="w-4 h-4 text-[#D8B46A] shrink-0" />
              <span className="font-cormorant italic text-base sm:text-lg text-[#FFF4F1]">
                “Follow the path. Open the memories. Remember the moments.”
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-cinzel text-[#FFF4F1]/75">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D8B46A] shadow-[0_0_8px_rgba(216,180,106,0.8)]" />
                WAYPOINT NODE
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 border-t-2 border-dashed border-[#E89AAF]" />
                GLOWING ADVENTURE PATH
              </span>
              <span className="flex items-center gap-1.5 text-[#D8B46A]">
                <Heart className="w-3.5 h-3.5 fill-[#D8B46A]" />
                OUR STORY CROWN
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
