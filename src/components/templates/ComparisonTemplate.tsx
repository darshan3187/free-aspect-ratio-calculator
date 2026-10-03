'use client';

import React from 'react';
import Link from 'next/link';
import { ComparisonData, COMPARISONS_DATA } from '@/data/comparisons';
import { AspectRatioCanvas } from '@/components/visualizer/AspectRatioCanvas';
import CalculatorHeader from '@/components/CalculatorHeader';
import FooterSection from '@/components/FooterSection';
import { generateFAQSchema, generateBreadcrumbSchema } from '@/utils/schema';
import { SITE_URL } from '@/utils/constants';

interface ComparisonTemplateProps {
  data: ComparisonData;
}

// Relevant tool links based on comparison slug
const COMPARISON_TOOLS: Record<string, Array<{ name: string; href: string }>> = {
  '16-9-vs-4-3': [
    { name: '16:9 Aspect Ratio Calculator', href: '/16-9-aspect-ratio-calculator' },
    { name: '4:3 Aspect Ratio Calculator', href: '/4-3-aspect-ratio-calculator' },
  ],
  '16-9-vs-21-9': [
    { name: '16:9 Aspect Ratio Calculator', href: '/16-9-aspect-ratio-calculator' },
    { name: '21:9 Ultrawide Aspect Ratio Calculator', href: '/21-9-aspect-ratio-calculator' },
  ],
  '1080p-vs-1440p': [
    { name: '16:9 Aspect Ratio Calculator (1080p & 1440p)', href: '/16-9-aspect-ratio-calculator' },
    { name: '21:9 Ultrawide Calculator', href: '/21-9-aspect-ratio-calculator' },
  ],
  '1440p-vs-4k': [
    { name: '16:9 Aspect Ratio Calculator (1440p & 4K UHD)', href: '/16-9-aspect-ratio-calculator' },
    { name: '16:10 MacBook Display Calculator', href: '/16-10-aspect-ratio-calculator' },
  ],
  'portrait-vs-landscape': [
    { name: '16:9 Landscape Calculator', href: '/16-9-aspect-ratio-calculator' },
    { name: '9:16 Vertical Video Calculator', href: '/9-16-aspect-ratio-calculator' },
    { name: '4:5 Instagram Portrait Calculator', href: '/4-5-aspect-ratio-calculator' },
  ],
  'instagram-post-vs-reel': [
    { name: '1:1 Square Post Calculator', href: '/1-1-aspect-ratio-calculator' },
    { name: '4:5 Instagram Portrait Calculator', href: '/4-5-aspect-ratio-calculator' },
    { name: '9:16 Reels Vertical Video Calculator', href: '/9-16-aspect-ratio-calculator' },
  ],
};

