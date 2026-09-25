import React, { useState } from 'react';
import { MEMORIES, Memory } from '../data/memories';
import { Calendar, MapPin, Sparkles, BookOpen, Music, Heart, ArrowUpRight } from 'lucide-react';
import { RoseTimelineSeparator, RoseHeaderFlourish } from './FlowerDecorations';
import { triggerRomanticHearts } from './RomanticParticleSystem';

interface TimelineProps {
  onSelectMemory: (memory: Memory) => void;
}

const TimelineThumbnail: React.FC<{ mem: Memory; levelFormatted: string }> = ({ mem, levelFormatted }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="w-full md:w-56 h-40 sm:h-44 rounded-xl overflow-hidden bg-[#160817] border border-[#7A1838]/50 relative shrink-0 group-hover:border-[#D8B46A]/60 transition-colors shadow">
      {!hasError ? (
        <img
          src={mem.image}
          alt={`${mem.title} - ${mem.shortTitle}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-gradient-to-br from-[#3A0718] via-[#241025] to-[#4B1D5A]">
          <Sparkles className="w-6 h-6 text-[#D8B46A] mb-1.5 opacity-80" />
          <div className="font-cinzel text-xs font-bold text-[#FFF4F1] line-clamp-1">
            {mem.title}
          </div>
          <div className="font-cormorant italic text-[11px] text-[#E89AAF] mt-0.5">
            {mem.location}
          </div>
        </div>
      )}
      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#120812]/85 border border-[#D8B46A]/40 text-[10px] font-cinzel font-bold text-[#D8B46A]">
        SCENE {levelFormatted}
      </div>
    </div>
  );
};

export const Timeline: React.FC<TimelineProps> = ({ onSelectMemory }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All 25 Scenes' },
    { id: 'college', label: 'College Days' },
    { id: 'friendship', label: 'Deepening Bond' },
    { id: 'milestones', label: 'Milestones' },
    { id: 'journey', label: 'Travel & Hackathon' },
    { id: 'commitments', label: 'Sacred Vows' },
    { id: 'family', label: 'Family Circle' },
    { id: 'distance', label: 'Distance' },
    { id: 'reunion', label: 'The Reunion' },
  ];

  const filteredMemories = selectedFilter === 'all'
    ? MEMORIES
    : MEMORIES.filter(m => m.category === selectedFilter);

  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#120812]">
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#7A1838]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-[#4B1D5A]/25 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D8B46A]/25 bg-[#241025]/60 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D8B46A]" />
            <span className="text-xs font-semibold tracking-[0.25em] text-[#E89AAF] uppercase">
              The Chronological Scroll
            </span>
          </div>

          <RoseHeaderFlourish className="mb-2" />

          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wide text-[#FFF4F1] mb-3">
            Our Chapters in Time
          </h2>
          <p className="font-cormorant italic text-lg sm:text-2xl text-[#F7D7DF]/85 leading-relaxed">
            From the first morning in the lecture hall to the eternal horizon of September 2026.
          </p>

          {/* Category Filter Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all duration-300 border cursor-pointer ${
                  selectedFilter === cat.id
                    ? 'bg-[#7A1838] text-[#FFF4F1] border-[#D8B46A]/60 shadow-[0_0_15px_rgba(216,180,106,0.3)]'
                    : 'bg-[#241025]/50 text-[#E89AAF]/80 hover:text-[#FFF4F1] border-[#7A1838]/30 hover:border-[#D8B46A]/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vertical Timeline Track */}
        <div className="relative pl-6 sm:pl-10 border-l border-[#D8B46A]/30 ml-3 sm:ml-8 space-y-10 sm:space-y-14">
          {filteredMemories.map((mem, index) => {
            const levelFormatted = mem.level < 10 ? `0${mem.level}` : `${mem.level}`;
            const prevMem = index > 0 ? filteredMemories[index - 1] : null;
            const isNewChapter = !prevMem || prevMem.chapter !== mem.chapter;

            return (
              <React.Fragment key={mem.id}>
                {isNewChapter && index > 0 && (
                  <div className="-ml-6 sm:-ml-10 pt-4 pb-2">
                    <RoseTimelineSeparator title={mem.chapter} />
                  </div>
                )}
                <div className="relative group">
                  {/* Timeline Node Dot */}
                  <div 
                    className="absolute -left-[31px] sm:-left-[47px] top-4 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#120812] border-2 border-[#D8B46A] flex items-center justify-center group-hover:scale-125 transition-transform duration-300 shadow-[0_0_15px_rgba(216,180,106,0.5)] cursor-pointer z-20"
                    onClick={(e) => {
                      triggerRomanticHearts(e.clientX, e.clientY);
                      onSelectMemory(mem);
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-[#D8B46A]" />
                  </div>

                  {/* Memory Timeline Card */}
                  <div
                    onClick={(e) => {
                      triggerRomanticHearts(e.clientX, e.clientY);
                      onSelectMemory(mem);
                    }}
                    className="bg-[#241025]/75 hover:bg-[#2c132e]/90 border border-[#7A1838]/40 hover:border-[#D8B46A]/50 rounded-2xl p-4 sm:p-7 transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(122,24,56,0.4)] cursor-pointer backdrop-blur-md group-hover:-translate-y-1"
                  >
                  <div className="flex flex-col md:flex-row gap-5 items-start">
                    {/* Scene Artwork Thumbnail */}
                    <TimelineThumbnail mem={mem} levelFormatted={levelFormatted} />

                    {/* Content Details */}
                    <div className="flex-1 w-full">
                      {/* Meta row */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-cinzel font-bold text-[#D8B46A] tracking-widest text-[11px]">
                            {mem.chapter}
                          </span>
                          <span className="text-[#E89AAF]/60">·</span>
                          <span className="text-[#E89AAF] tracking-wider font-medium text-[11px]">
                            {mem.categoryLabel}
                          </span>
                        </div>

                        <span className="flex items-center gap-1.5 text-[#F7D7DF]/85 font-medium text-xs">
                          <Calendar className="w-3.5 h-3.5 text-[#D8B46A]" />
                          {mem.date}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-cinzel text-lg sm:text-2xl font-bold text-[#FFF4F1] group-hover:text-[#D8B46A] transition-colors mb-1 flex items-center justify-between">
                        <span>{mem.title}</span>
                        <ArrowUpRight className="w-5 h-5 text-[#D8B46A] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                      </h3>

                      {/* Short Title & Caption */}
                      <div className="font-cormorant italic text-sm text-[#D8B46A] font-medium mb-2">
                        “{mem.shortTitle}”
                      </div>

                      <p className="font-cormorant italic text-base text-[#F7D7DF]/90 mb-3 leading-relaxed">
                        {mem.caption}
                      </p>

                      <p className="text-xs sm:text-sm text-[#FFF4F1]/80 leading-relaxed font-light line-clamp-2 mb-4">
                        {mem.description}
                      </p>

                      {/* Location and Track Footer */}
                      <div className="pt-3 border-t border-[#7A1838]/30 flex flex-wrap items-center justify-between gap-2 text-xs text-[#E89AAF]">
                        <span className="flex items-center gap-1.5 truncate max-w-[60%]">
                          <MapPin className="w-3.5 h-3.5 text-[#D8B46A] shrink-0" />
                          <span className="truncate">{mem.location}</span>
                        </span>
                        <span className="flex items-center gap-1.5 font-cormorant italic text-sm text-[#D8B46A] shrink-0">
                          <Music className="w-3.5 h-3.5" />
                          {mem.musicTrack.title}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};
