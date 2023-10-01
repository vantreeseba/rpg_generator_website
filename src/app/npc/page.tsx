import npc_generator from '../../lib/generators/npc.js';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

import Section from '@/components/section';

export default function NPC() {
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
  return (
    <Card>
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
