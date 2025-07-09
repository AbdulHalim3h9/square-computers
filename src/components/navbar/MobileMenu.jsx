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

  const toggleItem = (title, hasSubmenu = false) => {
    if (hasSubmenu) {
      setExpandedItems(prev => ({
        ...prev,
        [title]: !prev[title]
      }));
    }
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
        {menuItems
          .filter(item => !item.requiresAuth || isAuthenticated)
          .map((item, index) => {
            const hasSubmenu = Array.isArray(item.submenu);
            const isExpanded = expandedItems[item.title];
            
            return (
              <div key={index} className="space-y-1">
                {hasSubmenu ? (
                  <>
                    <button
                      onClick={() => toggleItem(item.title, hasSubmenu)}
                      className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md group"
                    >
                      <span>{item.title}</span>
                      {isExpanded ? (
                        <FiChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <FiChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="pl-6 space-y-1">
                        {item.submenu.map((subItem, subIndex) => {
                          const hasNestedItems = Array.isArray(subItem.items);
                          const isNestedExpanded = expandedItems[`${item.title}-${subIndex}`];
                          
                          return (
                            <div key={subIndex} className="space-y-1">
                              {hasNestedItems ? (
                                <>
                                  <button
                                    onClick={() => toggleItem(`${item.title}-${subIndex}`, true)}
                                    className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md group"
                                  >
                                    <span>{subItem.category}</span>
                                    {isNestedExpanded ? (
                                      <FiChevronUp className="h-4 w-4 text-gray-500" />
                                    ) : (
                                      <FiChevronDown className="h-4 w-4 text-gray-500" />
                                    )}
                                  </button>
                                  {isNestedExpanded && (
                                    <div className="pl-4 space-y-1">
                                      {subItem.items.map((nestedItem, nestedIndex) => (
                                        <Link
                                          key={`${subIndex}-${nestedIndex}`}
                                          href={nestedItem.href}
                                          className="block px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-cyan-600 rounded-lg"
                                          onClick={() => setIsOpen(false)}
                                        >
                                          {nestedItem.name}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </>
                              ) : subItem.href ? (
                                <Link
                                  key={subIndex}
                                  href={subItem.href}
                                  target={subItem.external ? "_blank" : "_self"}
                                  className="block px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-cyan-600 rounded-lg"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {subItem.name}
                                </Link>
                              ) : null}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  <div>
                    {item.href && (
                      <Link
                        href={item.href}
                        className={`block px-4 py-3 text-base font-medium rounded-lg ${
                          pathname === item.href
                            ? 'text-cyan-600 bg-cyan-50'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-cyan-600'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
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
