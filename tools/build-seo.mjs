import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const publicBase = 'https://condrgrup.md/';
const languages = ['ro', 'ru', 'en'];
const pages = [
  'index.html',
  'confidentialitate.html',
  'servicii/index.html',
  'servicii/beton-platforme.html',
  'servicii/drumuri-amenajari.html',
  'servicii/fundatii-structuri.html',
  'servicii/case-la-cheie.html',
  'servicii/renovari.html',
  'servicii/demolari.html',
  'proiecte/index.html',
  'b2b/index.html',
  'despre/index.html',
  'recenzii/index.html',
  'contact/index.html'
];

const htmlEscape = value => value
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

function publicRoute(file) {
  return file === 'index.html' ? '' : file.replace(/index\.html$/, '');
}

function pageUrl(language, file) {
  const localePrefix = language === 'ro' ? '' : `${language}/`;
  return `${publicBase}${localePrefix}${publicRoute(file)}`;
}

function localFile(language, file) {
  return path.join(root, language === 'ro' ? '' : language, file);
}

function seoBlock(language, file, html) {
  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.replace(/<[^>]+>/g, '').trim() || 'Condr Grup';
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1] || '';
  const canonical = pageUrl(language, file);
  const alternates = languages.map(code =>
    `  <link rel="alternate" hreflang="${code}" href="${pageUrl(code, file)}">`
  ).join('\n');
  const ogLocale = { ro: 'ro_MD', en: 'en_US', ru: 'ru_MD' }[language];
  const schema = file === 'index.html'
    ? `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "name": "Condr Grup S.R.L.",
    "url": "${publicBase}",
    "telephone": "+37369069195",
    "email": "condru01@gmail.com",
    "taxID": "1026023118602",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Alexandru cel Bun 17A",
      "addressLocality": "Vatra",
      "addressCountry": "MD"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Republic of Moldova"
    }
  }
  </script>`
    : '';

  return `<!-- SEO:START -->
  <link rel="canonical" href="${canonical}">
${alternates}
  <link rel="alternate" hreflang="x-default" href="${pageUrl('ro', file)}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Condr Grup">
  <meta property="og:locale" content="${ogLocale}">
  <meta property="og:title" content="${htmlEscape(title)}">
  <meta property="og:description" content="${htmlEscape(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${publicBase}assets/images/projects/bac-armare.webp">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <meta name="referrer" content="strict-origin-when-cross-origin">${schema}
  <!-- SEO:END -->`;
}

async function addSeo() {
  for (const language of languages) {
    for (const file of pages) {
      const filename = localFile(language, file);
      let html = await fs.readFile(filename, 'utf8');
      const block = seoBlock(language, file, html);
      if (/<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/.test(html)) {
        html = html.replace(/<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/, block);
      } else {
        html = html.replace('</head>', `${block}\n</head>`);
      }
      await fs.writeFile(filename, html, 'utf8');
    }
  }
}

async function writeSitemap() {
  const urls = [];
  for (const language of languages) {
    for (const file of pages) {
      const alternates = languages.map(code =>
        `    <xhtml:link rel="alternate" hreflang="${code}" href="${pageUrl(code, file)}"/>`
      ).join('\n');
      urls.push(`  <url>
    <loc>${pageUrl(language, file)}</loc>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl('ro', file)}"/>
  </url>`);
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  await fs.writeFile(path.join(root, 'sitemap.xml'), sitemap, 'utf8');
  await fs.writeFile(
    path.join(root, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${publicBase}sitemap.xml\n`,
    'utf8'
  );
}

await addSeo();
await writeSitemap();
console.log(`SEO metadata added to ${pages.length * languages.length} pages.`);
