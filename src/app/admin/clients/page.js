'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ClientsForm from '../components/forms/clients/ClientsForm';

export default function ClientsPage() {
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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Clients</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <ClientsForm />
      </div>
    </div>
  );
}
