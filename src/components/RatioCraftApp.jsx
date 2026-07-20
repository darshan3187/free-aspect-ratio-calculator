import React, { useState, useEffect } from 'react';
import CalculatorHeader from './CalculatorHeader';
import CalculatorHub from './CalculatorHub';
import VisualCanvas from './VisualCanvas';
import ImageInspector from './ImageInspector';
import PresetsGrid from './PresetsGrid';
import ScaleTable from './ScaleTable';
import CodeExporter from './CodeExporter';
import FooterSection from './FooterSection';
import FaqSection from './FaqSection';
import SeoArticleSection from './SeoArticleSection';
import { calculateTargetDimension } from '../utils/aspectRatioMath';

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

  // Subject / Face Framing States
  const [focalX, setFocalX] = useState(50);
  const [focalY, setFocalY] = useState(50);
  const [fitMode, setFitMode] = useState('cover');

  useEffect(() => {
    if (!lockRatio) return;

    const result = calculateTargetDimension({
      w1, h1, w2, h2,
      lastChanged,
      roundValues
    });

    if (lastChanged === 'w2' && result.h2 !== undefined && result.h2 !== h2) {
      setH2(result.h2.toString());
      setRoundingOccurred(result.roundingOccurred);
    } else if (lastChanged === 'h2' && result.w2 !== undefined && result.w2 !== w2) {
      setW2(result.w2.toString());
      setRoundingOccurred(result.roundingOccurred);
    } else if (lastChanged === 'w1' || lastChanged === 'h1') {
      const reResult = calculateTargetDimension({
        w1, h1, w2, h2: '',
        lastChanged: 'w2',
        roundValues
      });
      if (reResult.h2 !== undefined) {
        setH2(reResult.h2.toString());
        setRoundingOccurred(reResult.roundingOccurred);
      }
    }
  }, [w1, h1, w2, h2, lockRatio, roundValues, lastChanged]);

  const handleSelectPreset = (newW, newH) => {
    setW1(newW.toString());
    setH1(newH.toString());
    setLastChanged('w1');
  };

  const handleDragResize = (newW2, newH2) => {
    setW2(newW2.toString());
    setH2(newH2.toString());
    setLastChanged('w2');
  };

  const handleImageLoaded = (imgW, imgH) => {
    setW1(imgW.toString());
    setH1(imgH.toString());
    setLastChanged('w1');
    setFocalY(0); // Auto-focus near top (face area) when new portrait image loaded
  };

  const handleReset = () => {
    setW1('1920');
    setH1('1080');
    setW2('400');
    setH2('225');
    setLockRatio(true);
    setLastChanged('w2');
    setUploadedImage(null);
    setFocalX(50);
    setFocalY(50);
    setFitMode('cover');
  };

  return (
    <div className="min-h-screen bg-[#000000] studio-grid-pattern text-neutral-100 py-3 sm:py-6 lg:py-8 relative overflow-hidden">
      {/* Vercel DESIGN.md Hero Mesh Backdrop */}
      <div className="hero-mesh-bg"></div>

      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <CalculatorHeader />



        {/* 2-Column Main Workspace Grid (Desktop & Tablet) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
          {/* Left Column: Calculator Hub & Controls */}
          <div className="lg:col-span-6">
            <CalculatorHub
              w1={w1} setW1={setW1}
              h1={h1} setH1={setH1}
              w2={w2} setW2={setW2}
              h2={h2} setH2={setH2}
              lockRatio={lockRatio} setLockRatio={setLockRatio}
              roundValues={roundValues} setRoundValues={setRoundValues}
              lastChanged={lastChanged} setLastChanged={setLastChanged}
              onReset={handleReset}
              roundingOccurred={roundingOccurred}
            />
          </div>

          {/* Right Column: Visual Canvas & Framing */}
          <div className="lg:col-span-6">
            <VisualCanvas
              w1={w1} h1={h1}
              w2={w2} h2={h2}
              uploadedImage={uploadedImage}
              onDragResize={handleDragResize}
              focalX={focalX} setFocalX={setFocalX}
              focalY={focalY} setFocalY={setFocalY}
              fitMode={fitMode} setFitMode={setFitMode}
            />
          </div>
        </div>

        {/* Row 2: Image Inspector & Presets */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
          <div className="lg:col-span-5">
            <ImageInspector
              uploadedImage={uploadedImage}
              setUploadedImage={setUploadedImage}
              onImageLoaded={handleImageLoaded}
            />
          </div>
          <div className="lg:col-span-7">
            <PresetsGrid onSelectPreset={handleSelectPreset} />
          </div>
        </div>

        {/* Row 3: Code Generator & Resolution Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
          <div className="lg:col-span-6">
            <CodeExporter
              w1={w1} h1={h1}
              w2={w2} h2={h2}
              focalX={focalX}
              focalY={focalY}
              fitMode={fitMode}
            />
          </div>
          <div className="lg:col-span-6">
            <ScaleTable w1={w1} h1={h1} />
          </div>
        </div>

        {/* 600-Word On-Page SEO Article Documentation */}
        <SeoArticleSection />

        {/* FAQ Section */}
        <FaqSection />


        {/* SEO Footer with Privacy Policy, Terms, Contact Us */}
        <FooterSection onSelectPreset={handleSelectPreset} />
      </div>
    </div>
  );
}


