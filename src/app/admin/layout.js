'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from './components/AdminSidebar';
import Navbar from '@/components/navbar/Navbar';

function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
      
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 1024);
      };

      checkIfMobile();
      window.addEventListener('resize', checkIfMobile);
      return () => window.removeEventListener('resize', checkIfMobile);
    }
  }, []);

  return { isMobile, isMounted };
}

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const { isMobile, isMounted } = useMobileDetection();

  // Handle authentication and initial sidebar state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check authentication
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      // Set initial sidebar state based on screen size
      setIsSidebarOpen(window.innerWidth >= 1024);

      // Redirect if not authenticated or not admin
      if (!isAuthenticated || !user?.isAdmin) {
        console.log('Not authenticated, redirecting to login...');
        router.push('/auth/login');
      } else {
        console.log('User is authenticated:', { isAuthenticated, user });
      }
    }
  }, [router]);

  // Handle sidebar toggle event from AdminSidebar
  useEffect(() => {
    const handleToggleSidebar = () => {
      setIsSidebarOpen(true);
    };

    document.addEventListener('toggleSidebar', handleToggleSidebar);
    return () => {
      document.removeEventListener('toggleSidebar', handleToggleSidebar);
    };
  }, []);

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar - Always visible */}
      <div className="hidden lg:block h-screen sticky top-0">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar Toggle Button - Only show when sidebar is closed */}
      {!isSidebarOpen && (
        <button 
          className="fixed bottom-6 left-4 z-50 p-3 bg-white rounded-full shadow-lg lg:hidden"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open menu"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:hidden`}
      >
        <AdminSidebar isExpanded={true} onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className={`flex-1 min-w-0 transition-all duration-300`}>
        <main className="min-h-screen pt-16">
          <div className="p-4 sm:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}