'use client';

import { useEffect, useState } from 'react';

export default function Ribbon() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Client-side check
    if (typeof window === 'undefined') return;

    const checkAuth = () => {
      try {
        const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const shouldShow = isAuthenticated || !!user?.isAdmin;
        console.log('Auth check:', { isAuthenticated, user, shouldShow });
        setIsVisible(shouldShow);
      } catch (error) {
        console.error('Error checking auth:', error);
        setIsVisible(false);
      }
    };

    // Initial check
    checkAuth();

    // Listen for auth changes
    const handleStorageChange = (e) => {
      if (e.key === 'isAuthenticated' || e.key === 'user') {
        checkAuth();
      }
    };

    // Check more frequently in case of race conditions
    const interval = setInterval(checkAuth, 1000);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Debug log to check visibility state
  console.log('Ribbon visibility check:', { 
    isVisible, 
    isAuthenticated: typeof window !== 'undefined' ? localStorage.getItem('isAuthenticated') : null,
    user: typeof window !== 'undefined' ? localStorage.getItem('user') : null
  });

  if (!isVisible) {
    return null;
  }

  return (
    <div className="w-full h-1 overflow-hidden">
      <div 
        className="w-full h-full bg-gradient-to-r from-pink-500 via-yellow-500 to-pink-500"
        style={{
          backgroundSize: '200% 100%',
          animation: 'gradient 5s ease infinite',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}
      >
        <style jsx>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>
    </div>
  );
}
