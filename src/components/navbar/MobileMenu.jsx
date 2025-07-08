'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiChevronDown, FiChevronUp, FiUser, FiLogOut } from 'react-icons/fi';

export default function MobileMenu({ isOpen, setIsOpen, menuItems, expandedItems, setExpandedItems }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authStatus = localStorage.getItem('isAuthenticated');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      setIsAuthenticated(authStatus === 'true');
      setIsAdmin(user?.isAdmin === true);
    }
  }, [pathname]);

  const toggleItem = (title) => {
    setExpandedItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      setIsOpen(false);
      router.push('/');
      router.refresh();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50 bg-white mt-16 overflow-y-auto">
      <div className="px-4 pt-2 pb-8 space-y-1">
        {isAuthenticated ? (
          <div className="mb-4 border-b border-gray-100 pb-4">
            <Link
              href="/admin/dashboard"
              className="flex items-center px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md group"
              onClick={() => setIsOpen(false)}
            >
              <FiUser className="mr-3 h-5 w-5 text-gray-500 group-hover:text-cyan-600" />
              Admin Panel
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-md group"
            >
              <FiLogOut className="mr-3 h-5 w-5 text-red-500 group-hover:text-red-700" />
              Logout
            </button>
          </div>
        ) : (
          <div className="mb-4 border-b border-gray-100 pb-4">
            <Link
              href="/auth/login"
              className="flex items-center px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md group"
              onClick={() => setIsOpen(false)}
            >
              <FiUser className="mr-3 h-5 w-5 text-gray-500 group-hover:text-cyan-600" />
              Login
            </Link>
          </div>
        )}
        
        {isAdmin && (
          <div className="mb-4 border-b border-gray-100 pb-4">
            <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Admin
            </h3>
            <Link
              href="/admin"
              className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-cyan-600 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              <FiUser className="mr-3 h-5 w-5 text-cyan-600" />
              Admin Dashboard
            </Link>
          </div>
        )}

        <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Menu
        </h3>
        
        {menuItems.filter(item => item.href || item.children).map((item, index) => (
          <div key={index} className="space-y-1">
            {item.children ? (
              <>
                <button
                  onClick={() => toggleItem(item.title)}
                  className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-cyan-600 rounded-lg"
                >
                  <span>{item.title}</span>
                  {expandedItems[item.title] ? (
                    <FiChevronUp className="h-5 w-5" />
                  ) : (
                    <FiChevronDown className="h-5 w-5" />
                  )}
                </button>
                {expandedItems[item.title] && (
                  <div className="pl-6 space-y-1">
                    {item.children.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        href={child.href}
                        className="block px-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-cyan-600 rounded-lg"
                        onClick={() => setIsOpen(false)}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={item.href}
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-cyan-600 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            )}
          </div>
        ))}

        <div className="border-t border-gray-100 mt-4 pt-4">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-base font-medium text-left text-gray-700 hover:bg-gray-50 hover:text-red-600 rounded-lg"
            >
              <FiLogOut className="mr-3 h-5 w-5 text-red-500" />
              Logout
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-cyan-600 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              <FiUser className="mr-3 h-5 w-5 text-cyan-600" />
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
