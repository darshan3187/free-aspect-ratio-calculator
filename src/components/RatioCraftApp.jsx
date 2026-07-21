'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import CalculatorHeader from './CalculatorHeader';
import CalculatorHub from './CalculatorHub';
import { calculateTargetDimension } from '@/utils/aspectRatioMath';

// Skeleton loaders to reserve layout space and eliminate Cumulative Layout Shift (CLS)
const VisualCanvasSkeleton = () => (
  <div className="studio-card p-4 sm:p-5 mb-6 min-h-[440px] animate-pulse bg-[#0a0a0a] border border-white/[0.08] rounded-xl flex items-center justify-center">
    <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-white animate-spin" />
  </div>
);

const ImageInspectorSkeleton = () => (
  <div className="studio-card p-4 sm:p-5 mb-5 min-h-[150px] animate-pulse bg-[#0a0a0a] border border-white/[0.08] rounded-xl" />
);

const PresetsGridSkeleton = () => (
  <div className="studio-card p-4 sm:p-6 mb-6 min-h-[260px] animate-pulse bg-[#0a0a0a] border border-white/[0.08] rounded-xl" />
);

const ScaleTableSkeleton = () => (
  <div className="studio-card p-4 sm:p-6 mb-6 min-h-[280px] animate-pulse bg-[#0a0a0a] border border-white/[0.08] rounded-xl" />
);

const CodeExporterSkeleton = () => (
  <div className="studio-card p-4 sm:p-6 mb-6 min-h-[200px] animate-pulse bg-[#0a0a0a] border border-white/[0.08] rounded-xl" />
);

const QuickStartGuideSkeleton = () => (
  <div className="studio-card p-4 mb-6 min-h-[100px] animate-pulse bg-[#0a0a0a] border border-white/[0.08] rounded-xl" />
);

// Dynamic lazy imports with loading fallbacks for maximum performance and 0 TBT
const QuickStartGuide = dynamic(() => import('./QuickStartGuide'), {
  loading: QuickStartGuideSkeleton,
  ssr: false,
});
const VisualCanvas = dynamic(() => import('./VisualCanvas'), {
  loading: VisualCanvasSkeleton,
  ssr: false,
});
const ImageInspector = dynamic(() => import('./ImageInspector'), {
  loading: ImageInspectorSkeleton,
  ssr: false,
});
const PresetsGrid = dynamic(() => import('./PresetsGrid'), {
  loading: PresetsGridSkeleton,
  ssr: false,
});
const ScaleTable = dynamic(() => import('./ScaleTable'), {
  loading: ScaleTableSkeleton,
  ssr: false,
});
const CodeExporter = dynamic(() => import('./CodeExporter'), {
  loading: CodeExporterSkeleton,
  ssr: false,
});