export function ComparisonTemplate({ data }: ComparisonTemplateProps) {
  const faqSchema = generateFAQSchema(data.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: SITE_URL },
    { name: 'Compare', item: `${SITE_URL}/compare` },
    { name: data.title, item: `${SITE_URL}/compare/${data.slug}` },
  ]);

  const otherComparisons = Object.values(COMPARISONS_DATA).filter((c) => c.slug !== data.slug);
  const relevantTools = COMPARISON_TOOLS[data.slug] || [
    { name: '16:9 Calculator', href: '/16-9-aspect-ratio-calculator' },
    { name: '4:3 Calculator', href: '/4-3-aspect-ratio-calculator' },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      {/* Schema.org Structured Data */}
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

        {/* Header Banner */}
        <header className="border-b border-neutral-800 bg-neutral-900/50 py-10 px-4 sm:px-6 lg:px-8 rounded-2xl mb-8">
          <div className="max-w-4xl mx-auto text-center">
            <nav className="text-xs font-mono text-neutral-400 mb-3 flex items-center justify-center gap-2">
              <Link href="/" className="hover:text-blue-400 transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/compare" className="text-neutral-400 hover:text-blue-400 transition-colors">
                Compare
              </Link>
              <span>/</span>
              <span className="text-neutral-200">{data.title}</span>
            </nav>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent mb-3 font-sans">
              {data.title}
            </h1>
            <p className="text-base sm:text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              {data.overview}
            </p>
          </div>
        </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-12">
        {/* Side-by-Side Visual Renderers */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h2 className="text-center text-lg font-bold text-blue-400 font-mono">
              {data.itemAName}
            </h2>
            <AspectRatioCanvas
              ratioWidth={data.itemARatio.w}
              ratioHeight={data.itemARatio.h}
              title={data.itemAName}
            />
          </div>
          <div className="space-y-3">
            <h2 className="text-center text-lg font-bold text-purple-400 font-mono">
              {data.itemBName}
            </h2>
            <AspectRatioCanvas
              ratioWidth={data.itemBRatio.w}
              ratioHeight={data.itemBRatio.h}
              title={data.itemBName}
            />
          </div>
        </section>

        {/* Specifications Matrix */}
        <section className="bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
          <h2 className="text-2xl font-bold text-white">Side-by-Side Specification Matrix</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 text-xs font-mono text-neutral-400 uppercase">
                  <th className="py-3 px-4">Feature / Spec</th>
                  <th className="py-3 px-4 text-blue-400">{data.itemAName}</th>
                  <th className="py-3 px-4 text-purple-400">{data.itemBName}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 font-mono text-neutral-300">
                {data.specsTable.map((spec) => (
                  <tr key={spec.feature} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="py-3 px-4 font-semibold text-white">{spec.feature}</td>
                    <td className="py-3 px-4">{spec.itemA}</td>
                    <td className="py-3 px-4">{spec.itemB}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pros and Cons Side-by-Side */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-blue-400">{data.itemAName} Breakdown</h3>
            <div>
              <h4 className="text-xs font-mono text-emerald-400 uppercase mb-2">PROS</h4>
              <ul className="space-y-1.5 text-xs text-neutral-300">
                {data.itemAPros.map((p, i) => (
                  <li key={i}>✓ {p}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-mono text-rose-400 uppercase mb-2">CONS</h4>
              <ul className="space-y-1.5 text-xs text-neutral-300">
                {data.itemACons.map((c, i) => (
                  <li key={i}>✕ {c}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-bold text-purple-400">{data.itemBName} Breakdown</h3>
            <div>
              <h4 className="text-xs font-mono text-emerald-400 uppercase mb-2">PROS</h4>
              <ul className="space-y-1.5 text-xs text-neutral-300">
                {data.itemBPros.map((p, i) => (
                  <li key={i}>✓ {p}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-mono text-rose-400 uppercase mb-2">CONS</h4>
              <ul className="space-y-1.5 text-xs text-neutral-300">
                {data.itemBCons.map((c, i) => (
                  <li key={i}>✕ {c}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Recommendations Decision Engine */}
        <section className="bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
          <h2 className="text-2xl font-bold text-white">Which Should You Choose?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-neutral-950 p-5 rounded-xl border border-blue-950/60 space-y-3">
              <h3 className="text-base font-bold text-blue-400">Choose {data.itemAName} If:</h3>
              <ul className="space-y-2 text-xs text-neutral-300">
                {data.recommendations.chooseAIf.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">→</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-neutral-950 p-5 rounded-xl border border-purple-950/60 space-y-3">
              <h3 className="text-base font-bold text-purple-400">Choose {data.itemBName} If:</h3>
              <ul className="space-y-2 text-xs text-neutral-300">
                {data.recommendations.chooseBIf.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold">→</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
          <h2 className="text-2xl font-bold text-white">Comparison FAQs</h2>
          <div className="space-y-4">
            {data.faqs.map((faq, i) => (
              <div key={i} className="bg-neutral-950 p-5 rounded-xl border border-neutral-800">
                <h3 className="font-semibold text-white text-base mb-2">{faq.question}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dedicated Calculator Tools CTA */}
        <section className="bg-gradient-to-r from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white">Calculate Custom Dimensions for These Formats</h2>
            <p className="text-xs text-neutral-400">
              Need to scale or convert pixel and inch dimensions? Open our free interactive calculators:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {relevantTools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-blue-500 transition-all flex items-center justify-between text-xs font-semibold text-white group"
              >
                <span>{t.name}</span>
                <span className="text-blue-400 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Other Comparisons Grid */}
        <section className="space-y-6 pt-4 border-t border-neutral-800">
          <h2 className="text-xl font-bold text-white">Explore Other Comparison Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {otherComparisons.map((comp) => (
              <Link
                key={comp.slug}
                href={`/compare/${comp.slug}`}
                className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 hover:border-blue-500 transition-all group"
              >
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-900 block w-fit mb-2">
                  {comp.itemAName} vs {comp.itemBName}
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                  {comp.title}
                </h3>
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
