'use client';

import React, { useState } from 'react';
import { Lock, Unlock, ArrowRightLeft, RotateCcw, Sliders, Hash, Printer, Share2, Check, Copy } from 'lucide-react';
import { simplifyRatio, calculatePrintDimensions } from '@/utils/aspectRatioMath';

export default function CalculatorHub({
  w1, setW1,
  h1, setH1,
  w2, setW2,
  h2, setH2,
  lockRatio, setLockRatio,
  roundValues, setRoundValues,
  lastChanged, setLastChanged,
  onReset,
  roundingOccurred
}) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedResult, setCopiedResult] = useState(false);
  const currentRatio = simplifyRatio(w1, h1);
  const printSize300 = calculatePrintDimensions(w1, h1, 300);

  const handleShareLink = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?w1=${w1}&h1=${h1}&w2=${w2}&h2=${h2}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyResult = () => {
    const text = `${w2} × ${h2} px`;
    navigator.clipboard.writeText(text);
    setCopiedResult(true);
    setTimeout(() => setCopiedResult(false), 2000);
  };

  const handleQuickPreset = (presetW, presetH) => {
    setW1(presetW.toString());
    setH1(presetH.toString());
    setLastChanged('w1');
  };

  return (
    <div className="studio-card p-3.5 sm:p-5 mb-5 sm:mb-6">
      {/* Header & Responsive Quick Toolbar */}
      <div className="flex items-center justify-between gap-2 pb-3 mb-3.5 border-b border-white/[0.08]">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Sliders className="w-4 h-4 text-neutral-300 flex-shrink-0" />
          <h2 className="text-xs sm:text-sm font-semibold text-white font-sans">Calculator</h2>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar max-w-[70%] sm:max-w-none">
          <button
            onClick={handleShareLink}
            aria-label="Share ratio calculation link"
            className="px-2 sm:px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-mono font-medium flex items-center gap-1 bg-[#171717] hover:bg-neutral-800 text-neutral-300 border border-white/10 transition-all cursor-pointer whitespace-nowrap"
          >
            {copiedLink ? <Check className="w-3 h-3 text-white" /> : <Share2 className="w-3 h-3 text-neutral-400" />}
            <span>{copiedLink ? 'Copied' : 'Share'}</span>
          </button>

          <button
            onClick={() => setRoundValues(!roundValues)}
            aria-label="Toggle integer or decimal rounding"
            className={`px-2 sm:px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-mono font-medium flex items-center gap-1 transition-all cursor-pointer border whitespace-nowrap ${
              roundValues
                ? 'bg-white text-black border-white font-semibold'
                : 'bg-[#171717] text-neutral-400 border-white/10'
            }`}
          >
            <Hash className="w-3 h-3" />
            <span>{roundValues ? 'Integer' : 'Decimal'}</span>
          </button>

          <button
            onClick={() => {
              setW1(h1);
              setH1(w1);
              if (w2 || h2) {
                setW2(h2);
                setH2(w2);
              }
            }}
            title="Swap width and height"
            aria-label="Swap width and height"
            className="p-1 sm:p-1.5 rounded-full bg-[#171717] hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/10 text-xs transition-all cursor-pointer flex-shrink-0"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onReset}
            title="Reset default 1920x1080"
            aria-label="Reset default values"
            className="p-1 sm:p-1.5 rounded-full bg-[#171717] hover:bg-neutral-800 text-neutral-400 hover:text-white border border-white/10 text-xs transition-all cursor-pointer flex-shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Ratio Selection Chips */}
      <div className="flex items-center gap-1 sm:gap-1.5 mb-4 overflow-x-auto no-scrollbar pb-1">
        <span className="text-[11px] sm:text-xs text-neutral-400 font-mono mr-0.5 whitespace-nowrap">Ratio:</span>
        {[
          { label: '16:9', w: 16, h: 9 },
          { label: '9:16', w: 9, h: 16 },
          { label: '4:5', w: 4, h: 5 },
          { label: '1:1', w: 1, h: 1 },
          { label: '4:3', w: 4, h: 3 },
          { label: '21:9', w: 21, h: 9 }
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => handleQuickPreset(item.w, item.h)}
            className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[11px] sm:text-xs font-mono font-medium transition-all cursor-pointer border whitespace-nowrap ${
              currentRatio.text === item.label
                ? 'bg-white text-black border-white font-bold'
                : 'bg-[#000000] hover:bg-[#171717] text-neutral-300 border-white/10'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Primary Calculator Inputs Grid */}
      <div className="space-y-4">
        {/* Original Size Inputs */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-neutral-200">Original Size</span>
            <span className="text-[11px] sm:text-xs font-mono text-neutral-400">Ratio {currentRatio.text}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div>
              <label htmlFor="input-w1" className="text-[11px] text-neutral-400 block mb-1 font-mono">Width (W1)</label>
              <input
                id="input-w1"
                type="number"
                min="1"
                value={w1}
                onChange={(e) => { setW1(e.target.value); setLastChanged('w1'); }}
                placeholder="1920"
                className="w-full studio-input px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-semibold text-white"
              />
            </div>
            <div>
              <label htmlFor="input-h1" className="text-[11px] text-neutral-400 block mb-1 font-mono">Height (H1)</label>
              <input
                id="input-h1"
                type="number"
                min="1"
                value={h1}
                onChange={(e) => { setH1(e.target.value); setLastChanged('h1'); }}
                placeholder="1080"
                className="w-full studio-input px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-semibold text-white"
              />
            </div>
          </div>
        </div>

        {/* Lock Ratio Switch Bar */}
        <div className="flex items-center justify-between py-2 px-2.5 sm:px-3 rounded-xl bg-[#000000] border border-white/[0.08]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLockRatio(!lockRatio)}
              aria-label={lockRatio ? "Unlock aspect ratio" : "Lock aspect ratio"}
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                lockRatio ? 'bg-white text-black' : 'bg-[#171717] text-neutral-400 border border-white/10'
              }`}
            >
              {lockRatio ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
            </button>
            <span className="text-xs font-medium text-neutral-300">
              {lockRatio ? 'Ratio Locked' : 'Ratio Unlocked'}
            </span>
          </div>

          <span className="text-[11px] sm:text-xs font-mono text-neutral-400 truncate max-w-[120px] sm:max-w-none text-right">
            {currentRatio.decimal}:1 ({currentRatio.orientation})
          </span>
        </div>

        {/* Target Scaled Inputs */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-neutral-200">Target Size</span>
            <button
              onClick={handleCopyResult}
              className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-[#171717] hover:bg-neutral-800 text-neutral-300 border border-white/10 font-mono transition-all flex items-center gap-1 cursor-pointer"
            >
              {copiedResult ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3 text-neutral-400" />}
              <span>{copiedResult ? 'Copied' : 'Copy Result'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div>
              <label htmlFor="input-w2" className="text-[11px] text-neutral-400 block mb-1 font-mono">New Width (W2)</label>
              <input
                id="input-w2"
                type="number"
                min="1"
                value={w2}
                onChange={(e) => { setW2(e.target.value); setLastChanged('w2'); }}
                placeholder="400"
                className="w-full studio-input px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-semibold text-white border-white/20 focus:border-[#0070f3]"
              />
            </div>
            <div>
              <label htmlFor="input-h2" className="text-[11px] text-neutral-400 block mb-1 font-mono">New Height (H2)</label>
              <input
                id="input-h2"
                type="number"
                min="1"
                value={h2}
                onChange={(e) => { setH2(e.target.value); setLastChanged('h2'); }}
                placeholder="225"
                className="w-full studio-input px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-semibold text-white border-white/20 focus:border-[#0070f3]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Print Readout Footer */}
      <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-1.5 text-neutral-300 truncate max-w-[65%]">
          <Printer className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
          <span className="truncate">Print 300DPI: {printSize300.inches}</span>
        </div>
        <span className="text-white font-bold whitespace-nowrap">{w2 || 0} × {h2 || 0} px</span>
      </div>
    </div>
  );
}
