import React, { Suspense } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ARTICLES_DATA } from '@/data/articles';
import CalculatorHeader from '@/components/CalculatorHeader';
import FooterSection from '@/components/FooterSection';
import GuidesSearchClient from '@/components/GuidesSearchClient';
import { SITE_URL } from '@/utils/constants';

export const metadata: Metadata = {
  title: 'Aspect Ratio, Screen Resolution & Design Guides Hub',
  description: 'Complete knowledge hub for aspect ratios, screen resolutions, social media image sizes, video production, photography framing, UI design, and printing standards.',
  alternates: {
    canonical: `${SITE_URL}/guides`,
  },
};

export default function GuidesHubPage() {
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
        name: 'Guides',
        item: `${SITE_URL}/guides`,
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

        {/* Header */}
        <header className="border-b border-neutral-800 bg-neutral-900/50 py-12 px-4 sm:px-6 lg:px-8 rounded-2xl mb-8">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <nav className="text-xs font-mono text-neutral-300 mb-2 flex items-center justify-center gap-2">
              <Link href="/" className="hover:text-blue-400 transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-neutral-200">Guides Knowledge Hub</span>
            </nav>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent font-sans">
              Aspect Ratio & Resolution Content Hub
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              Explore our comprehensive technical guides covering display resolutions, social media sizing, cinematic formats, photography composition, UI design, and print standards.
            </p>
            <div className="flex items-center justify-center gap-4 text-xs font-mono text-neutral-300">
              <span className="bg-neutral-800 px-3 py-1 rounded-full border border-neutral-700">{ARTICLES_DATA.length} In-Depth Articles</span>
              <span className="bg-neutral-800 px-3 py-1 rounded-full border border-neutral-700">Regularly Updated</span>
            </div>
          </div>
        </header>

        {/* Client Search & Category Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <Suspense fallback={<div className="text-center py-12 font-mono text-neutral-400 text-sm">Loading guides knowledge hub...</div>}>
            <GuidesSearchClient />
          </Suspense>
        </div>

        <FooterSection />
      </div>
    </div>
  );
}
