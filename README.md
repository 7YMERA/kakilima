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
- Directory entries (names, topics, links) live in `data/advocates.ts`. Their descriptions are under `directory.entries` in each dictionary.

## Styling

The site uses [Tailwind CSS v4](https://tailwindcss.com) through PostCSS (`postcss.config.mjs`). All styles live in components as utility classes, plus one stylesheet, `app/[lang]/globals.css`.

- **Tokens.** Colours, radius, border width and shadow are CSS variables on `:root` (`--bg`, `--surface`, `--text`, `--muted`, `--border`, `--brand`, `--brand-ink`, `--accent`, `--focus`, `--radius` and a few more). An `@theme inline` block maps them to utilities, so `bg-surface`, `text-muted`, `border-border` and `rounded-card` follow whatever the tokens are set to.
- **Themes.** Dark mode (system setting) and high contrast (`data-contrast="high"`) only change token values. Never add `dark:` or high contrast classes to components. Tailwind's default palette is switched off, so only the tokens exist as colours.
- **`edge`** is a custom utility for a border that follows `--border-width` (1px, or 2px in high contrast). Use it instead of `border` and pick the colour with `border-border`, `border-brand` and so on.
- **Base layer.** Only what utilities can't express cleanly: the text size steps, the skip link, the reduced motion override, the focus ring and underlined links in high contrast.
- **Fonts.** Atkinson Hyperlegible Next for body text (designed for low vision readers) and Plus Jakarta Sans for headings, both self-hosted from npm. Chinese and Tamil fall back to system Noto, PingFang, Microsoft YaHei or Nirmala UI.
- **Components.** `components/ui/` holds small pieces adapted from shadcn/ui (`buttonVariants`) and Magic UI (`BlurFade`, `DotPattern`), rewritten to use the site tokens. Icons come from `lucide-react`. The text size control's sliding thumb uses `motion`.
- **Motion.** Animations mark a change (content arriving, a setting switching, a card you can open). Every one is `motion-safe` or goes through Motion's `reducedMotion="user"`, so nothing moves when the system asks for reduced motion.

## Design MCP servers

`.mcp.json` sets up four MCP servers for Claude Code (and other MCP clients) in this repo. Claude Code asks to approve them the first time you open the project; you can check them with `/mcp`.

| Server | What it's for |
| --- | --- |
| `shadcn` | Browse and pull shadcn/ui components. Adapt them to the tokens rather than running `shadcn init`. |
| `magicui` | Browse Magic UI's animated components for ideas and source. |
| `playwright` | Drive a headless browser to screenshot pages and check behaviour. |
| `context7` | Up to date docs for Tailwind v4, Next.js 16 and other libraries. Ask for it by name, e.g. "use context7 for the Tailwind v4 @theme docs". |

They all run with `npx`, so Node.js is the only requirement.

## Accessibility

- Text size (3 steps) and high contrast controls in the header, saved per browser.
- Skip link, labelled landmarks, correct `lang` on every page for screen readers, and 44px minimum tap targets.
- Respects the system dark mode and reduced motion settings.
- Focus shows as a two-tone ring (yellow and near-black, after the GOV.UK Design System) that stays visible on every background.
