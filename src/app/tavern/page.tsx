'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import EntitySection from '@/components/entity-section';

import LinkedSection from '@/components/linked-section';

import { useUrlSeed } from '@/hooks/useUrlSeed';

import tavern_generator from '../../lib/generators/tavern.js';
import npc_generator from '../../lib/generators/npc.js';
import { stringToSeed } from '@/lib/utils';

export default function Tavern() {
  const [seed, setSeed] = useUrlSeed();

  const tavern = tavern_generator(seed);

  return (
    <div>
      <div className="flex w-full max-w-sm items-end space-x-2">
        <div>
          <Label htmlFor={'seed'}>seed</Label>
          <Input type="number" value={seed} onChange={(ev) => setSeed(ev.target.value)} />
        </div>
        <Button onClick={() => setSeed(Math.floor(Math.random() * 1_000_000))}>Randomize</Button>
      </div>

      <div className="mt-4">
        <TavernCard tavern={tavern} />
      </div>
    </div>
  );
}

function TavernCard({ tavern }: any) {
  let owner = npc_generator({}, stringToSeed(tavern.name_));
  owner = { ...owner, label: owner.name_ };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tavern.name}</CardTitle>
        <CardDescription>{tavern.short}</CardDescription>
      </CardHeader>
      <CardContent>
        <EntitySection entity={tavern} section="description" />
        <LinkedSection entities={[owner]} label="owner" />
        <EntitySection entity={tavern} section="menu" />
        <EntitySection entity={tavern} section="rumors" />
      </CardContent>
    </Card>
  );
}
