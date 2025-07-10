'use client';

import { Suspense } from 'react';
import { Inter, Roboto } from 'next/font/google';
import { usePathname } from 'next/navigation';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';
import FloatingHelp from '@/components/FloatingHelp';
import RibbonWrapper from '@/components/RibbonWrapper';
import { MenuProvider } from '@/components/navbar/MenuContext';
import { SearchProvider } from '@/contexts/SearchContext';

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
    <div className={`${inter.variable} ${roboto.variable} font-sans min-h-screen flex flex-col`}>
      {/* Ribbon - fixed at the very top */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-2">
        <RibbonWrapper />
      </div>
      
      {/* Navbar - positioned below the ribbon */}
      <div className="fixed top-2 left-0 right-0 z-50">
        <Navbar />
      </div>
      
      {/* Main content - pushed down by fixed header */}
      <main className="flex-grow pt-22">
        {children}
      </main>
      
      <Footer />
      <FloatingHelp />
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Square Computers - Your trusted IT solutions provider" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
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
