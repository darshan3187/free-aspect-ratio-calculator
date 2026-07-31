import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ARTICLES_DATA } from '@/data/articles';

export const metadata: Metadata = {
  title: 'Aspect Ratio, Screen Resolution & Design Guides Hub (50+ Resources)',
  description: 'Complete knowledge hub for aspect ratios, screen resolutions, social media image sizes, video production, photography framing, UI design, and printing standards.',
};

export default function GuidesHubPage() {
  // Group articles by category
  const categoriesMap: Record<string, typeof ARTICLES_DATA> = {};
  ARTICLES_DATA.forEach((article) => {
    if (!categoriesMap[article.category]) {
      categoriesMap[article.category] = [];
    }
    categoriesMap[article.category].push(article);
  });

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 font-sans pb-16">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <nav className="text-xs font-mono text-neutral-400 mb-2 flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-neutral-200">Guides Knowledge Hub</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            Aspect Ratio & Resolution Content Hub
          </h1>
          <p className="text-base sm:text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Explore our 50 definitive, technical guides covering display resolutions, social media sizing, cinematic formats, photography composition, UI design, and print standards.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs font-mono text-neutral-400">
            <span className="bg-neutral-800 px-3 py-1 rounded-full border border-neutral-700">50 Articles</span>
            <span className="bg-neutral-800 px-3 py-1 rounded-full border border-neutral-700">10 Content Hubs</span>
            <span className="bg-neutral-800 px-3 py-1 rounded-full border border-neutral-700">100% AdSense Compliant</span>
          </div>
        </div>
      </header>

      {/* Categories Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        {Object.entries(categoriesMap).map(([categoryName, articles], idx) => (
          <section key={categoryName} className="space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h2 className="text-2xl font-extrabold text-white flex items-center gap-3">
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-blue-950 text-blue-400 border border-blue-800">
                  HUB {idx + 1}
                </span>
                {categoryName}
              </h2>
              <span className="text-xs font-mono text-neutral-400">
                {articles.length} Guides
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <article
                  key={article.slug}
                  className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 hover:border-blue-500 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                        {article.searchIntent}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">
                        {article.readTimeMinutes} min read
                      </span>
                    </div>

                    <h3 className="font-bold text-white text-base group-hover:text-blue-400 transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                      {article.metaDescription}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-blue-400/90 truncate max-w-[180px]">
                      Key: {article.primaryKeyword}
                    </span>
                    <Link
                      href={`/guides/${article.slug}`}
                      className="text-xs font-mono font-semibold text-blue-400 group-hover:translate-x-1 transition-transform flex items-center gap-1"
                    >
                      Read Guide →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
