import React from 'react';
import { StoryTimeline } from '../components/StoryTimeline';
import { FinalChapter } from '../components/FinalChapter';
import { Memory } from '../data/memories';

interface StoryPageProps {
  onSelectMemory: (memory: Memory) => void;
  onNavigateTab?: (tab: 'home' | 'map' | 'story' | 'thirtythree' | 'distance' | 'memories' | 'vault') => void;
}

export const StoryPage: React.FC<StoryPageProps> = ({ onSelectMemory, onNavigateTab }) => {
  return (
    <div className="pt-20 pb-20 min-h-screen bg-gradient-to-b from-[#220718] via-[#480d24] to-[#120712]">
      <StoryTimeline onSelectMemory={onSelectMemory} />
      <FinalChapter
        onExploreMap={() => (onNavigateTab ? onNavigateTab('map') : window.scrollTo({ top: 0, behavior: 'smooth' }))}
        onOpenVault={() => (onNavigateTab ? onNavigateTab('vault') : undefined)}
      />
    </div>
  );
};
