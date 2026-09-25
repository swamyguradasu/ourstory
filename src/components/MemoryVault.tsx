import React, { useState, useEffect } from 'react';
import { MEMORIES, Memory } from '../data/memories';
import { RoseHeaderFlourish, RoseCornerAccent } from './FlowerDecorations';
import { triggerRomanticHearts } from './RomanticParticleSystem';
import { RomanticButton } from './RomanticButton';
import { getDiscoveredEggs, SECRET_DISCOVERIES, SecretDiscovery } from '../utils/easterEggs';
import {
  Lock,
  Unlock,
  Key,
  Camera,
  Mail,
  Bookmark,
  MapPin,
  Sparkles,
  Train,
  Heart,
  Feather,
  Ticket,
  Music,
  Coffee,
  Flower2,
  Calendar,
  Compass,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
} from 'lucide-react';

interface MemoryVaultProps {
  onSelectMemory?: (memory: Memory) => void;
}

type VaultSection = 'ALL' | 'PHOTOS' | 'LETTERS' | 'LITTLE_THINGS' | 'TRAVEL' | 'HIDDEN';

// Verified travel facts from application data (no invented stories)
const VERIFIED_TRAVEL_RECORDS = [
  {
    id: 'travel-vijayawada',
    destination: 'Vijayawada',
    date: 'December 10, 2025',
    tag: 'Hackathon & Riverside',
    sceneLevel: 13,
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop',
    excerpt:
      'Scene 13 & 14: Traveling beyond the college campus for the Vijayawada Hackathon. Three days of building code, riverside conversations by the Krishna, and learning how effortlessly we move together in the world.',
    route: 'Campus → Vijayawada City → Riverside Corridor',
  },
  {
    id: 'travel-train',
    destination: 'Train Journeys',
    date: 'December 2025',
    tag: 'The Train Home',
    sceneLevel: 15,
    image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=1200&auto=format&fit=crop',
    excerpt:
      'Scene 15: The rhythmic clatter of tracks heading home. Misty dawn windows, cold morning air, passing lush green paddy fields, and sharing earphones with head gently resting against the compartment window.',
    route: 'Vijayawada Junction → Coastal Route → Home',
  },
  {
    id: 'travel-antarvedi',
    destination: 'Antarvedi',
    date: 'January 31, 2026',
    tag: 'Sagara Sangamam',
    sceneLevel: 18,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    excerpt:
      'Scene 18 & 19: Standing at the sacred confluence where the Godavari river merges silently into the Bay of Bengal. Temple bells in the sunset breeze, damp ocean sands, and seven sacred steps taken facing the horizon.',
    route: 'Delta Highway → Antarvedi Shoreline → Lighthouse Point',
  },
  {
    id: 'travel-drive',
    destination: 'Open Highway Ride',
    date: 'March 2, 2026',
    tag: 'The First Long Drive',
    sceneLevel: 22,
    image: '/first long drive.png',
    excerpt:
      'Scene 22: Our first long motorcycle ride together travelling to college in the fresh morning air, followed by a joyful day walking the campus and giving announcements.',
    route: 'Highway Corridor → College Main Gate → Campus Quadrangle',
  },
];

// Little Things categories (purely categorical prompts, no fabricated personal events)
const LITTLE_THINGS_CATEGORIES = [
  {
    id: 'cat-tickets',
    title: 'Transit Tickets & Bus Passes',
    subtitle: 'Category 01 · Travel Artifacts',
    icon: Ticket,
    hint: 'Paper tickets from local bus commutes, railway passes, and boarding stubs kept in wallet folds.',
  },
  {
    id: 'cat-playlists',
    title: 'Midnight Playlists & Shared Audio',
    subtitle: 'Category 02 · Melodic Traces',
    icon: Music,
    hint: 'Late-night music recommendations, looped acoustic songs, and 2 AM voice notes exchanged across the screen.',
  },
  {
    id: 'cat-coffee',
    title: 'Cafeteria Slips & Corner Table Orders',
    subtitle: 'Category 03 · Everyday Hours',
    icon: Coffee,
    hint: 'Doodled paper cups, college canteen receipts, and shared warm drinks during busy study breaks.',
  },
  {
    id: 'cat-petals',
    title: 'Dried Rose Petals & Flora',
    subtitle: 'Category 04 · Preserved Keepsakes',
    icon: Flower2,
    hint: 'Delicate petals pressed between textbook pages, jasmine strands from temple trips, and dried autumn blooms.',
  },
  {
    id: 'cat-notes',
    title: 'Sticky Notes & Lecture Margins',
    subtitle: 'Category 05 · Silent Messages',
    icon: Feather,
    hint: 'Tiny folded papers passed across classroom aisles, notebook margin sketches, and handwritten exam cheers.',
  },
  {
    id: 'cat-threads',
    title: 'Temple Threads & Sacred Ties',
    subtitle: 'Category 06 · Protective Vows',
    icon: Heart,
    hint: 'Yellow turmeric threads, sanctified red cords, and gentle blessings tied on wrists for safe keeping.',
  },
];

