# Generator Architecture

All generators live in `src/lib/generators/` and follow a common pattern.

## BaseGenerator (`base.js`)

Provides:
- Seeded RNG (`this.rng`) — deterministic given a seed
- `pick(array)` — seeded random pick from an array
- `generate()` — override in subclasses

## Subclass Convention

```js
import { BaseGenerator } from './base';
import data from '../data/<name>/something.json';

export class MyGenerator extends BaseGenerator {
  generate() {
    return {
      field: this.pick(data.options),
      // ...
    };
  }
}
```

## Grammar-Based Text

Generators use `@dropecho/langgen` for template expansion and `@dropecho/storygen` for narrative construction. Data JSON files supply the word lists / grammar rules consumed by these libraries.

## URL Seed Flow

1. Page component calls `useUrlSeed()` → gets current seed from `?seed=` param (or generates one).
2. Passes seed to generator constructor.
3. Renders result. Sharing the URL reproduces the same output.
