import { RATIOS_DATA } from '@/data/ratios';
import { COMPARISONS_DATA } from '@/data/comparisons';
import { ARTICLES_DATA } from '@/data/articles';
import { DETAILED_GUIDES } from '@/data/guideContent';
import { SITE_URL, SITE_NAME, SUPPORT_EMAIL } from '@/utils/constants';

/**
 * Strips HTML tags or entities if any and cleans extra spaces
 */
function cleanText(text: string): string {
  if (!text) return '';
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&times;/g, '×')
    .replace(/&divide;/g, '÷')
    .trim();
}

/**
 * Approximates token count (standard heuristic ~4 chars / token or 0.75 words / token)
 */
export function estimateTokens(text: string): number {
  if (!text) return 0;
  // Standard LLM tokenization heuristic: ~1 token per 4 characters in English
  return Math.ceil(text.length / 4);
}

/**
 * Generates Markdown for the Home / Root Aspect Ratio Calculator page
 */
export function generateHomeMarkdown(): string {
  const lines: string[] = [
    `# ${SITE_NAME}`,
    '',
    `> Free online aspect ratio calculator to scale 16:9, 4:3, 9:16, 21:9, and custom dimensions in pixels and inches. 100% private, instant client-side calculation.`,
    '',
    `Canonical URL: ${SITE_URL}/`,
    '',
    '## Quick Scaling Formulas',
    '',
    '- **Solving for New Height:** `New Height = (Original Height × New Width) ÷ Original Width`',
    '- **Solving for New Width:** `New Width = (Original Width × New Height) ÷ Original Height`',
    '- **Finding Aspect Ratio Fraction:** Compute the Greatest Common Divisor (GCD) of Width and Height, then divide both dimensions by the GCD. Example: `1920 / 120 = 16`, `1080 / 120 = 9` => `16:9`.',
    '- **Aspect Ratio to Decimal:** `Decimal = Width ÷ Height`. Example: `16 ÷ 9 = 1.7778`.',
    '',
    '## Supported Preset Aspect Ratios',
    '',
    '| Ratio | Decimal | Common Name & Primary Use Case | Standard Resolution |',
    '|---|---|---|---|',
    '| 16:9 | 1.78:1 | Universal Widescreen (YouTube, HDTV, PC Monitors, Gaming) | 1920×1080 (1080p), 3840×2160 (4K) |',
    '| 4:3 | 1.33:1 | Classic Fullscreen (Vintage TV, iPads, Micro 4/3 Photography) | 1024×768, 2048×1536 |',
    '| 21:9 | 2.33:1 | Ultrawide Display & Anamorphic Cinema | 2560×1080, 3440×1440 |',
    '| 9:16 | 0.56:1 | Vertical Video (TikTok, IG Reels, YouTube Shorts) | 1080×1920 |',
    '| 1:1 | 1.00:1 | Square Format (Instagram Posts, Profile Avatars) | 1080×1080 |',
    '| 4:5 | 0.80:1 | Instagram Vertical Portrait & 8×10 Photo Prints | 1080×1350 |',
    '| 3:2 | 1.50:1 | 35mm DSLR Classic Photography | 1080×720, 6000×4000 |',
    '| 16:10 | 1.60:1 | Modern Productivity Laptops (Apple MacBook Pro) | 1920×1200, 2560×1600 |',
    '| 32:9 | 3.56:1 | Super Ultrawide Curved Displays | 5120×1440 |',
    '',
    '## Features & Capabilities',
    '',
    '1. **Client-Side Privacy:** All computation, image dimension scaling, and canvas preview rendering occur 100% within your local browser. Zero server uploads.',
    '2. **Bidirectional Dimension Calculation:** Type width to solve height, or type height to solve width with real-time decimal precision.',
    '3. **Unit Flexibility:** Seamlessly calculate values in screen pixels (px) or physical inches (in) with configurable print DPI (72 DPI, 150 DPI, 300 DPI, 600 DPI).',
    '4. **CSS & HTML Code Generation:** Exports clean CSS rules (`aspect-ratio: 16 / 9; object-fit: cover;`) for modern responsive web development.',
    '',
    '## Frequently Asked Questions',
    '',
    '### What is an aspect ratio?',
    'An aspect ratio is the proportional relationship between an image, video frame, or display screen width and height. Expressed as two numbers separated by a colon (`W:H`), it defines geometry independent of resolution.',
    '',
    '### What is the difference between aspect ratio and resolution?',
    'Aspect ratio defines the proportional shape (e.g., 16:9). Resolution defines total raster pixels (e.g., 1920×1080 = 2.07 million pixels). Multiple resolutions share the exact same aspect ratio.',
    '',
    '### How do I scale an image without stretching or distortion?',
    'Lock your aspect ratio and solve for the unknown dimension using cross-multiplication: `New Height = (Original Height × New Width) ÷ Original Width`. This preserves geometric integrity without letterboxing or squishing.',
    '',
    '## Navigation & Directory',
    '',
    '- [Detailed Ratio Calculators](/16-9-aspect-ratio-calculator)',
    '- [Side-by-Side Aspect Ratio Comparisons](/compare)',
    '- [Comprehensive Aspect Ratio & Resolution Guides](/guides)',
    '- [About Us](/about-us)',
    '- [Privacy Policy](/privacy-policy)',
    '- [Terms & Conditions](/terms-and-conditions)',
  ];

  return lines.join('\n');
}

