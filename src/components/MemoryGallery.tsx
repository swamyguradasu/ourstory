import React from 'react';
import { Memory } from '../data/memories';
import { EditorialMemoryGallery } from './EditorialMemoryGallery';

interface MemoryGalleryProps {
  onSelectMemory: (memory: Memory) => void;
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({ onSelectMemory }) => {
  return <EditorialMemoryGallery onSelectMemory={onSelectMemory} />;
};
