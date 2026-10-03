import sitemap from '../app/sitemap';
import { SITE_URL } from '../src/utils/constants';

const entries = sitemap();
console.log(`Total entries in sitemap: ${entries.length}`);

// 1. Verify hostname
const nonMatchingHost = entries.filter((e) => !e.url.startsWith('https://www.freeaspectratiocalculator.online'));
console.log(`Non-matching hostname entries: ${nonMatchingHost.length}`);
if (nonMatchingHost.length > 0) {
  console.log('Examples:', nonMatchingHost.slice(0, 3));
}

// 2. Check for duplicate URLs
const urlCounts: Record<string, number> = {};
entries.forEach((e) => {
  urlCounts[e.url] = (urlCounts[e.url] || 0) + 1;
});
const duplicates = Object.entries(urlCounts).filter(([_, count]) => count > 1);
console.log(`Duplicate URLs: ${duplicates.length}`);
if (duplicates.length > 0) {
  console.log('Duplicates:', duplicates);
}

// 3. Inspect lastModified values
const lastModSet = new Set(entries.map((e) => (e.lastModified instanceof Date ? e.lastModified.toISOString() : e.lastModified)));
console.log('Distinct lastModified values used:');
lastModSet.forEach((lm) => console.log(' -', lm));

// 4. Verify homepage URL formatting
const rootEntry = entries.find((e) => e.url === SITE_URL || e.url === `${SITE_URL}/`);
console.log('Root entry:', rootEntry);

// 5. Check if any URL ends with trailing slash (except if intended)
const trailingSlashes = entries.filter((e) => e.url !== SITE_URL && e.url.endsWith('/'));
console.log(`Trailing slash URLs (excluding root): ${trailingSlashes.length}`);
