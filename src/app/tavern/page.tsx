import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { CollapsibleDivider } from '@/components/divider';

import tavern_generator from '../../lib/generators/tavern.js';
import Section from '@/components/section';

export default function Tavern() {
  const taverns = [];
  for (var i = 0; i < 6; i++) {
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>{tavern.name}</CardTitle>
        <CardDescription>{tavern.short}</CardDescription>
      </CardHeader>
      <CardContent>
        <Section entity={tavern} section="description" />
        <Section entity={tavern} section="owner" />
        <Section entity={tavern} section="menu" />
        <Section entity={tavern} section="rumors" />
      </CardContent>
    </Card>
  );
}
