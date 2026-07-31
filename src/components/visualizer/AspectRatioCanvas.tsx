'use client';

import React from 'react';

interface AspectRatioCanvasProps {
  ratioWidth: number;
  ratioHeight: number;
  widthPx?: number;
  heightPx?: number;
  title?: string;
}

export function AspectRatioCanvas({
  ratioWidth,
  ratioHeight,
  widthPx = 1920,
  heightPx = 1080,
  title = 'Aspect Ratio Visualizer',
}: AspectRatioCanvasProps) {
  // Max bounding box in SVG container
  const maxW = 320;
  const maxH = 220;

  const ratio = ratioWidth / ratioHeight;
  let renderW = maxW;
  let renderH = maxW / ratio;

  if (renderH > maxH) {
    renderH = maxH;
    renderW = maxH * ratio;
  }

  const posX = (maxW - renderW) / 2;
  const posY = (maxH - renderH) / 2;

  return (
    <div className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col items-center justify-center shadow-inner">
      <div className="text-xs font-mono tracking-wider text-neutral-400 uppercase mb-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
        {title} ({ratioWidth}:{ratioHeight})
      </div>

      <div className="relative w-full max-w-[340px] h-[240px] flex items-center justify-center bg-neutral-950/80 rounded-lg overflow-hidden border border-neutral-800/80 shadow-2xl">
        <svg
          viewBox={`0 0 ${maxW} ${maxH}`}
          className="w-full h-full p-2"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <pattern id="grid" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
            <linearGradient id="rectGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0070f3" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#7928ca" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          {/* Background Grid */}
          <rect width={maxW} height={maxH} fill="url(#grid)" />

          {/* Rendered Ratio Container Box */}
          <rect
            x={posX}
            y={posY}
            width={renderW}
            height={renderH}
            fill="url(#rectGrad)"
            stroke="#0070f3"
            strokeWidth="2"
            rx="4"
            className="transition-all duration-300 ease-out"
          />

          {/* Crosshairs & Center Label */}
          <line
            x1={posX}
            y1={posY + renderH / 2}
            x2={posX + renderW}
            y2={posY + renderH / 2}
            stroke="rgba(255,255,255,0.15)"
            strokeDasharray="4 4"
          />
          <line
            x1={posX + renderW / 2}
            y1={posY}
            x2={posX + renderW / 2}
            y2={posY + renderH}
            stroke="rgba(255,255,255,0.15)"
            strokeDasharray="4 4"
          />

          <text
            x={maxW / 2}
            y={maxH / 2}
            fill="#ffffff"
            fontSize="13"
            fontWeight="600"
            fontFamily="monospace"
            textAnchor="middle"
            alignmentBaseline="central"
            className="drop-shadow-md"
          >
            {widthPx} x {heightPx}
          </text>

          <text
            x={maxW / 2}
            y={maxH / 2 + 18}
            fill="#888888"
            fontSize="10"
            fontFamily="sans-serif"
            textAnchor="middle"
            alignmentBaseline="central"
          >
            {ratioWidth}:{ratioHeight} ({ (ratioWidth / ratioHeight).toFixed(3) }:1)
          </text>
        </svg>
      </div>

      <div className="mt-4 flex items-center justify-between w-full text-xs text-neutral-400 font-mono">
        <span>Scale Ratio: {(ratioWidth / ratioHeight).toFixed(4)}</span>
        <span>Orientation: {ratioWidth >= ratioHeight ? 'Landscape' : 'Portrait'}</span>
      </div>
    </div>
  );
}
