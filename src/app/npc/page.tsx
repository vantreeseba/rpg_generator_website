'use client';

import npc_generator from '../../generators/npc.js';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

import { CollapsibleDivider } from '@/components/divider';

import { useRouter } from 'next/navigation';

export default function NPC() {
  const router = useRouter();
  const npcs = [];
  for (var i = 0; i < 6; i++) {
    npcs.push(npc_generator());
  }

  return (
    <div>
      <div className="grid gap-4 mt-4 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
        {npcs.map(toNpcCard)}
      </div>
    </div>
  );
}

function toNpcCard(npc: any) {
  const clothes = npc.clothes.split('\n').map((x: any) => <li key={x}>{x}</li>);
  const history = npc.history.split('\n').map((x: any) => <div key={x}>{x}</div>);
  const parents = npc.parents.split('\n').map((x: any) => <div key={x}>{x}</div>);
  const siblings = npc.siblings.split('\n').map((x: any) => <div key={x}>{x}</div>);
  const likes = npc.likes.split('\n').map((x: any) => <div key={x}>{x}</div>);
  const traits = npc.traits.split('\n').map((x: any) => <div key={x}>{x}</div>);
  const goals = npc.goals.split('\n').map((x: any) => <div key={x}>{x}</div>);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{npc.name_}</CardTitle>
        <CardDescription>{npc.short}</CardDescription>
      </CardHeader>
      <CardContent>
        <CollapsibleDivider label="history">{history}</CollapsibleDivider>
        <CollapsibleDivider label="parents">{parents}</CollapsibleDivider>
        {siblings.count > 0 ? (
          <CollapsibleDivider label="siblings">{siblings}</CollapsibleDivider>
        ) : null}
        <CollapsibleDivider label="likes">{likes}</CollapsibleDivider>
        <CollapsibleDivider label="traits">{traits}</CollapsibleDivider>
        <CollapsibleDivider label="goals">{goals}</CollapsibleDivider>
        <CollapsibleDivider label="clothes">{clothes}</CollapsibleDivider>
      </CardContent>
    </Card>
  );
}
