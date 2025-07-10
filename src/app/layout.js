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

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  preload: true,
});

function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Ribbon - fixed at the very top */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-2">
        <RibbonWrapper />
      </div>
      
      {/* Navbar - positioned below the ribbon */}
      <div className="fixed top-2 left-0 right-0 z-50">
        <Navbar />
      </div>
      
      {/* Main content - pushed down by fixed header */}
      <main className="flex-grow pt-24">
        {children}
      </main>
      
      <Footer />
      <FloatingHelp />
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      className={`${roboto.variable} font-sans`}
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />
        <title>Square Computers</title>
        <meta name="description" content="Your trusted technology partner since 2006" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <meta name="theme-color" content="#ffffff" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/_next/static/css/app/layout.css" as="style" />
        <link
          rel="preload"
          href="/_next/static/media/roboto-latin-300-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/roboto-latin-400-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/roboto-latin-500-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/roboto-latin-700-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Preload critical CSS */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Critical CSS */
              body { 
                font-family: ${roboto.style.fontFamily}, sans-serif; 
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                text-rendering: optimizeLegibility;
              }
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased text-gray-800 bg-white touch-manipulation">
        <MenuProvider>
          <Suspense fallback={<div className="min-h-screen"></div>}>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </Suspense>
        </MenuProvider>
      </body>
    </html>
  );
}