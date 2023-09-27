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
    title: 'Generators',
    links: [
      //       {
      //         label: 'home',
      //         path: '/',
      //       },
      //       {
      //         label: 'test',
      //         path: '/test',
      //       },
      {
        label: 'npc',
        path: '/npc',
      },
      {
        label: 'diety',
        path: '/diety',
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
