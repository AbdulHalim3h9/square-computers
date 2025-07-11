'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, Mail, MapPin, MessageSquare, Facebook, Instagram, Twitter, Linkedin, Youtube, Globe } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import forms with no SSR
const PhoneForm = dynamic(() => import('@/app/admin/components/forms/phone/PhoneForm'), { ssr: false });
const EmailForm = dynamic(() => import('@/app/admin/components/forms/email/EmailForm'), { ssr: false });
const LocationsForm = dynamic(() => import('@/app/admin/components/forms/locations/LocationsForm'), { ssr: false });
const FacebookForm = dynamic(() => import('@/app/admin/components/forms/facebook/FacebookForm'), { ssr: false });
const SocialLinksForm = dynamic(() => import('@/app/admin/components/forms/social-links/SocialLinksForm'), { ssr: false });

export default function ContactPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('phone');
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
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Contact Information</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Manage all contact-related information in one place
        </p>
      </div>

      <Tabs defaultValue="phone" className="space-y-4 sm:space-y-6">
        <div className="overflow-x-auto pb-2">
          <TabsList className="w-max sm:w-full">
            <div className="flex space-x-1">
              <TabsTrigger 
                value="phone" 
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 bg-transparent rounded-none"
                onClick={() => setActiveTab('phone')}
              >
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">Phone & WhatsApp</span>
              </TabsTrigger>
              <TabsTrigger 
                value="email" 
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 bg-transparent rounded-none"
                onClick={() => setActiveTab('email')}
              >
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">Email</span>
              </TabsTrigger>
              <TabsTrigger 
                value="locations" 
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 bg-transparent rounded-none"
                onClick={() => setActiveTab('locations')}
              >
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Locations</span>
              </TabsTrigger>
              <TabsTrigger 
                value="messenger" 
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 bg-transparent rounded-none"
                onClick={() => setActiveTab('messenger')}
              >
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Messenger</span>
              </TabsTrigger>
              <TabsTrigger 
                value="social" 
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 bg-transparent rounded-none"
                onClick={() => setActiveTab('social')}
              >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">Social</span>
              </TabsTrigger>
            </div>
          </TabsList>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <TabsContent value="phone" className="p-4 sm:p-6 m-0">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2 flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-600" /> Phone & WhatsApp
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">Configure phone numbers and WhatsApp settings</p>
            </div>
            <PhoneForm />
          </TabsContent>
          
          <TabsContent value="email" className="p-4 sm:p-6 m-0">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2 flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" /> Email Settings
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">Configure email addresses and settings</p>
            </div>
            <EmailForm />
          </TabsContent>
          
          <TabsContent value="locations" className="p-4 sm:p-6 m-0">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" /> Locations
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">Manage your business locations</p>
            </div>
            <LocationsForm />
          </TabsContent>
          
          <TabsContent value="messenger" className="p-4 sm:p-6 m-0">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-600" /> Messenger
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">Configure Facebook Messenger settings</p>
            </div>
            <FacebookForm />
          </TabsContent>
          
          <TabsContent value="social" className="p-4 sm:p-6 m-0">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2 flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" /> Social Links
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">Manage your social media profiles</p>
            </div>
            <SocialLinksForm />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}