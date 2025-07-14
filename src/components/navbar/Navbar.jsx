"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Logo from './Logo';
import SearchBar from './SearchBar';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import { menuItems } from './menuItems';
import Button from '@/components/ui/Button';
import { useSearch } from '@/contexts/SearchContext';
import '../../styles/navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredMenuItems, setFilteredMenuItems] = useState(menuItems);
  const navRef = useRef(null);
  const pathname = usePathname();
  const { isSearchExpanded } = useSearch();

  // Initialize state to track if we've checked auth status
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  // Filter menu items based on authentication
  useEffect(() => {
    // Only filter menu items after we've checked auth status
    if (hasCheckedAuth) {
      setFilteredMenuItems(
        menuItems
          .filter(item => !item.requiresAuth || isAuthenticated)
          .filter(item => !(isAuthenticated && item.title === 'Login'))
      );
    } else {
      // Initially show no menu items until we check auth status
      setFilteredMenuItems([]);
    }
  }, [isAuthenticated, hasCheckedAuth]);

  // Check authentication status - only run on client side after mount
  useEffect(() => {
    // Ensure we're on the client side
    if (typeof window !== 'undefined') {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(authStatus);
      setHasCheckedAuth(true);
    }
  }, [pathname]);

  // Handle scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Toggle body overflow for mobile menu
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navbarClasses = useMemo(
    () => `fixed w-full z-50 bg-white transition-all duration-300 ease-out ${scrolled ? 'shadow-md' : 'shadow-sm'}`,
    [scrolled]
  );
  
  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Don't render navigation items until we've checked auth status
  if (!hasCheckedAuth) {
    return (
      <nav className={navbarClasses}>
        <div className="w-full relative">
          <div className="flex items-center h-14 sm:h-16 px-4 md:px-6 lg:px-8">
            <Logo />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav ref={navRef} className={navbarClasses}>
      <div className="w-full relative">
        <div className="flex items-center h-14 sm:h-16 px-4 md:px-6 lg:px-8">
          <Logo />
          <div className="flex-1 flex items-center justify-end">
            <SearchBar />
            <div className="md:hidden flex-shrink-0 w-12 h-12 flex items-center justify-center ml-2 z-60">
              <Button
                onClick={toggleMenu}
                variant="ghost"
                size="icon"
                className="w-10 h-10 text-gray-700 hover:text-cyan-500 hover:bg-cyan-50"
                aria-expanded={isOpen}
                aria-label="Toggle main menu"
              >
                <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                  <span
                    className={`absolute block h-0.5 w-5 sm:w-6 bg-current transform transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5 sm:-translate-y-2'}`}
                    style={{ top: '50%', marginTop: isOpen ? '0' : '-0.25rem' }}
                  />
                  <span
                    className={`absolute block h-0.5 w-5 sm:w-6 bg-current transform transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`}
                    style={{ top: '50%', marginTop: '-0.125rem' }}
                  />
                  <span
                    className={`absolute block h-0.5 w-5 sm:w-6 bg-current transform transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1 sm:translate-y-1.5'}`}
                    style={{ top: '50%', marginTop: isOpen ? '0' : '0.25rem' }}
                  />
                </div>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <DesktopMenu menuItems={filteredMenuItems} />
          </div>
        </div>
      </div>
      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        menuItems={filteredMenuItems}
      />
    </nav>
  );
}