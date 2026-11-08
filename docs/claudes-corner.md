# Claude's corner

A running log of what Claude has built on KakiLima, so a new chat or agent can catch up from this one page. Newest first within each section. Last updated 2026-11-08.

## What KakiLima is

A Malaysian community hub for safer streets, walkable sidewalks and better public transport. Personal side project of the owner (GitHub `7YMERA`), not work. The audience is all of Malaysia, including older people, OKU and blind users, so accessibility and the four languages (EN, MS, ZH, TA) are requirements, not extras.

Hosting is Vercel. The target domain is kakilima.com (not bought yet). There is no branding yet.

## Shipped (merged to `main`)

| PR | Date | What |
| --- | --- | --- |
| [#5](https://github.com/7YMERA/kakilima/pull/5) | 2026-10-29 | Moved styling to Tailwind CSS v4 with design tokens, new fonts (Atkinson Hyperlegible Next, Plus Jakarta Sans), small shadcn/Magic UI pieces, `.mcp.json` with shadcn, magicui, playwright and context7 servers. |
| [#2](https://github.com/7YMERA/kakilima/pull/2) | 2026-10-27 | Language switcher (EN/MS/ZH/TA) with browser language redirect, text size and high contrast controls, skip link, 44px tap targets. |
| [#1](https://github.com/7YMERA/kakilima/pull/1) | 2026-10-27 | Site skeleton: home, "Report it" (links to official channels such as MyJalan and Respons Rakyat) and About pages. |

## Open PRs

| PR | Opened | What | State |
| --- | --- | --- | --- |
| [#6](https://github.com/7YMERA/kakilima/pull/6) | 2026-11-07 | "Open now" / "Coming soon" pills on the roadmap and a "Report it" band above the footer, in all four languages. | Waiting on owner review. In dark mode the band turns light grey; owner hasn't said whether to keep it dark. |
| [#4](https://github.com/7YMERA/kakilima/pull/4) | 2026-10-28 | Community wall: moderated posts with photo uploads, admin at `/en/admin`. Includes #3. Needs Neon Postgres (`DATABASE_URL`), Vercel Blob (`BLOB_READ_WRITE_TOKEN`) and `ADMIN_PASSWORD`. | Stale. Written before #5, so its CSS classes in `globals.css` must be converted to Tailwind utilities before merge. |
| [#3](https://github.com/7YMERA/kakilima/pull/3) | 2026-10-27 | Advocates directory page (NGOs and individuals). | Stale, same Tailwind conversion needed. Some entries (KakiJalanKaki, CLI Initiative) still need the owner to confirm their handles. |

## Decisions

- 2026-11-07: From the owner's personal site, borrow only light ideas (status pills, CTA band). Skip aurora backgrounds, 3D effects and Ctrl+K, since they hurt slow phones and screen readers.
- 2026-10-29: Style only with Tailwind utilities on the token colours (`bg-surface`, `text-muted`, `border-border`, `edge` for borders). No `dark:` or high contrast classes; themes swap token values. Tailwind's default palette is off.
- 2026-10-29: Model split for the work: Haiku for cheap high-volume jobs (search, audits, screenshots), Sonnet for main building (code, PR prep, docs), Opus for planning hard changes and final review.
- 2026-10-28: Build first, outreach to activists later.
- 2026-10-27: v1 is a simple live website. User complaints are moderated before they appear. No Supabase (the owner's is in use), so use Neon Postgres through Vercel if a database is needed.

## Open threads and ideas

- Bigger design ideas waiting on the owner's pick (from 2026-11-07): sample report card in the hero (recommended first), a light/dark switch, a bottom dock on phones, pill filters for the directory, an impact numbers strip once there's real data.
- Twice-monthly newsletter to MPs' offices about their area: shelved for now.
- Activist outreach emails: drafts exist in the owner's personal Gmail, paused until the site is further along.
- Naming idea under consideration: KakiLima (movement), KakiLima Audit (reporting), Suara KakiLima (advocates directory).

## Gotchas

- Some sites are blocked from the cloud sandbox (context7.com, magicui.design via curl). WebFetch can still reach the Magic UI registry JSON.
- Vercel builds a preview for each PR branch; link it in the PR when it's ready.
