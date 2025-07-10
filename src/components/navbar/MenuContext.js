'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [expandedItems, setExpandedItems] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sidebarExpandedItems');
        return saved ? JSON.parse(saved) : {};
      } catch (error) {
        console.error('Error reading sidebarExpandedItems from localStorage:', error);
        return {};
      }
    }
    return {};
  });

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const isMobile = window.innerWidth < 768;
        const savedState = localStorage.getItem('sidebarCollapsed');
        return savedState !== null ? savedState === 'true' : isMobile;
      } catch (error) {
        console.error('Error reading sidebarCollapsed from localStorage:', error);
        return false;
      }
    }
    return false;
  });

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarCollapsed(true); // Collapse sidebar on mobile by default
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('sidebarCollapsed', isSidebarCollapsed.toString());
        localStorage.setItem('sidebarExpandedItems', JSON.stringify(expandedItems));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }, [isSidebarCollapsed, expandedItems]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarCollapsed((prev) => !prev);
  }, []);

  const toggleSidebarMobile = useCallback((shouldOpen) => {
    setIsSidebarOpen((prev) => (typeof shouldOpen === 'boolean' ? shouldOpen : !prev));
  }, []);

  const closeAllMenus = useCallback(() => {
    setOpenDropdown(null);
    setActiveCategory(0);
    setExpandedItems({});
    setIsSidebarOpen(false);
  }, []);

  return (
    <MenuContext.Provider
      value={{
        // Sidebar state
        expandedItems,
        setExpandedItems,
        isSidebarCollapsed,
        toggleSidebar,
        isSidebarOpen,
        toggleSidebarMobile,
        isMobile,
        
        // Dropdown state
        openDropdown,
        setOpenDropdown,
        activeCategory,
        setActiveCategory,
        closeAllMenus
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenuContext must be used within a MenuProvider');
  }
  return context;
};