// Empty Letters waiting to be written
const LETTERS_PLACEHOLDERS = [
  {
    id: 'letter-01',
    letterNo: 'LETTER I',
    addressee: 'To the girl across the lecture hall',
    dateLabel: 'Autumn 2024 · An Unwritten Chronicle',
  },
  {
    id: 'letter-02',
    letterNo: 'LETTER II',
    addressee: 'To the one who waited on the rainy platform',
    dateLabel: 'Winter 2025 · Midnight Draft',
  },
  {
    id: 'letter-03',
    letterNo: 'LETTER III',
    addressee: 'To my companion under the Antarvedi sky',
    dateLabel: 'Spring 2026 · Sealed in Silence',
  },
  {
    id: 'letter-04',
    letterNo: 'LETTER IV',
    addressee: 'To our tomorrow, wherever it leads',
    dateLabel: 'September 2026 and Beyond',
  },
];

export const MemoryVault: React.FC<MemoryVaultProps> = ({ onSelectMemory }) => {
  const [activeSection, setActiveSection] = useState<VaultSection>('ALL');
  const [discoveredEggs, setDiscoveredEggs] = useState<string[]>(() => getDiscoveredEggs());
  const [showSecretFolio, setShowSecretFolio] = useState<boolean>(false);

  // Sync discovered easter eggs across tabs or live discoveries
  useEffect(() => {
    const handleDiscovered = (e: Event) => {
      const customEvent = e as CustomEvent<{ allIds: string[] }>;
      if (customEvent.detail?.allIds) {
        setDiscoveredEggs(customEvent.detail.allIds);
      } else {
        setDiscoveredEggs(getDiscoveredEggs());
      }
    };

    window.addEventListener('secret-egg-discovered', handleDiscovered);
    return () => window.removeEventListener('secret-egg-discovered', handleDiscovered);
  }, []);

  // Password architecture state (ready for future passcodes, not currently forced)
  const [inputPasscode, setInputPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPasscodeField, setShowPasscodeField] = useState(false);
  const [passcodeNotice, setPasscodeNotice] = useState<string | null>(null);

  const handlePreviewHidden = (e: React.MouseEvent) => {
    triggerRomanticHearts(e.clientX, e.clientY);
    setIsUnlocked(!isUnlocked);
    setPasscodeNotice(
      !isUnlocked
        ? 'Vault chamber preview unlocked. Full custom passcode locking will be enabled in future updates.'
        : 'Vault chamber returned to protected standby.'
    );
  };

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerRomanticHearts();
    setIsUnlocked(true);
    setPasscodeNotice('Passcode recognized. Secret chamber preview revealed.');
  };

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 selection:bg-[#7A1838]">
      {/* Ambient background lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-[#5B1028]/25 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[500px] h-[500px] bg-[#4B1D5A]/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-20">
        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D8B46A]/30 bg-[#241025]/80 backdrop-blur-md mb-3 shadow-[0_0_15px_rgba(216,180,106,0.2)]">
            <Lock className="w-3.5 h-3.5 text-[#D8B46A]" />
            <span className="text-xs font-semibold tracking-[0.25em] text-[#E89AAF] uppercase font-cinzel">
              Private Digital Sanctuary
            </span>
          </div>

          <RoseHeaderFlourish className="mb-3" />

          <h1 className="font-cinzel text-4xl sm:text-6xl lg:text-7xl font-bold tracking-wider text-[#FFF4F1] drop-shadow-[0_8px_30px_rgba(122,24,56,0.6)] mb-3">
            MEMORY VAULT
          </h1>

          <p className="font-cormorant italic text-2xl sm:text-3xl text-[#F7D7DF] font-medium leading-relaxed max-w-2xl mx-auto">
            “Little things that deserve their own place.”
          </p>

          <div className="mt-4 flex items-center justify-center gap-3 text-xs sm:text-sm font-cinzel tracking-[0.25em] text-[#D8B46A]">
            <span>LETTERS</span>
            <span className="text-[#E89AAF]">·</span>
            <span>PHOTOGRAPHS</span>
            <span className="text-[#E89AAF]">·</span>
            <span>TRAVEL</span>
            <span className="text-[#E89AAF]">·</span>
            <span>HIDDEN ARCHIVE</span>
          </div>
        </div>

        {/* VAULT SECTION NAVIGATION PILLS (Swipeable on mobile) */}
        <div className="mb-8 sm:mb-12 flex items-center gap-2 overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-center max-w-4xl mx-auto py-1 px-1">
          {[
            { id: 'ALL', label: 'ALL SECTIONS', icon: Bookmark },
            { id: 'PHOTOS', label: 'PHOTOGRAPHS (25)', icon: Camera },
            { id: 'LETTERS', label: 'LETTERS', icon: Mail },
            { id: 'LITTLE_THINGS', label: 'LITTLE THINGS', icon: Sparkles },
            { id: 'TRAVEL', label: 'TRAVEL ARCHIVE', icon: Compass },
            { id: 'HIDDEN', label: 'HIDDEN MEMORIES', icon: Lock },
          ].map((tab) => {
            const isActive = activeSection === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as VaultSection)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 min-h-[44px] rounded-full text-xs font-cinzel tracking-[0.15em] transition-all duration-300 border cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#7A1838] to-[#5B1028] text-[#FFF4F1] border-[#D8B46A] shadow-[0_0_15px_rgba(216,180,106,0.4)] scale-105'
                    : 'bg-[#1e0a20]/75 text-[#E89AAF]/80 hover:text-[#FFF4F1] border-[#7A1838]/40 hover:border-[#D8B46A]/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-[#D8B46A]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* UNOBTRUSIVE SECRET MEMORIES COUNTER (Appears once discoveries are made) */}
        {discoveredEggs.length > 0 && (
          <div className="mb-12 flex flex-col items-center justify-center">
            <button
              onClick={() => setShowSecretFolio(!showSecretFolio)}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1b081e]/90 hover:bg-[#280c2d] border border-[#D8B46A]/50 hover:border-[#D8B46A] shadow-[0_0_20px_rgba(216,180,106,0.2)] text-xs transition-all cursor-pointer group"
              title="Click to view discovered secrets"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D8B46A] animate-pulse" />
              <span className="font-cinzel font-bold text-[#FFF4F1] tracking-wider">
                SECRET MEMORIES
              </span>
              <span className="font-mono text-xs text-[#D8B46A] bg-[#7A1838]/80 px-2.5 py-0.5 rounded-full font-bold">
                {discoveredEggs.length} / 7
              </span>
              <span className="text-[10px] text-[#E89AAF] group-hover:text-[#FFF4F1] underline font-cormorant italic ml-1">
                {showSecretFolio ? 'hide' : 'view discovered'}
              </span>
            </button>

            {/* Secret Memories Folio Drawer */}
            {showSecretFolio && (
              <div className="mt-4 w-full max-w-2xl bg-[#140516]/95 border border-[#7A1838]/50 rounded-2xl p-5 shadow-2xl animate-fade-in text-left">
                <div className="flex items-center justify-between border-b border-[#7A1838]/40 pb-2 mb-3">
                  <span className="font-cinzel text-xs font-bold text-[#D8B46A] tracking-wider uppercase">
                    Unspoken Keepsakes of Our Story
                  </span>
                  <span className="font-mono text-[10px] text-[#E89AAF]">
                    {discoveredEggs.length} OF 7 DISCOVERED
                  </span>
                </div>

                <div className="space-y-2.5">
                  {Object.values(SECRET_DISCOVERIES).map((egg) => {
                    const isFound = discoveredEggs.includes(egg.id);
                    return (
                      <div
                        key={egg.id}
                        className={`p-3 rounded-xl border transition-all ${
                          isFound
                            ? 'bg-[#1e0a22]/80 border-[#D8B46A]/40 text-[#FFF4F1]'
                            : 'bg-[#100412]/50 border-dashed border-[#7A1838]/30 text-[#E89AAF]/40'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-cinzel font-bold text-[#D8B46A]">
                            {isFound ? egg.title : 'Hidden Discovery'}
                          </span>
                          <span className="text-[10px] font-mono text-[#E89AAF]">
                            {isFound ? '✦ UNLOCKED' : 'LOCKED'}
                          </span>
                        </div>
                        <p className="font-cormorant italic text-sm text-[#F7D7DF]">
                          {isFound ? `“${egg.message}”` : egg.hint}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="space-y-20">
          {/* ============================================================== */}
          {/* SECTION 1: PHOTOGRAPHS (Secondary visual collection of all 25) */}
          {/* ============================================================== */}
          {(activeSection === 'ALL' || activeSection === 'PHOTOS') && (
            <div className="relative bg-[#1c081e]/85 backdrop-blur-xl border border-[#D8B46A]/40 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
              <RoseCornerAccent position="top-right" />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-[#7A1838]/40 pb-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-cinzel text-[#D8B46A] tracking-[0.2em] uppercase mb-1">
                    <Camera className="w-3.5 h-3.5 text-[#D8B46A]" />
                    <span>Visual Keepsake Collection</span>
                  </div>
                  <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#FFF4F1]">
                    PHOTOGRAPHS
                  </h2>
                </div>
                <span className="text-xs text-[#E89AAF] font-cormorant italic">
                  25 Canonical Anime Keepsake Plates
                </span>
              </div>

              {/* Grid of 25 photographs in polaroid / scrapbook format */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
                {MEMORIES.map((mem) => {
                  const levelFormatted = mem.level < 10 ? `0${mem.level}` : `${mem.level}`;
                  return (
                    <div
                      key={mem.id}
                      onClick={() => onSelectMemory && onSelectMemory(mem)}
                      className="group relative bg-[#120812] border border-[#7A1838]/40 hover:border-[#D8B46A] rounded-xl overflow-hidden p-2 transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(122,24,56,0.6)] cursor-pointer flex flex-col justify-between hover:-translate-y-1"
                    >
                      <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#180a19] mb-2 relative">
                        <img
                          src={mem.image}
                          alt={mem.title}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[#120812]/80 border border-[#D8B46A]/50 text-[8px] font-cinzel font-bold text-[#D8B46A]">
                          #{levelFormatted}
                        </div>
                      </div>
                      <div className="px-1 pb-1">
                        <div className="font-cinzel text-[11px] font-bold text-[#FFF4F1] truncate group-hover:text-[#D8B46A] transition-colors">
                          {mem.timelineTitle || mem.title}
                        </div>
                        <div className="text-[9px] text-[#E89AAF]/80 truncate font-mono mt-0.5">
                          {mem.date}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SECTION 2: LETTERS (Empty elegant cards: "A memory waiting...") */}
          {/* ============================================================== */}
          {(activeSection === 'ALL' || activeSection === 'LETTERS') && (
            <div className="relative bg-[#1c081e]/85 backdrop-blur-xl border border-[#D8B46A]/40 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
              <RoseCornerAccent position="top-left" />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-[#7A1838]/40 pb-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-cinzel text-[#D8B46A] tracking-[0.2em] uppercase mb-1">
                    <Mail className="w-3.5 h-3.5 text-[#D8B46A]" />
                    <span>Unopened Parchments</span>
                  </div>
                  <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#FFF4F1]">
                    LETTERS
                  </h2>
                </div>
                <span className="text-xs text-[#E89AAF] font-cormorant italic">
                  Sacred stationery reserved for future words
                </span>
              </div>

              {/* 4 Elegant Empty Letter Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {LETTERS_PLACEHOLDERS.map((letter) => (
                  <div
                    key={letter.id}
                    className="relative bg-gradient-to-br from-[#240d27]/90 to-[#18081a]/95 border border-[#D8B46A]/35 hover:border-[#D8B46A]/80 rounded-2xl p-6 sm:p-8 transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(122,24,56,0.4)] group overflow-hidden"
                  >
                    {/* Faint watermark wax seal illustration */}
                    <div className="absolute right-4 bottom-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                      <svg width="90" height="90" viewBox="0 0 100 100" fill="currentColor" className="text-[#D8B46A]">
                        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" />
                        <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" fill="none" />
                        <path d="M50 25 C40 25 35 32 35 40 C35 55 50 68 50 68 C50 68 65 55 65 40 C65 32 60 25 50 25 Z" fill="currentColor" />
                      </svg>
                    </div>

                    {/* Letter Header */}
                    <div className="flex items-center justify-between text-xs text-[#D8B46A] font-cinzel tracking-widest mb-4">
                      <span>{letter.letterNo}</span>
                      <span className="text-[11px] text-[#E89AAF]/70 font-sans">{letter.dateLabel}</span>
                    </div>

                    {/* Addressee line */}
                    <div className="text-xs font-cinzel text-[#FFF4F1]/70 mb-6 italic tracking-wider">
                      {letter.addressee}
                    </div>

                    {/* Elegant Required Statement */}
                    <div className="my-8 py-6 px-4 rounded-xl bg-[#120812]/60 border border-[#7A1838]/30 text-center">
                      <Feather className="w-5 h-5 text-[#D8B46A] mx-auto mb-2 opacity-75" />
                      <p className="font-cormorant italic text-xl sm:text-2xl text-[#F7D7DF] font-medium tracking-wide">
                        “A memory waiting to be written.”
                      </p>
                      <div className="text-[10px] font-cinzel text-[#E89AAF]/60 tracking-[0.2em] uppercase mt-2">
                        Parchment Sealed · Waiting For Ink
                      </div>
                    </div>

                    {/* Bottom wax seal detail */}
                    <div className="flex items-center justify-between text-xs text-[#E89AAF]/70 pt-3 border-t border-[#7A1838]/30 font-cormorant italic">
                      <span>Preserved in the Vault Folio</span>
                      <span className="text-[#D8B46A] font-cinzel text-[10px] tracking-widest uppercase">
                        Unopened
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SECTION 3: LITTLE THINGS (Categories only, no fabricated events) */}
          {/* ============================================================== */}
          {(activeSection === 'ALL' || activeSection === 'LITTLE_THINGS') && (
            <div className="relative bg-[#1c081e]/85 backdrop-blur-xl border border-[#D8B46A]/40 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
              <RoseCornerAccent position="top-right" />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-[#7A1838]/40 pb-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-cinzel text-[#D8B46A] tracking-[0.2em] uppercase mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#D8B46A]" />
                    <span>Scrapbook Taxonomy</span>
                  </div>
                  <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#FFF4F1]">
                    LITTLE THINGS
                  </h2>
                </div>
                <span className="text-xs text-[#E89AAF] font-cormorant italic">
                  Categorical drawers ready to hold small everyday tokens
                </span>
              </div>

              {/* 6 Category Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {LITTLE_THINGS_CATEGORIES.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="bg-[#240d27]/75 hover:bg-[#2c102f] border border-[#7A1838]/50 hover:border-[#D8B46A]/70 rounded-2xl p-6 transition-all duration-300 shadow-md hover:shadow-[0_10px_25px_rgba(122,24,56,0.3)] flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-10 h-10 rounded-full bg-[#120812] border border-[#D8B46A]/50 flex items-center justify-center text-[#D8B46A] group-hover:scale-110 group-hover:border-[#D8B46A] transition-all">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-cinzel text-[#D8B46A] tracking-widest uppercase">
                            {item.subtitle}
                          </span>
                        </div>

                        <h3 className="font-cinzel text-lg font-bold text-[#FFF4F1] group-hover:text-[#D8B46A] transition-colors mb-2">
                          {item.title}
                        </h3>

                        <p className="text-xs text-[#FFF4F1]/80 leading-relaxed font-sans font-light">
                          {item.hint}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[#7A1838]/30 flex items-center justify-between text-[11px] font-cinzel text-[#E89AAF]">
                        <span className="italic font-cormorant text-xs">Drawer open for keepsakes</span>
                        <span className="text-[#D8B46A] tracking-wider uppercase">0 entries</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SECTION 4: TRAVEL (Vijayawada, Train, Antarvedi, Annavaram)    */}
          {/* ============================================================== */}
          {(activeSection === 'ALL' || activeSection === 'TRAVEL') && (
            <div className="relative bg-[#1c081e]/85 backdrop-blur-xl border border-[#D8B46A]/40 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
              <RoseCornerAccent position="top-left" />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-[#7A1838]/40 pb-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-cinzel text-[#D8B46A] tracking-[0.2em] uppercase mb-1">
                    <Compass className="w-3.5 h-3.5 text-[#D8B46A]" />
                    <span>Grounded Geography</span>
                  </div>
                  <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#FFF4F1]">
                    TRAVEL
                  </h2>
                </div>
                <span className="text-xs text-[#E89AAF] font-cormorant italic">
                  Chronological journeys from Vijayawada hackathons to temple shores
                </span>
              </div>

              {/* 4 Authentic Travel Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {VERIFIED_TRAVEL_RECORDS.map((record) => (
                  <div
                    key={record.id}
                    className="group bg-[#240d27]/90 border border-[#7A1838]/50 hover:border-[#D8B46A]/80 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-[0_15px_35px_rgba(122,24,56,0.45)] flex flex-col justify-between"
                  >
                    {/* Widescreen image banner */}
                    <div className="w-full h-44 sm:h-52 relative overflow-hidden bg-[#140616]">
                      <img
                        src={record.image}
                        alt={record.destination}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#240d27] via-transparent to-black/30 pointer-events-none" />

                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#120812]/85 backdrop-blur-md border border-[#D8B46A]/50 text-[10px] font-cinzel font-bold text-[#D8B46A] tracking-wider uppercase">
                        {record.tag}
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#FFF4F1]">
                        <span className="font-cinzel font-bold text-lg sm:text-xl text-[#FFF4F1] drop-shadow">
                          {record.destination}
                        </span>
                        <span className="text-[11px] font-medium text-[#E89AAF] bg-[#120812]/80 px-2 py-0.5 rounded">
                          {record.date}
                        </span>
                      </div>
                    </div>

                    {/* Excerpt Details */}
                    <div className="p-6">
                      <p className="text-xs sm:text-sm text-[#FFF4F1]/90 leading-relaxed font-sans font-light mb-4">
                        {record.excerpt}
                      </p>

                      <div className="pt-3 border-t border-[#7A1838]/40 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-[#D8B46A] font-cinzel text-[11px]">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate max-w-[200px]">{record.route}</span>
                        </div>

                        {onSelectMemory && (
                          <button
                            onClick={() => {
                              const found = MEMORIES.find((m) => m.level === record.sceneLevel);
                              if (found) onSelectMemory(found);
                            }}
                            className="text-[#E89AAF] hover:text-[#FFF4F1] font-cinzel text-[10px] tracking-wider uppercase flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <span>View Scene #{record.sceneLevel}</span>
                            <ArrowRight className="w-3 h-3 text-[#D8B46A]" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* SECTION 5: HIDDEN MEMORIES (Locked-looking section)            */}
          {/* ============================================================== */}
          {(activeSection === 'ALL' || activeSection === 'HIDDEN') && (
            <div className="relative bg-[#1c081e]/90 backdrop-blur-xl border border-[#D8B46A]/50 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden">
              <RoseCornerAccent position="top-right" />

              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-[#7A1838]/40 pb-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-cinzel text-[#D8B46A] tracking-[0.2em] uppercase mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D8B46A]" />
                    <span>Protected Vault Sanctum</span>
                  </div>
                  <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#FFF4F1]">
                    HIDDEN MEMORIES
                  </h2>
                </div>
                <span className="text-xs text-[#E89AAF] font-cormorant italic">
                  Architecture ready for private custom security
                </span>
              </div>

              {/* Locked Chamber State Container */}
              <div className="relative rounded-2xl border border-[#D8B46A]/30 bg-gradient-to-b from-[#140616] via-[#1a081c] to-[#120414] p-8 sm:p-12 text-center overflow-hidden">
                {/* Glowing Lock Graphic */}
                <div className="relative w-20 h-20 rounded-full bg-[#240d27] border-2 border-[#D8B46A] flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(216,180,106,0.5),0_0_50px_rgba(122,24,56,0.6)]">
                  {isUnlocked ? (
                    <Unlock className="w-9 h-9 text-[#D8B46A] animate-pulse" />
                  ) : (
                    <Lock className="w-9 h-9 text-[#D8B46A] animate-pulse" />
                  )}
                  {/* Outer subtle glow ring */}
                  <span className="absolute -inset-2 rounded-full border border-[#E89AAF]/40 animate-ping pointer-events-none" />
                </div>

                {/* Required Header Phrase */}
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#FFF4F1] mb-2 tracking-wide">
                  “Some memories are waiting for you.”
                </h3>

                <p className="font-cormorant italic text-base sm:text-xl text-[#F7D7DF]/85 max-w-lg mx-auto mb-8 leading-relaxed">
                  A sanctuary built for future letters, whispered promises, and the untold chapters waiting on the horizon.
                </p>

                {/* Password Architecture Form (Ready for future custom passwords) */}
                <div className="max-w-md mx-auto space-y-4">
                  {showPasscodeField ? (
                    <form onSubmit={handlePasscodeSubmit} className="space-y-3">
                      <div className="relative">
                        <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D8B46A]" />
                        <input
                          type="password"
                          value={inputPasscode}
                          onChange={(e) => setInputPasscode(e.target.value)}
                          placeholder="Enter future custom passcode..."
                          className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#120812] border border-[#7A1838]/60 focus:border-[#D8B46A] focus:outline-none text-xs text-[#FFF4F1] placeholder-[#E89AAF]/50 tracking-widest shadow-inner text-center"
                        />
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <RomanticButton type="submit" variant="primary" size="sm">
                          UNSEAL CHAMBER
                        </RomanticButton>
                        <button
                          type="button"
                          onClick={() => setShowPasscodeField(false)}
                          className="text-xs font-cinzel text-[#E89AAF] hover:text-[#FFF4F1] px-3 py-1 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      {/* One-click preview toggle (does not require hardcoded password yet) */}
                      <RomanticButton
                        onClick={handlePreviewHidden}
                        variant={isUnlocked ? 'secondary' : 'primary'}
                        size="md"
                        icon={isUnlocked ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      >
                        {isUnlocked ? 'LOCK SANCTUM PREVIEW' : 'PEEK INTO THE FUTURE'}
                      </RomanticButton>

                      <button
                        onClick={() => setShowPasscodeField(true)}
                        className="px-5 py-3 rounded-full bg-[#1e0a20]/80 hover:bg-[#2c0e2f] border border-[#7A1838]/60 hover:border-[#D8B46A]/60 text-xs font-cinzel text-[#E89AAF] hover:text-[#FFF4F1] tracking-wider uppercase transition-all cursor-pointer"
                      >
                        Passcode Setup
                      </button>
                    </div>
                  )}

                  {passcodeNotice && (
                    <p className="text-xs font-sans text-[#D8B46A] tracking-wide pt-2 animate-fade-in">
                      {passcodeNotice}
                    </p>
                  )}
                </div>

                {/* Unlocked / Preview Sealed Chamber Content */}
                {isUnlocked && (
                  <div className="mt-10 pt-8 border-t border-[#7A1838]/40 text-left space-y-6 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7A1838]/30 border border-[#D8B46A]/40 text-[11px] font-cinzel text-[#D8B46A] tracking-wider uppercase">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Preview Architecture Active · Unsealed Keepsake Box</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-5 rounded-2xl bg-[#120812]/80 border border-[#7A1838]/40">
                        <div className="text-xs font-cinzel font-bold text-[#D8B46A] tracking-wider mb-1">
                          CHAPTER 26 · THE FIRST MORNING OF YEAR THREE
                        </div>
                        <p className="font-cormorant italic text-sm text-[#F7D7DF]/90">
                          “Reserved for September 2026. The words we will say when two years become forever.”
                        </p>
                      </div>

                      <div className="p-5 rounded-2xl bg-[#120812]/80 border border-[#7A1838]/40">
                        <div className="text-xs font-cinzel font-bold text-[#D8B46A] tracking-wider mb-1">
                          THE PROMISE SCROLL · SACRED SECRETS
                        </div>
                        <p className="font-cormorant italic text-sm text-[#F7D7DF]/90">
                          “Waiting to be written together under the coastal dusk.”
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* VAULT FOOTER */}
        <div className="mt-20 text-center max-w-xl mx-auto pt-10 border-t border-[#7A1838]/40">
          <RoseHeaderFlourish className="mb-3" />
          <p className="font-cormorant italic text-lg sm:text-xl text-[#F7D7DF]">
            “What is kept in the vault is never forgotten by the heart.”
          </p>
          <div className="text-xs font-cinzel text-[#D8B46A] tracking-[0.25em] mt-2">
            THE PRIVATE MEMORY VAULT · 2024 — 2026
          </div>
        </div>
      </div>
    </section>
  );
};
