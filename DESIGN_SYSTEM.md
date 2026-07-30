# Condr Grup web design system

## Tokens

- Ink: `#151714`
- Paper: `#f0eee8`
- Light paper: `#f8f6f0`
- Concrete: `#dedbd2`
- Safety orange: `#ef5a28`
- Display type: Manrope
- Accent serif: Georgia
- Technical labels: DM Mono

All values live as CSS custom properties at the top of `assets/css/site.css`.

## Rules

- Use authentic worksite photography over stock images wherever available.
- Use orange for calls to action and small emphasis, not as a general background except for deliberate B2B/CTA bands.
- Reuse the shared header, footer, quick-contact widget and 30-second build story from `assets/js/site.js`.
- Keep claims measurable and verified. Do not invent clients, quantities, dates, certificates, guarantees or project results.
- Label demonstration content visibly until replaced.
- Every interactive element must be keyboard-accessible and retain a visible text label or `aria-label`.
- Respect `prefers-reduced-motion`.
- New images belong in `assets/images/` and should be WebP, sensibly compressed and lazily loaded below the fold.
- New pages use `data-root` on `<html>` so shared links resolve correctly on GitHub Pages.
- Romanian is the source edition. Future Russian and English versions will live in `/ru/` and `/en/` with the same page slugs and component system.
