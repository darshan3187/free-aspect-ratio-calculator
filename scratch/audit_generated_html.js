const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '../.next/server/app');

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html') && !file.includes('_not-found')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getAllHtmlFiles(appDir);
console.log(`Auditing ${htmlFiles.length} generated HTML files...\n`);

let h1Errors = 0;
let titleErrors = 0;
let canonicalErrors = 0;
let structuredDataErrors = 0;

for (const filePath of htmlFiles) {
  const relPath = path.relative(appDir, filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf8');

  // 1. H1 Count
  const h1Matches = content.match(/<h1[\s>]/gi) || [];
  if (h1Matches.length !== 1) {
    console.error(`[H1 ERROR] ${relPath} has ${h1Matches.length} <h1> tags!`);
    h1Errors++;
  }

  // 2. Title
  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : '';
  if (!title) {
    console.error(`[TITLE ERROR] ${relPath} missing title!`);
    titleErrors++;
  } else if (title.length > 60) {
    console.warn(`[TITLE LENGTH WARNING] ${relPath} (${title.length} chars): "${title}"`);
    titleErrors++;
  }

  // 3. Canonical
  const canonicalMatch = content.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i) || content.match(/<link[^>]+href="([^"]+)"[^>]+rel="canonical"/i);
  const canonical = canonicalMatch ? canonicalMatch[1] : '';
  if (!canonical) {
    console.error(`[CANONICAL ERROR] ${relPath} missing canonical!`);
    canonicalErrors++;
  } else if (!canonical.startsWith('https://www.freeaspectratiocalculator.online')) {
    console.error(`[CANONICAL HOST ERROR] ${relPath}: ${canonical}`);
    canonicalErrors++;
  } else if (canonical.endsWith('/') && canonical !== 'https://www.freeaspectratiocalculator.online') {
    console.error(`[CANONICAL TRAILING SLASH ERROR] ${relPath}: ${canonical}`);
    canonicalErrors++;
  }

  // 4. Structured Data
  const ldJsonMatches = content.match(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi) || [];
  if (ldJsonMatches.length === 0) {
    console.warn(`[STRUCTURED DATA WARNING] ${relPath} has no JSON-LD script tags.`);
  } else {
    for (const tag of ldJsonMatches) {
      const jsonStr = tag.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
      try {
        const parsed = JSON.parse(jsonStr);
        if (parsed['@type'] === 'Article') {
          if (!parsed.image) {
            console.error(`[ARTICLE SCHEMA ERROR] ${relPath} missing Article image!`);
            structuredDataErrors++;
          }
          if (!parsed.publisher || !parsed.publisher.logo) {
            console.error(`[ARTICLE SCHEMA ERROR] ${relPath} missing publisher logo!`);
            structuredDataErrors++;
          }
        }
      } catch (e) {
        console.error(`[JSON-LD SYNTAX ERROR] ${relPath}: ${e.message}`);
        structuredDataErrors++;
      }
    }
  }
}

console.log('--- SUMMARY OF ON-PAGE AUDIT ---');
console.log(`Total HTML files audited: ${htmlFiles.length}`);
console.log(`H1 Errors (should be exactly 1 per page): ${h1Errors}`);
console.log(`Title Errors / >60 chars: ${titleErrors}`);
console.log(`Canonical Errors: ${canonicalErrors}`);
console.log(`Structured Data Errors: ${structuredDataErrors}`);

// Check specific page word counts and links
const guidesHtml = fs.readFileSync(path.join(appDir, 'guides.html'), 'utf8');
const guidesWordCount = guidesHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').length;
const guidesLinksCount = (guidesHtml.match(/href="\/guides\/[^"]+"/g) || []).length;
console.log(`\n/guides page word count in initial HTML: ~${guidesWordCount} words`);
console.log(`/guides page guide links in initial HTML: ${guidesLinksCount} links to guide articles`);

const contactHtml = fs.readFileSync(path.join(appDir, 'contact-us.html'), 'utf8');
const contactWordCount = contactHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').length;
console.log(`/contact-us page word count in initial HTML: ~${contactWordCount} words`);
