import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { BackgroundBeams } from '@/components/BackgroundBeams';
import Navbar from '@/components/Navbar';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TransformBookmark',
  description: 'Convert your bookmarks to JSON, Excel, PDF.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark min-h-screen bg-background text-foreground`}>
        <Navbar />
        {children}
        {/* <BackgroundBeams /> */}
      </body>
    </html>
  );
}
