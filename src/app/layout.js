import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';
import FloatingHelp from '@/components/FloatingHelp';
import RibbonWrapper from '@/components/RibbonWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Square Computers',
  description: 'Your trusted technology partner since 2006',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative`}>
        <RibbonWrapper />
        <div className="relative">
          <Navbar className="!pt-0" />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <FloatingHelp />
        </div>
      </body>
    </html>
  );
}