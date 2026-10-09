import React, { useState } from 'react';
import { EditorialMemoryGallery } from './EditorialMemoryGallery';
import { RealMemoryLightboxModal } from './RealMemoryLightboxModal';
import { GalleryMediaItem } from '../data/realMemories';
import { Memory } from '../data/memories';

interface MemoryGalleryProps {
  onSelectMemory?: (memory: Memory) => void;
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryMediaItem | null>(null);
  const [activeCategoryItems, setActiveCategoryItems] = useState<GalleryMediaItem[]>([]);

  const handleSelectItem = (item: GalleryMediaItem, categoryItems: GalleryMediaItem[]) => {
    setSelectedItem(item);
    setActiveCategoryItems(categoryItems);
  };

  return (
    <div className="w-full">
      <EditorialMemoryGallery onSelectItem={handleSelectItem} />
      <RealMemoryLightboxModal
        item={selectedItem}
        allItems={activeCategoryItems}
        onClose={() => setSelectedItem(null)}
        onNavigate={(item) => setSelectedItem(item)}
      />
    </div>
  );
};
