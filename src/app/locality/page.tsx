'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import EntitySection from '@/components/entity-section';

import locality_generator from '../../lib/generators/locality.js';
import { useUrlSeed } from '@/hooks/useUrlSeed';
import { randomInt } from '@/lib/utils';

export default function Locality() {
  const [seed, setSeed] = useUrlSeed();

  const locality = locality_generator(seed);

  return (
    <div>
      <div className="flex w-full max-w-sm items-end space-x-2">
        <div>
          <Label htmlFor={'seed'}>seed</Label>
          <Input
            id="seed"
            type="number"
            value={seed}
            onChange={(ev) => setSeed(parseInt(ev.target.value))}
          />
        </div>
        <Button onClick={() => setSeed(randomInt(1_000_000))}>Randomize</Button>
      </div>
      <LocalityCard locality={locality} className="mt-4" />
    </div>
  );
}

type LocalityCardProps = {
  locality: any;
  className: string;
};

function LocalityCard({ locality, ...props }: LocalityCardProps) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>{locality.short}</CardTitle>
        <CardDescription>{locality.short}</CardDescription>
      </CardHeader>
      <CardContent>
        <EntitySection entity={locality} section="population" />
        <EntitySection entity={locality} section="government" />
        <EntitySection entity={locality} section="leaders" />
        <EntitySection entity={locality} section="workers" />
      </CardContent>
    </Card>
  );
}
