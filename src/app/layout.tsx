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
        path: '/character?seed=0',
      },
      {
        label: 'deity',
        path: '/deity?seed=0',
      },
      {
        label: 'trinket',
        path: '/trinket?seed=0',
      },
      {
        label: 'quest',
        path: '/quest?seed=0',
      },
    ],
  },
  {
    title: 'Business/Place',
    links: [
      {
        label: 'locality',
        path: '/locality?seed=0',
      },
      {
        label: 'tavern',
        path: '/tavern?seed=0',
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
        <div className="mr-5">{children}</div>
      </body>
    </html>
  );
}
