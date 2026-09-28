# Condr Grup web design system

## Current direction — 28 September 2026

- Colors: ink #171a20, body #393c41, muted #5c5e62, surfaces #f4f4f4 and #fff, primary action #3e6ae1.
- System sans typography; 48px desktop hero and 40px wide feature headings. No proprietary reference fonts/assets.
- Service-first navigation: six existing categories, desktop catalog menu, mobile category drilldown, paired enquiry/detail actions.
- The first block uses three layered image/text slides, seven-second dwell, visible controls and pause. Ordinary page scrolling, keyboard operation and reduced-motion support are required.
- Shared shell: assets/js/experience-shell.js. Behavior: experience.js. Theme: experience.css, following legacy base styles.
- Build source: content/experience.json and tools/build-experience.mjs. Project facts and all maps share content/projects/featured.json.
- Real company photos are enabled by owner authorization. Preserve documentary content; resize and strip metadata for web derivatives. Do not assign unrelated worksite photos to a featured project.
- Lead flow: service, name and telephone required; location/message optional; consent required. Native modal and full contact page share the existing FormSubmit endpoint. No invented pricing, scheduling or guaranteed outcomes.
- Keep maps lazy, attribution visible and an address list usable without tiles. Coordinates identify addresses/buildings, not surveyed entrances.
- Preserve RO/EN/RU routes, semantic headings, visible focus, native dialogs, canonical metadata and legacy URLs.
- The previous design is preserved at https://github.com/CondruConstruct/CondrGrup-archive-2026-09-28.

## Photo and vector release

The first hero slide uses an original six-second SVG assembly (construction-scene.css/js), with a ten-second opening dwell. It transitions to real renovation and structure photography. The pause control pauses the vector animation too; reduced motion renders the final building. Header colors follow the active background. Gallery captions describe actual work stages in RO/EN/RU. New phone images are selected from 517 private camera photos copied over USB; only four selected WebP pairs enter the repository.
