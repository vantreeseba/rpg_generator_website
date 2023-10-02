'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Section from '@/components/section';

import npc_generator from '../../lib/generators/npc.js';

export default function NPC() {
  const [seed, setSeed] = useState<number>(0);

  const npcs = [];
  for (var i = 0; i < 6; i++) {
    npcs.push(npc_generator(seed + i));
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
        {npcs.map(toNpcCard)}
      </div>
    </div>
  );
}

function toNpcCard(npc: any, index: number) {
  return (
    <Card key={`npc_${index}`}>
      <CardHeader>
        <CardTitle>{npc.name_}</CardTitle>
        <CardDescription>{npc.short}</CardDescription>
      </CardHeader>
      <CardContent>
        <Section entity={npc} section="clothes" />
        <Section entity={npc} section="history" />
        <Section entity={npc} section="parents" />
        <Section entity={npc} section="siblings" />
        <Section entity={npc} section="likes" />
        <Section entity={npc} section="traits" />
        <Section entity={npc} section="goals" />
      </CardContent>
    </Card>
  );
}
