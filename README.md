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

## Community wall setup

The community wall (`/wall`) needs three things in the Vercel project:

1. **Neon** (Storage tab). It sets `DATABASE_URL`. The `reports` table is created automatically on first use.
2. **Blob** (Storage tab). It sets `BLOB_READ_WRITE_TOKEN` for photo uploads.
3. An **`ADMIN_PASSWORD`** environment variable. Sign in at `/en/admin` with it to approve or reject posts.

Until these are set, the wall shows a "still being set up" message and posting is closed. Posts stay hidden until approved. Photos are resized and re-encoded, which removes EXIF data such as GPS location. Each visitor can post at most 5 times an hour (only a salted hash of their IP is stored).

For local development, point `DATABASE_URL` at any Postgres. Without a Blob token, photos are saved to `public/uploads/` in dev.

## Editing content

The site is available in English (`/en`), Bahasa Melayu (`/ms`), Chinese (`/zh`) and Tamil (`/ta`). Visitors to `/` are sent to their browser's language, and their choice is remembered.

- All page text lives in `i18n/dictionaries/`, one file per language. `en.ts` defines the shape, so TypeScript flags any text missing from the other languages.
- Official reporting channel names and links live in `data/report-channels.ts`. Their descriptions are under `report.channels` in each dictionary.
- Directory entries (names, topics, links) live in `data/advocates.ts`. Their descriptions are under `directory.entries` in each dictionary.

## Accessibility

- Text size (3 steps) and high contrast controls in the header, saved per browser.
- Skip link, labelled landmarks, correct `lang` on every page for screen readers, and 44px minimum tap targets.
- Respects the system dark mode and reduced motion settings.
