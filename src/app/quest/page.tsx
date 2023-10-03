'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import EntitySection from '@/components/entity-section';

import quest_generator from '../../lib/generators/quest.js';
import { useUrlSeed } from '@/hooks/useUrlSeed';

export default function deity() {
  const [seed, setSeed] = useUrlSeed();
  let quest = quest_generator(seed);

  return (
    <div>
      <div className="flex w-full max-w-sm items-end space-x-2">
        <div>
          <Label htmlFor={'seed'}>seed</Label>
          <Input type="number" value={seed} onChange={(ev) => setSeed(parseInt(ev.target.value))} />
        </div>
        <Button onClick={() => setSeed(Math.floor(Math.random() * 1000000))}>Randomize</Button>
      </div>

      <QuestCard quest={quest} className="mt-4" />
    </div>
  );
}

function QuestCard({ quest, ...props }: any) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>{quest.title}</CardTitle>
        <CardDescription>{quest.short}</CardDescription>
      </CardHeader>
      <CardContent>
        <EntitySection entity={quest} section="item" />
        <EntitySection entity={quest} section="hook" />
      </CardContent>
    </Card>
  );
}
