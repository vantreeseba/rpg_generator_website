'use client';

import tavern_generator from '../../generators/tavern.js';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

import { CollapsibleDivider } from '@/components/divider';

import { useRouter } from 'next/navigation';

export default function Tavern() {
  const router = useRouter();
  const taverns = [];
  for (var i = 0; i < 4; i++) {
    taverns.push(tavern_generator());
  }

  return (
    <div>
      <div className="grid gap-4 mt-4 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
        {taverns.map(toTavernCard)}
      </div>
    </div>
  );
}

function toTavernCard(tavern: any) {
  const description = tavern.description.split('\n').map((x: any) => <div key={x}>{x}</div>);
  const owner = tavern.owner.split('\n').map((x: any) => <div key={x}>{x}</div>);
  const menu = tavern.menu.split('\n').map((x: any) => <div key={x}>{x}</div>);
  const rumors = tavern.rumors.split('\n').map((x: any) => <div key={x}>{x}</div>);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tavern.name_}</CardTitle>
        <CardDescription>{tavern.short}</CardDescription>
      </CardHeader>
      <CardContent>
        <CollapsibleDivider label="Description">{description}</CollapsibleDivider>
        <CollapsibleDivider label="Owner">{owner}</CollapsibleDivider>
        <CollapsibleDivider label="Menu">{menu}</CollapsibleDivider>
        <CollapsibleDivider label="Rumors">{rumors}</CollapsibleDivider>
      </CardContent>
    </Card>
  );
}
