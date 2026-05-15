# RPG Generator Website

Next.js app that procedurally generates RPG content (characters, deities, taverns, quests, trinkets, localities) using seed-based randomization so results are shareable via URL.

## Stack

- **Next.js** (App Router, `src/app/`)
- **TypeScript** + React
- **Tailwind CSS** + shadcn/ui (`src/components/ui/`)
- **@dropecho/langgen** + **@dropecho/storygen** — grammar-based text generation
- No backend, no database — all generation is client-side

## Project Structure

```
src/
  app/              # Next.js routes (one folder per generator)
  components/       # Shared UI components
  hooks/            # useUrlSeed, useUrlState — seed/state via URL params
  lib/
    generators/     # JS generator logic (base, npc, god, tavern, quest, trinket, locality)
    data/           # JSON data tables consumed by generators
```

## Key Patterns

- **Seed-based generation** — every page reads a seed from the URL (`useUrlSeed`). Same seed → same output. Regenerate by changing the seed.
- **Linked generators** — pages can link to related generators (e.g. a character links to a deity). Cross-linking lives in the page components.
- **EntitySection / LinkedSection** — reusable components in `src/components/` for rendering generator output sections with optional links.
- **Generator files** (`src/lib/generators/*.js`) extend `base.js` and call langgen/storygen grammars against JSON data.

## Adding a New Generator

1. Add data JSON under `src/lib/data/<name>/`.
2. Create `src/lib/generators/<name>.js` extending `BaseGenerator`.
3. Add a route at `src/app/<name>/page.tsx`.
4. Wire links from/to related generators as needed.

## Commands

```bash
npm run dev     # dev server on localhost:3000
npm run build   # production build
npm run lint    # ESLint
```

## Docs & References

See `.agents/` for deeper notes:
- `.agents/generators.md` — generator architecture detail
- `.agents/data-tables.md` — data file conventions
