import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GALLERY_CATEGORIES,
  MemoryCategorySection,
  GalleryMediaItem,
} from '../data/realMemories';
import { RoseHeaderFlourish, RoseCornerAccent } from './FlowerDecorations';
import { triggerRomanticHearts } from './RomanticParticleSystem';
import { RomanticButton } from './RomanticButton';
import {
  Search,
  Sparkles,
  X,
  Shuffle,
  ChevronDown,
  ChevronUp,
  Camera,
  Film,
  Image as ImageIcon,
  Compass,
  Heart,
  Moon,
  Maximize2,
  Play,
  Layers,
} from 'lucide-react';
import { triggerEasterEggDiscovery } from '../utils/easterEggs';

interface EditorialMemoryGalleryProps {
  onSelectItem: (item: GalleryMediaItem, categoryItems: GalleryMediaItem[]) => void;
}

export const EditorialMemoryGallery: React.FC<EditorialMemoryGalleryProps> = ({ onSelectItem }) => {
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  // Flatten all items across all categories for global counts and random memory picker
  const allMediaItems = useMemo(() => {
    return GALLERY_CATEGORIES.flatMap((c) => c.items);
  }, []);

  const totalPhotos = useMemo(() => {
    return allMediaItems.filter((m) => m.type === 'image').length;
  }, [allMediaItems]);

  const totalVideos = useMemo(() => {
    return allMediaItems.filter((m) => m.type === 'video').length;
  }, [allMediaItems]);

  // Toggle category collapse/expand
  const toggleCollapse = (categoryId: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  // Expand all categories
  const expandAll = () => {
    setCollapsedCategories({});
  };

  // Filtered categories and items based on search and tab selection
  const visibleCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return GALLERY_CATEGORIES.map((cat) => {
      // If a specific category tab is selected, check if this category matches
      if (selectedCategoryTab !== 'ALL' && cat.id !== selectedCategoryTab) {
        return null;
      }

      // If search query is active, filter items within this category
      let matchingItems = cat.items;
      if (q) {
        matchingItems = cat.items.filter((item) => {
          return (
            item.title.toLowerCase().includes(q) ||
            (item.caption || '').toLowerCase().includes(q) ||
            item.filename.toLowerCase().includes(q) ||
            cat.title.toLowerCase().includes(q) ||
            cat.subtitle.toLowerCase().includes(q) ||
            cat.description.toLowerCase().includes(q)
          );
        });
      }

      if (matchingItems.length === 0 && q) {
        return null;
      }

      return {
        ...cat,
        items: matchingItems,
      };
    }).filter(Boolean) as MemoryCategorySection[];
  }, [selectedCategoryTab, searchQuery]);

  // Random Memory Action
  const handleRandomMemory = (e: React.MouseEvent) => {
    triggerRomanticHearts(e.clientX, e.clientY);
    const randomIndex = Math.floor(Math.random() * allMediaItems.length);
    const randomItem = allMediaItems[randomIndex];
    // Find category for context
    const parentCat = GALLERY_CATEGORIES.find((c) => c.items.some((x) => x.id === randomItem.id));
    onSelectItem(randomItem, parentCat ? parentCat.items : allMediaItems);
  };

  // Scroll to category smoothly
  const scrollToCategory = (catId: string) => {
    setSelectedCategoryTab(catId);
    if (catId !== 'ALL') {
      const el = document.getElementById(`category-${catId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="relative w-full min-h-screen py-10 sm:py-16 lg:py-20 px-3 sm:px-6 lg:px-8 selection:bg-[#7A1838]">
      {/* BACKGROUND AURA (POINTER-EVENTS-NONE) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-[#7A1838]/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#D8B46A]/10 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        {/* PAGE INTRODUCTION */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D8B46A]/30 bg-[#241025]/80 backdrop-blur-md mb-3.5 shadow-[0_0_15px_rgba(216,180,106,0.15)]">
            <button
              onClick={() => triggerEasterEggDiscovery('camera')}
              className="text-[#D8B46A] hover:text-[#FFF4F1] hover:scale-110 transition-transform cursor-pointer"
              title="A vintage keepsake lens"
              role="button"
              aria-label="Vintage camera"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-semibold tracking-[0.25em] text-[#E89AAF] uppercase font-cinzel">
              The Complete Photo Album
            </span>
          </div>

          <RoseHeaderFlourish className="mb-3" />

          {/* EXACT TITLE */}
          <h1 className="font-cinzel text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-bold tracking-wider text-[#FFF4F1] drop-shadow-[0_8px_30px_rgba(122,24,56,0.6)] mb-3">
            OUR MEMORIES
          </h1>

          {/* EXACT SUBTITLE */}
          <p className="font-cormorant italic text-xl sm:text-3xl text-[#F7D7DF] font-medium leading-relaxed max-w-2xl mx-auto">
            “Every picture holds a little piece of our story.”
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-cinzel tracking-[0.18em] text-[#D8B46A]">
            <span>{GALLERY_CATEGORIES.length} CATEGORIES</span>
            <span className="text-[#E89AAF]">·</span>
            <span>{totalPhotos} PHOTOGRAPHS</span>
            <span className="text-[#E89AAF]">·</span>
            <span>{totalVideos} VIDEOS</span>
          </div>
        </div>

        {/* SEARCH & "GET LOST IN A MEMORY" ACTION BAR */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
          {/* Real-time Search Input */}
          <div className="relative w-full sm:w-84">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D8B46A]" />
            <input
              type="text"
              placeholder="Search across all 191 memories…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 min-h-[44px] py-2.5 rounded-full bg-[#1e0a20]/90 border border-[#7A1838]/60 focus:border-[#D8B46A] focus:outline-none text-xs sm:text-sm text-[#FFF4F1] placeholder-[#E89AAF]/50 tracking-wider shadow-inner backdrop-blur-md transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#E89AAF] hover:text-[#FFF4F1] transition-colors p-1"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Random Memory Selector */}
          <RomanticButton
            onClick={handleRandomMemory}
            variant="primary"
            size="sm"
            icon={<Shuffle className="w-4 h-4 text-[#D8B46A]" />}
            className="w-full sm:w-auto shadow-[0_0_20px_rgba(122,24,56,0.6)]"
          >
            GET LOST IN A MEMORY
          </RomanticButton>
        </div>

        {/* CATEGORY JUMP TABS BAR */}
        <div className="mb-12 flex items-center gap-2 overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-center max-w-6xl mx-auto py-1.5">
          <button
            onClick={() => scrollToCategory('ALL')}
            className={`min-h-[42px] px-4 py-2 rounded-full text-xs font-cinzel tracking-[0.15em] transition-all duration-300 border cursor-pointer shrink-0 flex items-center gap-2 ${
              selectedCategoryTab === 'ALL'
                ? 'bg-gradient-to-r from-[#7A1838] to-[#5B1028] text-[#FFF4F1] border-[#D8B46A] shadow-[0_0_15px_rgba(216,180,106,0.45)] scale-105 font-bold'
                : 'bg-[#1e0a20]/75 text-[#E89AAF]/85 hover:text-[#FFF4F1] border-[#7A1838]/40 hover:border-[#D8B46A]/60'
            }`}
          >
            <span>ALL CATEGORIES</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#7A1838]/40 text-[#D8B46A] font-mono">
              191
            </span>
          </button>

          {GALLERY_CATEGORIES.map((cat) => {
            const isSelected = selectedCategoryTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className={`min-h-[42px] px-4 py-2 rounded-full text-xs font-cinzel tracking-[0.15em] transition-all duration-300 border cursor-pointer shrink-0 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#7A1838] to-[#5B1028] text-[#FFF4F1] border-[#D8B46A] shadow-[0_0_15px_rgba(216,180,106,0.45)] scale-105 font-bold'
                    : 'bg-[#1e0a20]/75 text-[#E89AAF]/85 hover:text-[#FFF4F1] border-[#7A1838]/40 hover:border-[#D8B46A]/60'
                }`}
              >
                <span>
                  {cat.categoryNumber}. {cat.title}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#7A1838]/40 text-[#E89AAF] font-mono">
                  {cat.items.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* CATEGORY GALLERY SECTIONS */}
        {visibleCategories.length > 0 ? (
          <div className="space-y-16 sm:space-y-24">
            {visibleCategories.map((category) => {
              const isCollapsed = Boolean(collapsedCategories[category.id]);
              const isClosing = Boolean(category.isClosingChapter);
              const photosCount = category.items.filter((i) => i.type === 'image').length;
              const videosCount = category.items.filter((i) => i.type === 'video').length;

              return (
                <section
                  key={category.id}
                  id={`category-${category.id}`}
                  className={`scroll-mt-24 p-5 sm:p-8 lg:p-10 rounded-3xl sm:rounded-[36px] border transition-all duration-500 ${
                    isClosing
                      ? 'bg-gradient-to-br from-[#08101d] via-[#101f35] to-[#070e18] border-[#64B5F6]/45 shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(30,58,138,0.35)]'
                      : 'bg-[#18071a]/90 sm:bg-[#18071a]/80 backdrop-blur-xl border-[#7A1838]/50 shadow-[0_20px_50px_rgba(0,0,0,0.85)]'
                  }`}
                >
                  {/* CATEGORY HEADER */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#7A1838]/40 pb-6 mb-8">
                    <div className="space-y-2 max-w-3xl">
                      {/* Badge */}
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-cinzel font-bold tracking-[0.2em] uppercase border ${
                            isClosing
                              ? 'bg-[#0e213d] text-[#64B5F6] border-[#64B5F6]/50 shadow-[0_0_12px_rgba(100,181,246,0.3)]'
                              : 'bg-[#2a0e28] text-[#D8B46A] border-[#D8B46A]/50 shadow-[0_0_12px_rgba(216,180,106,0.2)]'
                          }`}
                        >
                          {isClosing ? 'FINAL CHAPTER' : `CATEGORY ${category.categoryNumber}`}
                        </span>

                        <span className="text-xs font-cinzel text-[#E89AAF]">
                          {photosCount > 0 && `${photosCount} Photos`}
                          {photosCount > 0 && videosCount > 0 && ' · '}
                          {videosCount > 0 && `${videosCount} Videos`}
                        </span>
                      </div>

                      {/* Title */}
                      <h2
                        className={`font-cinzel text-2xl xs:text-3xl sm:text-4xl font-bold tracking-wide ${
                          isClosing
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#E0F2FE] via-[#90CAF9] to-[#64B5F6]'
                            : 'text-[#FFF4F1]'
                        } drop-shadow-md`}
                      >
                        {category.title}
                      </h2>

                      {/* Subtitle */}
                      <p
                        className={`font-cormorant italic text-base sm:text-lg ${
                          isClosing ? 'text-[#90CAF9]' : 'text-[#E89AAF]'
                        }`}
                      >
                        {category.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#FFF4F1]/85 font-sans font-light leading-relaxed">
                        {category.description}
                      </p>
                    </div>

                    {/* Collapse / Expand Toggle Button */}
                    <button
                      onClick={() => toggleCollapse(category.id)}
                      className="self-start sm:self-center flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-full bg-[#241025] hover:bg-[#7A1838] border border-[#D8B46A]/50 text-xs font-cinzel text-[#FFF4F1] transition-all cursor-pointer shadow-md shrink-0"
                    >
                      <span>{isCollapsed ? 'EXPAND GALLERY' : 'COLLAPSE'}</span>
                      {isCollapsed ? (
                        <ChevronDown className="w-4 h-4 text-[#D8B46A]" />
                      ) : (
                        <ChevronUp className="w-4 h-4 text-[#D8B46A]" />
                      )}
                    </button>
                  </div>

                  {/* ALL PHOTOGRAPHS DISPLAYED TOGETHER (MASONRY COLUMNS WITH PRESERVED NATURAL ASPECT RATIO) */}
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      >
                        <div className="columns-1 xs:columns-2 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
                          {category.items.map((item, itemIdx) => {
                            return (
                              <div
                                key={item.id + itemIdx}
                                className="break-inside-avoid mb-4 group relative rounded-2xl overflow-hidden border border-[#7A1838]/40 hover:border-[#D8B46A] bg-[#120812] cursor-pointer shadow-md hover:shadow-[0_15px_35px_rgba(122,24,56,0.6),0_0_25px_rgba(216,180,106,0.35)] transition-all duration-400 hover:-translate-y-1.5"
                                onClick={(e) => {
                                  triggerRomanticHearts(e.clientX, e.clientY);
                                  onSelectItem(item, category.items);
                                }}
                              >
                                {/* Natural Image (Preserves Original Portrait/Landscape Aspect Ratio - No Forced Square Cropping!) */}
                                {item.type === 'image' ? (
                                  <img
                                    src={item.url}
                                    alt={item.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-auto object-cover rounded-2xl transition-transform duration-700 ease-out group-hover:scale-104 block"
                                  />
                                ) : (
                                  <div className="relative w-full rounded-2xl overflow-hidden bg-black/80">
                                    {item.poster ? (
                                      <img
                                        src={item.poster}
                                        alt={item.title}
                                        loading="lazy"
                                        className="w-full h-auto object-cover rounded-2xl group-hover:scale-104 transition-transform duration-700 block"
                                      />
                                    ) : (
                                      <div className="w-full py-16 flex flex-col items-center justify-center bg-[#1a081c]">
                                        <Film className="w-10 h-10 text-[#E89AAF] mb-2" />
                                        <span className="text-[11px] font-cinzel text-[#D8B46A]">
                                          VIDEO
                                        </span>
                                      </div>
                                    )}
                                    {/* Video Play Badge */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                                      <div className="w-12 h-12 rounded-full bg-[#120514]/85 border border-[#D8B46A]/80 text-[#D8B46A] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <Play className="w-5 h-5 ml-0.5" />
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Hover Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0e040f]/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                {/* Subtle Corner Rose Accent on Hover */}
                                <RoseCornerAccent
                                  position="top-right"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                                />

                                {/* Bottom Info Overlay on Hover */}
                                <div className="absolute bottom-0 left-0 right-0 p-3.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                  <div className="text-xs font-cinzel font-bold text-[#FFF4F1] drop-shadow-md line-clamp-1">
                                    {item.title}
                                  </div>
                                  {item.caption && (
                                    <div className="text-[11px] font-cormorant italic text-[#E89AAF] line-clamp-1">
                                      {item.caption.replace(/^“|”$/g, '')}
                                    </div>
                                  )}
                                  <div className="mt-1 flex items-center gap-1 text-[10px] font-cinzel text-[#D8B46A] uppercase tracking-wider">
                                    <Maximize2 className="w-3 h-3" />
                                    <span>ENLARGE</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>
              );
            })}
          </div>
        ) : (
          /* EMPTY SEARCH STATE */
          <div className="text-center py-20 p-8 rounded-3xl bg-[#1e0a20]/60 border border-[#7A1838]/40 max-w-lg mx-auto shadow-2xl backdrop-blur-md">
            <div className="w-16 h-16 rounded-full bg-[#140616] border border-[#D8B46A]/50 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(216,180,106,0.3)]">
              <span className="text-3xl select-none" role="img" aria-label="rose">
                🌹
              </span>
            </div>

            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#FFF4F1] mb-2">
              No Whispered Memories Found
            </h3>

            <p className="font-cormorant italic text-base text-[#F7D7DF]/85 mb-6 max-w-sm mx-auto leading-relaxed">
              No photographs or videos match “{searchQuery}”.
            </p>

            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategoryTab('ALL');
              }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#7A1838] to-[#5B1028] hover:from-[#921E44] hover:to-[#7A1838] border border-[#D8B46A]/60 text-xs font-cinzel font-bold text-[#FFF4F1] tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(122,24,56,0.5)] cursor-pointer"
            >
              SHOW ALL 191 MEMORIES
            </button>
          </div>
        )}

        {/* BOTTOM FOOTNOTE FLOURISH */}
        <div className="mt-20 sm:mt-28 text-center max-w-xl mx-auto pt-10 border-t border-[#7A1838]/40">
          <RoseHeaderFlourish className="mb-3" />
          <p className="font-cormorant italic text-lg sm:text-xl text-[#F7D7DF]">
            “Every frame a breath. Every chapter an eternal promise.”
          </p>
          <div className="text-xs font-cinzel text-[#D8B46A] tracking-[0.25em] mt-2">
            SEPTEMBER 2024 — FOREVER IN OUR HEARTS
          </div>
        </div>
      </div>
    </div>
  );
};
