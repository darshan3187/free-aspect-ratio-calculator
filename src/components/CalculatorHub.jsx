'use client';

import React, { useState } from 'react';
import { Lock, Unlock, ArrowRightLeft, RotateCcw, Sliders, Hash, Printer, Share2, Check, Copy, Info } from 'lucide-react';
import { simplifyRatio, calculatePrintDimensions, convertUnitDimensions } from '@/utils/aspectRatioMath';

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
  const [activeUnit, setActiveUnit] = useState('px'); // 'px', 'in', 'cm'
  const [dpi, setDpi] = useState('300');

  const currentRatio = simplifyRatio(w1, h1);
  const printSize = calculatePrintDimensions(w1, h1, parseFloat(dpi) || 300);

  const handleShareLink = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?w1=${w1}&h1=${h1}&w2=${w2}&h2=${h2}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyResult = (format = 'formatted') => {
    let text = `${w2} × ${h2} ${activeUnit}`;
    if (format === 'raw') {
      text = `${w2}x${h2}`;
    } else if (format === 'css') {
      text = `aspect-ratio: ${currentRatio.text.replace(':', ' / ')}; width: ${w2}${activeUnit}; height: ${h2}${activeUnit};`;
    }
    navigator.clipboard.writeText(text);
    setCopiedResult(true);
    setTimeout(() => setCopiedResult(false), 2000);
  };

  const handleQuickPreset = (presetW, presetH) => {
    setW1(presetW.toString());
    setH1(presetH.toString());
    setLastChanged('w1');
  };

  const handleUnitChange = (newUnit) => {
    if (newUnit === activeUnit) return;
    const currentDpi = parseFloat(dpi) || 300;
    
    // Convert source dimensions
    const converted1 = convertUnitDimensions({
      width: w1,
      height: h1,
      fromUnit: activeUnit,
      toUnit: newUnit,
      dpi: currentDpi
    });
    setW1(converted1.width.toString());
    setH1(converted1.height.toString());

    // Convert target dimensions
    const converted2 = convertUnitDimensions({
      width: w2,
      height: h2,
      fromUnit: activeUnit,
      toUnit: newUnit,
      dpi: currentDpi
    });
    setW2(converted2.width.toString());
    setH2(converted2.height.toString());

    setActiveUnit(newUnit);
  };

  return (
    <div className="studio-card p-3.5 sm:p-5 mb-5 sm:mb-6">
      {/* Header & Responsive Quick Toolbar */}
      <div className="flex items-center justify-between gap-2 pb-3 mb-3.5 border-b border-white/[0.08]">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Sliders className="w-4 h-4 text-neutral-300 flex-shrink-0" />
          <h2 className="text-xs sm:text-sm font-semibold text-white font-sans">Aspect Ratio Calculator</h2>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar max-w-[70%] sm:max-w-none">
          <button
            onClick={handleShareLink}
            aria-label="Share ratio calculation link"
            className="px-2 sm:px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-mono font-medium flex items-center gap-1 bg-[#171717] hover:bg-neutral-800 text-neutral-200 border border-white/10 transition-all cursor-pointer whitespace-nowrap"
          >
            {copiedLink ? <Check className="w-3 h-3 text-white" /> : <Share2 className="w-3 h-3 text-neutral-300" />}
            <span>{copiedLink ? 'Copied' : 'Share'}</span>
          </button>

          <button
            onClick={() => setRoundValues(!roundValues)}
            aria-label="Toggle integer or decimal rounding"
            className={`px-2 sm:px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-mono font-medium flex items-center gap-1 transition-all cursor-pointer border whitespace-nowrap ${
              roundValues
                ? 'bg-white text-black border-white font-semibold'
                : 'bg-[#171717] text-neutral-300 border-white/10'
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
            className="p-1 sm:p-1.5 rounded-full bg-[#171717] hover:bg-neutral-800 text-neutral-200 hover:text-white border border-white/10 text-xs transition-all cursor-pointer flex-shrink-0"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onReset}
            title="Reset default 1920x1080"
            aria-label="Reset default values"
            className="p-1 sm:p-1.5 rounded-full bg-[#171717] hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/10 text-xs transition-all cursor-pointer flex-shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Unit Selector & DPI Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5 pb-2.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-1 text-[11px] font-mono">
          <span className="text-neutral-300 mr-1">Unit:</span>
          {[
            { id: 'px', label: 'Pixels (px)' },
            { id: 'in', label: 'Inches (in)' },
            { id: 'cm', label: 'Centimeters (cm)' }
          ].map(u => (
            <button
              key={u.id}
              onClick={() => handleUnitChange(u.id)}
              className={`px-2 py-0.5 rounded-md transition-all cursor-pointer border ${
                activeUnit === u.id
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-[#000000] text-neutral-300 hover:text-white border-white/10'
              }`}
            >
              {u.label}
            </button>
          ))}
        </div>

        {activeUnit !== 'px' && (
          <div className="flex items-center gap-1.5 text-[11px] font-mono">
            <span className="text-neutral-300">DPI/PPI:</span>
            <select
              value={dpi}
              onChange={(e) => setDpi(e.target.value)}
              aria-label="Select DPI for physical dimensions"
              className="bg-[#000000] text-white border border-white/20 rounded px-1.5 py-0.5 text-xs font-mono focus:outline-none focus:border-blue-500"
            >
              <option value="72">72 DPI (Web)</option>
              <option value="150">150 DPI (Draft)</option>
              <option value="300">300 DPI (Photo Print)</option>
            </select>
          </div>
        )}
      </div>

      {/* Quick Ratio Selection Chips */}
      <div className="flex items-center gap-1 sm:gap-1.5 mb-4 overflow-x-auto no-scrollbar pb-1">
        <span className="text-[11px] sm:text-xs text-neutral-300 font-mono mr-0.5 whitespace-nowrap">Standard:</span>
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
                : 'bg-[#000000] hover:bg-[#171717] text-neutral-200 border-white/10'
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
            <span className="text-xs font-semibold text-neutral-100">Step 1: Original Dimensions</span>
            <span className="text-[11px] sm:text-xs font-mono text-neutral-300">
              Ratio: <strong className="text-white">{currentRatio.text}</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div>
              <label htmlFor="input-w1" className="text-[11px] text-neutral-300 block mb-1 font-mono">
                Original Width ({activeUnit})
              </label>
              <input
                id="input-w1"
                type="number"
                min="0.01"
                step="any"
                value={w1}
                onChange={(e) => { setW1(e.target.value); setLastChanged('w1'); }}
                placeholder="1920"
                className="w-full studio-input px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-semibold text-white"
              />
            </div>
            <div>
              <label htmlFor="input-h1" className="text-[11px] text-neutral-300 block mb-1 font-mono">
                Original Height ({activeUnit})
              </label>
              <input
                id="input-h1"
                type="number"
                min="0.01"
                step="any"
                value={h1}
                onChange={(e) => { setH1(e.target.value); setLastChanged('h1'); }}
                placeholder="1080"
                className="w-full studio-input px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-semibold text-white"
              />
            </div>
          </div>

          {/* Explicit approximation notification if custom dimension was close to a standard ratio */}
          {currentRatio.approximateMatch && (
            <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-amber-300 font-mono">
              <Info className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Exact ratio is {currentRatio.text} (close to standard {currentRatio.approximateMatch}).</span>
            </div>
          )}
        </div>

        {/* Lock Ratio Switch Bar */}
        <div className="flex items-center justify-between py-2 px-2.5 sm:px-3 rounded-xl bg-[#000000] border border-white/[0.08]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLockRatio(!lockRatio)}
              aria-label={lockRatio ? "Unlock aspect ratio" : "Lock aspect ratio"}
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                lockRatio ? 'bg-white text-black' : 'bg-[#171717] text-neutral-300 border border-white/10'
              }`}
            >
              {lockRatio ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
            </button>
            <span className="text-xs font-medium text-neutral-200">
              {lockRatio ? 'Proportions Locked' : 'Proportions Free'}
            </span>
          </div>

          <span className="text-[11px] sm:text-xs font-mono text-neutral-300 truncate max-w-[140px] sm:max-w-none text-right">
            {currentRatio.decimal}:1 ({currentRatio.orientation})
          </span>
        </div>

        {/* Target Scaled Inputs */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-neutral-100">Step 2: Scaled Target Dimensions</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleCopyResult('formatted')}
                aria-label="Copy scaled dimensions"
                className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-[#171717] hover:bg-neutral-800 text-neutral-200 border border-white/10 font-mono transition-all flex items-center gap-1 cursor-pointer"
              >
                {copiedResult ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3 text-neutral-300" />}
                <span>{copiedResult ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div>
              <label htmlFor="input-w2" className="text-[11px] text-neutral-300 block mb-1 font-mono">
                Target Width ({activeUnit})
              </label>
              <input
                id="input-w2"
                type="number"
                min="0.01"
                step="any"
                value={w2}
                onChange={(e) => { setW2(e.target.value); setLastChanged('w2'); }}
                placeholder="400"
                className="w-full studio-input px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-semibold text-white border-white/20 focus:border-[#0070f3]"
              />
            </div>
            <div>
              <label htmlFor="input-h2" className="text-[11px] text-neutral-300 block mb-1 font-mono">
                Target Height ({activeUnit})
              </label>
              <input
                id="input-h2"
                type="number"
                min="0.01"
                step="any"
                value={h2}
                onChange={(e) => { setH2(e.target.value); setLastChanged('h2'); }}
                placeholder="225"
                className="w-full studio-input px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-semibold text-white border-white/20 focus:border-[#0070f3]"
              />
            </div>
          </div>
          <span className="text-[10px] text-neutral-300 mt-1 block font-mono">
            * Editing either target dimension automatically scales the other while locked.
          </span>
        </div>
      </div>

      {/* Print Readout Footer */}
      <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-neutral-300">
        <div className="flex items-center gap-1.5 text-neutral-200 truncate max-w-[65%]">
          <Printer className="w-3.5 h-3.5 text-neutral-300 flex-shrink-0" />
          <span className="truncate">Print ({dpi} DPI): {printSize.inches}</span>
        </div>
        <span className="text-white font-bold whitespace-nowrap">{w2 || 0} × {h2 || 0} {activeUnit}</span>
      </div>
    </div>
  );
}
