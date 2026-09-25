import React from 'react';
import { EditorialMemoryGallery } from '../components/EditorialMemoryGallery';
import { Memory } from '../data/memories';

interface MemoriesPageProps {
  onSelectMemory: (memory: Memory) => void;
}

export const MemoriesPage: React.FC<MemoriesPageProps> = ({ onSelectMemory }) => {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-[#18061e] via-[#2a0e33] to-[#110515]">
      <EditorialMemoryGallery onSelectMemory={onSelectMemory} />
    </div>
  );
};
