import React from 'react';
import { MemoryVault } from '../components/MemoryVault';
import { Memory } from '../data/memories';

interface VaultPageProps {
  onSelectMemory?: (memory: Memory) => void;
}

export const VaultPage: React.FC<VaultPageProps> = ({ onSelectMemory }) => {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-[#0f0310] via-[#1a0514] to-[#0a020b]">
      <MemoryVault onSelectMemory={onSelectMemory} />
    </div>
  );
};