/**
 * Generates Markdown for a specific Ratio Tool page (e.g. /16-9-aspect-ratio-calculator)
 */
export function generateRatioMarkdown(slug: string): string | null {
  const data = RATIOS_DATA[slug];
  if (!data) return null;

  const lines: string[] = [
    `# ${data.name} Calculator & Dimensions`,
    '',
    `> ${data.tagline}`,
    '',
    `Canonical URL: ${SITE_URL}/${slug}`,
    '',
    '## Ratio Overview',
    '',
    data.overview,
    '',
    `- **Proportion:** ${data.ratioWidth}:${data.ratioHeight}`,
    `- **Decimal Value:** ${data.decimalValue.toFixed(4)}:1`,
    `- **Greatest Common Divisor (GCD) for standard resolution:** ${data.gcdValue}`,
    '',
    '## Mathematical Scaling Formula',
    '',
    data.formulaDescription,
    '',
    '```',
    `Height = Width ÷ ${(data.ratioWidth / data.ratioHeight).toFixed(4)}`,
    `Width  = Height × ${(data.ratioWidth / data.ratioHeight).toFixed(4)}`,
    '```',
    '',
    '## Standard Industry Resolutions',
    '',
    '| Resolution Name | Width | Height | Total Pixels | Category |',
    '|---|---|---|---|---|',
  ];

  data.commonResolutions.forEach((res) => {
    const totalPixels = ((res.width * res.height) / 1000000).toFixed(2);
    lines.push(`| ${res.name} | ${res.width}px | ${res.height}px | ${totalPixels} MP | ${res.category} |`);
  });

  lines.push('', '## Primary Use Cases', '');
  data.useCases.forEach((uc) => {
    lines.push(`### ${uc.title} (${uc.industry})`);
    lines.push(`${uc.description}${uc.recommended ? ' **[Recommended Industry Standard]**' : ''}`);
    lines.push('');
  });

  if (data.pros && data.pros.length > 0) {
    lines.push('## Advantages');
    lines.push('');
    data.pros.forEach((pro) => lines.push(`- ${pro}`));
    lines.push('');
  }

  if (data.cons && data.cons.length > 0) {
    lines.push('## Limitations');
    lines.push('');
    data.cons.forEach((con) => lines.push(`- ${con}`));
    lines.push('');
  }

  if (data.faqs && data.faqs.length > 0) {
    lines.push('## Frequently Asked Questions');
    lines.push('');
    data.faqs.forEach((faq) => {
      lines.push(`### ${faq.question}`);
      lines.push(faq.answer);
      lines.push('');
    });
  }

  lines.push('## Related Resources');
  lines.push('');
  lines.push(`- [All Aspect Ratio Calculators](${SITE_URL}/)`);
  lines.push(`- [Aspect Ratio Comparisons Hub](${SITE_URL}/compare)`);
  lines.push(`- [Guides & Technical Tutorials](${SITE_URL}/guides)`);

  return lines.join('\n');
}

/**
 * Generates Markdown for the Comparisons Hub (/compare)
 */
