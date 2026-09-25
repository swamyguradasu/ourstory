import React from 'react';
import { DistanceChapter } from '../components/DistanceChapter';
import { Memory } from '../data/memories';

interface DistancePageProps {
  onContinue: (memory: Memory) => void;
  onSelectMemory?: (memory: Memory) => void;
}

export const DistancePage: React.FC<DistancePageProps> = ({
  onContinue,
  onSelectMemory,
}) => {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-[#180424] via-[#2d0a3c] to-[#0f0216]">
      <DistanceChapter
        onContinue={onContinue}
        onSelectMemory={onSelectMemory}
      />
    </div>
  );
};
