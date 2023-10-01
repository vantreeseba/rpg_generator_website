import trinket_generator from '../../lib/generators/trinket.js';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

import Section from '@/components/section';

export default function deity() {
  let trinkets = [];
  for (var i = 0; i < 6; i++) {
    trinkets.push(trinket_generator());
  }

  return (
    <div>
      <div className="grid gap-4 mt-4 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
        {trinkets.map(totrinketCard)}
      </div>
    </div>
  );
}

function totrinketCard(trinket: any) {
  const title = trinket.title.split('\n').map((x: any) => <div key={x}>{x}</div>);
  const short = trinket.short.split('\n').map((x: any) => <div key={x}>{x}</div>);

  return (
    <Card key={`trinket_{trinket.short}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{short}</CardDescription>
      </CardHeader>
      <CardContent>
        <Section entity={trinket} section="item" />
        <Section entity={trinket} section="hook" />
      </CardContent>
    </Card>
  );
}
