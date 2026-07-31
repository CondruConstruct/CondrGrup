import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const publicBase = 'https://condrgrup.md/';
const languages = ['ro', 'ru', 'en'];
async function discoverPages(directory = root, prefix = '') {
  const files = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ['.git', 'assets', 'en', 'ru', 'tools', 'node_modules'].includes(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    const relative = path.posix.join(prefix, entry.name);
    if (entry.isDirectory()) files.push(...await discoverPages(absolute, relative));
    else if (entry.name.endsWith('.html') && entry.name !== '404.html') files.push(relative);
  }
  return files.sort();
}

const pages = await discoverPages();

const serviceNames = {
  ro: {
    'servicii/beton-platforme.html': 'Turnări de beton și platforme', 'servicii/drumuri-amenajari.html': 'Drumuri și amenajări exterioare', 'servicii/fundatii-structuri.html': 'Fundații și structuri', 'servicii/case-la-cheie.html': 'Case la cheie', 'servicii/renovari.html': 'Renovări și reparații capitale', 'servicii/demolari.html': 'Lucrări de demolare'
  },
  en: {
    'servicii/beton-platforme.html': 'Concrete pouring and platforms', 'servicii/drumuri-amenajari.html': 'Roads and exterior works', 'servicii/fundatii-structuri.html': 'Foundations and structures', 'servicii/case-la-cheie.html': 'Turnkey houses', 'servicii/renovari.html': 'Renovations and capital repairs', 'servicii/demolari.html': 'Demolition works'
  },
  ru: {
    'servicii/beton-platforme.html': 'Заливка бетона и площадок', 'servicii/drumuri-amenajari.html': 'Дороги и наружное благоустройство', 'servicii/fundatii-structuri.html': 'Фундаменты и конструкции', 'servicii/case-la-cheie.html': 'Дома под ключ', 'servicii/renovari.html': 'Ремонт и капитальная реконструкция', 'servicii/demolari.html': 'Демонтажные работы'
  }
};

const publicRoute = file => file === 'index.html' ? '' : file.replace(/index\.html$/, '');
const pageUrl = (language, file) => `${publicBase}${language === 'ro' ? '' : `${language}/`}${publicRoute(file)}`;
const localFile = (language, file) => path.join(root, language === 'ro' ? '' : language, file);
const cleanText = value => value.replace(/<[^>]+>/g, '').replaceAll('&amp;', '&').replaceAll('&quot;', '"').trim();

function breadcrumbs(language, file, title) {
  if (file === 'index.html') return null;
  const items = [{ '@type': 'ListItem', position: 1, name: language === 'ro' ? 'Acasă' : language === 'ru' ? 'Главная' : 'Home', item: pageUrl(language, 'index.html') }];
  const group = file.split('/')[0];
  if (file.includes('/')) {
    const groupName = group === 'servicii' ? (language === 'ro' ? 'Servicii' : language === 'ru' ? 'Услуги' : 'Services') : (language === 'ro' ? 'Proiecte' : language === 'ru' ? 'Проекты' : 'Projects');
    items.push({ '@type': 'ListItem', position: 2, name: groupName, item: pageUrl(language, `${group}/index.html`) });
  }
  if (!file.endsWith('/index.html')) items.push({ '@type': 'ListItem', position: items.length + 1, name: title, item: pageUrl(language, file) });
  return { '@type': 'BreadcrumbList', '@id': `${pageUrl(language, file)}#breadcrumbs`, itemListElement: items };
}

function schemaGraph(language, file, title, description) {
  const canonical = pageUrl(language, file);
  const contractor = {
    '@type': 'Organization',
    '@id': `${publicBase}#organization`,
    name: 'Condr Grup S.R.L.',
    alternateName: 'Condr Grup',
    url: publicBase,
    logo: { '@type': 'ImageObject', url: `${publicBase}assets/icons/logo.svg` },
    image: `${publicBase}assets/images/social-preview.webp`,
    telephone: '+37369069195',
    email: 'condru01@gmail.com',
    taxID: '1026023118602',
    address: { '@type': 'PostalAddress', streetAddress: 'Alexandru cel Bun 17A', addressLocality: 'Vatra', addressCountry: 'MD' },
    areaServed: { '@type': 'Country', name: 'Republic of Moldova' },
    knowsLanguage: ['ro', 'ru', 'en'],
    contactPoint: { '@type': 'ContactPoint', telephone: '+37369069195', email: 'condru01@gmail.com', contactType: 'sales', availableLanguage: ['Romanian', 'Russian', 'English'], areaServed: 'MD' },
    makesOffer: Object.values(serviceNames[language]).map(name => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name, areaServed: 'Republic of Moldova' } }))
  };
  const webPage = {
    '@type': 'WebPage',
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: title,
    description,
    inLanguage: language,
    isPartOf: { '@id': `${publicBase}#website` },
    about: { '@id': `${publicBase}#organization` },
    primaryImageOfPage: { '@type': 'ImageObject', url: `${publicBase}assets/images/social-preview.webp` }
  };
  const graph = [contractor, { '@type': 'WebSite', '@id': `${publicBase}#website`, url: publicBase, name: 'Condr Grup', publisher: { '@id': `${publicBase}#organization` }, inLanguage: ['ro', 'ru', 'en'] }, webPage];
  const crumb = breadcrumbs(language, file, title);
  if (crumb) graph.push(crumb);
  if (serviceNames[language][file]) graph.push({ '@type': 'Service', '@id': `${canonical}#service`, name: serviceNames[language][file], description, url: canonical, provider: { '@id': `${publicBase}#organization` }, areaServed: { '@type': 'Country', name: 'Republic of Moldova' } });
  return { '@context': 'https://schema.org', '@graph': graph };
}

