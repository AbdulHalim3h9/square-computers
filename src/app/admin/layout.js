'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import Navbar from '@/components/navbar/Navbar';

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);

      // Check authentication
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      // Check if mobile
      const checkIfMobile = () => {
        const mobile = window.innerWidth < 1024;
        setIsMobile(mobile);
        setIsSidebarOpen(!mobile); // Sidebar open by default on desktop, closed on mobile
      };

      checkIfMobile();
      window.addEventListener('resize', checkIfMobile);

      // Redirect if not authenticated or not admin
      if (!isAuthenticated || !user?.isAdmin) {
        console.log('Not authenticated, redirecting to login...');
        router.push('/auth/login');
      } else {
        console.log('User is authenticated:', { isAuthenticated, user });
      }

      return () => {
        window.removeEventListener('resize', checkIfMobile);
      };
    }
  }, [router]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16">
        <Navbar />
      </div>

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } z-40 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] ${
            !isSidebarOpen ? 'lg:hidden' : ''
          }`}
        >
          <AdminSidebar onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* Main content area */}
        <div className={`flex-1 flex flex-col transition-all duration-300`}>
          {/* Admin header */}
          <div className="sticky top-16 z-30 bg-white shadow-sm h-16">
            <AdminHeader onToggleSidebar={toggleSidebar} />
          </div>

          {/* Main content */}
          <main className="flex-1 bg-gray-50 overflow-y-auto p-4 md:p-6" style={{ minHeight: 'calc(100vh - 128px)' }}>
            {children}
          </main>

          {/* Overlay for mobile */}
          {isSidebarOpen && isMobile && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
              style={{ top: '64px' }}
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
}