import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/Footer';
import FloatingHelp from '@/components/FloatingHelp';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Square Computers',
  description: 'Your trusted technology partner since 2006',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
        <FloatingHelp />
      </body>
    </html>
  );
}