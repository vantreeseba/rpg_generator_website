'use client';

import React from 'react';
import npc_generator from '../../generators/npc.js';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';

import { useRouter } from 'next/navigation';

export default function NPC() {
  const router = useRouter();
  const npcs = [];
  for (var i = 0; i < 8; i++) {
    npcs.push(npc_generator());
  }

  return (
    <div>
      <Button variant="secondary" onClick={() => router.refresh()}>
        Regenerate NPCs
      </Button>
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

function CollapsibleDivider({ label, children }: any) {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Divider>{label}</Divider>
      </CollapsibleTrigger>
      <CollapsibleContent className="text-sm">{children}</CollapsibleContent>
    </Collapsible>
  );
}

function Divider({ content, children, onClick }: any) {
  return (
    <Button variant="none" className="relative w-full" onClick={onClick}>
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">{content ?? children}</span>
      </div>
    </Button>
  );
}
