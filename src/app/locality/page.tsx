'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Section from '@/components/section';

import locality_generator from '../../lib/generators/locality.js';
import { useUrlSeed } from '@/hooks/useUrlSeed';

export default function Locality() {
  const [seed, setSeed] = useUrlSeed();

  const localitys = [];
  for (var i = 0; i < 4; i++) {
    localitys.push(locality_generator(seed + i));
  }

  return (
    <div>
      <div className="flex w-full max-w-sm items-end space-x-2">
        <div>
          <Label htmlFor={'seed'}>seed</Label>
          <Input type="number" value={seed} onChange={(ev) => setSeed(parseInt(ev.target.value))} />
        </div>
        <Button onClick={() => setSeed(Math.floor(Math.random() * 1000000))}>Randomize</Button>
      </div>

      <div className="grid gap-4 mt-4 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
        {localitys.map(toLocalityCard)}
      </div>
    </div>
  );
}

function toLocalityCard(locality: any, index: number) {
  return (
    <Card key={index}>
      <CardHeader>
        <CardTitle>{locality.short}</CardTitle>
        <CardDescription>{locality.short}</CardDescription>
      </CardHeader>
      <CardContent>
        <Section entity={locality} section="population" />
        <Section entity={locality} section="government" />
        <Section entity={locality} section="leaders" />
        <Section entity={locality} section="workers" />
      </CardContent>
    </Card>
  );
}
