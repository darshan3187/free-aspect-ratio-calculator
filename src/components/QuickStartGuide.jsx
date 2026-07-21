'use client';

import React from 'react';
import { Sparkles, X } from 'lucide-react';

export default function QuickStartGuide({ onDismiss, onApplySample }) {
  return (
    <div className="p-3 sm:p-3.5 mb-5 sm:mb-6 rounded-xl bg-[#0a0a0a] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs">
      <div className="flex items-center gap-2 text-neutral-200 min-w-0">
        <Sparkles className="w-4 h-4 text-white flex-shrink-0" />
        <span className="font-medium text-xs sm:text-xs">Quick Start: Pick a sample or type custom size:</span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 self-end sm:self-auto w-full sm:w-auto justify-end">
        <button
          onClick={() => onApplySample(1920, 1080, 1280)}
          className="px-2.5 py-1 rounded-lg bg-[#171717] hover:bg-neutral-800 text-neutral-200 border border-white/10 text-[11px] font-mono transition-all cursor-pointer whitespace-nowrap"
        >
          16:9 HD
        </button>
        <button
          onClick={() => onApplySample(1080, 1920, 540)}
          className="px-2.5 py-1 rounded-lg bg-[#171717] hover:bg-neutral-800 text-neutral-200 border border-white/10 text-[11px] font-mono transition-all cursor-pointer whitespace-nowrap"
        >
          9:16 Shorts
        </button>
        <button
          onClick={() => onApplySample(1080, 1350, 800)}
          className="px-2.5 py-1 rounded-lg bg-[#171717] hover:bg-neutral-800 text-neutral-200 border border-white/10 text-[11px] font-mono transition-all cursor-pointer whitespace-nowrap"
        >
          4:5 IG
        </button>

        <button
          onClick={onDismiss}
          aria-label="Dismiss guide"
          className="p-1 rounded-lg text-neutral-400 hover:text-white transition-colors cursor-pointer ml-0.5"
          title="Close help bar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
