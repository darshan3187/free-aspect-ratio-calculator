import fs from 'fs';
import path from 'path';

const appDir = path.join(process.cwd(), '.next/server/app');

// 1. Verify CoreToolsHub on index.html
const indexHtml = fs.readFileSync(path.join(appDir, 'index.html'), 'utf-8');
const hasCoreToolsHeading = indexHtml.includes('Core Aspect Ratio Calculators');
const hasCompareHeading = indexHtml.includes('Head-to-Head Comparisons');
const hasGuidesHeading = indexHtml.includes('Featured Technical Guides');

console.log('CHECK 4: Homepage Internal Links & CoreToolsHub');
console.log(' - Core Aspect Ratio Calculators rendered in HTML:', hasCoreToolsHeading);
console.log(' - Head-to-Head Comparisons rendered in HTML:', hasCompareHeading);
console.log(' - Featured Technical Guides rendered in HTML:', hasGuidesHeading);

// 2. Verify global navigation in calculator template (e.g. 16-9)
const calcHtml = fs.readFileSync(path.join(appDir, '16-9-aspect-ratio-calculator.html'), 'utf-8');
const calcHasHeader = calcHtml.includes('Aspect Ratio Calculator');
const calcHasFooter = calcHtml.includes('Calculators</h3>');
console.log('\nCHECK 4: Calculator Template (16-9)');
console.log(' - Has Header Navigation:', calcHasHeader);
console.log(' - Has Global Footer Matrix:', calcHasFooter);

// 3. Verify comparison template
const compDir = path.join(appDir, 'compare');
const compFiles = fs.readdirSync(compDir).filter(f => f.endsWith('.html'));
const compHtml = fs.readFileSync(path.join(compDir, compFiles[0]), 'utf-8');
const compHasHeader = compHtml.includes('Aspect Ratio Calculator');
const compHasFooter = compHtml.includes('Calculators</h3>');
console.log(`\nCHECK 4: Comparison Template (${compFiles[0]})`);
console.log(' - Has Header Navigation:', compHasHeader);
console.log(' - Has Global Footer Matrix:', compHasFooter);

// 4. Verify guide template
const guidesDir = path.join(appDir, 'guides');
const guideFiles = fs.readdirSync(guidesDir).filter(f => f.endsWith('.html'));
const guideHtml = fs.readFileSync(path.join(guidesDir, guideFiles[0]), 'utf-8');
const guideHasHeader = guideHtml.includes('Aspect Ratio Calculator');
const guideHasFooter = guideHtml.includes('Calculators</h3>');
const guideHasSiblings = guideHtml.includes('Related Guides in');
console.log(`\nCHECK 4: Guide Template (${guideFiles[0]})`);
console.log(' - Has Header Navigation:', guideHasHeader);
console.log(' - Has Global Footer Matrix:', guideHasFooter);
console.log(' - Has Related Sibling Guides Section:', guideHasSiblings);

// 5. Broken internal link detection across all HTML files
console.log('\nCHECK 4: Internal Link Destination Validation');
const allKnownUrls = new Set<string>();
// Load sitemap URLs as valid targets
import sitemap from '../app/sitemap';
sitemap().forEach(entry => {
  const urlPath = new URL(entry.url).pathname;
  allKnownUrls.add(urlPath === '' ? '/' : urlPath);
  allKnownUrls.add(urlPath.endsWith('/') && urlPath !== '/' ? urlPath.slice(0, -1) : urlPath);
});

// Scan links across index.html, 16-9 calculator, compare hub, guide hub
function extractInternalHrefs(html: string): string[] {
  const matches = html.matchAll(/href="(\/[^"#?]*)"/g);
  return Array.from(matches, m => m[1]);
}

const sampleHtmlFiles = [
  path.join(appDir, 'index.html'),
  path.join(appDir, '16-9-aspect-ratio-calculator.html'),
  path.join(appDir, 'compare.html'),
  path.join(appDir, 'guides.html'),
  path.join(compDir, compFiles[0]),
  path.join(guidesDir, guideFiles[0]),
];

let totalLinksChecked = 0;
const brokenLinks: { source: string; href: string }[] = [];

sampleHtmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const hrefs = extractInternalHrefs(content);
  hrefs.forEach(href => {
    totalLinksChecked++;
    // exclude static asset links like favicon
    if (href.startsWith('/_next') || href.startsWith('/favicon') || href === '/robots.txt' || href === '/sitemap.xml') return;
    const normalized = href === '' ? '/' : href;
    if (!allKnownUrls.has(normalized)) {
      brokenLinks.push({ source: path.basename(file), href });
    }
  });
});

console.log(` - Total internal <a> href destinations sampled: ${totalLinksChecked}`);
console.log(` - Broken internal destinations found: ${brokenLinks.length}`);
if (brokenLinks.length > 0) {
  console.log('   Broken links:', brokenLinks);
}

// CHECK 5: SEO Directives & robots.txt
console.log('\nCHECK 5: SEO Directives & Robots.txt');
const robotsBody = fs.readFileSync(path.join(appDir, 'robots.txt.body'), 'utf-8');
console.log(' - robots.txt content:\n', robotsBody.trim());

// Scan all generated HTML files in .next/server/app for accidental "noindex"
function getAllHtmlFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(full));
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  });
  return results;
}

const allHtmlFiles = getAllHtmlFiles(appDir);
console.log(`\nScanning ${allHtmlFiles.length} generated HTML files for 'noindex'...`);
const noIndexFiles: string[] = [];
const missingCanonicalFiles: string[] = [];

allHtmlFiles.forEach(f => {
  const basename = path.basename(f);
  if (basename === '_not-found.html') return; // 404 page is allowed to be noindex
  const html = fs.readFileSync(f, 'utf-8');
  if (html.includes('noindex') || html.includes('none')) {
    noIndexFiles.push(f);
  }
  if (!html.includes('rel="canonical"')) {
    missingCanonicalFiles.push(f);
  }
});

console.log(` - HTML files with accidental noindex: ${noIndexFiles.length}`);
console.log(` - HTML files missing canonical tag: ${missingCanonicalFiles.length}`);
