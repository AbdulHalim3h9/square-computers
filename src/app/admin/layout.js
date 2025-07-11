'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar/Navbar';
import AdminSidebar from './components/AdminSidebar';
import RibbonWrapper from '@/components/RibbonWrapper';
import { MenuProvider, useMenuContext } from '@/components/navbar/MenuContext';
import { Menu as FiMenu } from 'lucide-react';
import Button from '@/components/ui/Button';
import clsx from 'clsx';

function AdminLayoutContent({ children }) {
  const { isSidebarCollapsed, toggleSidebar } = useMenuContext();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // Handle authentication
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      if (!isAuthenticated || !user?.isAdmin) {
        router.push('/login');
        return;
      }
      setIsMounted(true);
    } catch (error) {
      console.error('Error during authentication check:', error);
      router.push('/login');
    }
  }, [router]);

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Ribbon - fixed at the very top */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-2">
        <RibbonWrapper />
      </div>
      
      {/* Navbar */}
      <div className="fixed top-2 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Sidebar and Main Content */}
      <div className="flex pt-20">
        {/* Sidebar */}
        <div
          className={clsx(
            'bg-white border-r border-gray-200 h-[calc(100vh-5rem)] fixed overflow-y-auto transition-all duration-300 ease-in-out mt-2 z-30',
            'w-16',
            !isSidebarCollapsed && 'w-64'
          )}
        >
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <main
          className={clsx(
            'flex-1 transition-all duration-300 w-full min-h-[calc(100vh-5rem)]',
            'p-2 sm:p-4 md:p-6',
            isSidebarCollapsed ? 'ml-16' : 'ml-64'
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }) {
  return (
    <MenuProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </MenuProvider>
  );
}