export default function RatioCraftApp() {
  const [w1, setW1] = useState('1920');
  const [h1, setH1] = useState('1080');
  const [w2, setW2] = useState('400');
  const [h2, setH2] = useState('225');
  const [lockRatio, setLockRatio] = useState(true);
  const [roundValues, setRoundValues] = useState(true);
  const [lastChanged, setLastChanged] = useState('w2');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [roundingOccurred, setRoundingOccurred] = useState(false);
  const [showQuickGuide, setShowQuickGuide] = useState(true);

  // Subject / Face Framing States
  const [focalX, setFocalX] = useState(50);
  const [focalY, setFocalY] = useState(50);
  const [fitMode, setFitMode] = useState('cover');

  const isInitialMount = useRef(true);

  // Parse URL Parameters on Mount for Instant Shared Calculations
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const paramW1 = params.get('w1');
      const paramH1 = params.get('h1');
      const paramW2 = params.get('w2');
      const paramH2 = params.get('h2');

      if (paramW1 && !isNaN(Number(paramW1))) setW1(paramW1);
      if (paramH1 && !isNaN(Number(paramH1))) setH1(paramH1);
      if (paramW2 && !isNaN(Number(paramW2))) setW2(paramW2);
      if (paramH2 && !isNaN(Number(paramH2))) setH2(paramH2);
    }
  }, []);

  // Optimized target ratio recalculation effect with mount guard
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (!lockRatio) return;

    const result = calculateTargetDimension({
      w1, h1, w2, h2,
      lastChanged,
      roundValues
    });

    const targetH2 = result.h2 !== undefined ? result.h2.toString() : h2;
    const targetW2 = result.w2 !== undefined ? result.w2.toString() : w2;

    if (lastChanged === 'w2' || lastChanged === 'w1') {
      if (targetH2 !== h2) {
        setH2(targetH2);
        setRoundingOccurred(result.roundingOccurred);
      }
    } else if (lastChanged === 'h2' || lastChanged === 'h1') {
      if (targetW2 !== w2) {
        setW2(targetW2);
        setRoundingOccurred(result.roundingOccurred);
      }
    }
  }, [w1, h1, w2, h2, lockRatio, roundValues, lastChanged]);

  const handlePresetSelect = useCallback((presetW, presetH) => {
    setW1(presetW.toString());
    setH1(presetH.toString());
    setLastChanged('w1');
  }, []);

  const handleImageDimensionsLoaded = useCallback((width, height) => {
    setW1(width.toString());
    setH1(height.toString());
    setLastChanged('w1');
  }, []);

  const handleClearImage = useCallback(() => {
    setUploadedImage(null);
  }, []);

  const handleSampleApply = useCallback(() => {
    setW1('1920');
    setH1('1080');
    setW2('1080');
    setLastChanged('w2');
  }, []);

  const handleReset = useCallback(() => {
    setW1('1920');
    setH1('1080');
    setW2('400');
    setH2('225');
    setLastChanged('w2');
    setUploadedImage(null);
  }, []);

  const handleDragResize = useCallback((newW2, newH2) => {
    setW2(newW2.toString());
    setH2(newH2.toString());
    setLastChanged('w2');
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6">
      {/* Header Bar */}
      <CalculatorHeader
        showGuide={showQuickGuide}
        onToggleGuide={() => setShowQuickGuide(!showQuickGuide)}
      />

      {/* Interactive Quick Start Help Banner */}
      {showQuickGuide && (
        <QuickStartGuide
          onDismiss={() => setShowQuickGuide(false)}
          onApplySample={handleSampleApply}
        />
      )}

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 mb-8">
        {/* Left Column: Primary Control Hub */}
        <div className="lg:col-span-6 xl:col-span-5 space-y-5">
          <CalculatorHub
            w1={w1} setW1={setW1}
            h1={h1} setH1={setH1}
            w2={w2} setW2={setW2}
            h2={h2} setH2={setH2}
            lockRatio={lockRatio} setLockRatio={setLockRatio}
            roundValues={roundValues} setRoundValues={setRoundValues}
            lastChanged={lastChanged} setLastChanged={setLastChanged}
            roundingOccurred={roundingOccurred}
            onReset={handleReset}
            onSelectPreset={handlePresetSelect}
          />

          {/* Local Drag and Drop Image Upload Inspector */}
          <ImageInspector
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
            onImageLoaded={handleImageDimensionsLoaded}
            onClearImage={handleClearImage}
          />
        </div>

        {/* Right Column: Visual Canvas & Studio Tools */}
        <div className="lg:col-span-6 xl:col-span-7 space-y-5">
          <VisualCanvas
            w1={w1} h1={h1}
            w2={w2} h2={h2}
            uploadedImage={uploadedImage}
            onDragResize={handleDragResize}
            focalX={focalX} setFocalX={setFocalX}
            focalY={focalY} setFocalY={setFocalY}
            fitMode={fitMode} setFitMode={setFitMode}
          />

          <PresetsGrid onSelectPreset={handlePresetSelect} />

          <ScaleTable w1={w1} h1={h1} />

          <CodeExporter
            w1={w1} h1={h1}
            w2={w2} h2={h2}
            focalX={focalX} focalY={focalY}
            fitMode={fitMode}
          />
        </div>
      </div>
    </div>
  );
}
