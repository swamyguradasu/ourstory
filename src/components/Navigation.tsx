import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Heart } from 'lucide-react';

interface NavigationProps {
  currentTab: 'home' | 'map' | 'story' | 'thirtythree' | 'distance' | 'memories' | 'vault';
  onSelectTab: (tab: 'home' | 'map' | 'story' | 'thirtythree' | 'distance' | 'memories' | 'vault') => void;
  likesCount: number;
  onHeartClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  likesCount,
  onHeartClick,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems: { id: 'map' | 'story' | 'thirtythree' | 'distance' | 'memories' | 'vault'; label: string }[] = [
    { id: 'map', label: 'MAP' },
    { id: 'story', label: 'STORY' },
    { id: 'thirtythree', label: '33 DAYS' },
    { id: 'distance', label: 'DISTANCE' },
    { id: 'memories', label: 'MEMORIES' },
    { id: 'vault', label: 'VAULT' },
  ];

  const handleNavClick = (tab: 'home' | 'map' | 'story' | 'thirtythree' | 'distance' | 'memories' | 'vault') => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? 'bg-[#120812]/92 backdrop-blur-md border-b border-[#D8B46A]/20 py-2 sm:py-3 shadow-[0_10px_30px_rgba(18,8,18,0.7)]'
            : 'bg-transparent py-3 sm:py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Zone 1: Logo Wordmark (single text element) */}
          <button
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-1.5 sm:gap-2 text-left min-h-[44px] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D8B46A]"
            aria-label="Our Story - Home"
          >
            <span className="font-cinzel text-base sm:text-xl font-bold tracking-[0.16em] sm:tracking-[0.2em] text-[#FFF4F1] group-hover:text-[#D8B46A] transition-colors flex items-center gap-1.5">
              OUR STORY
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8B46A] opacity-75 group-hover:scale-125 transition-transform" />
            </span>
          </button>

          {/* Zone 2: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-xs font-semibold tracking-[0.25em] transition-all relative py-2 focus:outline-none focus-visible:text-[#D8B46A] ${
                    isActive
                      ? 'text-[#D8B46A]'
                      : 'text-[#FFF4F1]/75 hover:text-[#FFF4F1]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D8B46A] to-transparent animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Interactive Controls (Heart Pulse & Compact Mobile Toggle) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onHeartClick}
              className="flex items-center gap-1.5 px-3 min-h-[44px] rounded-full border border-[#7A1838]/40 hover:border-[#E89AAF]/60 bg-[#241025]/70 hover:bg-[#35102a] text-[#E89AAF] hover:text-[#FFF4F1] transition-all cursor-pointer text-xs"
              title="Send love"
              aria-label={`Send love, current count ${likesCount}`}
            >
              <Heart className="w-4 h-4 fill-current text-[#E89AAF]" />
              <span className="font-mono text-xs font-bold text-[#D8B46A]">{likesCount}</span>
            </button>

            {/* Compact Mobile Menu Toggle Button (44px min touch target) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 rounded-xl bg-[#241025]/80 border border-[#7A1838]/50 text-[#FFF4F1] hover:text-[#D8B46A] focus:outline-none cursor-pointer transition-colors"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#D8B46A]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* COMPACT MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#0e040f]/98 backdrop-blur-2xl md:hidden pt-20 px-5 flex flex-col justify-between pb-8 animate-fadeIn overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left text-base font-cinzel font-bold tracking-widest min-h-[50px] px-3 rounded-xl flex items-center justify-between border-b border-[#7A1838]/30 transition-all ${
                currentTab === 'home'
                  ? 'text-[#D8B46A] bg-[#241025]/80'
                  : 'text-[#FFF4F1] hover:bg-[#241025]/40'
              }`}
            >
              <span>HOME PROLOGUE</span>
              {currentTab === 'home' && <Sparkles className="w-4 h-4 text-[#D8B46A]" />}
            </button>

            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-base font-cinzel font-semibold tracking-widest min-h-[50px] px-3 rounded-xl flex items-center justify-between border-b border-[#7A1838]/30 transition-all ${
                    isActive
                      ? 'text-[#D8B46A] bg-[#241025]/80'
                      : 'text-[#FFF4F1]/85 hover:bg-[#241025]/40 hover:text-[#FFF4F1]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <Sparkles className="w-4 h-4 text-[#D8B46A]" />}
                </button>
              );
            })}
          </div>

          <div className="mt-6 border-t border-[#7A1838]/40 pt-4 text-center">
            <p className="text-xs text-[#E89AAF]/80 font-cormorant italic">
              “A map of the moments that became our story.”
            </p>
            <div className="text-[10px] font-cinzel text-[#D8B46A] tracking-[0.2em] uppercase mt-1">
              September 2024 — September 2026
            </div>
          </div>
        </div>
      )}
    </>
  );
};
