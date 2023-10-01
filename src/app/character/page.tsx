'use client';

import npc_generator from '../../lib/generators/npc.js';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import CharacterChoices from './character-choices';
import { useState } from 'react';
import Section from '@/components/section';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type Character = {
  species?: string;
  gender?: string;
};

export default function NPC() {
  const [seed, setSeed] = useState<number>(0);
  const [value, setValue] = useState<Character>({});

  let character = npc_generator(value, seed);

  return (
    <div>
      <div className="mt-4">
        <div className="flex w-full max-w-sm items-end space-x-2">
          <div>
            <Label htmlFor={'seed'}>seed</Label>
            <Input
              type="number"
              value={seed}
              onChange={(ev) => setSeed(parseInt(ev.target.value))}
            />
          </div>
          <Button onClick={() => setSeed(Math.floor(Math.random() * 1000000))}>Randomize</Button>
        </div>
        <CharacterChoices value={value} onValueChange={setValue} />
      </div>
      <div className="mt-4">
        <CharacterCard character={character} />
      </div>
    </div>
  );
}
function CharacterCard({ character }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{character.name_}</CardTitle>
        <CardDescription>{character.short}</CardDescription>
      </CardHeader>
      <CardContent>
        <Section entity={character} section="history" />
        <Section entity={character} section="clothes" />
        <Section entity={character} section="parents" />
        <Section entity={character} section="siblings" />
        <Section entity={character} section="likes" />
        <Section entity={character} section="traits" />
        <Section entity={character} section="goals" />
      </CardContent>
    </Card>
  );
}
