'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FiFileText, FiInfo, FiBookOpen, FiUsers, FiMessageSquare } from 'react-icons/fi';
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage all your website content from one place
        </p>
      </div>

      <Tabs defaultValue={activeTab} className="space-y-4">
        <div className="border-b border-gray-200">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 gap-2 p-0 bg-transparent rounded-none">
            <TabsTrigger 
              value="services" 
              className="flex items-center gap-2 py-3 data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:shadow-none"
            >
              <FiFileText className="w-4 h-4" />
              <span className="text-xs md:text-sm">Services</span>
            </TabsTrigger>
            <TabsTrigger 
              value="about" 
              className="flex items-center gap-2 py-3 data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:shadow-none"
            >
              <FiInfo className="w-4 h-4" />
              <span className="text-xs md:text-sm">About Us</span>
            </TabsTrigger>
            <TabsTrigger 
              value="blogs" 
              className="flex items-center gap-2 py-3 data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:shadow-none"
            >
              <FiBookOpen className="w-4 h-4" />
              <span className="text-xs md:text-sm">Blogs</span>
            </TabsTrigger>
            <TabsTrigger 
              value="team" 
              className="flex items-center gap-2 py-3 data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:shadow-none"
            >
              <FiUsers className="w-4 h-4" />
              <span className="text-xs md:text-sm">Team</span>
            </TabsTrigger>
            <TabsTrigger 
              value="chairman" 
              className="flex items-center gap-2 py-3 data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:shadow-none"
            >
              <FiMessageSquare className="w-4 h-4" />
              <span className="text-xs md:text-sm">Chairman&apos;s Speech</span>
            </TabsTrigger>
            <TabsTrigger 
              value="mds" 
              className="flex items-center gap-2 py-3 data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:shadow-none"
            >
              <FiMessageSquare className="w-4 h-4" />
              <span className="text-xs md:text-sm">MDS Speech</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="services" className="mt-6">
          <ServicesForm />
        </TabsContent>
        <TabsContent value="about" className="mt-6">
          <AboutForm />
        </TabsContent>
        <TabsContent value="blogs" className="mt-6">
          <BlogsForm />
        </TabsContent>
        <TabsContent value="team" className="mt-6">
          <TeamForm />
        </TabsContent>
        <TabsContent value="chairman" className="mt-6">
          <ChairmanSpeechForm />
        </TabsContent>
        <TabsContent value="mds" className="mt-6">
          <MDSSpeechForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
