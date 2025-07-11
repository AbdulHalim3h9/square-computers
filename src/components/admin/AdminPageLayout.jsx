'use client';

import { useState, useEffect } from 'react';
import { useMenuContext } from '../navbar/MenuContext';
import Button from '@/components/ui/Button';
import { Menu, X } from 'lucide-react';

export default function AdminPageLayout({ 
  title, 
  actionButton,
  children,
  className = ''
}) {
  const { isSidebarCollapsed, toggleSidebar } = useMenuContext();
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`flex-1 flex flex-col min-h-0 ${className}`}>
      {/* Sticky header */}
      <div 
        className={`sticky top-0 z-10 bg-white border-b border-gray-200 transition-shadow duration-200 ${isScrolled ? 'shadow-sm' : ''}`}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 -mb-px">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="mr-2 -ml-2 md:hidden"
                aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isSidebarCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">
                {title}
              </h1>
            </div>
            <div className="flex items-center">
              {actionButton}
            </div>
          </div>
        </div>
      </div>

      {/* Page content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </div>
  );
}