export function generateCompareHubMarkdown(): string {
  const comparisons = Object.values(COMPARISONS_DATA);
  const lines: string[] = [
    '# Aspect Ratio & Screen Resolution Comparisons Hub',
    '',
    '> Side-by-side technical and visual comparisons between standard aspect ratios, display resolutions, and platform media formats.',
    '',
    `Canonical URL: ${SITE_URL}/compare`,
    '',
    '## Available Comparisons',
    '',
    '| Comparison | Proportions | Overview |',
    '|---|---|---|',
  ];

  comparisons.forEach((c) => {
    lines.push(`| [${c.title}](${SITE_URL}/compare/${c.slug}) | ${c.itemARatio.w}:${c.itemARatio.h} vs ${c.itemBRatio.w}:${c.itemBRatio.h} | ${c.overview} |`);
  });

  lines.push('');
  lines.push('## Decision Matrix Summary');
  lines.push('');
  lines.push('- **16:9 vs 4:3:** Choose 16:9 for modern video (YouTube, HDTV) and monitors; choose 4:3 for tablet apps, presentation decks, and retro media.');
  lines.push('- **16:9 vs 21:9:** Choose 16:9 for universal video compatibility; choose 21:9 for immersive cinematic gaming and ultrawide multi-window workflows.');
  lines.push('- **1080p vs 1440p:** Choose 1080p for high-FPS competitive esports; choose 1440p as the modern sweet spot for 27-inch PC desktop gaming and productivity.');
  lines.push('- **1440p vs 4K:** Choose 1440p for optimal GPU performance; choose 4K UHD for ultimate photographic clarity and 32+ inch viewing distances.');
  lines.push('- **Instagram Post (1:1 / 4:5) vs Reel (9:16):** Use 4:5 portrait to maximize feed real-estate; use 9:16 vertical full-screen for Reels and Stories.');

  return lines.join('\n');
}

/**
 * Generates Markdown for a specific comparison page (e.g. /compare/16-9-vs-4-3)
 */
export function generateComparisonMarkdown(slug: string): string | null {
  const data = COMPARISONS_DATA[slug];
  if (!data) return null;

  const lines: string[] = [
    `# ${data.title}`,
    '',
    `> Direct technical comparison between ${data.itemAName} (${data.itemARatio.w}:${data.itemARatio.h}) and ${data.itemBName} (${data.itemBRatio.w}:${data.itemBRatio.h}).`,
    '',
    `Canonical URL: ${SITE_URL}/compare/${slug}`,
    '',
    '## Overview',
    '',
    data.overview,
    '',
    '## Technical Specifications Comparison',
    '',
    `| Specification | ${data.itemAName} | ${data.itemBName} |`,
    '|---|---|---|',
  ];

  data.specsTable.forEach((row) => {
    lines.push(`| ${row.feature} | ${row.itemA} | ${row.itemB} |`);
  });

  lines.push('');
  lines.push(`## Advantages of ${data.itemAName}`);
  lines.push('');
  data.itemAPros.forEach((p) => lines.push(`- ${p}`));

  lines.push('');
  lines.push(`## Advantages of ${data.itemBName}`);
  lines.push('');
  data.itemBPros.forEach((p) => lines.push(`- ${p}`));

  lines.push('');
  lines.push('## Recommendation Guide');
  lines.push('');
  lines.push(`### Choose ${data.itemAName} If:`);
  data.recommendations.chooseAIf.forEach((r) => lines.push(`- ${r}`));

  lines.push('');
  lines.push(`### Choose ${data.itemBName} If:`);
  data.recommendations.chooseBIf.forEach((r) => lines.push(`- ${r}`));

  if (data.faqs && data.faqs.length > 0) {
    lines.push('');
    lines.push('## Frequently Asked Questions');
    lines.push('');
    data.faqs.forEach((faq) => {
      lines.push(`### ${faq.question}`);
      lines.push(faq.answer);
      lines.push('');
    });
  }

  lines.push('## Related Links');
  lines.push('');
  lines.push(`- [All Comparisons](${SITE_URL}/compare)`);
  lines.push(`- [Home Calculator](${SITE_URL}/)`);

  return lines.join('\n');
}

/**
 * Generates Markdown for the Guides Hub (/guides)
 */
export function generateGuidesHubMarkdown(): string {
  const lines: string[] = [
    '# Aspect Ratio, Screen Resolution & Design Guides Hub',
    '',
    '> Authoritative technical tutorials, math formulas, and cheat sheets for digital media, social platforms, web layouts, and print DPI.',
    '',
    `Canonical URL: ${SITE_URL}/guides`,
    '',
    '## Knowledge Categories & Articles',
    '',
  ];

  // Group articles by category
  const categories = Array.from(new Set(ARTICLES_DATA.map((a) => a.category)));

  categories.forEach((cat) => {
    lines.push(`### ${cat}`);
    lines.push('');
    const catArticles = ARTICLES_DATA.filter((a) => a.category === cat);
    catArticles.forEach((art) => {
      lines.push(`- [${art.title}](${SITE_URL}/guides/${art.slug}) — *${art.readTimeMinutes} min read*`);
      lines.push(`  ${art.metaDescription}`);
    });
    lines.push('');
  });

  return lines.join('\n');
}

