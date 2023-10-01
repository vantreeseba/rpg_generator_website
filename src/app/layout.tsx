import Sidebar from '@/components/sidebar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RPG Generators',
  description: '',
};

const sections = [
  {
    title: '',
    links: [
      {
        label: 'Home',
        path: '/',
      },
    ],
  },

  {
    title: 'Generators',
    links: [
      {
        label: 'character',
        path: '/character',
      },
      {
        label: 'npc',
        path: '/npc',
      },
      {
        label: 'deity',
        path: '/deity',
      },
      {
        label: 'quest',
        path: '/quest',
      },
    ],
  },
  {
    title: 'Business/Place',
    links: [
      {
        label: 'locality',
        path: '/locality',
      },
      {
        label: 'tavern',
        path: '/tavern',
      },
    ],
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const className = `${inter.className} grid grid-cols-[200px_1fr] gap-4`;

  return (
    <html lang="en">
      <body className={className}>
        <Sidebar sections={sections} />
        {children}
      </body>
    </html>
  );
}
