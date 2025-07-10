'use client';

import { memo, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useMenuContext } from '@/components/navbar/MenuContext';
import { 
  FiChevronDown, 
  FiChevronRight, 
  FiGrid, 
  FiFileText, 
  FiUsers, 
  FiMail, 
  FiPackage, 
  FiUser, 
  FiDollarSign, 
  FiSettings, 
  FiLogOut,
  FiBell
} from 'react-icons/fi';

const icons = {
  FiChevronDown,
  FiChevronRight,
  FiGrid,
  FiFileText,
  FiUsers,
  FiMail,
  FiPackage,
  FiUser,
  FiDollarSign,
  FiSettings,
  FiLogOut,
  FiBell
};

const MenuItem = memo(({ item, isActive, toggleItem, isExpanded, isSidebarCollapsed }) => {
  const Icon = icons[item.icon] || null;
  
  return (
    <div key={item.href} className="mb-1">
      {item.submenu?.length > 0 ? (
        <>
          <button
            onClick={() => toggleItem(item.href)}
            className={clsx(
              'w-full flex items-center justify-between rounded-lg p-3 text-sm font-medium transition-colors',
              isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
            )}
            aria-expanded={isExpanded}
          >
            <div className="flex items-center">
              {Icon && <Icon className="w-5 h-5" />}
              {!isSidebarCollapsed && <span className="ml-3">{item.title}</span>}
            </div>
            {!isSidebarCollapsed && (
              isExpanded ? 
                <icons.FiChevronDown className="w-4 h-4 transition-transform" /> : 
                <icons.FiChevronRight className="w-4 h-4 transition-transform" />
            )}
          </button>
          {isExpanded && !isSidebarCollapsed && (
            <div className="mt-1 ml-8 space-y-1">
              {item.submenu.map((subItem) => (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  className={clsx(
                    'block px-4 py-2 text-sm rounded-lg transition-all duration-300 focus:outline-none',
                    isActive(subItem.href)
                      ? 'bg-blue-50 text-blue-600 font-medium border-l-2 border-blue-500 -ml-1 pl-3'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                  )}
                >
                  {subItem.name || subItem.title || 'Unnamed Item'}
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.href || '#'}
          className={clsx(
            'flex items-center rounded-lg p-3 text-sm font-medium transition-colors',
            isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600',
            !item.href ? 'opacity-50 cursor-not-allowed' : ''
          )}
        >
          {Icon && <Icon className="w-5 h-5" />}
          {!isSidebarCollapsed && <span className="ml-3">{item.title}</span>}
        </Link>
      )}
    </div>
  );
});

MenuItem.displayName = 'MenuItem';

const AdminSidebar = memo(({ onClose }) => {
  const { isSidebarCollapsed, toggleSidebar, expandedItems, setExpandedItems, closeAllMenus, isSidebarOpen, isMobile } = useMenuContext();
  const pathname = usePathname();

  const menuItems = useMemo(() => [
    { title: 'Dashboard', icon: 'FiGrid', href: '/admin/dashboard', submenu: [] },
    { title: 'Content Management', icon: 'FiFileText', href: '/admin/content-management', submenu: [] },
    { title: 'Clients & Partners', icon: 'FiUsers', href: '/admin/clients-partners', submenu: [] },
    { title: 'Contact Information', icon: 'FiMail', href: '/admin/contact', submenu: [] },
    { title: 'Products', icon: 'FiPackage', href: '/admin/products', submenu: [] },
    { title: 'Customers', icon: 'FiUser', href: '/admin/customers', submenu: [] },
    { title: 'Publish Notice', icon: 'FiBell', href: '/admin/notice', submenu: [] },
  ], []);

  const toggleItem = useCallback((href) => {
    setExpandedItems(prev => ({
      ...prev,
      [href]: !prev[href]
    }));
  }, [setExpandedItems]);

  const isActive = useCallback((href) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  }, [pathname]);

  return (
    <div
      className={clsx(
        'bg-white border-r border-gray-200 flex-shrink-0 flex flex-col h-screen',
        'transition-all duration-300 will-change-transform pt-24 fixed left-0 top-0',
        'z-40',
        isSidebarCollapsed ? 'w-20' : 'w-64'
      )}
    >
      <div
        className={clsx(
          'h-16 flex items-center justify-between border-b border-gray-200 bg-white',
          isSidebarCollapsed ? 'px-2' : 'px-4'
        )}
        style={{ position: 'sticky', top: 0, zIndex: 10 }}
      >
        {isSidebarCollapsed ? (
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
        ) : (
          <h2 className="text-lg font-semibold text-gray-800 whitespace-nowrap">Admin Panel</h2>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none"
          aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <icons.FiChevronRight className={clsx('w-5 h-5', isSidebarCollapsed && 'rotate-180')} />
        </button>
      </div>
      <nav
        className="flex-1 px-2 pt-4 pb-8 overflow-y-auto overflow-x-hidden flex flex-col"
        role="navigation"
        aria-label="Admin Sidebar"
        style={{ minHeight: 'calc(100vh - 4rem)' }}
      >
        <div className="space-y-1 flex-1">
          {menuItems.map((item) => {
            const itemKey = item.href || `menu-${item.title.toLowerCase().replace(/\s+/g, '-')}`;
            return (
              <MenuItem
                key={itemKey}
                item={item}
                isActive={item.href ? isActive(item.href) : false}
                isExpanded={!!expandedItems[itemKey]}
                toggleItem={() => toggleItem(itemKey)}
                isSidebarCollapsed={isSidebarCollapsed}
              />
            );
          })}
        </div>
        <div className="mt-auto pt-4 border-t border-gray-100 px-2 mb-12">
          <button
            onClick={() => {
              // Clear authentication data
              localStorage.removeItem('isAuthenticated');
              localStorage.removeItem('user');
              // Redirect to login page
              window.location.href = '/login';
            }}
            className={clsx(
              'w-full flex items-center py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors',
              isSidebarCollapsed ? 'justify-center' : 'px-4',
              'focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
            )}
          >
            <FiLogOut className="w-5 h-5" />
            {!isSidebarCollapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </nav>
    </div>
  );
});

AdminSidebar.displayName = 'AdminSidebar';

export default AdminSidebar;