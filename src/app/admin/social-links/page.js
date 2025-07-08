'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SocialLinksForm from '../components/forms/social-links/SocialLinksForm';

export default function SocialLinksPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const authStatus = localStorage.getItem('isAuthenticated');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!authStatus || !user?.isAdmin) {
      router.push('/auth/login');
    } else {
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <SocialLinksForm />
    </div>
  );
}
