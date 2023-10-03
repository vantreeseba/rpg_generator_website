'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import EntitySection from '@/components/entity-section';

import deity_generator from '../../lib/generators/god.js';
import { useUrlSeed } from '@/hooks/useUrlSeed';

export default function deity() {
  const [seed, setSeed] = useUrlSeed();

  let deity = deity_generator(seed);

  return (
    <div>
      <div className="flex w-full max-w-sm items-end space-x-2">
        <div>
          <Label htmlFor={'seed'}>seed</Label>
          <Input type="number" value={seed} onChange={(ev) => setSeed(parseInt(ev.target.value))} />
        </div>
        <Button onClick={() => setSeed(Math.floor(Math.random() * 1000000))}>Randomize</Button>
      </div>
      <DeityCard deity={deity} className="mt-5" />
    </div>
  );
}

function DeityCard({ deity, ...props }: any) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>{deity.name_}</CardTitle>
        <CardDescription>{deity.short}</CardDescription>
      </CardHeader>
      <CardContent>
        <EntitySection entity={deity} section="appearance" />
        <EntitySection entity={deity} section="planar_home" />
        <EntitySection entity={deity} section="followers" />
        <EntitySection entity={deity} section="worshippers" />
      </CardContent>
    </Card>
  );
}
