"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from './Logo';
import SearchBar from './SearchBar';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import AdminActions from './AdminActions';
import { menuItems } from './menuItems';
import { FiUser } from 'react-icons/fi';
import '../../styles/navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredMenuItems, setFilteredMenuItems] = useState(menuItems);
  const navRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  // Filter out login menu item when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setFilteredMenuItems(menuItems.filter(item => item.title !== 'Login'));
    } else {
      setFilteredMenuItems(menuItems);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authStatus = localStorage.getItem('isAuthenticated');
      setIsAuthenticated(authStatus === 'true');
    }
  }, [pathname]);

  const navbarClasses = useMemo(
    () => `fixed w-full z-50 bg-white shadow-lg shadow-cyan-100/20 transition-all duration-300 ease-out ${scrolled ? 'shadow-md' : 'shadow-sm'}`,
    [scrolled]
  );

  const toggleDropdown = useCallback(
    (index, e) => {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }
      setOpenDropdown((prevIndex) => (prevIndex === index ? null : index));
    },
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
        setExpandedItems({});
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        
        .navbar-brand {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        
        .square-text {
          color: #4DD0E1;
          text-shadow: 0 2px 4px rgba(77, 208, 225, 0.1);
        }
        
        .computers-text {
          color: #9E9E9E;
        }
      `}</style>

      <nav ref={navRef} className={navbarClasses}>
        <div className="w-full relative">
          <div className="flex items-center h-16 sm:h-20 px-4 md:px-6 lg:px-8">
            <Logo isSearchExpanded={isSearchExpanded} />
            <div className="flex-1 flex items-center justify-end">
              <SearchBar
                isSearchExpanded={isSearchExpanded}
                setIsSearchExpanded={setIsSearchExpanded}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              
              <div className="hidden md:flex items-center space-x-2">
                {isAuthenticated ? (
                  <Link
                    href="/admin/dashboard"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors duration-200"
                  >
                    <FiUser className="w-4 h-4" />
                    <span>Admin Panel</span>
                  </Link>
                ) : (
                  <Link
                    href="/auth/login"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors duration-200"
                  >
                    <FiUser className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                )}
              </div>
              
              <div className="md:hidden flex-shrink-0 w-12 h-12 flex items-center justify-center ml-2 z-60">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-700 hover:text-cyan-500 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-200"
                  aria-expanded={isOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                    <span
                      className={`absolute block h-0.5 w-5 sm:w-6 bg-current transform transition-all duration-300 ease-in-out ${
                        isOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5 sm:-translate-y-2'
                      }`}
                      style={{ top: '50%', transformOrigin: 'center', marginTop: isOpen ? '0' : '-0.25rem' }}
                    />
                    <span
                      className={`absolute block h-0.5 w-5 sm:w-6 bg-current transform transition-all duration-300 ease-in-out ${
                        isOpen ? 'opacity-0' : 'opacity-100'
                      }`}
                      style={{ top: '50%', marginTop: '-0.125rem' }}
                    />
                    <span
                      className={`absolute block h-0.5 w-5 sm:w-6 bg-current transform transition-all duration-300 ease-in-out ${
                        isOpen ? '-rotate-45 translate-y-0' : 'translate-y-1 sm:translate-y-1.5'
                      }`}
                      style={{ top: '50%', transformOrigin: 'center', marginTop: isOpen ? '0' : '0.25rem' }}
                    />
                  </div>
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <DesktopMenu 
                menuItems={filteredMenuItems} 
                openDropdown={openDropdown} 
                toggleDropdown={toggleDropdown}
                setOpenDropdown={setOpenDropdown}
                isSearchExpanded={isSearchExpanded}
              />
            </div>
          </div>
        </div>
        <MobileMenu 
          isOpen={isOpen} 
          setIsOpen={setIsOpen} 
          menuItems={filteredMenuItems} 
          expandedItems={expandedItems}
          setExpandedItems={setExpandedItems}
        />
      </nav>
    </>
  );
}