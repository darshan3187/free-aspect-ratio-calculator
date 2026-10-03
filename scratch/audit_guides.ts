import { ARTICLES_DATA } from '../src/data/articles';
import { DETAILED_GUIDES } from '../src/data/guideContent';

console.log(`Auditing ${ARTICLES_DATA.length} Guides...`);

const detailedSlugs = new Set(Object.keys(DETAILED_GUIDES));
console.log(`Guides with custom detailed content in DETAILED_GUIDES: ${detailedSlugs.size}`);
console.log(`Guides relying on fallback template: ${ARTICLES_DATA.length - detailedSlugs.size}\n`);

// Analyze categories
const categoryCounts: Record<string, number> = {};
ARTICLES_DATA.forEach((a) => {
  categoryCounts[a.category] = (categoryCounts[a.category] || 0) + 1;
});
console.log('Category Distribution:');
console.table(categoryCounts);

// Check for keyword and slug overlap
console.log('\nAnalyzing potential search intent overlaps:');
const seenKeywords = new Map<string, string>();
const overlaps: Array<{ keyword: string; slug1: string; slug2: string }> = [];

ARTICLES_DATA.forEach((a) => {
  const kw = a.primaryKeyword.toLowerCase();
  if (seenKeywords.has(kw)) {
    overlaps.push({ keyword: kw, slug1: seenKeywords.get(kw)!, slug2: a.slug });
  } else {
    seenKeywords.set(kw, a.slug);
  }
});

console.log(`Direct Primary Keyword Overlaps: ${overlaps.length}`);
overlaps.forEach((o) => console.log(`- ${o.keyword}: ${o.slug1} vs ${o.slug2}`));

// Group semantically close guides
console.log('\nChecking semantically related clusters:');
const clusters: Record<string, string[]> = {
  'Screen Resolution & Displays': [
    'common-screen-resolutions',
    '1080p-vs-1440p-vs-4k',
    '4k-vs-uhd-difference',
    'what-is-2k-resolution',
    'ultrawide-monitor-resolutions',
    'understanding-ultrawide-monitors',
    '16-10-aspect-ratio-laptops',
    'tv-aspect-ratios-crt-to-oled',
    'display-scaling-non-native-aspect-ratio-artifacts',
    'dual-monitor-aspect-ratio-alignment',
    'foldable-phone-screen-aspect-ratios'
  ],
  'Social Media Sizing': [
    'best-aspect-ratio-for-youtube',
    'best-aspect-ratio-for-instagram',
    'best-aspect-ratio-for-tiktok',
    'best-aspect-ratio-for-facebook-ads',
    'best-aspect-ratio-for-linkedin-posts',
    'social-media-image-dimensions-cheat-sheet',
    'pinterest-pin-dimensions-aspect-ratio',
    'twitter-x-image-sizes-aspect-ratio'
  ],
  'Printing & Physical Dimensions': [
    'aspect-ratio-for-printing-photos',
    'ppi-and-dpi-explained',
    'megapixels-to-print-size-chart',
    'viewing-distance-print-resolution',
    'paper-sizes-and-aspect-ratios',
    'magazine-brochure-aspect-ratios',
    'print-bleed-crop-marks-aspect-ratio',
    'billboard-large-format-aspect-ratios',
    'canvas-printing-gallery-wrap-aspect-ratios'
  ],
  'Image Resizing & Optimization': [
    'resizing-images-without-stretching',
    'resize-image-without-losing-quality',
    'image-cropping-guide',
    'batch-image-resizing-ecommerce-aspect-ratio',
    'nextjs-image-aspect-ratio-optimization',
    'webp-avif-modern-image-formats-aspect-ratio'
  ],
  'Core Aspect Ratio Concepts': [
    'what-is-aspect-ratio',
    'how-to-calculate-aspect-ratio',
    'golden-ratio-aspect-ratio',
    'history-of-aspect-ratios',
    'pixel-dimensions-vs-aspect-ratio'
  ],
  'Photography': [
    'how-aspect-ratio-affects-photography',
    'medium-format-aspect-ratios',
    'street-photography-aspect-ratio',
    'landscape-astrophotography-aspect-ratios'
  ],
  'Video & Cinema': [
    'cinematic-aspect-ratios',
    'letterboxing-and-pillarboxing',
    'open-gate-video-recording',
    'anamorphic-lens-aspect-ratio',
    'frame-rates-and-aspect-ratios'
  ],
  'Web & UI Design': [
    'best-aspect-ratio-for-websites',
    'best-aspect-ratio-for-mobile-apps',
    'css-aspect-ratio-eliminate-cls',
    'ui-card-grid-aspect-ratios',
    'designing-for-ultrawide-web-ux',
    'web-banner-aspect-ratios',
    'poster-design-aspect-ratios',
    'scalable-vector-svg-aspect-ratios',
    'book-cover-aspect-ratios',
    'aspect-ratio-for-presentation-slides'
  ]
};

Object.entries(clusters).forEach(([name, slugs]) => {
  console.log(`\nCluster: ${name} (${slugs.length} guides)`);
  slugs.forEach((s) => {
    const a = ARTICLES_DATA.find((x) => x.slug === s);
    const hasDetailed = detailedSlugs.has(s);
    console.log(`  - [${hasDetailed ? 'RICH' : 'BASIC'}] ${s} ("${a?.title}")`);
  });
});
