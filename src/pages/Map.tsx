import React from 'react';
import { MemoryMap } from '../components/MemoryMap';
import { Memory } from '../data/memories';
import { Compass, Sparkles, MapPin } from 'lucide-react';

interface MapPageProps {
  onSelectMemory: (memory: Memory) => void;
}

export const MapPage: React.FC<MapPageProps> = ({ onSelectMemory }) => {
  return (
    <div className="pt-20 pb-16 min-h-screen bg-[#120812]">
      <MemoryMap onSelectMemory={onSelectMemory} />
    </div>
  );
};
