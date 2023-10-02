'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Section from '@/components/section';

import { useUrlSeed } from '@/hooks/useUrlSeed';
import tavern_generator from '../../lib/generators/tavern.js';

export default function Tavern() {
  const [seed, setSeed] = useUrlSeed();

  const taverns = [];
  for (var i = 0; i < 6; i++) {
    taverns.push(tavern_generator(seed + i));
  }

  return (
    <div>
      <div className="flex w-full max-w-sm items-end space-x-2">
        <div>
          <Label htmlFor={'seed'}>seed</Label>
          <Input type="number" value={seed} onChange={(ev) => setSeed(ev.target.value)} />
        </div>
        <Button onClick={() => setSeed(Math.floor(Math.random() * 1_000_000))}>Randomize</Button>
      </div>

      <div className="grid gap-4 mt-4 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
        {taverns.map(toTavernCard)}
      </div>
    </div>
  );
}

function toTavernCard(tavern: any, index: number) {
  return (
    <Card key={`tavern_${index}`}>
      <CardHeader>
        <CardTitle>{tavern.name}</CardTitle>
        <CardDescription>{tavern.short}</CardDescription>
      </CardHeader>
      <CardContent>
        <Section entity={tavern} section="description" />
        <Section entity={tavern} section="owner" />
        <Section entity={tavern} section="menu" />
        <Section entity={tavern} section="rumors" />
      </CardContent>
    </Card>
  );
}
