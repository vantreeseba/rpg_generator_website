'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Section from '@/components/section';

import trinket_generator from '../../lib/generators/trinket.js';
import { useUrlSeed } from '@/hooks/useUrlSeed';

export default function deity() {
  const [seed, setSeed] = useUrlSeed();

  let trinkets = [];
  for (var i = 0; i < 6; i++) {
    trinkets.push(trinket_generator(seed + i));
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
        {trinkets.map(toTrinketCard)}
      </div>
    </div>
  );
}

function toTrinketCard(trinket: any, index: number) {
  const title = trinket.title.split('\n').map((x: any) => <div key={x}>{x}</div>);

  return (
    <Card key={`trinket_${index}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Section entity={trinket} section="short" />
      </CardContent>
    </Card>
  );
}
