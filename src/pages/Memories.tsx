import React, { useState } from 'react';
import { EditorialMemoryGallery } from '../components/EditorialMemoryGallery';
import { RealMemoryLightboxModal } from '../components/RealMemoryLightboxModal';
import { GalleryMediaItem } from '../data/realMemories';
import { Memory } from '../data/memories';

interface MemoriesPageProps {
  onSelectMemory?: (memory: Memory) => void;
}

export const MemoriesPage: React.FC<MemoriesPageProps> = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryMediaItem | null>(null);
  const [activeCategoryItems, setActiveCategoryItems] = useState<GalleryMediaItem[]>([]);

  const handleSelectItem = (item: GalleryMediaItem, categoryItems: GalleryMediaItem[]) => {
    setSelectedItem(item);
    setActiveCategoryItems(categoryItems);
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-[#18061e] via-[#2a0e33] to-[#110515]">
      <EditorialMemoryGallery onSelectItem={handleSelectItem} />

      {/* Non-intrusive Media Lightbox Modal */}
      <RealMemoryLightboxModal
        item={selectedItem}
        allItems={activeCategoryItems}
        onClose={() => setSelectedItem(null)}
        onNavigate={(item) => setSelectedItem(item)}
      />
    </div>
  );
};
