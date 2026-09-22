# Condr Grup web design system

## Tokens

- Ink: `#111111`
- Paper: `#f7f4ee`
- Light paper: `#ffffff`
- Concrete: `#ece8e1`
- Construction red: `#c7252a` (hover `#a81e22`)
- Display type: Oswald
- Body and labels: Inter
- Accent serif: Playfair Display

The September 2026 redesign overrides base layout tokens in `assets/css/redesign.css`, loaded after `site.css`. Existing `--orange` token names now resolve to construction red to preserve shared components.

## Rules

- Use the existing Condr Grup logo instead of all page photographs until the owner supplies selected project imagery.
- Use red for calls to action and small emphasis, plus the service strip and deliberate CTA bands.
- Reuse the shared header, footer and quick-contact widget in `assets/js/site.js`. Keep the experimental construction-story widget disabled.
- Use independently authored motion: brief hero assembly, side-entry reveals, tap/keyboard project flips and a reading-progress line. Do not hijack scrolling or hide essential details behind hover.
- Keep project names visible outside the flip. Map and cards use the same three-project data source. Keep map attribution visible and geographic precision limited to the address/building.
- Keep claims measurable and verified. Do not invent clients, quantities, dates, certificates, guarantees or project results.
- Label demonstration content visibly until replaced.
- Every interactive element must be keyboard-accessible and retain a visible text label or `aria-label`.
- Respect `prefers-reduced-motion`.
- New images belong in `assets/images/` and should be WebP, sensibly compressed and lazily loaded below the fold.
- New pages use `data-root` on `<html>` so shared links resolve correctly on GitHub Pages.
- Romanian is the source edition. Russian and English are active in `/ru/` and `/en/`, with matching page slugs. Edit redesigned copy in `tools/build-redesign.mjs` and project facts in `content/projects/featured.json`.
