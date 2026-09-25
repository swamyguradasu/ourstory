import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { RomanticParticleSystem } from './components/RomanticParticleSystem';
import { RomanticCursor } from './components/RomanticCursor';
import { ProgressIndicator } from './components/ProgressIndicator';
import { AmbientMusicPlayer } from './components/AmbientMusicPlayer';
import { SecretDiscoveryToast } from './components/SecretDiscoveryToast';
import { MemoryModal } from './components/MemoryModal';
import { recordMemoryDiscovery } from './utils/journeyProgress';
import { Home } from './pages/Home';
import { MapPage } from './pages/Map';
import { StoryPage } from './pages/Story';
import { MemoriesPage } from './pages/Memories';
import { VaultPage } from './pages/Vault';
import { ThirtyThreeDaysPage } from './pages/ThirtyThreeDaysPage';
import { DistancePage } from './pages/DistancePage';
import { Memory } from './data/memories';
import confetti from 'canvas-confetti';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'map' | 'story' | 'thirtythree' | 'distance' | 'memories' | 'vault'>('home');
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [likesCount, setLikesCount] = useState<number>(() => {
    try {
      const stored = localStorage.getItem('our_story_likes');
      return stored ? parseInt(stored, 10) : 48;
    } catch {
      return 48;
    }
  });

  const handleHeartClick = () => {
    const nextCount = likesCount + 1;
    setLikesCount(nextCount);
    try {
      localStorage.setItem('our_story_likes', nextCount.toString());
      // Trigger subtle mini confetti heart burst
      confetti({
        particleCount: 20,
        spread: 45,
        origin: { x: 0.9, y: 0.1 },
        colors: ['#E89AAF', '#D8B46A', '#FFF4F1'],
      });
    } catch {
      // ignore
    }
  };

  const handleSelectTab = (tab: 'home' | 'map' | 'story' | 'thirtythree' | 'distance' | 'memories' | 'vault') => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectMemory = (mem: Memory | null) => {
    if (mem) {
      recordMemoryDiscovery(mem.id);
    }
    setSelectedMemory(mem);
  };

  // Section atmospheric background mapping
  const getTabBackground = () => {
    switch (currentTab) {
      case 'home':
        // Dark burgundy-purple gradient with roses and particles
        return 'bg-gradient-to-b from-[#1a081a] via-[#350b1a] to-[#120812]';
      case 'map':
        // Warm parchment + dark romantic vignette
        return 'bg-[#130614]';
      case 'story':
        // Deep wine-red gradient
        return 'bg-gradient-to-b from-[#220718] via-[#480d24] to-[#120712]';
      case 'thirtythree':
        // Warm house-like lighting ambience with burgundy and amber hearth glows
        return 'bg-gradient-to-b from-[#200a18] via-[#351022] to-[#120512]';
      case 'distance':
        // Deep midnight purple, starlight and dark crimson
        return 'bg-gradient-to-b from-[#180424] via-[#2d0a3c] to-[#0f0216]';
      case 'memories':
        // Dark plum cinematic gallery atmosphere
        return 'bg-gradient-to-b from-[#18061e] via-[#2a0e33] to-[#110515]';
      case 'vault':
        // Almost-black burgundy with subtle glowing particles
        return 'bg-gradient-to-b from-[#0f0310] via-[#1a0514] to-[#0a020b]';
      default:
        return 'bg-[#120812]';
    }
  };

  return (
    <div className={`relative min-h-screen ${getTabBackground()} text-[#FFF4F1] overflow-x-hidden selection:bg-[#7A1838] transition-colors duration-700`}>
      {/* Global Film Grain & Soft Vignette */}
      <div className="fixed inset-0 pointer-events-none film-grain z-0 opacity-40" />
      <div className="fixed inset-0 pointer-events-none cinematic-vignette z-0 opacity-60" />

      {/* Visual Ambiance Particles */}
      <RomanticParticleSystem />
      <RomanticCursor />

      {/* Floating Navigation */}
      <Navigation
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        likesCount={likesCount}
        onHeartClick={handleHeartClick}
      />

      {/* Page Routing */}
      <main className="w-full relative z-10">
        {currentTab === 'home' && (
          <Home
            onSelectMemory={handleSelectMemory}
            onNavigateTab={handleSelectTab}
          />
        )}
        {currentTab === 'map' && (
          <MapPage onSelectMemory={handleSelectMemory} />
        )}
        {currentTab === 'story' && (
          <StoryPage
            onSelectMemory={handleSelectMemory}
            onNavigateTab={handleSelectTab}
          />
        )}
        {currentTab === 'thirtythree' && (
          <ThirtyThreeDaysPage
            onContinueStory={() => handleSelectTab('distance')}
            onSelectMemory={handleSelectMemory}
          />
        )}
        {currentTab === 'distance' && (
          <DistancePage
            onContinue={(mem) => {
              handleSelectMemory(mem);
            }}
            onSelectMemory={handleSelectMemory}
          />
        )}
        {currentTab === 'memories' && (
          <MemoriesPage onSelectMemory={handleSelectMemory} />
        )}
        {currentTab === 'vault' && (
          <VaultPage onSelectMemory={handleSelectMemory} />
        )}
      </main>

      {/* Chapter Memory Modal */}
      <MemoryModal
        memory={selectedMemory}
        onClose={() => setSelectedMemory(null)}
        onSelectMemory={handleSelectMemory}
      />

      {/* Fixed bottom milestone statistics pill & global journey progress indicator */}
      <ProgressIndicator
        currentTab={currentTab}
        onSelectMemory={handleSelectMemory}
        onNavigateTab={handleSelectTab}
      />

      {/* Floating Ambient Music Controller (Bottom-Right) */}
      <AmbientMusicPlayer />

      {/* Global Secret Discovery Notification Toast */}
      <SecretDiscoveryToast />
    </div>
  );
}
