import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { COMPARISONS_DATA } from '@/data/comparisons';
import { RATIOS_DATA } from '@/data/ratios';
import CalculatorHeader from '@/components/CalculatorHeader';
import FooterSection from '@/components/FooterSection';
import { SITE_URL } from '@/utils/constants';

export const metadata: Metadata = {
  title: 'Aspect Ratio Comparisons & Screen Resolution Matrix',
  description: 'Side-by-side visual aspect ratio & resolution comparisons (16:9 vs 4:3, 16:9 vs 21:9, 1080p vs 1440p, 1440p vs 4K, and Instagram post formats).',
  alternates: {
    canonical: `${SITE_URL}/compare`,
  },
};

export default function CompareHubPage() {
  const comparisonsList = Object.values(COMPARISONS_DATA);
  const ratiosList = Object.values(RATIOS_DATA);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Compare',
        item: `${SITE_URL}/compare`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        <CalculatorHeader />

        {/* Header Banner */}
        <header className="border-b border-neutral-800 bg-neutral-900/50 py-12 px-4 sm:px-6 lg:px-8 rounded-2xl mb-8">
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <nav className="text-xs font-mono text-neutral-300 mb-2 flex items-center justify-center gap-2">
              <Link href="/" className="hover:text-blue-400 transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-neutral-200">Comparisons Hub</span>
            </nav>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent font-sans">
              Aspect Ratio & Resolution Comparisons
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              Detailed side-by-side visual breakdowns, specification matrices, pros/cons, and industry recommendations to help you select the ideal aspect ratio or screen resolution.
            </p>
          </div>
        </header>

        {/* Featured Side-by-Side Comparisons Grid */}
        <section aria-labelledby="featured-comparisons" className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 id="featured-comparisons" className="text-xl sm:text-2xl font-bold text-white font-sans">
                Featured Side-by-Side Comparisons
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-sans">
                In-depth head-to-head analysis comparing display canvas, field of view, and resolution requirements.
              </p>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded bg-neutral-800 text-neutral-300 border border-neutral-700 hidden sm:inline-block">
              {comparisonsList.length} Comparisons
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comparisonsList.map((comp) => (
              <article
                key={comp.slug}
                className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 hover:border-blue-500 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-blue-950 text-blue-400 border border-blue-800">
                      {comp.itemAName} vs {comp.itemBName}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">
                    {comp.title}
                  </h3>

                  <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                    {comp.overview}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800/60 flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400">
                    Detailed Specs Matrix
                  </span>
                  <Link
                    href={`/compare/${comp.slug}`}
                    prefetch={false}
                    className="text-xs font-mono font-semibold text-blue-400 group-hover:translate-x-1 transition-transform flex items-center gap-1"
                  >
                    View Comparison →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Master Comparison Reference Table */}
        <section aria-labelledby="matrix-heading" className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 sm:p-8 mb-12 space-y-6">
          <div className="space-y-1">
            <h2 id="matrix-heading" className="text-xl sm:text-2xl font-bold text-white font-sans">
              Master Aspect Ratio Comparison Matrix
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-sans">
              Quick-reference benchmark of universal aspect ratios, mathematical multipliers, primary use cases, and dedicated calculators.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 font-mono text-neutral-400 uppercase bg-neutral-900/80">
                  <th className="py-3 px-4">Aspect Ratio</th>
                  <th className="py-3 px-4">Decimal Value</th>
                  <th className="py-3 px-4">Orientation</th>
                  <th className="py-3 px-4">Standard Resolution</th>
                  <th className="py-3 px-4">Primary Application</th>
                  <th className="py-3 px-4 text-right">Calculator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 font-sans text-neutral-300">
                {ratiosList.map((r) => (
                  <tr key={r.slug} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-white font-mono">{r.name}</td>
                    <td className="py-3 px-4 font-mono text-blue-400">{r.decimalValue.toFixed(3)}:1</td>
                    <td className="py-3 px-4">
                      {r.ratioWidth > r.ratioHeight ? 'Landscape' : r.ratioWidth < r.ratioHeight ? 'Portrait' : 'Square'}
                    </td>
                    <td className="py-3 px-4 font-mono text-neutral-400">
                      {r.commonResolutions[0] ? `${r.commonResolutions[0].width}x${r.commonResolutions[0].height}` : 'Custom'}
                    </td>
                    <td className="py-3 px-4 text-neutral-400 max-w-xs truncate">{r.tagline}</td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/${r.slug}`}
                        prefetch={false}
                        className="text-blue-400 hover:text-white font-mono font-semibold transition-colors inline-flex items-center gap-1"
                      >
                        Calculate →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Technical Guide: How to Choose the Right Aspect Ratio */}
        <section className="bg-neutral-900/30 border border-neutral-800 rounded-2xl p-6 sm:p-8 mb-12 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white font-sans">
            How to Choose Between Display Aspect Ratios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
            <div className="space-y-2 p-4 rounded-xl bg-neutral-950 border border-neutral-800">
              <h3 className="font-bold text-white text-sm">1. Viewer Device Context</h3>
              <p className="text-neutral-400 text-xs">
                Target audiences viewing content on smartphones held in one hand interact primarily with vertical (9:16) and portrait (4:5) frames. Desktop workstations and televisions require 16:9 widescreen or 21:9 ultrawide canvas.
              </p>
            </div>
            <div className="space-y-2 p-4 rounded-xl bg-neutral-950 border border-neutral-800">
              <h3 className="font-bold text-white text-sm">2. Productivity & Vertical FOV</h3>
              <p className="text-neutral-400 text-xs">
                For coding, text document editing, and spreadsheet workflows, 16:10 and 4:3 ratios provide superior vertical viewing height, reducing the need for continuous downward scrolling compared to standard 16:9 monitors.
              </p>
            </div>
            <div className="space-y-2 p-4 rounded-xl bg-neutral-950 border border-neutral-800">
              <h3 className="font-bold text-white text-sm">3. Letterbox Minimization</h3>
              <p className="text-neutral-400 text-xs">
                Displaying non-native aspect ratios forces either black pillarbox/letterbox padding or destructive cropping. Always match your export container proportion to the destination screen standard whenever possible.
              </p>
            </div>
          </div>
        </section>

        <FooterSection />
      </div>
    </div>
  );
}
