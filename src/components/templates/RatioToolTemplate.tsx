'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { RatioData, RATIOS_DATA } from '@/data/ratios';
import { AspectRatioCanvas } from '@/components/visualizer/AspectRatioCanvas';
import CalculatorHeader from '@/components/CalculatorHeader';
import FooterSection from '@/components/FooterSection';
import { generateWebApplicationSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/utils/schema';
import { SITE_URL } from '@/utils/constants';

interface RatioToolTemplateProps {
  data: RatioData;
}

// Contextual mapping for high-intent comparison and guide links
const RELATED_RESOURCES: Record<string, { comparisons: Array<{ slug: string; title: string }>; guides: Array<{ slug: string; title: string }> }> = {
  '16-9-aspect-ratio-calculator': {
    comparisons: [
      { slug: '16-9-vs-4-3', title: '16:9 vs 4:3 Aspect Ratio' },
      { slug: '16-9-vs-21-9', title: '16:9 vs 21:9 Ultrawide' },
      { slug: '1080p-vs-1440p', title: '1080p vs 1440p (QHD)' },
      { slug: '1440p-vs-4k', title: '1440p vs 4K (UHD)' },
    ],
    guides: [
      { slug: 'what-is-aspect-ratio', title: 'What Is Aspect Ratio? Complete Guide' },
      { slug: 'how-to-calculate-aspect-ratio', title: 'How to Calculate Aspect Ratio Manually' },
      { slug: 'common-screen-resolutions', title: 'Common Screen Resolutions (1080p, 1440p, 4K)' },
      { slug: 'best-aspect-ratio-for-youtube', title: 'Best Aspect Ratio for YouTube Videos & Shorts' },
    ],
  },
  '4-3-aspect-ratio-calculator': {
    comparisons: [
      { slug: '16-9-vs-4-3', title: '16:9 vs 4:3 Comparison' },
      { slug: 'portrait-vs-landscape', title: 'Portrait vs Landscape' },
    ],
    guides: [
      { slug: 'what-is-aspect-ratio', title: 'What Is Aspect Ratio?' },
      { slug: 'aspect-ratio-for-presentation-slides', title: 'Aspect Ratio for Presentation Slides' },
      { slug: 'how-aspect-ratio-affects-photography', title: 'How Aspect Ratio Affects Photography' },
      { slug: 'tv-aspect-ratios-crt-to-oled', title: 'TV Aspect Ratios: CRT to OLED' },
    ],
  },
  '21-9-aspect-ratio-calculator': {
    comparisons: [
      { slug: '16-9-vs-21-9', title: '16:9 vs 21:9 Ultrawide Comparison' },
    ],
    guides: [
      { slug: 'ultrawide-monitor-resolutions', title: 'Ultrawide Monitor Resolutions (21:9 & 32:9)' },
      { slug: 'understanding-ultrawide-monitors', title: 'Understanding Ultrawide Monitors' },
      { slug: 'cinematic-aspect-ratios', title: 'Cinematic Aspect Ratios Explained' },
      { slug: 'designing-for-ultrawide-web-ux', title: 'Designing for Ultrawide Web UX' },
    ],
  },
  '1-1-aspect-ratio-calculator': {
    comparisons: [
      { slug: 'instagram-post-vs-reel', title: 'Instagram Post vs Reel Dimensions' },
      { slug: 'portrait-vs-landscape', title: 'Portrait vs Landscape' },
    ],
    guides: [
      { slug: 'best-aspect-ratio-for-instagram', title: 'Best Aspect Ratio for Instagram (Posts, Reels)' },
      { slug: 'social-media-image-dimensions-cheat-sheet', title: 'Social Media Image Dimensions Master Sheet' },
      { slug: 'ui-card-grid-aspect-ratios', title: 'UI Card Grid Aspect Ratios' },
    ],
  },
  '9-16-aspect-ratio-calculator': {
    comparisons: [
      { slug: 'instagram-post-vs-reel', title: 'Instagram Post vs Reel Dimensions' },
      { slug: 'portrait-vs-landscape', title: 'Portrait vs Landscape Orientation' },
    ],
    guides: [
      { slug: 'best-aspect-ratio-for-tiktok', title: 'TikTok Video Dimensions & Ratio Guide' },
      { slug: 'best-aspect-ratio-for-instagram', title: 'Best Aspect Ratio for Instagram Reels & Stories' },
      { slug: 'best-aspect-ratio-for-youtube', title: 'Best Aspect Ratio for YouTube Shorts' },
      { slug: 'resizing-images-without-stretching', title: 'Resizing Images Without Stretching' },
    ],
  },
  '3-2-aspect-ratio-calculator': {
    comparisons: [
      { slug: 'portrait-vs-landscape', title: 'Portrait vs Landscape' },
      { slug: '16-9-vs-4-3', title: '16:9 vs 4:3 Comparison' },
    ],
    guides: [
      { slug: 'how-aspect-ratio-affects-photography', title: 'How Aspect Ratio Affects Photography Composition' },
      { slug: 'aspect-ratio-for-printing-photos', title: 'Best Aspect Ratio for Printing Photos (4x6, 8x10)' },
      { slug: 'megapixels-to-print-size-chart', title: 'Megapixels to Print Size Chart' },
      { slug: 'street-photography-aspect-ratio', title: 'Street Photography Aspect Ratios' },
    ],
  },
  '5-4-aspect-ratio-calculator': {
    comparisons: [
      { slug: 'portrait-vs-landscape', title: 'Portrait vs Landscape' },
    ],
    guides: [
      { slug: 'aspect-ratio-for-printing-photos', title: 'Best Aspect Ratio for Printing Photos' },
      { slug: 'megapixels-to-print-size-chart', title: 'Megapixels to Print Size Chart at 300 DPI' },
      { slug: 'best-aspect-ratio-for-instagram', title: 'Best Aspect Ratio for Instagram (4:5 Portrait)' },
    ],
  },
  '4-5-aspect-ratio-calculator': {
    comparisons: [
      { slug: 'instagram-post-vs-reel', title: 'Instagram Post vs Reel Dimensions' },
      { slug: 'portrait-vs-landscape', title: 'Portrait vs Landscape' },
    ],
    guides: [
      { slug: 'best-aspect-ratio-for-instagram', title: 'Best Aspect Ratio for Instagram Portrait Posts' },
      { slug: 'aspect-ratio-for-printing-photos', title: 'Best Aspect Ratio for 8x10 Printing' },
      { slug: 'social-media-image-dimensions-cheat-sheet', title: 'Social Media Dimensions Cheat Sheet' },
    ],
  },
  '16-10-aspect-ratio-laptops': {
    comparisons: [
      { slug: '16-9-vs-4-3', title: '16:9 vs 4:3 Comparison' },
    ],
    guides: [
      { slug: '16-10-aspect-ratio-laptops', title: '16:10 Laptop Aspect Ratio Guide' },
      { slug: 'common-screen-resolutions', title: 'Common Screen Resolutions' },
    ],
  },
};

export function RatioToolTemplate({ data }: RatioToolTemplateProps) {
  const [width, setWidth] = useState<number>(data.commonResolutions[1]?.width || 1920);
  const [height, setHeight] = useState<number>(
    Math.round((data.commonResolutions[1]?.width || 1920) / (data.ratioWidth / data.ratioHeight))
  );

  const handleWidthChange = (newW: number) => {
    setWidth(newW);
    setHeight(Math.round(newW / (data.ratioWidth / data.ratioHeight)));
  };

  const handleHeightChange = (newH: number) => {
    setHeight(newH);
    setWidth(Math.round(newH * (data.ratioWidth / data.ratioHeight)));
  };

  const appSchema = generateWebApplicationSchema({
    name: `${data.name} Calculator`,
    url: `${SITE_URL}/${data.slug}`,
    description: data.meta.description,
    applicationCategory: 'MultimediaApplication',
  });

  const faqSchema = generateFAQSchema(data.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: SITE_URL },
    { name: data.name, item: `${SITE_URL}/${data.slug}` },
  ]);

  const otherCalculators = Object.values(RATIOS_DATA).filter((r) => r.slug !== data.slug);
  const related = RELATED_RESOURCES[data.slug] || {
    comparisons: [
      { slug: '16-9-vs-4-3', title: '16:9 vs 4:3 Comparison' },
      { slug: 'portrait-vs-landscape', title: 'Portrait vs Landscape' },
    ],
    guides: [
      { slug: 'what-is-aspect-ratio', title: 'What Is Aspect Ratio?' },
      { slug: 'how-to-calculate-aspect-ratio', title: 'How to Calculate Aspect Ratio' },
      { slug: 'common-screen-resolutions', title: 'Common Screen Resolutions' },
    ],
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        <CalculatorHeader />

        {/* Hero Section */}
        <header className="border-b border-neutral-800 bg-neutral-900/50 py-10 px-4 sm:px-6 lg:px-8 rounded-2xl mb-8">
          <div className="max-w-4xl mx-auto text-center">
            <nav className="text-xs font-mono text-neutral-400 mb-3 flex items-center justify-center gap-2">
              <Link href="/" prefetch={false} className="hover:text-blue-400 transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-neutral-200">{data.name}</span>
            </nav>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent mb-3 font-sans">
              {data.name} Calculator
            </h1>
            <p className="text-base sm:text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              {data.tagline}
            </p>
          </div>
        </header>

      {/* Main Content & Tool Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-12">
        {/* Interactive Calculator Box */}
        <section className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  Interactive Dimensions Converter
                </h2>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-neutral-800 text-neutral-300">
                  Target: {data.ratioWidth}:{data.ratioHeight}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-2">
                    Width (Pixels)
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-lg font-mono text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-2">
                    Height (Pixels)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-lg font-mono text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Quick Resolution Preset Chips */}
              <div>
                <span className="block text-xs font-mono text-neutral-400 mb-2">
                  Quick Presets:
                </span>
                <div className="flex flex-wrap gap-2">
                  {data.commonResolutions.map((res) => (
                    <button
                      key={res.name}
                      onClick={() => {
                        setWidth(res.width);
                        setHeight(res.height);
                      }}
                      className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all ${
                        width === res.width && height === res.height
                          ? 'bg-blue-600 border-blue-500 text-white font-semibold shadow-md'
                          : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700'
                      }`}
                    >
                      {res.width}x{res.height} ({res.name})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Visualizer Canvas */}
            <div className="lg:col-span-6">
              <AspectRatioCanvas
                ratioWidth={data.ratioWidth}
                ratioHeight={data.ratioHeight}
                widthPx={width}
                heightPx={height}
                title={`${data.name} Render`}
              />
            </div>
          </div>
        </section>

        {/* Section 1: Overview & Math Breakdown */}
        <section className="bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
          <h2 className="text-2xl font-bold text-white">
            Understanding the {data.name} Format
          </h2>
          <p className="text-neutral-300 leading-relaxed">{data.overview}</p>

          <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 space-y-3">
            <h3 className="text-sm font-mono uppercase tracking-wider text-blue-400">
              Mathematical Formula & Calculation Mechanics
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {data.formulaDescription}
            </p>
            <div className="text-xs font-mono text-neutral-400 bg-neutral-900 p-3 rounded border border-neutral-800">
              Ratio Decimal Multiplier: {data.decimalValue.toFixed(6)} | Inverse Multiplier: {(1 / data.decimalValue).toFixed(6)}
            </div>
          </div>
        </section>

        {/* Section 2: Resolution Specs Table */}
        <section className="bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
          <h2 className="text-2xl font-bold text-white">
            Standard {data.name} Resolution Grid
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 text-xs font-mono text-neutral-400 uppercase">
                  <th className="py-3 px-4">Standard Name</th>
                  <th className="py-3 px-4">Pixel Dimensions</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Total Megapixels</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 font-mono text-neutral-300">
                {data.commonResolutions.map((res) => (
                  <tr key={res.name} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="py-3 px-4 font-semibold text-white">{res.name}</td>
                    <td className="py-3 px-4 text-blue-400">
                      {res.width} x {res.height} px
                    </td>
                    <td className="py-3 px-4 text-neutral-400">{res.category}</td>
                    <td className="py-3 px-4 text-neutral-400">
                      {((res.width * res.height) / 1000000).toFixed(2)} MP
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Use Cases & Applications */}
        <section className="bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
          <h2 className="text-2xl font-bold text-white">
            Industry Applications & Recommended Use Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.useCases.map((uc) => (
              <div
                key={uc.title}
                className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    {uc.industry}
                  </span>
                  {uc.recommended ? (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                      RECOMMENDED
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
                      LEGACY / SPECIALTY
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-white text-base">{uc.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{uc.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Pros & Cons */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-neutral-900/50 border border-emerald-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
              <span>✓</span> Advantages & Pros
            </h3>
            <ul className="space-y-2 text-sm text-neutral-300">
              {data.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-neutral-900/50 border border-rose-900/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-rose-400 flex items-center gap-2">
              <span>✕</span> Limitations & Trade-offs
            </h3>
            <ul className="space-y-2 text-sm text-neutral-300">
              {data.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 5: FAQ */}
        <section className="bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
          <h2 className="text-2xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {data.faqs.map((faq, i) => (
              <div key={i} className="bg-neutral-950 p-5 rounded-xl border border-neutral-800">
                <h3 className="font-semibold text-white text-base mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Contextual Comparisons & Guides */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-800">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-blue-400 font-sans flex items-center justify-between">
              <span>Related Comparisons</span>
              <Link href="/compare" prefetch={false} className="text-xs font-mono text-neutral-400 hover:text-white underline">
                View All →
              </Link>
            </h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Compare {data.name} side-by-side with other popular screen and video formats:
            </p>
            <div className="space-y-2">
              {related.comparisons.map((c) => (
                <Link
                  key={c.slug}
                  href={`/compare/${c.slug}`}
                  prefetch={false}
                  className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-blue-500 transition-all flex items-center justify-between text-xs font-medium text-neutral-200 hover:text-white"
                >
                  <span>{c.title}</span>
                  <span className="text-blue-400 font-mono">Compare →</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-emerald-400 font-sans flex items-center justify-between">
              <span>Technical Guides</span>
              <Link href="/guides" prefetch={false} className="text-xs font-mono text-neutral-400 hover:text-white underline">
                Content Hub →
              </Link>
            </h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              In-depth mathematical breakdowns and dimension rules for {data.name}:
            </p>
            <div className="space-y-2">
              {related.guides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  prefetch={false}
                  className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-emerald-500 transition-all flex items-center justify-between text-xs font-medium text-neutral-200 hover:text-white"
                >
                  <span className="truncate pr-2">{g.title}</span>
                  <span className="text-emerald-400 font-mono shrink-0">Read →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: Explore Other Calculators Grid */}
        <section className="space-y-6 pt-4 border-t border-neutral-800">
          <h2 className="text-xl font-bold text-white">Explore Other Aspect Ratio Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {otherCalculators.map((calc) => (
              <Link
                key={calc.slug}
                href={`/${calc.slug}`}
                prefetch={false}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 hover:border-blue-500 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                    {calc.name}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    {calc.ratioWidth}:{calc.ratioHeight}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 line-clamp-2">{calc.tagline}</p>
              </Link>
            ))}
          </div>
        </section>
        </div>

        <FooterSection />
      </div>
    </div>
  );
}
