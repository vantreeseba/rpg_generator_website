'use client';

import diety_generator from '../../generators/god.js';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

import { CollapsibleDivider } from '@/components/divider';

import { useRouter } from 'next/navigation';

export default function diety() {
  const router = useRouter();
  const dieties = [];
  for (var i = 0; i < 8; i++) {
    dieties.push(diety_generator());
  }

  return (
    <div>
      <Button variant="secondary" onClick={() => router.refresh()}>
        Regenerate Dieties
      </Button>
      <div className="grid gap-4 mt-4 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
        {dieties.map(toDietyCard)}
      </div>
    </div>
  );
}

function toDietyCard(diety: any) {
  //   const desc = diety.description.split('\n').map((x: any) => <div key={x}>{x}</div>);
  const appearance = diety.appearance.split('\n').map((x: any) => <div key={x}>{x}</div>);
  const planar_home = diety.planar_home.split('\n').map((x: any) => <div key={x}>{x}</div>);
  const followers = diety.followers.split('\n').map((x: any) => <div key={x}>{x}</div>);
  const worshippers = diety.worshippers.split('\n').map((x: any) => <div key={x}>{x}</div>);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{diety.name_}</CardTitle>
        <CardDescription>{diety.short}</CardDescription>
      </CardHeader>
      <CardContent>
        <CollapsibleDivider label="Appearance">{appearance}</CollapsibleDivider>
        <CollapsibleDivider label="Planar Home">{planar_home}</CollapsibleDivider>
        <CollapsibleDivider label="Followers">{followers}</CollapsibleDivider>
        <CollapsibleDivider label="Worshippers">{worshippers}</CollapsibleDivider>
      </CardContent>
    </Card>
  );
}
