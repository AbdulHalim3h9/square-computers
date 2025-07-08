'use client';

import { useState } from 'react';
import FormTemplate from '../FormTemplate';

export default function ClientsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const formFields = [
    {
      name: 'name',
      label: 'Client Name',
      type: 'text',
      placeholder: 'Enter client name',
      required: true,
      colSpan: 'col-span-2',
    },
    {
      name: 'logo',
      label: 'Client Logo',
      type: 'file',
      accept: 'image/*',
      required: true,
      colSpan: 'col-span-2',
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
      placeholder: 'Enter client description',
      rows: 3,
      colSpan: 'col-span-2',
    },
    {
      name: 'isFeatured',
      label: 'Featured Client',
      type: 'checkbox',
      description: 'Show this client in featured section',
    },
  ];

  const initialValues = {
    name: '',
    logo: null,
    website: '',
    description: '',
    isFeatured: false,
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsLoading(true);
    try {
      // Simulate API call
      console.log('Submitting client:', values);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert(isEditMode ? 'Client updated successfully!' : 'Client added successfully!');
      
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
      title={isEditMode ? 'Edit Client' : 'Add New Client'}
      description="Add or update client information"
      formFields={formFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitButtonText={isEditMode ? 'Update Client' : 'Add Client'}
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
