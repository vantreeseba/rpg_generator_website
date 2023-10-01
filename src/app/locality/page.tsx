import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

import locality_generator from '../../lib/generators/locality.js';
import Section from '@/components/section';

export default function Locality() {
  const localitys = [];
  for (var i = 0; i < 4; i++) {
    localitys.push(locality_generator());
  }

  return (
    <div>
      <div className="grid gap-4 mt-4 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
        {localitys.map(toLocalityCard)}
      </div>
    </div>
  );
}

function toLocalityCard(locality: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{locality.short}</CardTitle>
        <CardDescription>{locality.short}</CardDescription>
      </CardHeader>
      <CardContent>
        <Section entity={locality} section="population" />
        <Section entity={locality} section="government" />
        <Section entity={locality} section="leaders" />
        <Section entity={locality} section="workers" />
      </CardContent>
    </Card>
  );
}
