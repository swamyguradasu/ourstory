import React from 'react';
import { ThirtyThreeDays } from '../components/ThirtyThreeDays';
import { Memory } from '../data/memories';

interface ThirtyThreeDaysPageProps {
  onContinueStory: () => void;
  onSelectMemory?: (memory: Memory) => void;
}

export const ThirtyThreeDaysPage: React.FC<ThirtyThreeDaysPageProps> = ({
  onContinueStory,
  onSelectMemory,
}) => {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-[#200a18] via-[#351022] to-[#120512]">
      <ThirtyThreeDays
        onContinueStory={onContinueStory}
        onSelectMemory={onSelectMemory}
      />
    </div>
  );
};
