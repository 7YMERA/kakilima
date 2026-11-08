# CLAUDE.md

Start here. Before reading code or git history, read [`docs/claudes-corner.md`](docs/claudes-corner.md). It is the build log: what exists, what's open, the decisions already made and the rules to follow. It should be enough context to start work without re-reading old chats.

## Keep the log current

- When you open, merge or close a PR, add or update its line in the log in the same PR (or a follow-up commit).
- When the owner makes a decision, add it under "Decisions". When something is parked, add it under "Open threads".
- Keep entries to one or two lines. Link the PR instead of describing the code. Dates are absolute (YYYY-MM-DD).
- Remove anything that stops being true rather than adding a correction below it.

## Quick facts

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4. Routes live under `app/[lang]/`.
- `npm run dev` to run, `npm run lint` (type check) and `npm run build` before pushing.
- The README covers content editing, styling rules, accessibility and the MCP servers. Don't repeat it here.
