import { Link } from '@tanstack/react-router';
import { CollapsibleDivider } from './divider';

type LinkedEntity = {
  label: string;
  short: string;
  type?: string;
  memory: object;
};

type LinkedSectionProps = {
  entities: Array<LinkedEntity>;
  label: string;
  path: string;
};

export default function LinkedSection({ entities, label, path }: LinkedSectionProps) {
  if (entities.length === 0) return null;

  const value = entities.map((x, i) => (
    <div key={i}>
      <Link
        to={`/${path}` as any}
        search={x.memory as any}
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        {x.label}
      </Link>
      , {x.short}
    </div>
  ));

  return <CollapsibleDivider label={label}>{value}</CollapsibleDivider>;
}
