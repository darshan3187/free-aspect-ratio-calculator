import React, { useState } from 'react';
import { Bookmark, Instagram, Monitor, Camera, Sparkles, Film } from 'lucide-react';

export default function PresetsGrid({ onSelectPreset }) {
  const [activeCategory, setActiveCategory] = useState('social');

  const categories = [
    { id: 'social', label: 'Social Media', icon: Instagram },
    { id: 'ai', label: 'AI Image Generators', icon: Sparkles },
    { id: 'cinema', label: 'Film & Cinema', icon: Film },
    { id: 'displays', label: 'Displays & Video', icon: Monitor },
    { id: 'photo', label: 'Photo & Print', icon: Camera }
  ];

  const presets = {
    social: [
      { name: 'Instagram Square', w: 1080, h: 1080, ratio: '1:1', tag: 'Feed Post' },
      { name: 'Instagram Portrait', w: 1080, h: 1350, ratio: '4:5', tag: 'Recommended' },
      { name: 'IG Story / TikTok / Reel', w: 1080, h: 1920, ratio: '9:16', tag: 'Vertical Video' },
      { name: 'YouTube Thumbnail', w: 1280, h: 720, ratio: '16:9', tag: 'HD Video' },
      { name: 'Twitter / X Header', w: 1500, h: 500, ratio: '3:1', tag: 'Banner' },
      { name: 'LinkedIn Banner', w: 1584, h: 396, ratio: '4:1', tag: 'Profile Cover' },
      { name: 'Facebook Cover', w: 820, h: 312, ratio: '2.63:1', tag: 'Page Banner' }
    ],
    ai: [
      { name: 'Midjourney Widescreen', w: 1456, h: 816, ratio: '16:9', tag: '--ar 16:9' },
      { name: 'Midjourney Vertical', w: 816, h: 1456, ratio: '9:16', tag: '--ar 9:16' },
      { name: 'Midjourney Portrait', w: 1024, h: 1280, ratio: '4:5', tag: '--ar 4:5' },
      { name: 'Midjourney Photo', w: 1344, h: 896, ratio: '3:2', tag: '--ar 3:2' },
      { name: 'DALL-E 3 Square', w: 1024, h: 1024, ratio: '1:1', tag: '1024 × 1024' },
      { name: 'DALL-E 3 Landscape', w: 1792, h: 1024, ratio: '1.75:1', tag: '1792 × 1024' },
      { name: 'DALL-E 3 Portrait', w: 1024, h: 1792, ratio: '1:1.75', tag: '1024 × 1792' },
      { name: 'Stable Diffusion XL', w: 1024, h: 1024, ratio: '1:1', tag: 'SDXL Native' }
    ],
    cinema: [
      { name: 'IMAX 70mm Screen', w: 2860, h: 2000, ratio: '1.43:1', tag: 'IMAX Full Aspect' },
      { name: 'CinemaScope Widescreen', w: 3840, h: 1606, ratio: '2.39:1', tag: 'Modern Theatrical' },
      { name: 'Anamorphic Widescreen', w: 3840, h: 1634, ratio: '2.35:1', tag: 'Classic Anamorphic' },
      { name: 'Univisium Modern', w: 3840, h: 1920, ratio: '2:1', tag: 'Netflix / Streaming' },
      { name: 'Academy Classic', w: 1920, h: 1401, ratio: '1.37:1', tag: '35mm Film Era' },
      { name: 'Ultrawide 32:9', w: 3840, h: 1080, ratio: '32:9', tag: 'Super Ultrawide' }
    ],
    displays: [
      { name: '4K Ultra HD', w: 3840, h: 2160, ratio: '16:9', tag: '3840 × 2160' },
      { name: 'Full HD 1080p', w: 1920, h: 1080, ratio: '16:9', tag: '1920 × 1080' },
      { name: 'QHD 1440p', w: 2560, h: 1440, ratio: '16:9', tag: '2560 × 1440' },
      { name: 'Ultrawide Monitor', w: 3440, h: 1440, ratio: '21:9', tag: 'Gaming Monitor' },
      { name: 'Cinema 4K DCI', w: 4096, h: 2160, ratio: '1.9:1', tag: 'Film Production' },
      { name: 'SD 480p Video', w: 854, h: 480, ratio: '16:9', tag: 'Standard Video' }
    ],
    photo: [
      { name: 'DSLR / 35mm Photo', w: 3000, h: 2000, ratio: '3:2', tag: 'Camera Sensor' },
      { name: 'Micro 4/3 & iPad', w: 2048, h: 1536, ratio: '4:3', tag: 'Tablet / Sensor' },
      { name: 'ISO Paper (A4 / A3)', w: 2480, h: 3508, ratio: '1:1.414', tag: 'Print Document' },
      { name: 'Photo Frame 8x10', w: 2400, h: 3000, ratio: '4:5', tag: 'Framed Print' }
    ]
  };

  return (
    <div className="studio-card p-4 sm:p-6 mb-6">
      {/* Title & Category Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3.5 mb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-neutral-300 flex-shrink-0" />
          <h2 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider font-sans">Aspect Ratio Presets</h2>
        </div>

        {/* Tab Controls with horizontal scroll on mobile */}
        <div className="w-full sm:w-auto overflow-x-auto no-scrollbar pb-0.5">
          <div className="flex items-center gap-1 p-1 bg-[#000000] rounded-full border border-white/[0.08] min-w-max">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  aria-label={`Select ${cat.label} presets`}
                  className={`px-3 py-1.5 sm:py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all whitespace-nowrap active:scale-95 cursor-pointer ${
                    isActive
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Presets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {presets[activeCategory].map((item, idx) => (
          <button
            key={idx}
            onClick={() => onSelectPreset(item.w, item.h)}
            aria-label={`Apply ${item.name} preset ${item.w} by ${item.h}`}
            className="p-3 sm:p-3.5 rounded-xl bg-[#000000] hover:bg-[#171717] border border-white/[0.08] hover:border-white/20 text-left transition-all flex flex-col justify-between group active:scale-[0.98] cursor-pointer shadow-sm"
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <span className="text-xs font-semibold text-white group-hover:text-neutral-200 transition-colors leading-snug font-sans">
                {item.name}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#171717] text-neutral-300 border border-white/10 font-mono text-[10px] font-bold whitespace-nowrap flex-shrink-0">
                {item.ratio}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
              <span>{item.w} × {item.h} px</span>
              <span className="text-[10px] text-[#888888] truncate max-w-[110px]">{item.tag}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
