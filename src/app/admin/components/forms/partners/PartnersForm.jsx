'use client';

import { useState } from 'react';
import FormTemplate from '../FormTemplate';

export default function PartnersForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const formFields = [
    {
      name: 'name',
      label: 'Partner Name',
      type: 'text',
      placeholder: 'Enter partner name',
      required: true,
      colSpan: 'col-span-2',
    },
    {
      name: 'logo',
      label: 'Partner Logo',
      type: 'file',
      accept: 'image/*',
      required: true,
      colSpan: 'col-span-2',
    },
    {
      name: 'type',
      label: 'Partner Type',
      type: 'select',
      options: [
        { value: 'technology', label: 'Technology' },
        { value: 'service', label: 'Service' },
        { value: 'strategic', label: 'Strategic' },
        { value: 'other', label: 'Other' },
      ],
      required: true,
    },
    {
      name: 'website',
      label: 'Website URL',
      type: 'url',
      placeholder: 'https://example.com',
      colSpan: 'col-span-2',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Enter partner description',
      rows: 3,
      colSpan: 'col-span-2',
    },
  ];

  const initialValues = {
    name: '',
    logo: null,
    type: '',
    website: '',
    description: '',
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsLoading(true);
    try {
      // Simulate API call
      console.log('Submitting partner:', values);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert(isEditMode ? 'Partner updated successfully!' : 'Partner added successfully!');
      
      // Reset form if not in edit mode
      if (!isEditMode) {
        resetForm();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <FormTemplate
      title={isEditMode ? 'Edit Partner' : 'Add New Partner'}
      description="Add or update partner information"
      formFields={formFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitButtonText={isEditMode ? 'Update Partner' : 'Add Partner'}
      secondaryButton={{
        text: isEditMode ? 'Cancel Edit' : 'Clear Form',
        onClick: () => {
          if (isEditMode) {
            setIsEditMode(false);
          }
          // Clear form logic is handled by FormTemplate
        },
      }}
    />
  );
}
