'use client';

import { Button } from './ui/button';
import Link from 'next/link';

interface SidebarProps {
  sections: Array<SidebarSectionProps>;
}

interface SidebarSectionProps {
  title: string;
  links: Array<any>;
}

export default function Sidebar({ sections }: SidebarProps) {
  return (
    <aside style={{ height: '100%', display: 'inline-block' }}>
      {sections.map((x) => (
        <SidebarSection key={`sidebar_section_${x.title}`} {...x} />
      ))}
    </aside>
  );
}

function SidebarSection({ title, links = [] }: SidebarSectionProps) {
  const buttons = links.map((link) => {
    return (
      <Link href={link.path} key={`link_${link.label}`}>
        <Button variant="ghost" className="w-full justify-start">
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
