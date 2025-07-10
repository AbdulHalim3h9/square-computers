'use client';

import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';
import FloatingHelp from '@/components/FloatingHelp';
import RibbonWrapper from '@/components/RibbonWrapper';
import { MenuProvider } from '@/components/navbar/MenuContext';

const inter = Inter({ subsets: ['latin'] });

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
    <>
      <RibbonWrapper />
      <div className="relative">
        <Navbar className="!pt-0" />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <FloatingHelp />
      </div>
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Square Computers</title>
        <meta name="description" content="Your trusted technology partner since 2006" />
      </head>
      <body className={`${inter.className} relative`}>
        <MenuProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </MenuProvider>
      </body>
    </html>
  );
}