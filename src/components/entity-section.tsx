import { CollapsibleDivider } from './divider';

function toLines(x: any, i: number) {
  return <div key={`${i}`}>{x}</div>;
}

export default function EntitySection({ entity, section }: { entity: any; section: string }) {
  if (!entity[section]?.length) {
    return null;
  }
  return (
    <CollapsibleDivider label={section}>
      {entity[section].split('\n').map(toLines)}
    </CollapsibleDivider>
  );
}
