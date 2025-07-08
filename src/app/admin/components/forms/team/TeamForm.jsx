'use client';

import { useState } from 'react';
import FormTemplate from '../FormTemplate';

export default function TeamForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      console.log('Submitting team member:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(isEditMode ? 'Team member updated successfully!' : 'Team member added successfully!');
    } catch (error) {
      console.error('Error saving team member:', error);
      alert(`Failed to ${isEditMode ? 'update' : 'add'} team member. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'John Doe',
    },
    {
      name: 'position',
      label: 'Position',
      type: 'text',
      required: true,
      placeholder: 'e.g., CEO, Developer, Designer',
    },
    {
      name: 'bio',
      label: 'Biography',
      type: 'textarea',
      placeholder: 'A short bio about the team member...',
      rows: 4
    },
    {
      name: 'image',
      label: 'Profile Photo',
      type: 'file',
      helpText: 'Recommended size: 400x400px. Max file size: 1MB.'
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'john.doe@example.com'
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: '+1 (555) 123-4567'
    },
    {
      name: 'department',
      label: 'Department',
      type: 'select',
      options: [
        { value: 'leadership', label: 'Leadership' },
        { value: 'development', label: 'Development' },
        { value: 'design', label: 'Design' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'sales', label: 'Sales' },
        { value: 'support', label: 'Support' },
        { value: 'other', label: 'Other' },
      ]
    },
    {
      name: 'socialLinks',
      label: 'Social Media Links',
      type: 'text',
      placeholder: 'LinkedIn, Twitter, etc.',
      helpText: 'Enter social media profile links separated by commas'
    },
    {
      name: 'isActive',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
      ],
      initialValue: 'active'
    },
    {
      name: 'showOnWebsite',
      label: 'Visibility',
      type: 'checkbox',
      checkboxLabel: 'Show on website',
      initialValue: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditMode ? 'Edit Team Member' : 'Add New Team Member'}
        </h1>
        <button
          type="button"
          onClick={() => setIsEditMode(!isEditMode)}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          {isEditMode ? 'Add New' : 'Edit Existing'}
        </button>
      </div>
      
      <FormTemplate
        title={isEditMode ? 'Edit Team Member' : 'Add New Team Member'}
        fields={fields}
        onSubmit={handleSubmit}
        submitButtonText={isSubmitting ? 'Saving...' : isEditMode ? 'Update Member' : 'Add Member'}
      />
    </div>
  );
}
