'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, BookOpen, Layers } from 'lucide-react';
import { ARTICLES_DATA } from '@/data/articles';

const CATEGORY_DESCRIPTIONS = {
  'Aspect Ratio Guides': 'Foundational principles of visual geometry, greatest common divisor (GCD) reduction formulas, and the mathematical relationship between proportional shapes and absolute pixel counts.',
  'Screen Resolution Guides': 'Technical specifications, pixel densities (PPI), display standards, and comparative performance benchmarks from 720p HD up to 8K Ultra High Definition.',
  'Social Media Image Sizes': 'Up-to-date aspect ratios, safe zones, and recommended pixel dimensions to prevent auto-cropping across YouTube, Instagram, TikTok, Facebook Ads, LinkedIn, X, and Pinterest.',
  'Video Production': 'Cinematographic aspect ratios, 1.85:1 Flat, 2.39:1 Scope anamorphic desqueezing, Open Gate full-sensor recording, and eliminating black letterbox borders.',
  'Photography': 'Camera sensor dimensions, full-frame 3:2, Micro Four Thirds 4:3, medium format 6x6/6x7, and matching image proportions to standard picture frame sizes without edge loss.',
  'Graphic Design': 'Aspect ratio considerations for presentation decks, IAB digital display advertising banners, concert posters, book covers, and vector SVG viewBox behavior.',
  'UI/UX Design': 'Responsive web layout design, modern CSS aspect-ratio property, eliminating Cumulative Layout Shift (CLS), and multi-breakpoint card grid proportion systems.',
  'Printing & Publishing': 'ISO 216 paper standards (A4, A3: 1:√2 aspect ratio), commercial print bleed allowances, crop marks, gallery canvas wrap edge math, and billboard viewing distances.',
  'Image Optimization': 'Resampling algorithms (Bicubic, Lanczos), next/image responsive optimization, modern WebP/AVIF compression formats, and automated e-commerce batch processing.',
  'Display Technology': 'Modern hardware display ergonomics, 21:9 curved ultrawides, 32:9 super ultrawides, foldable mobile device canvases, and multi-monitor height alignment strategies.'
};

export default function GuidesSearchClient() {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q');
      if (q) setQuery(q);
    }
  }, []);

  const filteredArticles = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return ARTICLES_DATA.filter((article) => {
      const titleMatch = article.title.toLowerCase().includes(q);
      const descMatch = article.metaDescription.toLowerCase().includes(q);
      const catMatch = article.category.toLowerCase().includes(q);
      const keyMatch = article.primaryKeyword.toLowerCase().includes(q);
      return titleMatch || descMatch || catMatch || keyMatch;
    });
  }, [query]);

  // Group default articles by category when not searching
  const categoriesMap = useMemo(() => {
    const map = {};
    ARTICLES_DATA.forEach((article) => {
      if (!map[article.category]) {
        map[article.category] = [];
      }
      map[article.category].push(article);
    });
    return map;
  }, []);

  return (
    <div className="space-y-10">
      {/* Search Input Bar */}
      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={(e) => e.preventDefault()}
          role="search"
          aria-label="Search Aspect Ratio Guides"
          className="relative flex items-center"
        >
          <Search className="w-4 h-4 text-neutral-300 absolute left-3.5 pointer-events-none" />
          <input
            type="search"
            name="q"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 58 technical guides (e.g. 16:9, Instagram, 4K, print)..."
            aria-label="Search technical guides and tutorials"
            className="w-full bg-[#0a0a0a] border border-white/15 focus:border-blue-500 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder:text-neutral-400 focus:outline-none transition-all shadow-md font-sans"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search query"
              className="absolute right-3 p-1 rounded-md text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {query && (
          <div className="mt-2.5 flex items-center justify-between text-xs font-mono text-neutral-300 px-1">
            <span>
              Showing {filteredArticles ? filteredArticles.length : 0} {filteredArticles && filteredArticles.length === 1 ? 'guide' : 'guides'} for &ldquo;{query}&rdquo;
            </span>
            <button
              onClick={() => setQuery('')}
              className="text-blue-400 hover:underline cursor-pointer"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>

      {/* When Active Search Query */}
      {filteredArticles !== null ? (
        <section aria-label="Search Results">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <article
                  key={article.slug}
                  className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 hover:border-blue-500 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-900">
                        {article.category}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-300">
                        {article.readTimeMinutes} min read
                      </span>
                    </div>

                    <h3 className="font-bold text-white text-base group-hover:text-blue-400 transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed font-sans">
                      {article.metaDescription}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-blue-400 truncate max-w-[180px]">
                      Topic: {article.primaryKeyword}
                    </span>
                    <Link
                      href={`/guides/${article.slug}`}
                      prefetch={false}
                      className="text-xs font-mono font-semibold text-blue-400 group-hover:translate-x-1 transition-transform flex items-center gap-1"
                    >
                      Read Guide →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-4 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-3">
              <BookOpen className="w-8 h-8 text-neutral-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">No Guides Found</h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto">
                No articles match &ldquo;{query}&rdquo;. Try searching for popular terms like <strong>16:9</strong>, <strong>Instagram</strong>, <strong>TikTok</strong>, <strong>4K</strong>, or <strong>Printing</strong>.
              </p>
              <button
                onClick={() => setQuery('')}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold cursor-pointer transition-colors shadow-md mt-2 inline-block"
              >
                Browse All 58 Guides
              </button>
            </div>
          )}
        </section>
      ) : (
        /* Default: Categorized Directory (Pre-rendered into Static HTML for Search Crawlers) */
        <div className="space-y-16">
          {Object.entries(categoriesMap).map(([categoryName, articles], idx) => (
            <section key={categoryName} id={categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-')} className="space-y-5">
              <div className="border-b border-neutral-800 pb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <h2 className="text-2xl font-extrabold text-white flex items-center gap-3">
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-blue-950 text-blue-300 border border-blue-800">
                      SECTION {idx + 1}
                    </span>
                    {categoryName}
                  </h2>
                  <span className="text-xs font-mono text-neutral-400">
                    {articles.length} Technical Guides
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-400 max-w-4xl leading-relaxed">
                  {CATEGORY_DESCRIPTIONS[categoryName] || 'In-depth reference manuals and mathematical calculations.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <article
                    key={article.slug}
                    className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 hover:border-blue-500 transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-200">
                          {article.searchIntent}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400">
                          {article.readTimeMinutes} min read
                        </span>
                      </div>

                      <h3 className="font-bold text-white text-base group-hover:text-blue-400 transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed font-sans">
                        {article.metaDescription}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-blue-400 truncate max-w-[180px]">
                        Topic: {article.primaryKeyword}
                      </span>
                      <Link
                        href={`/guides/${article.slug}`}
                        prefetch={false}
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
      )}
    </div>
  );
}
