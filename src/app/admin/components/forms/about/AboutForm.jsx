'use client';

import { useState } from 'react';
import FormTemplate from '../FormTemplate';

export default function AboutForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      console.log('Submitting about:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('About page updated successfully!');
    } catch (error) {
      console.error('Error updating about:', error);
      alert('Failed to update about page. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    {
      name: 'title',
      label: 'Page Title',
      type: 'text',
      required: true,
      placeholder: 'About Our Company',
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'text',
      placeholder: 'A brief tagline about your company',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      placeholder: 'Detailed information about your company...',
    },
    {
      name: 'mission',
      label: 'Our Mission',
      type: 'textarea',
      placeholder: 'Your company mission statement...',
    },
    {
      name: 'vision',
      label: 'Our Vision',
      type: 'textarea',
      placeholder: 'Your company vision...',
    },
    {
      name: 'values',
      label: 'Core Values',
      type: 'textarea',
      placeholder: 'List your core values (one per line)',
    },
    {
      name: 'image',
      label: 'Featured Image',
      type: 'file',
      helpText: 'Recommended size: 1200x800px. Max file size: 2MB.'
    },
    {
      name: 'isActive',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'draft', label: 'Draft' },
        { value: 'published', label: 'Published' },
      ],
      initialValue: 'draft'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">About Us</h1>
      <FormTemplate
        title="Update About Page"
        fields={fields}
        onSubmit={handleSubmit}
        submitButtonText={isSubmitting ? 'Saving...' : 'Save Changes'}
      />
    </div>
  );
}
