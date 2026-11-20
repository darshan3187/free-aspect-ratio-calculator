import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ARTICLES_DATA } from '@/data/articles';
import CalculatorHeader from '@/components/CalculatorHeader';
import FooterSection from '@/components/FooterSection';
import GuidesSearchClient from '@/components/GuidesSearchClient';
import { SITE_URL } from '@/utils/constants';
import { generateOrganizationSchema } from '@/utils/schema';

export const metadata: Metadata = {
  title: 'Aspect Ratio & Screen Resolution Technical Guides Hub',
  description: 'Browse our complete directory of 58 in-depth aspect ratio, display resolution, social media sizing, photography, video production, and UI design guides.',
  alternates: {
    canonical: `${SITE_URL}/guides`,
  },
};

const organizationSchema = generateOrganizationSchema();

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

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Aspect Ratio & Screen Resolution Technical Guides Hub',
    url: `${SITE_URL}/guides`,
    description: 'Complete directory of 58 technical guides covering aspect ratio mathematics, screen resolutions, video production, photography framing, and responsive UI design.',
    hasPart: ARTICLES_DATA.map((article) => ({
      '@type': 'Article',
      headline: article.title,
      url: `${SITE_URL}/guides/${article.slug}`,
      description: article.metaDescription,
    })),
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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
              Aspect Ratio & Resolution Guides Hub
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              Explore our comprehensive technical knowledge base covering display resolutions, social media sizing, cinematic formats, photography composition, UI design, and print standards.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-neutral-300 pt-2">
              <span className="bg-neutral-800 px-3 py-1 rounded-full border border-neutral-700">{ARTICLES_DATA.length} Technical Guides</span>
              <span className="bg-neutral-800 px-3 py-1 rounded-full border border-neutral-700">10 Topic Hubs</span>
              <span className="bg-neutral-800 px-3 py-1 rounded-full border border-neutral-700">100% Free & Open</span>
            </div>
          </div>
        </header>

        {/* Search & Pre-rendered Categorized Directory */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <GuidesSearchClient />
        </div>

        <FooterSection />
      </div>
    </div>
  );
}
