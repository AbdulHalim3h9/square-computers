'use client';

import { useState } from 'react';
import FormTemplate from '../FormTemplate';

export default function ServicesForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      // Replace with your API call
      console.log('Submitting service:', formData);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Service saved successfully!');
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Failed to save service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    {
      name: 'title',
      label: 'Service Title',
      type: 'text',
      required: true,
      placeholder: 'e.g., Web Development',
    },
    {
      name: 'slug',
      label: 'URL Slug',
      type: 'text',
      required: true,
      placeholder: 'e.g., web-development',
      helpText: 'Used in the URL. Use lowercase letters, numbers, and hyphens only.'
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      placeholder: 'A brief description of the service...',
    },
    {
      name: 'content',
      label: 'Detailed Content',
      type: 'textarea',
      required: true,
      placeholder: 'Detailed information about the service...',
      helpText: 'You can use markdown formatting here.'
    },
    {
      name: 'icon',
      label: 'Icon',
      type: 'text',
      placeholder: 'e.g., FiCode',
      helpText: 'Icon name from the icon library.'
    },
    {
      name: 'isFeatured',
      label: 'Featured',
      type: 'checkbox',
      checkboxLabel: 'Feature this service on the homepage',
      initialValue: false
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'draft', label: 'Draft' },
        { value: 'published', label: 'Published' },
        { value: 'archived', label: 'Archived' },
      ],
      initialValue: 'draft'
    },
    {
      name: 'image',
      label: 'Featured Image',
      type: 'file',
      helpText: 'Recommended size: 800x600px. Max file size: 2MB.'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Manage Services</h1>
        <button
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add New Service
        </button>
      </div>
      
      <FormTemplate
        title="Add New Service"
        fields={fields}
        onSubmit={handleSubmit}
        submitButtonText={isSubmitting ? 'Saving...' : 'Save Service'}
      />
    </div>
  );
}
