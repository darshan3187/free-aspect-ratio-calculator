import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ARTICLES_DATA } from '@/data/articles';
import { DETAILED_GUIDES } from '@/data/guideContent';
import CalculatorHeader from '@/components/CalculatorHeader';
import FooterSection from '@/components/FooterSection';
import { generateArticleSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/utils/schema';
import { SITE_URL } from '@/utils/constants';

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
      canonical: `${SITE_URL}/guides/${slug}`,
    },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: 'article',
      url: `${SITE_URL}/guides/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle,
      description: article.metaDescription,
    },
  };
}

function formatLinkAnchor(href: string): string {
  if (href.startsWith('/compare/')) {
    const slug = href.replace('/compare/', '');
    return `${slug.replace(/-/g, ' ').toUpperCase()} Comparison`;
  }
  if (href.startsWith('/guides/')) {
    const slug = href.replace('/guides/', '');
    return slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ') + ' Guide';
  }
  const toolSlug = href.replace('/', '');
  if (toolSlug.includes('aspect-ratio-calculator')) {
    const ratio = toolSlug.replace('-aspect-ratio-calculator', '').replace('-', ':');
    return `${ratio} Aspect Ratio Calculator & Dimensions`;
  }
  return href;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = ARTICLES_DATA.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const customContent = DETAILED_GUIDES[slug];

  const categorySiblings = ARTICLES_DATA
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 4);

  const articleSchema = generateArticleSchema({
    title: article.title,
    description: article.metaDescription,
    url: `${SITE_URL}/guides/${article.slug}`,
  });

  const faqSchema = generateFAQSchema(article.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: SITE_URL },
    { name: 'Guides', item: `${SITE_URL}/guides` },
    { name: article.title, item: `${SITE_URL}/guides/${article.slug}` },
  ]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
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

      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        <CalculatorHeader />

        {/* Header */}
        <header className="border-b border-neutral-800 bg-neutral-900/50 py-10 px-4 sm:px-6 lg:px-8 rounded-2xl mb-8">
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
                {article.readTimeMinutes} min read • Verified Technical Reference
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
              {article.metaDescription}
            </p>
          </div>
        </header>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-10">
        {/* Key Takeaways Card */}
        <div className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-sm font-mono text-blue-400 uppercase tracking-wider">
            Key Technical Takeaways
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
            {customContent?.keyTakeaways ? (
              customContent.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>{takeaway}</span>
                </li>
              ))
            ) : (
              <>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>Aspect ratio determines proportional shape (W:H) regardless of pixel density or physical scale.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>Preserving native aspect ratio prevents image warping, distortion, and unwanted letterbox padding.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>Always verify matching dimensions across target display platforms (desktop, tablet, mobile) before publishing.</span>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* In-Depth Article Content */}
        <article className="prose prose-invert max-w-none space-y-8 text-neutral-300 leading-relaxed">
          {customContent ? (
            <>
              <section className="bg-neutral-900/30 border border-neutral-800/60 rounded-2xl p-6 sm:p-8 space-y-4">
                <h2 className="text-2xl font-bold text-white">Overview & Core Technical Definition</h2>
                {customContent.intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </section>

              {customContent.sections.map((section, idx) => (
                <section key={idx} className="bg-neutral-900/30 border border-neutral-800/60 rounded-2xl p-6 sm:p-8 space-y-4">
                  <h2 className="text-2xl font-bold text-white">{section.heading}</h2>
                  {section.paragraphs.map((p, pi) => (
                    <p key={pi}>{p}</p>
                  ))}

                  {section.formula && (
                    <div className="bg-neutral-950 p-4 rounded-xl font-mono text-xs text-neutral-300 border border-neutral-800 whitespace-pre-line">
                      {section.formula}
                    </div>
                  )}

                  {section.table && (
                    <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-neutral-800 bg-neutral-900/80 font-mono text-neutral-300">
                            {section.table.headers.map((h, hi) => (
                              <th key={hi} className="p-3">{h}</th>
                            ))}
                          </tr>
                        </thead>

                        <tbody>
                          {section.table.rows.map((row, ri) => (
                            <tr key={ri} className="border-b border-neutral-800/50 hover:bg-neutral-900/40">
                              {row.map((cell, ci) => (
                                <td key={ci} className="p-3">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {section.codeSnippet && (
                    <pre className="bg-neutral-950 p-4 rounded-xl font-mono text-xs text-blue-300 border border-neutral-800 overflow-x-auto">
                      <code>{section.codeSnippet}</code>
                    </pre>
                  )}
                </section>
              ))}
            </>
          ) : (
            <>
              <section className="bg-neutral-900/30 border border-neutral-800/60 rounded-2xl p-6 sm:p-8 space-y-4">
                <h2 className="text-2xl font-bold text-white">Technical Overview & Core Principles</h2>
                <p>
                  {article.metaDescription} Understanding how to calculate and maintain correct proportions in {article.category.toLowerCase()} ensures your creative assets remain sharp, responsive, and free of letterbox black bars or accidental cropping.
                </p>
                <p>
                  When preparing digital media for modern high-DPI retina displays, video containers, and mobile viewports, matching source resolutions to target display aspect ratios is essential for visual clarity and engagement.
                </p>
              </section>

              <section className="bg-neutral-900/30 border border-neutral-800/60 rounded-2xl p-6 sm:p-8 space-y-4">
                <h2 className="text-2xl font-bold text-white">Mathematical Calculation & Scaling Formula</h2>
                <p>
                  To compute scaled dimensions while locking the aspect ratio, apply the standard cross-multiplication formula:
                </p>
                <div className="bg-neutral-950 p-4 rounded-xl font-mono text-xs text-neutral-300 border border-neutral-800 space-y-2">
                  <div><strong>Scaled Height Formula:</strong> New Height = (Original Height × New Width) ÷ Original Width</div>
                  <div><strong>Scaled Width Formula:</strong> New Width = (Original Width × New Height) ÷ Original Height</div>
                </div>
                <p>
                  To simplify any arbitrary pixel resolution into its lowest proportional integer fraction, compute the Greatest Common Divisor (GCD) using Euclid&apos;s algorithm, then divide both dimensions by the GCD.
                </p>
              </section>
            </>
          )}
        </article>

        {/* Interactive Tool CTA */}
        <div className="bg-gradient-to-r from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-white">Calculate Custom Dimensions Now</h3>
            <p className="text-xs text-neutral-400">
              Input any width and height in pixels or inches to calculate proportional scaling in real time.
            </p>
          </div>
          <Link
            href="/"
            className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all shrink-0 cursor-pointer shadow-md"
          >
            Open Calculator →
          </Link>
        </div>

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

        {/* Internal Linking */}
        <section className="bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white">Related Calculators & Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {article.internalLinks.map((link) => (
              <Link
                key={link}
                href={link}
                className="text-xs font-sans bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-all flex items-center justify-between gap-2"
              >
                <span>{formatLinkAnchor(link)}</span>
                <span className="text-blue-400">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* More in this Category */}
        {categorySiblings.length > 0 && (
          <section className="bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">More Guides in {article.category}</h2>
              <Link href="/guides" className="text-xs font-mono text-blue-400 hover:underline">
                View All Guides →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categorySiblings.map((sibling) => (
                <Link
                  key={sibling.slug}
                  href={`/guides/${sibling.slug}`}
                  className="text-xs font-sans bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 text-neutral-300 hover:text-white hover:border-blue-500 transition-all flex flex-col justify-between gap-2 group"
                >
                  <span className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {sibling.title}
                  </span>
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono pt-1 border-t border-neutral-900">
                    <span>{sibling.readTimeMinutes} min read</span>
                    <span className="text-blue-400">Read Guide →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
        </div>

        <FooterSection />
      </div>
    </div>
  );
}
