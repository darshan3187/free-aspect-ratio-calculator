'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import CalculatorHeader from './CalculatorHeader';
import CalculatorHub from './CalculatorHub';
import QuickStartGuide from './QuickStartGuide';
import VisualCanvas from './VisualCanvas';
import ImageInspector from './ImageInspector';
import PresetsGrid from './PresetsGrid';
import ScaleTable from './ScaleTable';
import CodeExporter from './CodeExporter';
import { calculateTargetDimension } from '@/utils/aspectRatioMath';

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
  const [showQuickGuide, setShowQuickGuide] = useState(false);

  // Subject / Face Framing States
  const [focalX, setFocalX] = useState(50);
  const [focalY, setFocalY] = useState(50);
  const [fitMode, setFitMode] = useState('cover');

  const isInitialMount = useRef(true);

  // Parse URL Parameters & Screen Size on Mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Show guide by default only on larger screens (>= 1024px) to protect mobile above-the-fold
      if (window.innerWidth >= 1024) {
        setShowQuickGuide(true);
      }

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
