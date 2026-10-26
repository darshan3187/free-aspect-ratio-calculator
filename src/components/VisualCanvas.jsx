'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Eye, Grid, Columns, Move, Maximize2, X } from 'lucide-react';
import { simplifyRatio } from '@/utils/aspectRatioMath';

export default function VisualCanvas({
  w1, h1, w2, h2,
  uploadedImage,
  onDragResize,
  focalX, setFocalX,
  focalY, setFocalY,
  fitMode, setFitMode
}) {
  const [showGrid, setShowGrid] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [compareTarget, setCompareTarget] = useState({ name: '1:1 Square', ratioW: 1, ratioH: 1 });
  const [isResizing, setIsResizing] = useState(false);
  const [isPanningImage, setIsPanningImage] = useState(false);
  const resizeStartRef = useRef({ x: 0, y: 0, initialW2: 0, initialH2: 0 });
  const panStartRef = useRef({ y: 0, initialFocalY: 50 });

  const numW1 = parseFloat(w1) || 1920;
  const numH1 = parseFloat(h1) || 1080;
  const numW2 = parseFloat(w2) || 400;
  const numH2 = parseFloat(h2) || 225;

  const currentRatio = simplifyRatio(numW1, numH1);
  const aspectRatioVal = Math.max(0.01, numW1 / numH1);

  const startResize = (clientX, clientY) => {
    setIsResizing(true);
    resizeStartRef.current = {
      x: clientX,
      y: clientY,
      initialW2: numW2,
      initialH2: numH2
    };
  };

  const handleResizePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.target && e.target.setPointerCapture) {
      try {
        e.target.setPointerCapture(e.pointerId);
      } catch (err) {
        // Pointer capture fallback
      }
    }
    startResize(e.clientX, e.clientY);
  };

  const handleResizeKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      const step = e.shiftKey ? 50 : 10;
      const newW = numW2 + step;
      const newH = Math.max(10, Math.round(newW / aspectRatioVal));
      onDragResize(newW, newH);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      const step = e.shiftKey ? 50 : 10;
      const newW = Math.max(10, numW2 - step);
      const newH = Math.max(10, Math.round(newW / aspectRatioVal));
      onDragResize(newW, newH);
    }
  };

  const startPan = (clientY) => {
    if (!uploadedImage || isResizing) return;
    setIsPanningImage(true);
    panStartRef.current = {
      y: clientY,
      initialFocalY: focalY
    };
  };

  const handleImagePanPointerDown = (e) => {
    if (!uploadedImage || isResizing) return;
    // Only capture pointer when interacting with the image
    e.preventDefault();
    if (e.currentTarget && e.currentTarget.setPointerCapture) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch (err) {
        // Fallback
      }
    }
    startPan(e.clientY);
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (isResizing) {
        const deltaX = e.clientX - resizeStartRef.current.x;
        const scaleFactor = 2;
        const newW2 = Math.max(10, Math.round(resizeStartRef.current.initialW2 + deltaX * scaleFactor));
        const newH2 = Math.max(10, Math.round(newW2 / aspectRatioVal));
        onDragResize(newW2, newH2);
      } else if (isPanningImage) {
        const deltaY = e.clientY - panStartRef.current.y;
        const sensitivity = 0.5;
        let newFocalY = Math.round(panStartRef.current.initialFocalY + deltaY * sensitivity);
        newFocalY = Math.max(0, Math.min(100, newFocalY));
        setFocalY(newFocalY);
      }
    };

    const handlePointerEnd = () => {
      if (isResizing) setIsResizing(false);
      if (isPanningImage) setIsPanningImage(false);
    };

    if (isResizing || isPanningImage) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerEnd);
      window.addEventListener('pointercancel', handlePointerEnd);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerEnd);
      window.removeEventListener('pointercancel', handlePointerEnd);
    };
  }, [isResizing, isPanningImage, aspectRatioVal, onDragResize, focalY, setFocalY]);

  const compareOptions = [
    { name: '1:1 Square (Instagram)', ratioW: 1, ratioH: 1 },
    { name: '16:9 Widescreen (YouTube)', ratioW: 16, ratioH: 9 },
    { name: '9:16 Vertical (Reels/TikTok)', ratioW: 9, ratioH: 16 },
    { name: '4:3 Standard (Retro/iPad)', ratioW: 4, ratioH: 3 },
    { name: '4:5 Portrait (IG Feed)', ratioW: 4, ratioH: 5 },
    { name: '21:9 Ultrawide Cinema', ratioW: 21, ratioH: 9 }
  ];

  return (
    <div className="studio-card p-4 sm:p-5 mb-6">
      {/* Title Bar & Canvas Controls */}
      <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-neutral-300 flex-shrink-0" />
          <h2 className="text-sm font-semibold text-white font-sans">Visual Canvas</h2>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowCompareModal(true)}
            aria-label="Compare ratios side by side"
            className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-[#171717] hover:bg-neutral-800 text-neutral-300 border border-white/10 transition-all flex items-center gap-1 cursor-pointer"
          >
            <Columns className="w-3 h-3 text-neutral-400" />
            <span>Compare</span>
          </button>

          <button
            onClick={() => setFitMode(fitMode === 'cover' ? 'contain' : 'cover')}
            aria-label="Toggle fit mode"
            className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-[#171717] hover:bg-neutral-800 text-neutral-300 border border-white/10 transition-all cursor-pointer"
          >
            {fitMode === 'cover' ? 'Crop' : 'Fit'}
          </button>

          <button
            onClick={() => setShowGrid(!showGrid)}
            aria-label="Toggle composition grid"
            className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium flex items-center gap-1 transition-all cursor-pointer border ${
              showGrid
                ? 'bg-white text-black border-white font-semibold'
                : 'bg-[#171717] text-neutral-400 border-white/10'
            }`}
          >
            <Grid className="w-3 h-3" />
            <span>Grid</span>
          </button>
        </div>
      </div>

      {/* Focus Alignment Controls */}
      <div className="mb-4 p-2 rounded-xl bg-[#000000] border border-white/[0.08] flex items-center justify-between gap-2">
        <span className="text-xs text-neutral-400 font-mono pl-1">Focus:</span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setFocalY(0)}
            className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium transition-all cursor-pointer border ${
              focalY <= 15 ? 'bg-white text-black border-white font-semibold' : 'bg-[#171717] text-neutral-400 border-white/10'
            }`}
          >
            Top
          </button>
          <button
            onClick={() => setFocalY(50)}
            className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium transition-all cursor-pointer border ${
              focalY > 15 && focalY < 85 ? 'bg-white text-black border-white font-semibold' : 'bg-[#171717] text-neutral-400 border-white/10'
            }`}
          >
            Center
          </button>
          <button
            onClick={() => setFocalY(100)}
            className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium transition-all cursor-pointer border ${
              focalY >= 85 ? 'bg-white text-black border-white font-semibold' : 'bg-[#171717] text-neutral-400 border-white/10'
            }`}
          >
            Bottom
          </button>
        </div>
      </div>

      {/* Main Viewport Stage */}
      <div
        className="w-full h-[260px] sm:h-[300px] [--canvas-max-h:195px] sm:[--canvas-max-h:230px] bg-[#000000] rounded-xl border border-white/[0.08] flex items-center justify-center p-3 sm:p-6 pb-8 sm:pb-9 relative overflow-hidden studio-grid-pattern touch-pan-y"
      >
        {/* Scaled Canvas Frame */}
        <div
          onPointerDown={handleImagePanPointerDown}
          className={`relative rounded-lg border transition-[border-color,box-shadow] duration-150 overflow-hidden flex flex-col items-center justify-center ${
            uploadedImage ? 'cursor-grab active:cursor-grabbing touch-none' : ''
          } ${
            isResizing || isPanningImage
              ? 'border-white shadow-2xl scale-[1.01]'
              : 'border-white/20 hover:border-white/40'
          }`}
          style={{
            aspectRatio: `${numW1} / ${numH1}`,
            maxWidth: '100%',
            maxHeight: 'var(--canvas-max-h, 195px)',
            width: `calc(var(--canvas-max-h, 195px) * ${aspectRatioVal})`,
            height: 'auto',
            background: uploadedImage ? 'none' : '#0a0a0a'
          }}
        >
          {uploadedImage ? (
            <img
              src={uploadedImage.previewUrl}
              alt="Uploaded Preview"
              className="w-full h-full select-none"
              style={{
                objectFit: fitMode,
                objectPosition: `${focalX}% ${focalY}%`
              }}
            />
          ) : null}

          {/* Composition Grid */}
          {showGrid && (
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none border border-white/10">
              <div className="border-r border-b border-white/10"></div>
              <div className="border-r border-b border-white/10"></div>
              <div className="border-b border-white/10"></div>
              <div className="border-r border-b border-white/10"></div>
              <div className="border-r border-b border-white/10"></div>
              <div className="border-b border-white/10"></div>
              <div className="border-r border-white/10"></div>
              <div className="border-r border-white/10"></div>
              <div></div>
            </div>
          )}

          {/* Canvas Center Overlay Badge */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex flex-col items-center justify-center pointer-events-none p-2 text-center">
            <span className="px-2.5 py-1 rounded-full bg-[#171717] border border-white/15 text-white font-mono text-[11px] font-bold shadow-md mb-1">
              {numW2} × {numH2} px
            </span>
            <span className="text-[10px] text-neutral-300 font-mono font-semibold">
              {currentRatio.text} ({currentRatio.orientation})
            </span>
          </div>

          {/* Drag Resizer Corner Handle */}
          <button
            type="button"
            onPointerDown={handleResizePointerDown}
            onKeyDown={handleResizeKeyDown}
            role="slider"
            aria-label="Drag or use arrow keys to resize target dimensions"
            aria-valuenow={numW2}
            aria-valuemin={10}
            aria-valuemax={100000}
            aria-valuetext={`${numW2} pixels wide by ${numH2} pixels high`}
            title="Drag or use arrow keys to resize"
            className="absolute bottom-1 right-1 w-8 h-8 sm:w-7 sm:h-7 bg-white hover:bg-neutral-200 text-black rounded-md flex items-center justify-center cursor-se-resize shadow-md transition-transform active:scale-95 z-10 touch-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Move className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Viewport Specs Footer */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] text-neutral-400 font-mono pointer-events-none">
          <span className="flex items-center gap-1 truncate max-w-[70%]">
            <Maximize2 className="w-3 h-3 text-neutral-300 flex-shrink-0" />
            <span className="truncate">{uploadedImage ? 'Drag image up/down' : 'Drag corner to stretch'}</span>
          </span>
          <span>{focalY}%</span>
        </div>
      </div>

      {/* Side-by-Side Ratio Comparison Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="studio-card max-w-xl w-full p-5 sm:p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCompareModal(false)}
              aria-label="Close compare modal"
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-neutral-400 hover:text-white active:scale-95 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-white mb-4">
              <Columns className="w-5 h-5 flex-shrink-0" />
              <h2 className="text-base sm:text-lg font-bold text-white leading-tight font-sans">Ratio Comparison.</h2>
            </div>

            {/* Target Select */}
            <div className="mb-4">
              <label htmlFor="select-compare-target" className="text-xs text-neutral-300 font-medium block mb-1.5">Compare ({currentRatio.text}) With:</label>
              <select
                id="select-compare-target"
                aria-label="Select ratio to compare"
                value={compareTarget.name}
                onChange={(e) => {
                  const selected = compareOptions.find(opt => opt.name === e.target.value);
                  if (selected) setCompareTarget(selected);
                }}
                className="w-full studio-input p-2.5 text-xs font-semibold"
              >
                {compareOptions.map((opt, idx) => (
                  <option key={idx} value={opt.name}>{opt.name}</option>
                ))}
              </select>
            </div>

            {/* Visual Side-by-Side Box Grid */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#000000] border border-white/[0.08] items-center justify-items-center">
              {/* Box A: Current */}
              <div className="flex flex-col items-center gap-2 w-full">
                <span className="text-[11px] text-white font-mono font-bold">Your Ratio ({currentRatio.text})</span>
                <div
                  className="rounded-lg border border-white/30 bg-[#171717] flex items-center justify-center text-white text-xs font-mono font-bold shadow"
                  style={{
                    width: `${Math.min(140, Math.round(120 * (aspectRatioVal > 1 ? 1 : aspectRatioVal)))}px`,
                    height: `${Math.min(140, Math.round(120 / (aspectRatioVal > 1 ? aspectRatioVal : 1)))}px`
                  }}
                >
                  {currentRatio.text}
                </div>
              </div>

              {/* Box B: Target */}
              <div className="flex flex-col items-center gap-2 w-full">
                <span className="text-[11px] text-neutral-400 font-mono font-bold">{compareTarget.name}</span>
                <div
                  className="rounded-lg border border-white/20 bg-[#0a0a0a] flex items-center justify-center text-neutral-300 text-xs font-mono font-bold shadow"
                  style={{
                    width: `${Math.min(140, Math.round(120 * (compareTarget.ratioW / compareTarget.ratioH > 1 ? 1 : compareTarget.ratioW / compareTarget.ratioH)))}px`,
                    height: `${Math.min(140, Math.round(120 / (compareTarget.ratioW / compareTarget.ratioH > 1 ? compareTarget.ratioW / compareTarget.ratioH : 1)))}px`
                  }}
                >
                  {compareTarget.ratioW}:{compareTarget.ratioH}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
