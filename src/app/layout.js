'use client';

import { Suspense } from 'react';
import { Inter, Roboto } from 'next/font/google';
import localFont from 'next/font/local';
import { usePathname } from 'next/navigation';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';
import FloatingHelp from '@/components/FloatingHelp';
import RibbonWrapper from '@/components/RibbonWrapper';
import { MenuProvider } from '@/components/navbar/MenuContext';
import { SearchProvider } from '@/contexts/SearchContext';
// Load Siyam Rupali font
const siyamRupali = localFont({
  src: [
    {
      path: '../../public/fonts/Siyamrupali.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Siyam Rupali ANSI.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-siyam-rupali',
  display: 'swap',
});

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  preload: true,
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className={`${inter.variable} ${roboto.variable} font-sans`}>
      {/* Ribbon - takes its own space */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-1">
        <RibbonWrapper />
      </div>
      
      {/* Navbar - takes its own space */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      
      {/* Main content */}
      <div>
        {children}
      </div>
      
      <FloatingHelp />
      <Footer />
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Square Computers - Your trusted IT solutions provider" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} ${siyamRupali.variable} font-sans`}>
        <Suspense fallback={<div>লোড হচ্ছে...</div>}>
          <SearchProvider>
            <MenuProvider>
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
            </MenuProvider>
          </SearchProvider>
        </Suspense>
      </body>
    </html>
  );
}
