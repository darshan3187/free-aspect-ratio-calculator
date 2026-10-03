import { RATIOS_DATA } from '../src/data/ratios';
import { SITE_URL } from '../src/utils/constants';

const core7 = [
  '16-9-aspect-ratio-calculator',
  '4-3-aspect-ratio-calculator',
  '21-9-aspect-ratio-calculator',
  '1-1-aspect-ratio-calculator',
  '9-16-aspect-ratio-calculator',
  '3-2-aspect-ratio-calculator',
  '5-4-aspect-ratio-calculator',
];

async function checkCore7() {
  for (const slug of core7) {
    const url = `${SITE_URL}/${slug}`;
    const res = await fetch(url, {
      redirect: 'manual',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      },
    });
    const html = await res.text();
    const canonMatch =
      html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ||
      html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
    const canon = canonMatch ? canonMatch[1] : undefined;

    const robotsMatch = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i);
    const robots = robotsMatch ? robotsMatch[1] : undefined;

    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : undefined;

    const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
    const desc = descMatch ? descMatch[1] : undefined;

    const hasCalculator =
      html.includes('Interactive Dimensions Converter') &&
      html.includes('Width (Pixels)') &&
      html.includes('Height (Pixels)');

    const hasExplanation =
      html.includes('Understanding the') &&
      html.includes('Mathematical Formula & Calculation Mechanics');

    console.log(`\n=== Slug: ${slug} ===`);
    console.log(`Status: ${res.status}`);
    console.log(`Self-referencing Canonical: ${canon} (matches expected: ${canon === url})`);
    console.log(`Robots Directives: ${robots}`);
    console.log(`Title: ${title}`);
    console.log(`Meta Description: ${desc}`);
    console.log(`Functional Calculator in HTML: ${hasCalculator}`);
    console.log(`Unique Explanatory Content in HTML: ${hasExplanation}`);
  }
}

checkCore7();
