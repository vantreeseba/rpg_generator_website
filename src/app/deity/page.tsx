'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Section from '@/components/section';

import deity_generator from '../../lib/generators/god.js';
import { useUrlSeed } from '@/hooks/useUrlSeed';

export default function deity() {
  const [seed, setSeed] = useUrlSeed();

  let deities = [];
  for (var i = 0; i < 6; i++) {
    deities.push(deity_generator(seed + i));
  }

  deities = deities.filter((x) => x.name_);

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
        {deities.map(todeityCard)}
      </div>
    </div>
  );
}

function todeityCard(deity: any, index: number) {
  return (
    <Card key={`deity_${deity.name_}_${index}`}>
      <CardHeader>
        <CardTitle>{deity.name_}</CardTitle>
        <CardDescription>{deity.short}</CardDescription>
      </CardHeader>
      <CardContent>
        <Section entity={deity} section="appearance" />
        <Section entity={deity} section="planar_home" />
        <Section entity={deity} section="followers" />
        <Section entity={deity} section="worshippers" />
      </CardContent>
    </Card>
  );
}
