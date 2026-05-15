import { Outlet } from '@tanstack/react-router';
import Sidebar from '@/components/sidebar';

const sections = [
  {
    title: '',
    links: [{ label: 'Home', path: '/' }],
  },
  {
    title: 'Generators',
    links: [
      { label: 'character', path: '/character' },
      { label: 'deity', path: '/deity' },
      { label: 'trinket', path: '/trinket' },
      { label: 'quest', path: '/quest' },
    ],
  },
  {
    title: 'Business/Place',
    links: [
      { label: 'locality', path: '/locality' },
      { label: 'tavern', path: '/tavern' },
    ],
  },
];

export default function Layout() {
  return (
    <div className="grid grid-cols-[200px_1fr] gap-4" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Sidebar sections={sections} />
      <div className="mr-5">
        <Outlet />
      </div>
    </div>
  );
}
