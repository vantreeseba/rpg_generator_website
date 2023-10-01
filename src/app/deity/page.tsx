import deity_generator from '../../lib/generators/god.js';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

import Section from '@/components/section';

export default function deity() {
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
  return (
    <Card key={`deity_${deity.name_}`}>
      <CardHeader>
        <CardTitle>{deity.name_}</CardTitle>
        <CardDescription>{deity.short}</CardDescription>
      </CardHeader>
      <CardContent>
        <Section entity={deity} section="appearance" />
        <Section entity={deity} section="planar_home" />
        <Section entity={deity} section="followers" />
        <Section entity={deity} section="worshippers" />
      </CardContent>
    </Card>
  );
}
