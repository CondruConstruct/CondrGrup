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

Romanian HTML pages are the editorial source.

1. Run `node tools/build-locales.mjs` to regenerate English and Russian pages.
2. Run `node tools/polish-locales.mjs` to normalize brand names and construction terminology.
3. Run `node tools/build-seo.mjs` to apply canonical metadata, language alternates, sitemap, and crawler rules.
4. Run `node tools/enhance-images.mjs` to apply image dimensions and loading hints.
5. Run `node tools/validate-site.mjs` before publishing.

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
- Project photos are authentic Condr Grup archive images. Extra project facts should only be published after verification and permission.
- External brand/property images are identification images, never presented as Condr Grup execution evidence.
- Social profile positions are intentionally placeholders until official Facebook, Instagram, and TikTok URLs are supplied.
- Canonical URLs in `tools/build-seo.mjs` must be updated if the production domain changes.
