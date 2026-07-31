import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const dimensions = {
  'logo.svg': [760, 160],
  'hero-construction.webp': [1920, 1280],
  'bac-armare.webp': [1600, 2134],
  'bac-nivelare.webp': [1600, 1200],
  'bac-pompa.webp': [1600, 2134],
  'bac-turnare.webp': [1600, 2844],
  'demolare-acoperis.webp': [960, 1280],
  'demolare-depozit.webp': [960, 1280],
  'dumbrava-beton.webp': [1200, 1600],
  'feredeuca-armare.webp': [1600, 2134],
  'feredeuca-finisare.webp': [1600, 2844],
  'feredeuca-turnare.webp': [1600, 2134],
  'fundatie-armata.webp': [1600, 2134],
  'gipscarton-oficiu.webp': [960, 1280],
  'pavaj.webp': [1200, 1600],
  'planificare-beton.webp': [1600, 2134],
  'platforma-rezidentiala.webp': [1600, 2134],
  'structura-beton.webp': [1600, 2134],
  'kaufland-chisinau.webp': [1800, 1048],
  'radisson-leogrand.webp': [1601, 1200],
  'terra-avia.webp': [1800, 1200]
  , 'port-mall-demolition/01.webp': [960, 1280]
  , 'port-mall-demolition/02.webp': [960, 1280]
  , 'port-mall-demolition/03.webp': [960, 1280]
  , 'port-mall-demolition/04.webp': [960, 1280]
  , 'port-mall-demolition/05.webp': [960, 1280]
  , 'port-mall-fitout/01.webp': [960, 1280]
  , 'port-mall-fitout/02.webp': [960, 1280]
  , 'port-mall-fitout/03.webp': [960, 1280]
  , 'bac-concrete/01.webp': [1600, 2134]
  , 'bac-concrete/02.webp': [1600, 2844]
  , 'bac-concrete/03.webp': [1600, 1200]
  , 'bac-concrete/04.webp': [1600, 1200]
  , 'imona-feredeului/01.webp': [1600, 2134]
  , 'imona-feredeului/02.webp': [1600, 2134]
  , 'imona-feredeului/03.webp': [1600, 2844]
  , 'imona-feredeului/04.webp': [1600, 2134]
};

async function htmlFiles(directory) {
  const files = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    if (['.git', 'node_modules'].includes(entry.name)) continue;
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(filename));
    else if (entry.name.endsWith('.html')) files.push(filename);
  }
  return files;
}

for (const filename of await htmlFiles(root)) {
  let html = await fs.readFile(filename, 'utf8');
  html = html.replace(/<img\b[^>]*>/g, tag => {
    const source = tag.match(/\bsrc="([^"]+)"/)?.[1];
    if (!source) return tag;
    const cleanSource = source.split('?')[0].replaceAll('\\', '/');
    const parts = cleanSource.split('/');
    const name = parts.at(-1);
    const nestedName = parts.slice(-2).join('/');
    const size = dimensions[nestedName] || dimensions[name];
    if (size && !/\bwidth=/.test(tag)) tag = tag.replace('<img', `<img width="${size[0]}" height="${size[1]}"`);
    if (!/\bdecoding=/.test(tag)) tag = tag.replace('<img', '<img decoding="async"');
    if (!/\b(?:loading|fetchpriority)=/.test(tag)) tag = tag.replace('<img', '<img loading="lazy"');
    if (size?.[0] > 800 && source.endsWith('.webp') && !/\bsrcset=/.test(tag)) {
      const smallSource = source.replace(/\.webp$/, '-800.webp');
      const sizes = /\bfetchpriority="high"/.test(tag) ? '100vw' : '(max-width: 820px) 100vw, 50vw';
      tag = tag.replace('<img', `<img srcset="${smallSource} 800w, ${source} ${size[0]}w" sizes="${sizes}"`);
    }
    return tag;
  });
  await fs.writeFile(filename, html, 'utf8');
}

console.log('Image dimensions and loading hints applied.');
