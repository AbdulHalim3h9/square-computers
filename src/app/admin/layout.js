'use client';

import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { MenuProvider, useMenuContext } from '@/components/navbar/MenuContext';
import clsx from 'clsx';

// Import AdminSidebar directly for now to fix the dynamic import issue
import AdminSidebar from './components/AdminSidebar';

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

function AdminLayoutContent({ children }) {
  const router = useRouter();
  const { isMobile, isMounted } = useMobileDetection();
  const {
    isSidebarOpen,
    toggleSidebarMobile,
    isSidebarCollapsed,
    closeAllMenus,
  } = useMenuContext();

  // Handle authentication
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // Redirect if not authenticated or not admin
    if (!isAuthenticated || !user?.isAdmin) {
      router.push('/login');
      return;
    }
  }, [router]);

  // Track if user has manually toggled the sidebar
  const userToggledRef = useRef(false);

  // Handle initial sidebar state and responsive behavior
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const isLargeScreen = window.innerWidth >= 1024;
      
      // Only auto-close on mobile when resizing to desktop if user hasn't manually toggled
      if (isLargeScreen && !userToggledRef.current) {
        toggleSidebarMobile(false);
      }
    };

    // Set initial state on mount
    if (!userToggledRef.current) {
      const isLargeScreen = window.innerWidth >= 1024;
      toggleSidebarMobile(!isLargeScreen);
    }
    
    // Debounce the resize handler
    const debouncedResize = debounce(handleResize, 150);
    window.addEventListener('resize', debouncedResize);
    
    return () => {
      window.removeEventListener('resize', debouncedResize);
      debouncedResize.cancel();
    };
  }, [toggleSidebarMobile]);

  // Handle manual toggle
  const handleToggleSidebar = useCallback(() => {
    userToggledRef.current = true;
    toggleSidebarMobile(prev => !prev);
  }, [toggleSidebarMobile]);

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
      <div className={clsx(
        'hidden lg:block h-screen sticky top-0 z-40 transition-all duration-300',
        isSidebarCollapsed ? 'w-20' : 'w-64'
      )}>
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar Toggle Button - Only show when sidebar is closed */}
      <button
        className={clsx(
          'fixed bottom-6 left-4 z-50 p-3 bg-white rounded-full shadow-lg transition-all duration-300 lg:hidden',
          isSidebarOpen ? 'opacity-0 invisible' : 'opacity-100 visible'
        )}
        onClick={handleToggleSidebar}
        aria-label="Open sidebar"
      >
        <svg
          className="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile Sidebar Overlay - Below sidebar but above main content */}
      {isMobile && (
        <div
          className={clsx(
            'fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-300 lg:hidden',
            isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
          onClick={closeAllMenus}
        />
      )}

      {/* Mobile Sidebar - Higher z-index than overlay but below navbar */}
      <div
        className={clsx(
          'fixed inset-y-0 left-0 z-45 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <AdminSidebar isExpanded={true} onClose={closeAllMenus} />
      </div>

      {/* Main Content - No left margin on mobile, controlled margin on desktop */}
      <div className="flex-1 min-w-0 overflow-x-hidden">
        <main className={clsx(
          'min-h-[calc(100vh-4rem)] pt-24 w-full transition-all duration-300',
          isSidebarOpen && isMobile ? 'ml-64' : 'ml-0'
        )}>
          <div className="w-full max-w-[1400px] mx-auto px-0 sm:px-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

// Simple debounce implementation
function debounce(func, wait) {
  let timeout;
  function debounced(...args) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
  debounced.cancel = () => clearTimeout(timeout);
  return debounced;
}

// Memoize the layout to prevent unnecessary re-renders
const MemoizedAdminLayout = ({ children }) => (
  <MenuProvider>
    <AdminLayoutContent>{children}</AdminLayoutContent>
  </MenuProvider>
);

// Set display name for better dev tools
MemoizedAdminLayout.displayName = 'AdminLayout';

export default MemoizedAdminLayout;