/**
 * Generates Markdown for a specific Guide article (e.g. /guides/what-is-aspect-ratio)
 */
export function generateGuideArticleMarkdown(slug: string): string | null {
  const article = ARTICLES_DATA.find((a) => a.slug === slug);
  if (!article) return null;

  const guide = DETAILED_GUIDES[slug];

  const lines: string[] = [
    `# ${article.title}`,
    '',
    `> ${article.metaDescription}`,
    '',
    `- **Category:** ${article.category}`,
    `- **Reading Time:** ${article.readTimeMinutes} minutes`,
    `- **Canonical URL:** ${SITE_URL}/guides/${slug}`,
    '',
  ];

  if (guide?.keyTakeaways && guide.keyTakeaways.length > 0) {
    lines.push('## Key Technical Takeaways');
    lines.push('');
    guide.keyTakeaways.forEach((t) => lines.push(`- ${t}`));
    lines.push('');
  }

  if (guide?.intro && guide.intro.length > 0) {
    lines.push('## Overview');
    lines.push('');
    guide.intro.forEach((p) => lines.push(p, ''));
  }

  if (guide?.sections && guide.sections.length > 0) {
    guide.sections.forEach((sec) => {
      lines.push(`## ${sec.heading}`);
      lines.push('');
      sec.paragraphs.forEach((p) => lines.push(p, ''));

      if (sec.formula) {
        lines.push('```text');
        lines.push(sec.formula);
        lines.push('```');
        lines.push('');
      }

      if (sec.table) {
        lines.push(`| ${sec.table.headers.join(' | ')} |`);
        lines.push(`| ${sec.table.headers.map(() => '---').join(' | ')} |`);
        sec.table.rows.forEach((row) => {
          lines.push(`| ${row.join(' | ')} |`);
        });
        lines.push('');
      }

      if (sec.codeSnippet) {
        lines.push('```css');
        lines.push(sec.codeSnippet);
        lines.push('```');
        lines.push('');
      }
    });
  } else {
    // Fallback content when guide detail is not in DETAILED_GUIDES
    lines.push('## Core Principles & Sizing Standards');
    lines.push('');
    lines.push(`${article.metaDescription} Maintaining correct proportions across responsive devices avoids image distortion, awkward stretching, and unwanted letterboxing.`);
    lines.push('');
    lines.push('## Proportional Scaling Formula');
    lines.push('');
    lines.push('- **Scaled Height:** `New Height = (Original Height × New Width) ÷ Original Width`');
    lines.push('- **Scaled Width:** `New Width = (Original Width × New Height) ÷ Original Height`');
    lines.push('- **Greatest Common Divisor Reduction:** Divide both dimensions by Euclid’s GCD to reach simplified integer aspect ratio.');
    lines.push('');
  }

  if (article.faqs && article.faqs.length > 0) {
    lines.push('## Frequently Asked Questions');
    lines.push('');
    article.faqs.forEach((faq) => {
      lines.push(`### ${faq.question}`);
      lines.push(faq.answer);
      lines.push('');
    });
  }

  lines.push('## Related Resources');
  lines.push('');
  if (article.internalLinks && article.internalLinks.length > 0) {
    article.internalLinks.forEach((link) => {
      const fullUrl = link.startsWith('http') ? link : `${SITE_URL}${link}`;
      lines.push(`- [${link}](${fullUrl})`);
    });
  }
  lines.push(`- [All Guides Hub](${SITE_URL}/guides)`);
  lines.push(`- [Home Calculator](${SITE_URL}/)`);

  return lines.join('\n');
}

/**
 * Generates Markdown for static legal/about pages
 */
