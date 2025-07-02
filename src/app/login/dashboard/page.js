'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function EmployeeDashboard() {
  const router = useRouter();

  // In a real app, check authentication status here
  useEffect(() => {
    // Redirect to login if not authenticated
    // const isAuthenticated = /* check auth status */;
    // if (!isAuthenticated) {
    //   router.push('/login');
    // }
  }, [router]);

  const handleLogout = () => {
    // In a real app, clear auth token and redirect
    // localStorage.removeItem('authToken');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-cyan-600">Square Computers</span>
                <span className="ml-2 px-2 py-1 text-xs font-medium bg-cyan-100 text-cyan-800 rounded-full">
                  Employee Portal
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
                <p className="text-gray-500">Employee dashboard content will appear here</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
