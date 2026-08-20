import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { COMPARISONS_DATA } from '@/data/comparisons';

export const metadata: Metadata = {
  title: 'Aspect Ratio & Screen Resolution Comparison Guides Hub',
  description: 'Side-by-side visual aspect ratio & resolution comparisons (16:9 vs 4:3, 16:9 vs 21:9, 1080p vs 1440p, 1440p vs 4K, and Instagram post formats).',
  alternates: {
    canonical: 'https://free-aspect-ratio-calculator.vercel.app/compare',
  },
};

export default function CompareHubPage() {
  const comparisonsList = Object.values(COMPARISONS_DATA);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://free-aspect-ratio-calculator.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Compare',
        item: 'https://free-aspect-ratio-calculator.vercel.app/compare',
      },
    ],
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 font-sans pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header Banner */}
      <header className="border-b border-neutral-800 bg-neutral-900/50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <nav className="text-xs font-mono text-neutral-400 mb-2 flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-neutral-200">Comparisons Hub</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            Aspect Ratio & Resolution Comparisons
          </h1>
          <p className="text-base sm:text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Detailed side-by-side visual breakdowns, specification matrices, pros/cons, and industry recommendations to help you select the ideal aspect ratio or screen resolution.
          </p>
        </div>
      </header>

      {/* Grid of Comparisons */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
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

                <h2 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">
                  {comp.title}
                </h2>

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
                  className="text-xs font-mono font-semibold text-blue-400 group-hover:translate-x-1 transition-transform flex items-center gap-1"
                >
                  View Comparison →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
