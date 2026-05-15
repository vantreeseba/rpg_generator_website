import { Link, useRouterState } from '@tanstack/react-router';
import { Button } from './ui/button';

interface SidebarProps {
  sections: Array<SidebarSectionProps>;
}

interface SidebarSectionProps {
  title: string;
  links: Array<{ label: string; path: string }>;
}

export default function Sidebar({ sections }: SidebarProps) {
  return (
    <aside style={{ height: '100%', display: 'inline-block' }} className="pl-4">
      {sections.map((x) => (
        <SidebarSection key={`sidebar_section_${x.title}`} {...x} />
      ))}
    </aside>
  );
}

function SidebarSection({ title, links = [] }: SidebarSectionProps) {
  const { location } = useRouterState();

  const buttons = links.map((link) => {
    const isCurrent = location.pathname === link.path;
    return (
      <Link key={`sidebar_section_link_${link.path}`} to={link.path as any}>
        <Button variant={isCurrent ? 'outline' : 'ghost'} className="w-full justify-start">
          {link.label}
        </Button>
      </Link>
    );
  });

  return (
    <>
      <h2 className="mb-2 mt-4 px-4 text-lg font-semibold tracking-tight">{title}</h2>
      {buttons}
    </>
  );
}
