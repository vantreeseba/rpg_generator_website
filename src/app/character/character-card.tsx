'use client';
import npc_generator from '../../lib/generators/npc.js';
import trinket_generator from '../../lib/generators/trinket.js';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import EntitySection from '@/components/entity-section';
import LinkedSection from '@/components/linked-section';
import { stringToSeed } from '@/lib/utils';

function parseNum(val: any): number | null {
  const n = Number(val);
  return Number.isFinite(n) ? n : null;
}

export default function CharacterCard({ character, seed }: any) {
  const memory = { species: character.species_ };

  // URL params are strings — use parseNum which correctly handles 0, NaN, null, "null", etc.
  const familySeed: number = parseNum(character.family_seed) ?? stringToSeed(character.name_);
  const siblingCount: number = parseNum(character.family_sibling_count) ?? character.sibling_count;
  const familyRootSeed: number | null = parseNum(character.family_root_seed);

  // Seed of whoever is the "root" of this family group, used in sibling link URLs.
  // Comes from page.tsx as a clean number so string/number ambiguity can't cause issues.
  const rootSeedForLinks: number = familyRootSeed ?? seed;

  let parents = [
    npc_generator(memory, familySeed),
    npc_generator(memory, familySeed + 1),
  ];
  parents = parents.map((x) => ({ ...x, label: x.name_, memory: { seed: x.memory.seed, species: x.species_ } }));

  let siblings = [];
  for (let i = 0; i < siblingCount; i++) {
    siblings.push(npc_generator(memory, familySeed + 100 + i));
  }
  // If we navigated here from a sibling, include the root character too.
  if (familyRootSeed != null) {
    siblings.push(npc_generator(memory, familyRootSeed));
  }

  const siblingLinkMemory = (x: any) => ({
    seed: x.memory.seed,
    species: x.species_,
    family_seed: familySeed,
    family_sibling_count: siblingCount,
    family_root_seed: rootSeedForLinks,
  });

  siblings = siblings
    .filter((x) => Number(x.memory.seed) !== Number(character.memory.seed))
    .map((x) => ({ ...x, label: x.name_, memory: siblingLinkMemory(x) }));

  let trinkets = [];
  for (let i = 0; i < character.trinket_count; i++) {
    const trinketSeed = stringToSeed(character.name_) + 200 + i;
    const t = trinket_generator(trinketSeed);
    trinkets.push({
      label: t.title,
      short: t.short.split('\n')[0],
      memory: { seed: trinketSeed },
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{character.name_}</CardTitle>
        <CardDescription>{character.short}</CardDescription>
      </CardHeader>
      <CardContent>
        <EntitySection entity={character} section="history" />
        <EntitySection entity={character} section="clothes" />
        <LinkedSection entities={parents} path="character" label="parents/guardians" />
        <LinkedSection entities={siblings} path="character" label="siblings" />
        <LinkedSection entities={trinkets} path="trinket" label="trinkets" />
        <EntitySection entity={character} section="likes" />
        <EntitySection entity={character} section="traits" />
        <EntitySection entity={character} section="goals" />
      </CardContent>
    </Card>
  );
}
