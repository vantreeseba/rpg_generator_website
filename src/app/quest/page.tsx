'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Section from '@/components/section';

import quest_generator from '../../lib/generators/quest.js';

export default function deity() {
  const [seed, setSeed] = useState<number>(0);

  let quests = [];
  for (var i = 0; i < 6; i++) {
    quests.push(quest_generator(seed + i));
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
        {quests.map(toQuestCard)}
      </div>
    </div>
  );
}

function toQuestCard(quest: any, index: number) {
  const title = quest.title.split('\n').map((x: any) => <div key={x}>{x}</div>);
  const short = quest.short.split('\n').map((x: any) => <div key={x}>{x}</div>);

  return (
    <Card key={`quest_${index}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{short}</CardDescription>
      </CardHeader>
      <CardContent>
        <Section entity={quest} section="item" />
        <Section entity={quest} section="hook" />
      </CardContent>
    </Card>
  );
}
