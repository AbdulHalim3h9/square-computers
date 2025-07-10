'use client';

import { memo, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useMenuContext } from '@/components/navbar/MenuContext';
import Button from '@/components/ui/Button';
import {
  ChevronDown as FiChevronDown,
  ChevronRight as FiChevronRight,
  LayoutDashboard as FiGrid,
  FileText as FiFileText,
  Users as FiUsers,
  Mail as FiMail,
  Package as FiPackage,
  User as FiUser,
  DollarSign as FiDollarSign,
  Settings as FiSettings,
  LogOut as FiLogOut,
} from 'lucide-react';

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
};

const MenuItem = memo(({ item, isSidebarCollapsed, isMobile = false }) => {
  const { expandedItems, setExpandedItems } = useMenuContext();
  const pathname = usePathname();
  const isActive = useCallback(
    (href) => {
      if (href === '/admin') {
        return pathname === href;
      }
      return pathname?.startsWith(href);
    },
    [pathname]
  );

  const isExpanded = expandedItems[item.href || ''];
  const Icon = icons[item.icon] || FiGrid; // Fallback to FiGrid if icon is missing

  return (
    <div className="mb-1">
      {item.submenu?.length > 0 ? (
        <>
          <Button
            onClick={() =>
              setExpandedItems((prev) => ({
                ...prev,
                [item.href]: !isExpanded,
              }))
            }
            variant="ghost"
            className={clsx(
              'w-full flex items-center justify-between rounded-lg text-sm font-medium transition-all duration-200',
              'px-3 py-2.5',
              isActive(item.href)
                ? 'bg-gradient-to-r from-cyan-600 to-cyan-800 text-white shadow-sm'
                : 'text-gray-700 hover:bg-gray-100 hover:text-cyan-700'
            )}
            aria-expanded={isExpanded}
          >
            <div className="flex items-center">
              {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
              {!isSidebarCollapsed && <span className="ml-3 truncate">{item.title}</span>}
            </div>
            {!isSidebarCollapsed && (
              isExpanded ? (
                <FiChevronDown className="w-4 h-4 transition-transform duration-200 flex-shrink-0" />
              ) : (
                <FiChevronRight className="w-4 h-4 transition-transform duration-200 flex-shrink-0" />
              )
            )}
          </Button>
          {isExpanded && !isSidebarCollapsed && (
            <div className="mt-1 ml-7 space-y-1">
              {item.submenu.map((subItem) => (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  className={clsx(
                    'block text-sm rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2',
                    'px-3 py-2',
                    isActive(subItem.href)
                      ? 'bg-gradient-to-r from-cyan-600 to-cyan-800 text-white font-medium'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-cyan-700'
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
            'flex items-center rounded-lg text-sm font-medium transition-all duration-200 group',
            'px-3 py-2.5',
            'focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2',
            isActive(item.href)
              ? 'bg-gradient-to-r from-cyan-600 to-cyan-800 text-white shadow-sm'
              : 'text-gray-700 hover:bg-gray-100 hover:text-cyan-700',
            !item.href ? 'opacity-50 cursor-not-allowed' : ''
          )}
        >
          {Icon && (
            <div className="relative">
              <Icon 
                className={clsx(
                  'w-4 h-4 flex-shrink-0 transform transition-all duration-300 ease-out',
                  'group-hover:scale-125',
                  isActive(item.href) ? 'text-white' : 'text-current',
                  isSidebarCollapsed ? 'mx-auto' : ''
                )} 
              />
            </div>
          )}
          {!isSidebarCollapsed && (
            <span className="ml-3 truncate transition-transform duration-300 group-hover:translate-x-1">
              {item.title}
            </span>
          )}
        </Link>
      )}
    </div>
  );
});

MenuItem.displayName = 'MenuItem';

const AdminSidebar = memo(() => {
  const { isSidebarCollapsed, toggleSidebar, isSidebarOpen, isMobile, toggleSidebarMobile } = useMenuContext();
  const pathname = usePathname();

  const menuItems = [
    { title: 'Dashboard', icon: 'FiGrid', href: '/admin/dashboard', submenu: [] },
    { title: 'Content Management', icon: 'FiFileText', href: '/admin/content-management', submenu: [] },
    { title: 'Clients & Partners', icon: 'FiUsers', href: '/admin/clients-partners', submenu: [] },
    { title: 'Contact Information', icon: 'FiMail', href: '/admin/contact', submenu: [] },
    { title: 'Products', icon: 'FiPackage', href: '/admin/products', submenu: [] },
    { title: 'Users', icon: 'FiUser', href: '/admin/users', submenu: [] },
    { title: 'Orders', icon: 'FiDollarSign', href: '/admin/orders', submenu: [] },
    { title: 'Settings', icon: 'FiSettings', href: '/admin/settings', submenu: [] },
  ];

  return (
    <div
      className={clsx(
        'bg-white border-r border-gray-200 flex-shrink-0 flex flex-col h-screen',
        'transition-all duration-300 will-change-transform pt-24 fixed left-0 top-0',
        'z-40 shadow-sm',
        isMobile && !isSidebarOpen ? 'hidden' : '',
        isSidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div
        className={clsx(
          'h-16 flex items-center justify-between border-b border-gray-200 bg-white'
        )}
        style={{ position: 'sticky', top: 0, zIndex: 10 }}
      >
        {!isSidebarCollapsed && (
          <h2 className="text-lg font-semibold text-gray-800 whitespace-nowrap px-3">Admin Panel</h2>
        )}
        <div className="flex-1 flex justify-end">
          <Button
            onClick={isMobile ? () => toggleSidebarMobile(false) : toggleSidebar}
            variant="ghost"
            size="icon"
            className="p-1.5 mr-3.5 my-2 text-gray-500 bg-gray-200 hover:bg-gray-300 hover:text-cyan-700 rounded-md transition-colors duration-200"
            aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <FiChevronRight
              className={clsx(
                'w-6 h-6 transition-all duration-300 ease-out',
                isSidebarCollapsed && 'rotate-180',
                'hover:scale-125 hover:text-cyan-700'
              )}
            />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 px-3 pt-4 pb-8 overflow-y-auto overflow-x-hidden flex flex-col"
        role="navigation"
        aria-label="Admin Sidebar"
        style={{ minHeight: 'calc(100vh - 4rem)' }}
      >
        <div className="space-y-1">
          {menuItems.map((item) => (
            <MenuItem
              key={item.href}
              item={item}
              isSidebarCollapsed={isSidebarCollapsed}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Logout Button */}
        <div className="mt-auto pt-4 border-t border-gray-100 mb-12">
          <Button
            onClick={() => {
              try {
                localStorage.removeItem('isAuthenticated');
                localStorage.removeItem('user');
                window.location.href = '/login';
              } catch (error) {
                console.error('Error during logout:', error);
                window.location.href = '/login';
              }
            }}
            variant="ghost"
            className={clsx(
              'w-full flex items-center text-sm font-medium transition-all duration-200',
              'px-3 py-2.5 rounded-lg',
              'text-red-600 hover:bg-red-50 hover:text-red-700',
              'focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
              isSidebarCollapsed ? 'justify-center' : ''
            )}
          >
            <FiLogOut className="w-4 h-4 flex-shrink-0" />
            {!isSidebarCollapsed && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </nav>
    </div>
  );
});

AdminSidebar.displayName = 'AdminSidebar';

export default AdminSidebar;