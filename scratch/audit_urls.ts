import { RATIOS_DATA } from '../src/data/ratios';
import { COMPARISONS_DATA } from '../src/data/comparisons';
import { ARTICLES_DATA } from '../src/data/articles';
import { SITE_URL } from '../src/utils/constants';

interface AuditResult {
  path: string;
  fullUrl: string;
  status: number;
  location?: string;
  canonical?: string;
  canonicalMatches: boolean;
  robots?: string;
  title?: string;
  error?: string;
}

const staticPaths = [
  '/',
  '/guides',
  '/compare',
  '/about-us',
  '/contact-us',
  '/privacy-policy',
  '/terms-and-conditions',
];

const ratioPaths = Object.keys(RATIOS_DATA).map((k) => '/' + k);
const comparisonPaths = Object.keys(COMPARISONS_DATA).map((k) => '/compare/' + k);
const guidePaths = ARTICLES_DATA.map((a) => '/guides/' + a.slug);

const allPaths = [
  ...staticPaths,
  ...ratioPaths,
  ...comparisonPaths,
  ...guidePaths,
];

console.log(`Auditing ${allPaths.length} URLs on ${SITE_URL}...`);

async function checkUrl(path: string): Promise<AuditResult> {
  const fullUrl = `${SITE_URL}${path}`;
  const expectedCanonical = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;

  try {
    const res = await fetch(fullUrl, {
      redirect: 'manual',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      },
    });

    const status = res.status;
    const location = res.headers.get('location') || undefined;

    let canonical: string | undefined;
    let robots: string | undefined;
    let title: string | undefined;

    if (status === 200) {
      const html = await res.text();
      const canonMatch =
        html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ||
        html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
      canonical = canonMatch ? canonMatch[1] : undefined;

      const robotsMatch = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i);
      robots = robotsMatch ? robotsMatch[1] : undefined;

      const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
      title = titleMatch ? titleMatch[1] : undefined;
    }

    return {
      path,
      fullUrl,
      status,
      location,
      canonical,
      canonicalMatches: canonical === expectedCanonical,
      robots,
      title,
    };
  } catch (err: any) {
    return {
      path,
      fullUrl,
      status: 0,
      canonicalMatches: false,
      error: err.message,
    };
  }
}

async function run() {
  const results: AuditResult[] = [];
  // Process in chunks of 5
  for (let i = 0; i < allPaths.length; i += 5) {
    const chunk = allPaths.slice(i, i + 5);
    const chunkRes = await Promise.all(chunk.map(checkUrl));
    results.push(...chunkRes);
  }

  console.log(`\nAudit Complete! Inspected ${results.length} URLs.`);

  const non200 = results.filter((r) => r.status !== 200);
  const redirecting = results.filter((r) => r.status >= 300 && r.status < 400);
  const errored = results.filter((r) => r.error);
  const canonicalMismatches = results.filter((r) => r.status === 200 && !r.canonicalMatches);
  const missingRobots = results.filter((r) => r.status === 200 && !r.robots);
  const missingTitle = results.filter((r) => r.status === 200 && !r.title);

  console.log(`Summary:`);
  console.log(`- 200 OK: ${results.filter((r) => r.status === 200).length}`);
  console.log(`- Non-200: ${non200.length}`);
  console.log(`- Redirecting: ${redirecting.length}`);
  console.log(`- Fetch Errors: ${errored.length}`);
  console.log(`- Canonical Mismatches: ${canonicalMismatches.length}`);
  console.log(`- Missing Robots: ${missingRobots.length}`);
  console.log(`- Missing Titles: ${missingTitle.length}`);

  if (canonicalMismatches.length > 0) {
    console.log('\nCanonical Mismatches:');
    canonicalMismatches.forEach((c) => {
      console.log(`- Path: ${c.path} | Found: ${c.canonical} | Expected: ${c.path === '/' ? SITE_URL + '/' : SITE_URL + c.path}`);
    });
  }

  if (non200.length > 0) {
    console.log('\nNon-200 URLs:');
    non200.forEach((c) => {
      console.log(`- Path: ${c.path} | Status: ${c.status} | Location: ${c.location}`);
    });
  }
}

run();
