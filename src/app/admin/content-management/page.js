'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText as FiFileText, Info as FiInfo, BookOpen as FiBookOpen, Users as FiUsers, MessageSquare as FiMessageSquare} from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import forms with no SSR
const ServicesForm = dynamic(() => import('./components/forms/services/ServicesForm'), { ssr: false });
const AboutForm = dynamic(() => import('./components/forms/about/AboutForm'), { ssr: false });
const BlogsForm = dynamic(() => import('./components/forms/blogs/BlogsForm'), { ssr: false });
const TeamForm = dynamic(() => import('./components/forms/team/TeamForm'), { ssr: false });
const ChairmanSpeechForm = dynamic(() => import('./components/forms/chairman-speech/ChairmanSpeechForm'), { ssr: false });
const MDSSpeechForm = dynamic(() => import('./components/forms/mds-speech/MDSSpeechForm'), { ssr: false });

export default function ContentManagementPage({ searchParams }) {
  // Use React.use() to properly handle searchParams in Next.js 13+
  const params = React.use(searchParams);
  const activeTab = params?.tab ?? 'services';
  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Content Management</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Manage all your website content from one place
        </p>
      </div>

      <Tabs defaultValue={activeTab} className="space-y-4 sm:space-y-6">
        <div className="overflow-x-auto pb-2">
          <TabsList className="w-max sm:w-full">
            <div className="flex space-x-1">
              <TabsTrigger 
                value="services" 
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 bg-transparent rounded-none"
              >
                <FiFileText className="h-4 w-4" />
                <span className="hidden sm:inline">Services</span>
              </TabsTrigger>
              <TabsTrigger 
                value="about" 
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 bg-transparent rounded-none"
              >
                <FiInfo className="h-4 w-4" />
                <span className="hidden sm:inline">About Us</span>
              </TabsTrigger>
              <TabsTrigger 
                value="blogs" 
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 bg-transparent rounded-none"
              >
                <FiBookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Blogs</span>
              </TabsTrigger>
              <TabsTrigger 
                value="team" 
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 bg-transparent rounded-none"
              >
                <FiUsers className="h-4 w-4" />
                <span className="hidden sm:inline">Team</span>
              </TabsTrigger>
              <TabsTrigger 
                value="chairman" 
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 bg-transparent rounded-none"
              >
                <FiMessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Chairman's Speech</span>
              </TabsTrigger>
              <TabsTrigger 
                value="mds" 
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 bg-transparent rounded-none"
              >
                <FiMessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">MDS Speech</span>
              </TabsTrigger>
            </div>
          </TabsList>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <TabsContent value="services" className="m-0">
            <div className="p-4 sm:p-6">
              <ServicesForm />
            </div>
          </TabsContent>
          <TabsContent value="about" className="m-0">
            <div className="p-4 sm:p-6">
              <AboutForm />
            </div>
          </TabsContent>
          <TabsContent value="blogs" className="m-0">
            <div className="p-4 sm:p-6">
              <BlogsForm />
            </div>
          </TabsContent>
          <TabsContent value="team" className="m-0">
            <div className="p-4 sm:p-6">
              <TeamForm />
            </div>
          </TabsContent>
          <TabsContent value="chairman" className="m-0">
            <div className="p-4 sm:p-6">
              <ChairmanSpeechForm />
            </div>
          </TabsContent>
          <TabsContent value="mds" className="m-0">
            <div className="p-4 sm:p-6">
              <MDSSpeechForm />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
