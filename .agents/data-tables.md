# Data Table Conventions

Data lives in `src/lib/data/` and is plain JSON consumed directly by generators.

## Directory Layout

```
data/
  common/         # Shared across generators (colors, materials)
  character/      # NPC-specific tables (species, traits, hair, goals, etc.)
  deity/          # God generator tables (aspects)
  items/          # Item tables (trinkets, weapons, clothing)
  generators/     # Narrative grammar files (npc.json, quest.json, plothooks.json)
  animals.json
  foods.json
  locations.json
  occupations.json
  symbols.json
```

## Adding Data

- Keep arrays flat where possible — generators use `pick()` on them directly.
- Grammar files (under `generators/`) follow langgen/storygen grammar format: keys are rule names, values are arrays of expansion strings with `{{rule}}` placeholders.
- Shared data (colors, materials) belongs in `common/`; generator-specific data gets its own subdirectory.
