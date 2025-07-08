'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import { 
  FiChevronDown, 
  FiChevronRight, 
  FiGrid, 
  FiUsers, 
  FiShoppingBag, 
  FiFileText, 
  FiMapPin, 
  FiMail, 
  FiPhone, 
  FiMessageSquare, 
  FiFacebook, 
  FiInstagram, 
  FiLinkedin, 
  FiTwitter, 
  FiUser, 
  FiAward, 
  FiTruck, 
  FiPackage, 
  FiDollarSign, 
  FiCreditCard, 
  FiSettings, 
  FiChevronLeft,
  FiMenu,
  FiLogOut
} from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const menuItems = [
  {
    title: 'Dashboard',
    icon: <FiGrid className="w-5 h-5" />,
    href: '/admin/dashboard',
  },
  {
    title: 'Content Management',
    icon: <FiFileText className="w-5 h-5" />,
    href: '/admin/content-management',
  },
  {
    title: 'Clients & Partners',
    icon: <FiUsers className="w-5 h-5" />,
    href: '/admin/clients-partners',
  },
  {
    title: 'Contact Information',
    icon: <FiMail className="w-5 h-5" />,
    href: '/admin/contact',
  },
  {
    title: 'Products',
    icon: <FiPackage className="w-5 h-5" />,
    href: '/admin/products',
  },
  {
    title: 'Customers',
    icon: <FiUser className="w-5 h-5" />,
    href: '/admin/customers',
  },
  {
    title: 'Orders & Payments',
    icon: <FiDollarSign className="w-5 h-5" />,
    children: [
      { title: 'Orders', href: '/admin/orders' },
      { title: 'Payments', href: '/admin/payments' },
      { title: 'Invoices', href: '/admin/invoices' },
    ],
  },
  {
    title: 'Settings',
    icon: <FiSettings className="w-5 h-5" />,
    href: '/admin/settings',
  },
];

export default function AdminSidebar({ onClose }) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      // Default to collapsed on mobile, use saved state on desktop
      const isMobile = window.innerWidth < 768;
      const savedState = localStorage.getItem('sidebarCollapsed');
      return savedState !== null ? savedState === 'true' : isMobile;
    }
    return false;
  });
  
  // Handle window resize to update collapsed state
  const handleResize = useCallback(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile && !isCollapsed) {
      setIsCollapsed(true);
    }
  }, [isCollapsed]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Set initial state
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);
  
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarExpandedItems');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebarExpandedItems', JSON.stringify(expandedItems));
    }
  }, [expandedItems]);

  const toggleItem = useCallback((title) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  }, []);

  const isActive = (href) => {
    if (!href) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleKeyDown = (e, title) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleItem(title);
    }
  };

  const renderMenuItem = (item, index) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems[item.title];
    const active = isActive(item.href);

    if (isCollapsed) {
      return (
        <div key={index} className="mb-1 group relative">
          <div
            className="flex items-center justify-center w-10 h-10 mx-2 text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-all duration-200 cursor-pointer shadow-sm"
            title={item.title}
          >
            {item.href ? (
              <Link href={item.href} onClick={onClose} className="flex items-center justify-center w-full h-full">
                <span>{item.icon}</span>
              </Link>
            ) : (
              <span>{item.icon}</span>
            )}
          </div>
          
          {hasChildren && (
            <div className="absolute left-full ml-2 top-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-white shadow-lg rounded-lg py-2 w-48 z-50 transition-all duration-200 border border-gray-200">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                {item.title}
              </div>
              {item.children.map((child, childIndex) => (
                <Link
                  key={childIndex}
                  href={child.href}
                  onClick={onClose}
                  className={`block px-4 py-2 text-sm transition-colors duration-150 ${
                    isActive(child.href) 
                      ? 'bg-blue-50 text-blue-600 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                >
                  {child.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div key={index} className="mb-1 mx-2">
        {hasChildren ? (
          <>
            <button
              onClick={() => toggleItem(item.title)}
              onKeyDown={(e) => handleKeyDown(e, item.title)}
              aria-expanded={isExpanded}
              aria-controls={`submenu-${index}`}
              className={`w-full flex items-center justify-between rounded-lg transition-all duration-200 ease-in-out focus:outline-none ${
                active || isExpanded
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              <div className="flex items-center w-full">
                <div className="flex items-center justify-center w-10 h-10 bg-cyan-600 text-white rounded-lg mr-3 flex-shrink-0">
                  {item.icon}
                </div>
                <div className="space-y-1 flex-1">
                  <span className="truncate flex-1 font-medium text-sm">{item.title}</span>
                </div>
                <div className="flex-shrink-0 ml-2 mr-2">
                  {isExpanded ? (
                    <FiChevronDown className="w-4 h-4 transition-transform duration-200" />
                  ) : (
                    <FiChevronRight className="w-4 h-4 transition-transform duration-200" />
                  )}
                </div>
              </div>
            </button>
            <div
              id={`submenu-${index}`}
              className={`ml-6 mt-1 space-y-1 overflow-hidden transition-all duration-200 ease-in-out ${
                isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              {item.children.map((child, childIndex) => (
                <Link
                  key={childIndex}
                  href={child.href}
                  onClick={onClose}
                  className={`block px-4 py-2 text-sm rounded-lg transition-all duration-150 focus:outline-none ${
                    isActive(child.href)
                      ? 'bg-blue-50 text-blue-600 font-medium border-l-2 border-blue-500 -ml-1 pl-3'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                >
                  {child.title}
                </Link>
              ))}
            </div>
          </>
        ) : (
          <Link
            href={item.href || '#'}
            onClick={onClose}
            className={`flex items-center rounded-lg transition-all duration-200 focus:outline-none ${
              active
                ? 'bg-blue-50 text-blue-600 shadow-sm'
                : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
            } ${!item.href ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={isCollapsed ? item.title : undefined}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-cyan-600 text-white rounded-lg mr-3 flex-shrink-0">
              {item.icon}
            </div>
            <span className="truncate font-medium text-sm">{item.title}</span>
          </Link>
        )}
      </div>
    );
  };

  // Sidebar collapse state
  const displayCollapsed = isCollapsed;
  
  // Handle logout functionality
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      // Clear authentication data
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      
      // Redirect to login page
      window.location.href = '/auth/login';
    }
  };

  // Toggle sidebar collapse state
  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebarCollapsed', newState);
    }
  };

  return (
    <div className={`h-screen bg-white border-r border-gray-200 ${
      displayCollapsed ? 'w-16' : 'w-64'
    } flex-shrink-0 transition-all duration-300 ease-in-out flex flex-col fixed md:relative z-20`}>
      {/* Admin Panel Header */}
      <div className={`h-16 flex items-center justify-center border-b border-gray-200 bg-white ${displayCollapsed ? 'px-0' : 'px-4'}`} style={{ position: 'sticky', top: 0, zIndex: 10 }}>
        {displayCollapsed ? (
          <div className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
        ) : (
          <h2 className="text-lg font-semibold text-gray-800 whitespace-nowrap">Admin Panel</h2>
        )}
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-2 pt-4 pb-8 overflow-y-auto overflow-x-hidden flex flex-col" role="navigation" aria-label="Admin Sidebar">
        <div className="flex justify-end mb-4">
          <button 
            onClick={toggleSidebar}
            className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
              <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-1 flex-1">
          {menuItems.map((item, index) => renderMenuItem(item, index))}
        </div>
        
        {/* Logout Button */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${
              isCollapsed ? 'justify-center' : 'px-3'
            } py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 group`}
          >
            <FiLogOut className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </nav>
    </div>
  );
}