'use client';

import { useState } from 'react';
import FormTemplate from '../FormTemplate';

export default function SettingsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  
  // Mock settings data - in a real app, this would come from an API
  const [settings, setSettings] = useState({
    // General Settings
    siteTitle: 'Square Computers',
    siteTagline: 'Your Trusted Computer Solutions Partner',
    siteLogo: null,
    siteFavicon: null,
    adminEmail: 'admin@squarecomputers.com',
    timezone: 'Asia/Dhaka',
    dateFormat: 'F j, Y',
    timeFormat: 'g:i a',
    
    // Contact Information
    contactEmail: 'info@squarecomputers.com',
    contactPhone: '+880 1234 567890',
    contactAddress: '123 Tech Street, Dhaka, Bangladesh',
    contactMapEmbed: '',
    
    // Social Media
    facebookUrl: 'https://facebook.com/squarecomputers',
    twitterUrl: 'https://twitter.com/squarecomputers',
    linkedinUrl: 'https://linkedin.com/company/squarecomputers',
    instagramUrl: 'https://instagram.com/squarecomputers',
    youtubeUrl: 'https://youtube.com/squarecomputers',
    
    // SEO
    metaTitle: 'Square Computers - Your Trusted Computer Solutions Partner',
    metaDescription: 'Square Computers provides high-quality computer hardware, software, and IT solutions for businesses and individuals.',
    metaKeywords: 'computers, hardware, software, IT solutions, Bangladesh',
    
    // Maintenance Mode
    maintenanceMode: false,
    maintenanceMessage: 'We are currently performing scheduled maintenance. We\'ll be back shortly!',
    
    // Email Settings
    mailDriver: 'smtp',
    mailHost: 'smtp.example.com',
    mailPort: '587',
    mailUsername: 'noreply@example.com',
    mailPassword: '',
    mailEncryption: 'tls',
    mailFromAddress: 'noreply@example.com',
    mailFromName: 'Square Computers',
  });
  
  const tabs = [
    { id: 'general', name: 'General', icon: '⚙️' },
    { id: 'contact', name: 'Contact', icon: '📞' },
    { id: 'social', name: 'Social Media', icon: '📱' },
    { id: 'seo', name: 'SEO', icon: '🔍' },
    { id: 'email', name: 'Email', icon: '✉️' },
    { id: 'maintenance', name: 'Maintenance', icon: '🔧' },
  ];
  
  const formFields = {
    general: [
      {
        name: 'siteTitle',
        label: 'Site Title',
        type: 'text',
        placeholder: 'Enter site title',
        required: true,
        colSpan: 'col-span-2',
      },
      {
        name: 'siteTagline',
        label: 'Site Tagline',
        type: 'text',
        placeholder: 'Enter site tagline',
        colSpan: 'col-span-2',
      },
      {
        name: 'siteLogo',
        label: 'Site Logo',
        type: 'file',
        accept: 'image/*',
        description: 'Recommended size: 180x50px',
      },
      {
        name: 'siteFavicon',
        label: 'Favicon',
        type: 'file',
        accept: 'image/x-icon,image/png',
        description: 'Recommended size: 32x32px',
      },
      {
        name: 'adminEmail',
        label: 'Admin Email',
        type: 'email',
        placeholder: 'admin@example.com',
        required: true,
      },
      {
        name: 'timezone',
        label: 'Timezone',
        type: 'select',
        options: [
          { value: 'Asia/Dhaka', label: 'Dhaka (UTC+6)' },
          { value: 'UTC', label: 'UTC' },
          { value: 'America/New_York', label: 'New York (UTC-5)' },
          { value: 'Europe/London', label: 'London (UTC+0)' },
        ],
        required: true,
      },
      {
        name: 'dateFormat',
        label: 'Date Format',
        type: 'select',
        options: [
          { value: 'F j, Y', label: 'July 7, 2025' },
          { value: 'Y-m-d', label: '2025-07-07' },
          { value: 'm/d/Y', label: '07/07/2025' },
          { value: 'd/m/Y', label: '07/07/2025' },
        ],
        required: true,
      },
      {
        name: 'timeFormat',
        label: 'Time Format',
        type: 'select',
        options: [
          { value: 'g:i a', label: '3:30 pm' },
          { value: 'H:i', label: '15:30' },
        ],
        required: true,
      },
    ],
    contact: [
      {
        name: 'contactEmail',
        label: 'Contact Email',
        type: 'email',
        placeholder: 'contact@example.com',
        required: true,
      },
      {
        name: 'contactPhone',
        label: 'Contact Phone',
        type: 'tel',
        placeholder: '+880 1234 567890',
      },
      {
        name: 'contactAddress',
        label: 'Physical Address',
        type: 'textarea',
        placeholder: 'Enter your business address',
        rows: 2,
        colSpan: 'col-span-2',
      },
      {
        name: 'contactMapEmbed',
        label: 'Google Maps Embed Code',
        type: 'textarea',
        placeholder: 'Paste Google Maps iframe code here',
        rows: 4,
        colSpan: 'col-span-2',
      },
    ],
    social: [
      {
        name: 'facebookUrl',
        label: 'Facebook URL',
        type: 'url',
        placeholder: 'https://facebook.com/yourpage',
        icon: 'facebook',
      },
      {
        name: 'twitterUrl',
        label: 'Twitter URL',
        type: 'url',
        placeholder: 'https://twitter.com/yourhandle',
        icon: 'twitter',
      },
      {
        name: 'linkedinUrl',
        label: 'LinkedIn URL',
        type: 'url',
        placeholder: 'https://linkedin.com/company/yourcompany',
        icon: 'linkedin',
      },
      {
        name: 'instagramUrl',
        label: 'Instagram URL',
        type: 'url',
        placeholder: 'https://instagram.com/yourprofile',
        icon: 'instagram',
      },
      {
        name: 'youtubeUrl',
        label: 'YouTube URL',
        type: 'url',
        placeholder: 'https://youtube.com/yourchannel',
        icon: 'youtube',
        colSpan: 'col-span-2',
      },
    ],
    seo: [
      {
        name: 'metaTitle',
        label: 'Meta Title',
        type: 'text',
        placeholder: 'Enter default meta title',
        description: 'Recommended length: 50-60 characters',
        colSpan: 'col-span-2',
      },
      {
        name: 'metaDescription',
        label: 'Meta Description',
        type: 'textarea',
        placeholder: 'Enter default meta description',
        description: 'Recommended length: 150-160 characters',
        rows: 3,
        colSpan: 'col-span-2',
      },
      {
        name: 'metaKeywords',
        label: 'Meta Keywords',
        type: 'text',
        placeholder: 'keyword1, keyword2, keyword3',
        description: 'Separate keywords with commas',
        colSpan: 'col-span-2',
      },
      {
        name: 'googleAnalyticsId',
        label: 'Google Analytics ID',
        type: 'text',
        placeholder: 'UA-XXXXX-Y or G-XXXXXXXXXX',
        description: 'Enter your Google Analytics tracking ID',
        colSpan: 'col-span-2',
      },
    ],
    email: [
      {
        name: 'mailDriver',
        label: 'Mail Driver',
        type: 'select',
        options: [
          { value: 'smtp', label: 'SMTP' },
          { value: 'mailgun', label: 'Mailgun' },
          { value: 'ses', label: 'Amazon SES' },
          { value: 'sendmail', label: 'Sendmail' },
          { value: 'mail', label: 'PHP Mail' },
        ],
        required: true,
      },
      {
        name: 'mailHost',
        label: 'SMTP Host',
        type: 'text',
        placeholder: 'smtp.mailtrap.io',
        required: true,
      },
      {
        name: 'mailPort',
        label: 'SMTP Port',
        type: 'text',
        placeholder: '2525',
        required: true,
      },
      {
        name: 'mailUsername',
        label: 'SMTP Username',
        type: 'text',
        placeholder: 'Your SMTP username',
      },
      {
        name: 'mailPassword',
        label: 'SMTP Password',
        type: 'password',
        placeholder: 'Your SMTP password',
      },
      {
        name: 'mailEncryption',
        label: 'Encryption',
        type: 'select',
        options: [
          { value: 'tls', label: 'TLS' },
          { value: 'ssl', label: 'SSL' },
          { value: 'none', label: 'None' },
        ],
      },
      {
        name: 'mailFromAddress',
        label: 'From Email Address',
        type: 'email',
        placeholder: 'noreply@example.com',
        required: true,
      },
      {
        name: 'mailFromName',
        label: 'From Name',
        type: 'text',
        placeholder: 'Your Site Name',
        required: true,
      },
    ],
    maintenance: [
      {
        name: 'maintenanceMode',
        label: 'Maintenance Mode',
        type: 'switch',
        description: 'Enable to put the site in maintenance mode. Only administrators will be able to access the site.',
        colSpan: 'col-span-2',
      },
      {
        name: 'maintenanceMessage',
        label: 'Maintenance Message',
        type: 'textarea',
        placeholder: 'We are currently performing scheduled maintenance. We\'ll be back shortly!',
        rows: 3,
        colSpan: 'col-span-2',
      },
      {
        name: 'maintenanceAllowIps',
        label: 'Allowed IP Addresses',
        type: 'text',
        placeholder: '123.456.789.0, 192.168.1.1',
        description: 'Comma-separated list of IP addresses that can access the site during maintenance',
        colSpan: 'col-span-2',
      },
    ],
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    try {
      // Simulate API call
      console.log('Saving settings:', values);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setSettings(prev => ({
        ...prev,
        ...values,
      }));
      
      // Show success message
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving settings. Please try again.');
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="px-4 py-5 sm:p-6">
        <FormTemplate
          title={`${tabs.find(t => t.id === activeTab)?.name} Settings`}
          description="Update your site settings below"
          formFields={formFields[activeTab] || []}
          initialValues={settings}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          submitButtonText="Save Changes"
          gridCols="md:grid-cols-2"
        />
      </div>
    </div>
  );
}