function seoBlock(language, file, html) {
  const title = cleanText(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] || 'Condr Grup');
  const description = cleanText(html.match(/<meta name="description" content="([^"]*)"/)?.[1] || 'Condr Grup — servicii de construcții în Republica Moldova.');
  const canonical = pageUrl(language, file);
  const alternates = languages.map(code => `  <link rel="alternate" hreflang="${code}" href="${pageUrl(code, file)}">`).join('\n');
  const ogLocale = { ro: 'ro_MD', en: 'en_US', ru: 'ru_MD' }[language];
  const schema = JSON.stringify(schemaGraph(language, file, title, description), null, 2).split('\n').map(line => `  ${line}`).join('\n');
  return `<!-- SEO:START -->
  <link rel="canonical" href="${canonical}">
${alternates}
  <link rel="alternate" hreflang="x-default" href="${pageUrl('ro', file)}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Condr Grup">
  <meta property="og:locale" content="${ogLocale}">
  <meta property="og:title" content="${title.replaceAll('"', '&quot;')}">
  <meta property="og:description" content="${description.replaceAll('"', '&quot;')}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${publicBase}assets/images/social-preview.webp">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Condr Grup — construcții în Moldova">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title.replaceAll('"', '&quot;')}">
  <meta name="twitter:description" content="${description.replaceAll('"', '&quot;')}">
  <meta name="twitter:image" content="${publicBase}assets/images/social-preview.webp">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <script type="application/ld+json">
${schema}
  </script>
  <!-- SEO:END -->`;
}

async function addSeo() {
  for (const language of languages) for (const file of pages) {
    const filename = localFile(language, file);
    let html = await fs.readFile(filename, 'utf8');
    const block = seoBlock(language, file, html);
    html = /<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/.test(html) ? html.replace(/<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->/, block) : html.replace('</head>', `${block}\n</head>`);
    await fs.writeFile(filename, html, 'utf8');
  }
}

async function writeDiscoveryFiles() {
  const urls = [];
  for (const language of languages) for (const file of pages) {
    const stats = await fs.stat(localFile(language, file));
    const alternates = languages.map(code => `    <xhtml:link rel="alternate" hreflang="${code}" href="${pageUrl(code, file)}"/>`).join('\n');
    urls.push(`  <url>\n    <loc>${pageUrl(language, file)}</loc>\n    <lastmod>${stats.mtime.toISOString().slice(0, 10)}</lastmod>\n${alternates}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl('ro', file)}"/>\n  </url>`);
  }
  await fs.writeFile(path.join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`, 'utf8');
  const bots = ['*', 'GPTBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'Bytespider', 'CCBot', 'anthropic-ai', 'FacebookBot', 'Amazonbot'];
  await fs.writeFile(path.join(root, 'robots.txt'), `${bots.map(bot => `User-agent: ${bot}\nAllow: /`).join('\n\n')}\n\nSitemap: ${publicBase}sitemap.xml\n`, 'utf8');
  await fs.writeFile(path.join(root, 'llms.txt'), `# Condr Grup\n\n> Condr Grup S.R.L. is a construction contractor based in Vatra, Republic of Moldova, serving private and B2B clients.\n\n## Core services\n- Concrete pouring and platforms: ${publicBase}servicii/beton-platforme.html\n- Roads and exterior works: ${publicBase}servicii/drumuri-amenajari.html\n- Foundations and structures: ${publicBase}servicii/fundatii-structuri.html\n- Turnkey houses: ${publicBase}servicii/case-la-cheie.html\n- Renovations: ${publicBase}servicii/renovari.html\n- Demolition: ${publicBase}servicii/demolari.html\n\n## B2B and project evidence\n- B2B profile: ${publicBase}b2b/\n- Project portfolio: ${publicBase}proiecte/\n- Port Mall demolition, 2023-2026: ${publicBase}proiecte/port-mall-demolari.html\n- Bomond restaurant at Port Mall: ${publicBase}proiecte/bomond-port-mall.html\n- Kaufland Botanica construction work, 2020: ${publicBase}proiecte/kaufland-botanica.html\n- Terra Avia office capital renovation, 2026: ${publicBase}proiecte/terra-avia.html\n- Imonna Grup, 400 m2 concrete platform: ${publicBase}proiecte/imonna-grup.html\n- Radisson Blu Leogrand project participation, 2016: ${publicBase}proiecte/radisson-blu-leogrand.html\n\n## Languages\nRomanian is the canonical language. Russian pages use /ru/ and English pages use /en/.\n\n## Contact\nPhone: +373 69 069 195\nEmail: condru01@gmail.com\nLegal entity: Condr Grup S.R.L., IDNO 1026023118602\nAddress: Alexandru cel Bun 17A, Vatra, Republic of Moldova\n`, 'utf8');
}

await addSeo();
await writeDiscoveryFiles();
console.log(`SEO metadata added to ${pages.length * languages.length} pages.`);
