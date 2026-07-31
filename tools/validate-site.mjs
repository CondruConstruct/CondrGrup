import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const ignoredDirectories = new Set(['.git', 'tools']);
const htmlFiles = [];
const errors = [];

async function walk(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(fullPath);
    else if (entry.name.endsWith('.html')) htmlFiles.push(fullPath);
  }
}

async function exists(filename) {
  try {
    const stat = await fs.stat(filename);
    return stat.isFile();
  } catch {
    return false;
  }
}

function expectedLanguage(relative) {
  if (relative.startsWith('en/')) return 'en';
  if (relative.startsWith('ru/')) return 'ru';
  return 'ro';
}

await walk(root);

for (const filename of htmlFiles) {
  const html = await fs.readFile(filename, 'utf8');
  const relative = path.relative(root, filename).replaceAll('\\', '/');
  const expectedLang = expectedLanguage(relative);
  const lang = html.match(/<html lang="([^"]+)"/)?.[1];

  if (lang !== expectedLang) errors.push(`${relative}: expected lang="${expectedLang}", found "${lang}"`);
  if (!html.includes('content="width=device-width,initial-scale=1"')) errors.push(`${relative}: invalid viewport metadata`);
  if (!relative.endsWith('404.html')) {
    if (!html.includes('<link rel="canonical"')) errors.push(`${relative}: missing canonical URL`);
    if ((html.match(/hreflang="/g) || []).length !== 4) errors.push(`${relative}: expected four hreflang entries`);
    for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      try { JSON.parse(match[1]); } catch { errors.push(`${relative}: invalid JSON-LD`); }
    }
  }

  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\bwidth="\d+"/.test(match[0]) || !/\bheight="\d+"/.test(match[0])) errors.push(`${relative}: image missing width or height`);
    if (!/\balt="[^"]+"/.test(match[0])) errors.push(`${relative}: image missing descriptive alt text`);
  }

  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const reference = match[1];
    if (/^(?:https?:|mailto:|tel:|viber:|#|data:)/.test(reference)) continue;
    const clean = reference.split('#')[0].split('?')[0];
    if (!clean) continue;
    let target = path.resolve(path.dirname(filename), clean);
    if (clean.endsWith('/')) target = path.join(target, 'index.html');
    if (!(await exists(target))) errors.push(`${relative}: missing local reference ${reference}`);
  }

  for (const match of html.matchAll(/\bsrcset="([^"]+)"/g)) {
    for (const candidate of match[1].split(',')) {
      const reference = candidate.trim().split(/\s+/)[0];
      if (!reference || /^(?:https?:|data:)/.test(reference)) continue;
      const target = path.resolve(path.dirname(filename), reference);
      if (!(await exists(target))) errors.push(`${relative}: missing responsive image ${reference}`);
    }
  }

  for (const match of html.matchAll(/url\(['"]?([^'")]+)['"]?\)/g)) {
    const reference = match[1];
    if (/^(?:https?:|data:)/.test(reference)) continue;
    const target = path.resolve(path.dirname(filename), reference);
    if (!(await exists(target))) errors.push(`${relative}: missing inline image ${reference}`);
  }
}

const sitemap = await fs.readFile(path.join(root, 'sitemap.xml'), 'utf8');
const sitemapUrls = (sitemap.match(/<url>/g) || []).length;
const expectedSitemapUrls = htmlFiles.filter(filename => path.basename(filename) !== '404.html').length;
if (sitemapUrls !== expectedSitemapUrls) errors.push(`sitemap.xml: expected ${expectedSitemapUrls} page entries, found ${sitemapUrls}`);

const siteJs = await fs.readFile(path.join(root, 'assets/js/site.js'), 'utf8');
if (!/buildStory:\s*false/.test(siteJs)) errors.push('assets/js/site.js: construction story feature is not disabled');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Validated ${htmlFiles.length} HTML pages, all local references, ${expectedSitemapUrls} sitemap entries, image metadata, JSON-LD, SEO alternates, and the disabled construction widget.`);
}
