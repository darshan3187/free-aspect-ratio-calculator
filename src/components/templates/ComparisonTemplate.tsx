'use client';

import React from 'react';
import Link from 'next/link';
import { ComparisonData } from '@/data/comparisons';
import { AspectRatioCanvas } from '@/components/visualizer/AspectRatioCanvas';
import { generateFAQSchema, generateBreadcrumbSchema } from '@/utils/schema';

interface ComparisonTemplateProps {
  data: ComparisonData;
}

export function ComparisonTemplate({ data }: ComparisonTemplateProps) {
  const faqSchema = generateFAQSchema(data.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: 'https://free-aspect-ratio-calculator.vercel.app' },
    { name: 'Compare', item: 'https://free-aspect-ratio-calculator.vercel.app/compare' },
    { name: data.title, item: `https://free-aspect-ratio-calculator.vercel.app/compare/${data.slug}` },
  ]);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 font-sans pb-16">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header Banner */}
      <header className="border-b border-neutral-800 bg-neutral-900/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <nav className="text-xs font-mono text-neutral-400 mb-4 flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-neutral-400">Compare</span>
            <span>/</span>
            <span className="text-neutral-200">{data.title}</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent mb-4">
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
      </div>
    </main>
  );
}
