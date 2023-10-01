import quest_generator from '../../lib/generators/quest.js';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

import Section from '@/components/section';

export default function deity() {
  let quests = [];
  for (var i = 0; i < 6; i++) {
    quests.push(quest_generator());
  }

  return (
    <div>
      <div className="grid gap-4 mt-4 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
        {quests.map(toQuestCard)}
      </div>
    </div>
  );
}

function toQuestCard(quest: any) {
  const title = quest.title.split('\n').map((x: any) => <div key={x}>{x}</div>);
  const short = quest.short.split('\n').map((x: any) => <div key={x}>{x}</div>);

  return (
    <Card key={`quest_{quest.short}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{short}</CardDescription>
      </CardHeader>
      <CardContent>
        <Section entity={quest} section="item" />
        <Section entity={quest} section="hook" />
      </CardContent>
    </Card>
  );
}
