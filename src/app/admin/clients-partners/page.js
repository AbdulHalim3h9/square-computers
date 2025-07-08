'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Handshake, Award } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import the forms with no SSR
const ClientsForm = dynamic(
  () => import('@/app/admin/components/forms/clients/ClientsForm'),
  { ssr: false }
);

const PartnersForm = dynamic(
  () => import('@/app/admin/components/forms/partners/PartnersForm'),
  { ssr: false }
);

const BrandsForm = dynamic(
  () => import('@/app/admin/components/forms/brands/BrandsForm'),
  { ssr: false }
);

export default function ClientsPartnersPage({ searchParams }) {
  // Use React.use() to properly handle searchParams in Next.js 13+
  const params = React.use(searchParams);
  const tab = params?.tab ?? 'clients';
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Clients & Partners</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your clients and partners information
        </p>
      </div>
      
      <Tabs defaultValue={tab} className="w-full">
        <div className="border-b border-gray-200 mb-6">
          <TabsList className="h-auto p-0 bg-transparent border-none rounded-none">
            <div className="flex overflow-x-auto">
              <TabsTrigger 
                value="clients" 
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 bg-transparent rounded-none"
              >
                <Users className="h-4 w-4" />
                Clients
              </TabsTrigger>
              <TabsTrigger 
                value="partners" 
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 bg-transparent rounded-none"
              >
                <Handshake className="h-4 w-4" />
                Partners
              </TabsTrigger>
              <TabsTrigger 
                value="brands" 
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 bg-transparent rounded-none"
              >
                <Award className="h-4 w-4" />
                Brands
              </TabsTrigger>
            </div>
          </TabsList>
        </div>

        <TabsContent value="clients" className="p-6 m-0">
          <div className="bg-white rounded-lg shadow p-6">
            <ClientsForm />
          </div>
        </TabsContent>
        
        <TabsContent value="partners" className="p-6 m-0">
          <div className="bg-white rounded-lg shadow p-6">
            <PartnersForm />
          </div>
        </TabsContent>
        
        <TabsContent value="brands" className="p-6 m-0">
          <div className="bg-white rounded-lg shadow p-6">
            <BrandsForm />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
