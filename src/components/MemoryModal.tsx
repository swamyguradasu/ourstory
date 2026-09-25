import React from 'react';
import { Memory } from '../data/memories';
import { CinematicMemoryModal } from './CinematicMemoryModal';

interface MemoryModalProps {
  memory: Memory | null;
  onClose: () => void;
  onSelectMemory: (mem: Memory) => void;
}

export const MemoryModal: React.FC<MemoryModalProps> = (props) => {
  return <CinematicMemoryModal {...props} />;
};