export function generateStaticPageMarkdown(path: string): string | null {
  if (path === 'about-us') {
    return [
      '# About Us — Free Aspect Ratio Calculator Studio',
      '',
      '> Dedicated to building the fastest, 100% private, zero-server aspect ratio and resolution calculation tools for visual creators.',
      '',
      `Canonical URL: ${SITE_URL}/about-us`,
      '',
      '## Our Mission',
      'Aspect Ratio Calculator Studio was founded to solve a ubiquitous frustration faced by digital creators, video editors, frontend developers, and photographers: calculating proportional image dimensions quickly, accurately, and without invasive ads or server data mining.',
      '',
      '## Guiding Engineering Principles',
      '',
      '1. **100% Client-Side Privacy:** Your calculations, dimensions, and uploaded preview images never leave your local browser sandbox.',
      '2. **High-Performance Math Engine:** Euclid Greatest Common Divisor reductions, diagonal dimension scaling, and 300 DPI conversion calculations execute instantly.',
      '3. **Developer-Ready Output:** Built-in code exporter for modern CSS `aspect-ratio` rules and responsive HTML image tags.',
      '',
      `Support Contact: ${SUPPORT_EMAIL}`,
    ].join('\n');
  }

  if (path === 'privacy-policy') {
    return [
      '# Privacy Policy — Aspect Ratio Calculator',
      '',
      'Status: 100% Client-Side Verified • Effective Date: January 1, 2026',
      '',
      `Canonical URL: ${SITE_URL}/privacy-policy`,
      '',
      '## 1. Zero Remote Server Storage',
      'All image processing, dimensional calculation, and aspect ratio reductions are performed entirely inside your device\'s local web browser execution thread. We do not store, upload, or transmit your images or dimensions to any external server.',
      '',
      '## 2. Information We Do Not Collect',
      '- No personal identifying information (PII)',
      '- No user-uploaded image files or graphics',
      '- No dimensional calculation inputs or outputs',
      '- No tracking cookies or invasive third-party ad profiling',
      '',
      '## 3. Web Analytics',
      'We utilize privacy-focused, anonymous web analytics (such as Vercel Web Analytics) to observe aggregated traffic volume and page performance. No IP addresses or fingerprinting data are linked to individuals.',
      '',
      `Questions regarding this policy: ${SUPPORT_EMAIL}`,
    ].join('\n');
  }

  if (path === 'terms-and-conditions') {
    return [
      '# Terms & Conditions — Aspect Ratio Calculator',
      '',
      'Last Updated: January 1, 2026',
      '',
      `Canonical URL: ${SITE_URL}/terms-and-conditions`,
      '',
      '## 1. Acceptance of Terms',
      'By using Aspect Ratio Calculator, you agree to these Terms and Conditions. The service is provided free of charge for personal and commercial creative work.',
      '',
      '## 2. Permitted Use & Commercial License',
      'All generated CSS snippets, HTML code templates, and calculated proportional dimensions may be freely incorporated into personal, open-source, or commercial production projects without attribution.',
      '',
      '## 3. Disclaimer of Warranties',
      'This software utility is provided "as is", without warranty of any kind, express or implied. Users should verify mission-critical print dimensions before running large-scale commercial physical print runs.',
      '',
      `Inquiries: ${SUPPORT_EMAIL}`,
    ].join('\n');
  }

  if (path === 'contact-us') {
    return [
      '# Contact Us — Aspect Ratio Calculator Studio',
      '',
      `Contact the engineering team behind Aspect Ratio Calculator.`,
      '',
      `Canonical URL: ${SITE_URL}/contact-us`,
      '',
      `- **General Support & Feedback:** ${SUPPORT_EMAIL}`,
      `- **Response Time:** Typically within 24-48 business hours`,
      `- **Bug Reports & Feature Requests:** Please include your browser version and the specific dimensions or calculations involved.`,
    ].join('\n');
  }

  return null;
}

/**
 * Universal router to resolve any route path to its clean Markdown representation
 */
export function getMarkdownForPath(pathname: string): { markdown: string; tokens: number } | null {
  // Normalize pathname: remove trailing slash, ensure leading slash
  let cleanPath = pathname.trim().replace(/\/+$/, '');
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }

  let md: string | null = null;

  if (cleanPath === '' || cleanPath === '/') {
    md = generateHomeMarkdown();
  } else if (cleanPath === '/compare') {
    md = generateCompareHubMarkdown();
  } else if (cleanPath.startsWith('/compare/')) {
    const slug = cleanPath.replace('/compare/', '');
    md = generateComparisonMarkdown(slug);
  } else if (cleanPath === '/guides') {
    md = generateGuidesHubMarkdown();
  } else if (cleanPath.startsWith('/guides/')) {
    const slug = cleanPath.replace('/guides/', '');
    md = generateGuideArticleMarkdown(slug);
  } else if (
    cleanPath === '/about-us' ||
    cleanPath === '/privacy-policy' ||
    cleanPath === '/terms-and-conditions' ||
    cleanPath === '/contact-us'
  ) {
    const page = cleanPath.replace('/', '');
    md = generateStaticPageMarkdown(page);
  } else {
    // Check if it's a ratio slug like /16-9-aspect-ratio-calculator
    const slug = cleanPath.replace('/', '');
    if (RATIOS_DATA[slug]) {
      md = generateRatioMarkdown(slug);
    }
  }

  if (!md) return null;

  return {
    markdown: md,
    tokens: estimateTokens(md),
  };
}
