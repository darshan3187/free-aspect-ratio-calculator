import React, { useState } from 'react';
import { Lock, Unlock, ArrowRightLeft, RotateCcw, Sliders, Hash, Printer, Share2, Check } from 'lucide-react';
import { simplifyRatio, calculatePrintDimensions, generateAiPromptFlags } from '../utils/aspectRatioMath';

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
  const currentRatio = simplifyRatio(w1, h1);
  const printSize300 = calculatePrintDimensions(w1, h1, 300);
  const aiFlags = generateAiPromptFlags(w1, h1);

  const handleShareLink = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?w1=${w1}&h1=${h1}&w2=${w2}&h2=${h2}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="studio-card p-4 sm:p-6 mb-6">
      {/* Title & Toolbar */}
      <div className="flex items-center justify-between gap-2 pb-3.5 mb-4 sm:mb-5 border-b border-white/[0.08]">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Sliders className="w-4 h-4 text-neutral-300 flex-shrink-0" />
          <h2 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider font-sans">Dimension Inputs</h2>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Share URL Button */}
          <button
            onClick={handleShareLink}
            title="Copy shareable link for current aspect calculation"
            aria-label="Share aspect ratio calculation link"
            className="px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-mono font-medium flex items-center gap-1 bg-[#171717] hover:bg-neutral-800 text-neutral-200 border border-white/10 transition-all active:scale-95 cursor-pointer"
          >
            {copiedLink ? <Check className="w-3 h-3 text-white" /> : <Share2 className="w-3 h-3 text-neutral-400" />}
            <span>{copiedLink ? 'Copied!' : 'Share'}</span>
          </button>

          {/* Rounding Mode */}
          <button
            onClick={() => setRoundValues(!roundValues)}
            title={roundValues ? "Rounding to nearest whole pixel" : "Exact floating-point precision"}
            aria-label="Toggle integer or decimal rounding"
            className={`px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-mono font-medium flex items-center gap-1 transition-all cursor-pointer border ${
              roundValues
                ? 'bg-white text-black border-white font-semibold'
                : 'bg-[#171717] text-neutral-400 border-white/10'
            }`}
          >
            <Hash className="w-3 h-3" />
            <span>{roundValues ? 'Integer' : 'Decimal'}</span>
          </button>

          {/* Swap Button */}
          <button
            onClick={() => {
              setW1(h1);
              setH1(w1);
              if (w2 || h2) {
                setW2(h2);
                setH2(w2);
              }
            }}
            title="Swap width & height orientation"
            aria-label="Swap width and height"
            className="p-1.5 rounded-full bg-[#171717] hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/10 text-xs transition-all active:scale-95 cursor-pointer"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
          </button>

          {/* Reset Button */}
          <button
            onClick={onReset}
            title="Reset default 1920x1080"
            aria-label="Reset default values"
            className="p-1.5 rounded-full bg-[#171717] hover:bg-neutral-800 text-neutral-400 hover:text-white border border-white/10 text-xs transition-all active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Inputs Section */}
      <div className="space-y-4">
        {/* Step 1: Base Dimensions */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="input-w1" className="text-xs font-semibold text-neutral-300">Base Dimensions</label>
            <span className="text-[10px] font-mono text-[#888888] uppercase">Input 1</span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
            <div className="min-w-0">
              <span className="text-[10px] text-[#888888] block mb-1 font-mono">Width (W1)</span>
              <input
                id="input-w1"
                type="number"
                min="1"
                value={w1}
                onChange={(e) => { setW1(e.target.value); setLastChanged('w1'); }}
                placeholder="1920"
                aria-label="Base Width W1"
                className="w-full studio-input px-2.5 py-2 sm:px-3 sm:py-2 text-base sm:text-sm font-semibold text-white min-w-0"
              />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-[#888888] block mb-1 font-mono">Height (H1)</span>
              <input
                id="input-h1"
                type="number"
                min="1"
                value={h1}
                onChange={(e) => { setH1(e.target.value); setLastChanged('h1'); }}
                placeholder="1080"
                aria-label="Base Height H1"
                className="w-full studio-input px-2.5 py-2 sm:px-3 sm:py-2 text-base sm:text-sm font-semibold text-white min-w-0"
              />
            </div>
          </div>
        </div>

        {/* Ratio Lock Switch Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 px-2.5 sm:px-3 rounded-xl bg-[#000000] border border-white/[0.08]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLockRatio(!lockRatio)}
              aria-label={lockRatio ? "Unlock ratio" : "Lock ratio"}
              className={`p-1.5 rounded-full transition-all active:scale-95 flex-shrink-0 cursor-pointer ${
                lockRatio ? 'bg-white text-black' : 'bg-[#171717] text-neutral-400 border border-white/10'
              }`}
              title={lockRatio ? "Aspect ratio locked" : "Aspect ratio unlocked"}
            >
              {lockRatio ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
            </button>
            <span className="text-[11px] sm:text-xs font-medium text-neutral-300">
              {lockRatio ? 'Proportional Scaling (Locked)' : 'Independent Scaling (Unlocked)'}
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs self-end sm:self-auto">
            <span className="text-white font-bold">{currentRatio.text}</span>
            <span className="text-neutral-600">|</span>
            <span className="text-neutral-400">{currentRatio.decimal}:1</span>
          </div>
        </div>

        {/* Step 2: Target Scaled Dimensions */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="input-w2" className="text-xs font-semibold text-neutral-200">Target Scaled Size</label>
            {roundingOccurred && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#171717] text-neutral-300 border border-white/10 font-mono">
                Nearest Pixel
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
            <div className="min-w-0">
              <span className="text-[10px] text-neutral-400 block mb-1 font-mono">New Width (W2)</span>
              <input
                id="input-w2"
                type="number"
                min="1"
                value={w2}
                onChange={(e) => { setW2(e.target.value); setLastChanged('w2'); }}
                placeholder="400"
                aria-label="Target Width W2"
                className="w-full studio-input px-2.5 py-2 sm:px-3 sm:py-2 text-base sm:text-sm font-semibold text-white border-white/20 focus:border-[#0070f3] min-w-0"
              />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-neutral-400 block mb-1 font-mono">New Height (H2)</span>
              <input
                id="input-h2"
                type="number"
                min="1"
                value={h2}
                onChange={(e) => { setH2(e.target.value); setLastChanged('h2'); }}
                placeholder="225"
                aria-label="Target Height H2"
                className="w-full studio-input px-2.5 py-2 sm:px-3 sm:py-2 text-base sm:text-sm font-semibold text-white border-white/20 focus:border-[#0070f3] min-w-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Real-Time Print Size & Readout */}
      <div className="mt-4 pt-3.5 border-t border-white/[0.08] space-y-2 text-xs font-mono">
        <div className="flex flex-wrap items-center justify-between text-neutral-300 gap-1 bg-[#000000] p-2.5 rounded-xl border border-white/[0.08]">
          <div className="flex items-center gap-1.5 text-white">
            <Printer className="w-3.5 h-3.5" />
            <span className="font-sans font-semibold text-[11px]">Print Size (300 DPI):</span>
          </div>
          <span className="text-white font-bold">{printSize300.inches} ({printSize300.cm})</span>
        </div>

        <div className="flex flex-wrap items-center justify-between text-neutral-400 text-[11px] pt-1">
          <span>Formula: ({h1 || 0} × {w2 || 0}) ÷ {w1 || 1}</span>
          <span className="text-white font-bold">{h2 || 0} px</span>
        </div>
      </div>
    </div>
  );
}
