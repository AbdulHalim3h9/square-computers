// MenuContext.js
'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [expandedItems, setExpandedItems] = useState({});
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768;
      const savedState = localStorage.getItem('sidebarCollapsed');
      return savedState !== null ? savedState === 'true' : isMobile;
    }
    return false;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for mobile sidebar visibility

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebarCollapsed', isSidebarCollapsed);
      localStorage.setItem('sidebarExpandedItems', JSON.stringify(expandedItems));
    }
  }, [isSidebarCollapsed, expandedItems]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarCollapsed((prev) => !prev);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
    if (!isMobileMenuOpen) setIsSidebarOpen(false); // Close sidebar when mobile menu opens
  }, [isMobileMenuOpen]);

  const toggleSidebarMobile = useCallback((shouldOpen) => {
    if (typeof shouldOpen === 'boolean') {
      setIsSidebarOpen(shouldOpen);
    } else {
      setIsSidebarOpen(prev => !prev);
    }
    // Close mobile menu when sidebar opens
    if (!isSidebarOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isSidebarOpen]);

  const closeAllMenus = useCallback(() => {
    setOpenDropdown(null);
    setActiveCategory(0);
    setExpandedItems({});
    setIsMobileMenuOpen(false);
    setIsSidebarOpen(false);
  }, []);

  return (
    <MenuContext.Provider
      value={{
        openDropdown,
        setOpenDropdown,
        activeCategory,
        setActiveCategory,
        expandedItems,
        setExpandedItems,
        isSidebarCollapsed,
        toggleSidebar,
        isMobileMenuOpen,
        toggleMobileMenu,
        isSidebarOpen,
        toggleSidebarMobile,
        closeAllMenus,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => useContext(MenuContext);