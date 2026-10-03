import React from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight, Layers, BookOpen, Monitor } from 'lucide-react';
import { RATIOS_DATA } from '@/data/ratios';
import { COMPARISONS_DATA } from '@/data/comparisons';

// Core 7 prioritized calculators + extended key tools
const CORE_RATIO_SLUGS = [
  '16-9-aspect-ratio-calculator',
  '4-3-aspect-ratio-calculator',
  '21-9-aspect-ratio-calculator',
  '1-1-aspect-ratio-calculator',
  '9-16-aspect-ratio-calculator',
  '3-2-aspect-ratio-calculator',
  '5-4-aspect-ratio-calculator',
  '4-5-aspect-ratio-calculator',
  '16-10-aspect-ratio-calculator',
];

const FEATURED_COMPARISONS = [
  '16-9-vs-4-3',
  '16-9-vs-21-9',
  '1080p-vs-1440p',
  '1440p-vs-4k',
  'portrait-vs-landscape',
  'instagram-post-vs-reel',
];

const FEATURED_GUIDES = [
  { slug: 'what-is-aspect-ratio', title: 'What Is Aspect Ratio? Complete Guide', tag: 'Fundamentals' },
  { slug: 'how-to-calculate-aspect-ratio', title: 'How to Calculate Aspect Ratio Manually (Formulas & GCD)', tag: 'Math & Formulas' },
  { slug: 'common-screen-resolutions', title: 'Common Screen Resolutions (1080p, 1440p, 4K, 8K)', tag: 'Resolutions' },
  { slug: 'best-aspect-ratio-for-youtube', title: 'Best Aspect Ratio for YouTube Videos & Shorts', tag: 'Video Sizing' },
  { slug: 'best-aspect-ratio-for-instagram', title: 'Best Aspect Ratio for Instagram Posts & Reels', tag: 'Social Media' },
  { slug: 'aspect-ratio-for-printing-photos', title: 'Best Aspect Ratio for Printing Photos (4x6, 8x10)', tag: 'Print & DPI' },
];

export default function CoreToolsHub() {
  const coreTools = CORE_RATIO_SLUGS.map((slug) => RATIOS_DATA[slug]).filter(Boolean);
  const comparisons = FEATURED_COMPARISONS.map((slug) => COMPARISONS_DATA[slug]).filter(Boolean);

  return (
    <section aria-label="Core Aspect Ratio Calculators & Comparison Hub" className="space-y-10 sm:space-y-12 mb-8 sm:mb-12">
      {/* Core Calculators Section */}
      <div className="studio-card p-6 sm:p-8 md:p-10 border border-white/[0.08] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              <span>Dedicated Calculators</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-display-lg font-sans">
              Core Aspect Ratio Calculators & Tools
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md font-sans">
            Direct interactive calculators with pixel dimension converters, SVG preview canvases, and resolution tables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {coreTools.map((tool) => (
            <article
              key={tool.slug}
              className="p-4 sm:p-5 rounded-xl bg-[#000000] border border-white/[0.08] hover:border-blue-500/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-900 font-semibold">
                    {tool.ratioWidth}:{tool.ratioHeight}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    Ratio: {tool.decimalValue.toFixed(3)}:1
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors font-sans">
                  {tool.name} Calculator
                </h3>

                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                  {tool.tagline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between">
                <span className="text-[11px] font-mono text-neutral-400">
                  {tool.commonResolutions[1]?.name || 'Full HD'}
                </span>
                <Link
                  href={`/${tool.slug}`}
                  className="text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-sans"
                >
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Side-by-Side Comparisons Grid */}
      <div className="studio-card p-6 sm:p-8 md:p-10 border border-white/[0.08] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Side-by-Side Analysis</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-display-lg font-sans">
              Aspect Ratio & Resolution Comparisons
            </h2>
          </div>
          <Link
            href="/compare"
            className="text-xs font-mono text-blue-400 hover:underline flex items-center gap-1 shrink-0"
          >
            <span>View All Comparisons Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {comparisons.map((comp) => (
            <article
              key={comp.slug}
              className="p-4 sm:p-5 rounded-xl bg-[#000000] border border-white/[0.08] hover:border-purple-500/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-900 font-semibold">
                    {comp.itemAName} vs {comp.itemBName}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors font-sans">
                  {comp.title}
                </h3>

                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                  {comp.overview}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between">
                <span className="text-[11px] font-mono text-neutral-400">
                  Specs & FOV Matrix
                </span>
                <Link
                  href={`/compare/${comp.slug}`}
                  className="text-xs font-semibold text-purple-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-sans"
                >
                  <span>Compare</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Featured Educational Guides */}
      <div className="studio-card p-6 sm:p-8 md:p-10 border border-white/[0.08] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Educational Knowledge Hub</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-display-lg font-sans">
              Featured Technical Guides & Standards
            </h2>
          </div>
          <Link
            href="/guides"
            className="text-xs font-mono text-blue-400 hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Explore All Guides Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURED_GUIDES.map((guide) => (
            <article
              key={guide.slug}
              className="p-4 sm:p-5 rounded-xl bg-[#000000] border border-white/[0.08] hover:border-emerald-500/60 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-900 font-semibold w-fit block">
                  {guide.tag}
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors font-sans">
                  {guide.title}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-end">
                <Link
                  href={`/guides/${guide.slug}`}
                  className="text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-sans"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
