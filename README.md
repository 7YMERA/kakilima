# KakiLima

A community hub for safer streets, walkable sidewalks and better public transport in Malaysia.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploy

Import this repo in Vercel (New Project, pick `kakilima`). The defaults for Next.js work as is. Add the custom domain under Project Settings, Domains.

## Editing content

The site is available in English (`/en`), Bahasa Melayu (`/ms`), Chinese (`/zh`) and Tamil (`/ta`). Visitors to `/` are sent to their browser's language, and their choice is remembered.

- All page text lives in `i18n/dictionaries/`, one file per language. `en.ts` defines the shape, so TypeScript flags any text missing from the other languages.
- Official reporting channel names and links live in `data/report-channels.ts`. Their descriptions are under `report.channels` in each dictionary.

## Accessibility

- Text size (3 steps) and high contrast controls in the header, saved per browser.
- Skip link, labelled landmarks, correct `lang` on every page for screen readers, and 44px minimum tap targets.
- Respects the system dark mode and reduced motion settings.
