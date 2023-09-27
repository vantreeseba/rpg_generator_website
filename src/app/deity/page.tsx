'use client';

import deity_generator from '../../generators/god.js';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

import { CollapsibleDivider } from '@/components/divider';

import { useRouter } from 'next/navigation';

export default function deity() {
  const router = useRouter();
  let deities = [];
  for (var i = 0; i < 6; i++) {
    deities.push(deity_generator());
  }

  deities = deities.filter((x) => x.name_);

  return (
    <div>
      <div className="grid gap-4 mt-4 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
        {deities.map(todeityCard)}
      </div>
    </div>
  );
}

function todeityCard(deity: any) {
  const appearance = deity.appearance.split('\n').map((x: any) => <div key={x}>{x}</div>);
  const planar_home = deity.planar_home.split('\n').map((x: any) => <div key={x}>{x}</div>);
  const followers = deity.followers.split('\n').map((x: any) => <div key={x}>{x}</div>);
  const worshippers = deity.worshippers.split('\n').map((x: any) => <div key={x}>{x}</div>);

  return (
    <Card key={`deity_${deity.name_}`}>
      <CardHeader>
        <CardTitle>{deity.name_}</CardTitle>
        <CardDescription>{deity.short}</CardDescription>
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
