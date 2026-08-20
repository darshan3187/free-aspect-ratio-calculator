import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ARTICLES_DATA } from '@/data/articles';
import { generateArticleSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/utils/schema';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTICLES_DATA.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES_DATA.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: [article.primaryKeyword, ...article.secondaryKeywords],
    alternates: {
      canonical: `https://free-aspect-ratio-calculator.vercel.app/guides/${slug}`,
    },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: 'article',
      url: `https://free-aspect-ratio-calculator.vercel.app/guides/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle,
      description: article.metaDescription,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = ARTICLES_DATA.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const articleSchema = generateArticleSchema({
    title: article.title,
    description: article.metaDescription,
    url: `https://free-aspect-ratio-calculator.vercel.app/guides/${article.slug}`,
  });

  const faqSchema = generateFAQSchema(article.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: 'https://free-aspect-ratio-calculator.vercel.app' },
    { name: 'Guides', item: 'https://free-aspect-ratio-calculator.vercel.app/guides' },
    { name: article.title, item: `https://free-aspect-ratio-calculator.vercel.app/guides/${article.slug}` },
  ]);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 font-sans pb-16">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <nav className="text-xs font-mono text-neutral-400 flex items-center gap-2">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-blue-400 transition-colors">
              Guides
            </Link>
            <span>/</span>
            <span className="text-neutral-200 truncate">{article.title}</span>
          </nav>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-blue-950 text-blue-400 border border-blue-800">
              {article.category}
            </span>
            <span className="text-xs font-mono text-neutral-400">
              {article.readTimeMinutes} min read • Target {article.wordCountTarget} Words
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
            {article.metaDescription}
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-10">
        {/* Executive Summary Card */}
        <div className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-sm font-mono text-blue-400 uppercase tracking-wider">
            Key Concepts Covered
          </h2>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-mono bg-neutral-950 px-3 py-1 rounded border border-neutral-800 text-neutral-300">
              Primary Keyword: {article.primaryKeyword}
            </span>
            {article.secondaryKeywords.map((kw) => (
              <span key={kw} className="text-xs font-mono bg-neutral-950 px-3 py-1 rounded border border-neutral-800 text-neutral-400">
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Comprehensive Guide Body Outline */}
        <article className="prose prose-invert max-w-none space-y-6 text-neutral-300 leading-relaxed">
          <section className="bg-neutral-900/30 border border-neutral-800/60 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">Overview & Core Technical Definition</h2>
            <p>
              Aspect ratios define the proportional relationship between an image or video&apos;s width and height. Understanding how to manage, convert, and calculate ratios ensures your creative assets remain sharp without distortion, unexpected black letterboxing bars, or unwanted cropping across modern displays.
            </p>
            <p>
              When working with high-resolution media (from 1080p Full HD to 4K UHD and beyond), matching the targeted display canvas to native device specs is essential for optimizing visual retention and user experience.
            </p>
          </section>

          <section className="bg-neutral-900/30 border border-neutral-800/60 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="text-2xl font-bold text-white">Mathematical Principles & Step-by-Step Calculation</h2>
            <p>
              To manually solve aspect ratios from raw pixel dimensions, divide width and height by their Greatest Common Divisor (GCD). For example, a 1920x1080 resolution shares a GCD of 120, which reduces down to 16:9.
            </p>
            <div className="bg-neutral-950 p-4 rounded-xl font-mono text-xs text-neutral-300 border border-neutral-800">
              Width / GCD : Height / GCD = Aspect Ratio<br />
              1920 / 120 : 1080 / 120 = 16 : 9
            </div>
          </section>
        </article>

        {/* FAQs */}
        <section className="bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {article.faqs.map((faq, i) => (
              <div key={i} className="bg-neutral-950 p-5 rounded-xl border border-neutral-800">
                <h3 className="font-semibold text-white text-base mb-2">{faq.question}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal Linking Recommendations */}
        <section className="bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white">Related Calculators & Resources</h2>
          <div className="flex flex-wrap gap-3">
            {article.internalLinks.map((link) => (
              <Link
                key={link}
                href={link}
                className="text-xs font-mono bg-neutral-950 px-4 py-2 rounded-lg border border-neutral-800 text-blue-400 hover:border-blue-500 transition-colors"
              >
                {link} →
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
