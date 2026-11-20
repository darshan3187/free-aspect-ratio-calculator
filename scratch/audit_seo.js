const { RATIOS_DATA } = require('../src/data/ratios.ts');
const { COMPARISONS_DATA } = require('../src/data/comparisons.ts');
const { ARTICLES_DATA } = require('../src/data/articles.ts');

console.log('--- RATIO TOOLS TITLES & DESCRIPTIONS ---');
for (const [slug, data] of Object.entries(RATIOS_DATA)) {
  const title = data.meta.title;
  const desc = data.meta.description;
  console.log(`[${slug}]`);
  console.log(`  Title (${title.length} chars): ${title}`);
  console.log(`  Desc  (${desc.length} chars): ${desc}`);
}

console.log('\n--- COMPARISONS TITLES & DESCRIPTIONS ---');
for (const [slug, data] of Object.entries(COMPARISONS_DATA)) {
  const title = data.meta.title;
  const desc = data.meta.description;
  console.log(`[${slug}]`);
  console.log(`  Title (${title.length} chars): ${title}`);
  console.log(`  Desc  (${desc.length} chars): ${desc}`);
}

console.log('\n--- ARTICLES TITLES & DESCRIPTIONS SUMMARY ---');
let longArticleTitles = 0;
let shortArticleTitles = 0;
for (const a of ARTICLES_DATA) {
  if (a.metaTitle.length > 60) longArticleTitles++;
  if (a.metaTitle.length < 40) shortArticleTitles++;
}
console.log(`Articles with title > 60 chars: ${longArticleTitles} / ${ARTICLES_DATA.length}`);
console.log(`Articles with title < 40 chars: ${shortArticleTitles} / ${ARTICLES_DATA.length}`);
