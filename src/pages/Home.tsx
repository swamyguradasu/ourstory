import React from 'react';
import { Hero } from '../components/Hero';
import { MemoryMap } from '../components/MemoryMap';
import { Timeline } from '../components/Timeline';
import { ThenNowComparison } from '../components/ThenNowComparison';
import { MemoryGallery } from '../components/MemoryGallery';
import { FinalChapter } from '../components/FinalChapter';
import { Memory, MEMORIES } from '../data/memories';
import { Sparkles, Compass, Heart, ArrowRight } from 'lucide-react';

interface HomeProps {
  onSelectMemory: (memory: Memory) => void;
  onNavigateTab: (tab: 'home' | 'map' | 'story' | 'thirtythree' | 'memories' | 'vault') => void;
}

export const Home: React.FC<HomeProps> = ({ onSelectMemory, onNavigateTab }) => {
  const scrollToMap = () => {
    const mapEl = document.getElementById('story-map-section');
    if (mapEl) {
      mapEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigateTab('map');
    }
  };

  return (
    <div className="w-full">
      {/* Full screen cinematic Hero */}
      <Hero
        onEnterStory={() => onNavigateTab('story')}
        onExploreMap={scrollToMap}
      />

      {/* Cinematic Section Divider Marquee featuring the Canonical Scenes */}
      <div className="w-full py-3.5 bg-[#180a19] border-y border-[#7A1838]/40 overflow-hidden select-none">
        <div className="flex items-center gap-6 whitespace-nowrap text-xs font-cinzel tracking-[0.25em] text-[#D8B46A]/85 uppercase animate-shimmer">
          {MEMORIES.map((m, i) => (
            <React.Fragment key={m.id}>
              <span>{m.title}</span>
              {i < MEMORIES.length - 1 && <span className="text-[#E89AAF]">·</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Interactive Map Section */}
      <div id="story-map-section">
        <MemoryMap onSelectMemory={onSelectMemory} />
      </div>

      {/* Story Timeline Section */}
      <Timeline onSelectMemory={onSelectMemory} />

      {/* Special THEN → NOW Comparison Section */}
      <ThenNowComparison onExploreStory={() => onNavigateTab('story')} />

      {/* Memory Gallery Preview */}
      <MemoryGallery onSelectMemory={onSelectMemory} />

      {/* Final Chapter & Vow */}
      <FinalChapter
        onExploreMap={scrollToMap}
        onOpenVault={() => onNavigateTab('vault')}
      />
    </div>
  );
};
