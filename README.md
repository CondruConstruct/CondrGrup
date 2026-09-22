# Condr Grup website

Official static website for **Condr Grup S.R.L.**, prepared for GitHub Pages and the custom domain [condrgrup.md](https://condrgrup.md/).

## Languages

- Romanian: `/`
- Russian: `/ru/`
- English: `/en/`

Each edition contains the homepage, services, projects, B2B, company information, reviews, contact, privacy, and 404 pages. Navigation, contacts, language switching, forms, carousels, and shared interface elements are managed centrally.

## Local preview

Serve this directory with any static web server and open `http://127.0.0.1:4173/`.

## Content builds

Existing Romanian HTML pages are the editorial source for legacy content. The redesigned homepage, project index and three featured case studies are generated in all three languages by `tools/build-redesign.mjs`; their project facts and map coordinates live in `content/projects/featured.json`.

1. Run `node tools/build-locales.mjs` to regenerate English and Russian pages.
2. Run `node tools/polish-locales.mjs` to normalize brand names and construction terminology.
3. Run `node tools/build-redesign.mjs` to rebuild the new pages and apply the shared theme and logo placeholders.
4. Run `node tools/build-seo.mjs` to apply canonical metadata, language alternates, sitemap, and crawler rules.
5. Run `node tools/validate-site.mjs` before publishing. For edits limited to the redesigned pages, start at step 3.

The three featured projects are Grenoble 259/9 (office renovation), Feredeului 4 (500 m² yard and 121 m² hangar), and Bomond at Port Mall. Older case-study URLs remain accessible for compatibility but are not part of the featured portfolio. The maps mark addresses/buildings, not surveyed entrances; coordinate evidence is retained in the data file.

Leaflet 1.9.4 is vendored with its license. OpenStreetMap tiles load only near the map; attribution remains visible. Do not bulk download map tiles. The numbered list remains usable when tiles are unavailable. Motion respects reduced-motion preferences; project details support click, touch and keyboard.

## Forms

Contact, B2B, and review forms send to `condru01@gmail.com` through FormSubmit AJAX. The first real submission triggers a FormSubmit activation email. The mailbox owner must approve that email once before production submissions are delivered.

## Hosting and domain

- Repository: `CondruConstruct/CondrGrup`
- Publishing source: `main` branch, repository root
- Custom domain: `condrgrup.md`
- The repository-root `CNAME` file keeps the GitHub Pages domain binding.

The apex domain uses GitHub Pages `A` records. For the recommended `www` redirect, configure `www` as a `CNAME` pointing directly to `condruconstruct.github.io`.

## Operational notes

- The experimental 30-second construction widget is preserved behind `FEATURES.buildStory = false` in `assets/js/site.js`.
- The September redesign displays the existing Condr Grup logo instead of photographs. Original image assets are retained for future owner selection; no replacement project photos have been published.
- The visual direction is independently implemented, inspired by the RD Perez reference palette and interactions. No reference source code, imagery, videos or copy is reused.
- Social profile positions are intentionally placeholders until official Facebook, Instagram, and TikTok URLs are supplied.
- Canonical URLs in `tools/build-seo.mjs` must be updated if the production domain changes.
