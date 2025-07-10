'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar/Navbar';
import AdminSidebar from './components/AdminSidebar';
import RibbonWrapper from '@/components/RibbonWrapper';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handle authentication
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!isAuthenticated || !user?.isAdmin) {
      router.push('/login');
      return;
    }
    
    setIsMounted(true);
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
      
      <Navbar className="mt-2" />
      <div className="flex pt-20">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] fixed overflow-y-auto">
          <AdminSidebar />
        </div>

        {/* Mobile Sidebar Toggle */}
        <button
          type="button"
          className="fixed z-40 p-2 text-gray-500 bg-white rounded-md md:hidden bottom-4 left-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <div 
          className={`fixed inset-y-16 left-0 z-40 w-64 bg-white transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:hidden`}
        >
          <AdminSidebar onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}