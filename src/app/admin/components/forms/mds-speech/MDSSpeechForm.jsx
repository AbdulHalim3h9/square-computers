'use client';

import { useState } from 'react';
import FormTemplate from '../FormTemplate';

export default function MDSSpeechForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true); // Default to edit mode as there's likely only one
  
  const formFields = [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      placeholder: 'Enter speech title',
      required: true,
      colSpan: 'col-span-2',
    },
    {
      name: 'image',
      label: 'MDS Photo',
      type: 'file',
      accept: 'image/*',
      required: true,
      helpText: 'Recommended size: 400x500px. Professional headshot preferred.'
    },
    {
      name: 'name',
      label: 'MDS Name',
      type: 'text',
      placeholder: 'Full Name',
      required: true,
    },
    {
      name: 'position',
      label: 'Position',
      type: 'text',
      placeholder: 'e.g., Managing Director',
      required: true,
    },
    {
      name: 'content',
      label: 'Speech Content',
      type: 'richtext',
      required: true,
      colSpan: 'col-span-2',
    },
  ];

  const initialValues = {
    title: 'Message from the Managing Director',
    image: null,
    name: '',
    position: 'Managing Director',
    content: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    try {
      // Simulate API call
      console.log('Saving MDS speech:', values);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert('MDS speech updated successfully!');
      
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving. Please try again.');
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <FormTemplate
      title="MDS Speech"
      description="Update the Managing Director's message and information"
      formFields={formFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitButtonText="Update Speech"
    />
  );
}
