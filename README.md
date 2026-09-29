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

The current service-first experience is generated from `content/experience.json`, localized interface copy in `tools/build-experience.mjs`, and the verified project facts/map coordinates in `content/projects/featured.json`.

1. Run `node tools/build-experience.mjs` to rebuild home, service, contact, B2B and featured project pages in Romanian, English and Russian, plus the shared catalog and shell references.
2. Run `node tools/build-seo.mjs` for canonical metadata, language alternates, sitemap and crawler rules.
3. Run `node tools/validate-site.mjs` before publishing.
4. Preview using `python tools/preview.py` (loopback port 4173, caching disabled).

Legacy company/review/privacy/case-study pages retain their editorial HTML. The older locale/redesign generators are historical migration tools and must not run after the current experience build: they can replace its content. The owner authorized real photography on September 28. `useServicePhotos` is enabled; selected phone photographs and the existing company archive illustrate service categories and a shared work gallery. Featured project images remain logo placeholders until exact photo-to-address associations are confirmed.

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
- The opening uses an original finite SVG construction animation with pause and reduced-motion support. Service pages and work galleries use real company photographs; selected phone sources are documented in `assets/images/selected/SOURCES.md`. Private originals and contact sheets are outside the repository.
- The current visual direction is independently implemented, inspired by Tesla service navigation and a Vastavit-style layered opening. The September 22 red/charcoal version is preserved in the private archived repository `CondruConstruct/CondrGrup-archive-2026-09-28`. No reference source code, imagery, videos or copy is reused.
- Social profile positions are intentionally placeholders until official Facebook, Instagram, and TikTok URLs are supplied.
- Canonical URLs in `tools/build-seo.mjs` must be updated if the production domain changes.

## Form verification

Use a separate browser session for simulated form responses. Always remove routes in a finally block and close the test session; never leave a user-facing browser with mocked requests. Provider acceptance and mailbox arrival are distinct checks. On September28, a labelled live delivery test was confirmed in the configured Gmail inbox. The popup shows its dedicated thank-you screen only after an affirmative provider response, preserves fields on failure and limits requests to30seconds.

The homepage first viewport is split into a 70svh introduction and a 30svh chooser linking directly to all six services. Mobile uses six compact text cards so every category is immediately visible.
