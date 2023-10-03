'use client';
import npc_generator from '../../lib/generators/npc.js';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import EntitySection from '@/components/entity-section';
import LinkedSection from '@/components/linked-section';
import { stringToSeed } from '@/lib/utils';

export default function CharacterCard({ character }: any) {
  //   const memory = { species: character.species_ };
  const memory = {};

  let parents = [
    npc_generator(memory, stringToSeed(character.name_)),
    npc_generator(memory, stringToSeed(character.name_) + 1),
  ];
  parents = parents.map((x) => ({ ...x, label: x.name_ }));

  let siblings = [];
  for (let i = 0; i < character.siblings.split('\n').length; i++) {
    siblings.push(npc_generator(memory, stringToSeed(character.name_ + 10 + i)));
  }
  siblings = siblings.map((x) => ({ ...x, label: x.name_ }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{character.name_}</CardTitle>
        <CardDescription>{character.short}</CardDescription>
      </CardHeader>
      <CardContent>
        <EntitySection entity={character} section="history" />
        <EntitySection entity={character} section="clothes" />
        <LinkedSection entities={parents} label="parents/guardians" />
        <LinkedSection entities={siblings} label="siblings" />
        <EntitySection entity={character} section="likes" />
        <EntitySection entity={character} section="traits" />
        <EntitySection entity={character} section="goals" />
      </CardContent>
    </Card>
  );
}
