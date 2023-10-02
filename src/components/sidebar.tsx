'use client';

import { Button } from './ui/button';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

interface SidebarProps {
  sections: Array<SidebarSectionProps>;
}

interface SidebarSectionProps {
  title: string;
  links: Array<any>;
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
  const router = useRouter();
  const pathname = usePathname();

  const buttons = links.map((link) => {
    const isCurrent = link.path == pathname;
    return (
      <Button
        key={`sidebar_section_link_${link.path}`}
        variant={isCurrent ? 'outline' : 'ghost'}
        className="w-full justify-start"
        onClick={() => router.push(link.path)}
      >
        {link.label}
      </Button>
    );
  });

  return (
    <>
      <h2 className="mb-2 mt-4 px-4 text-lg font-semibold tracking-tight">{title}</h2>
      {buttons}
    </>
  );
}
