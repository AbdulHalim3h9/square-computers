'use client';

import { useState } from 'react';
import FormTemplate from '../FormTemplate';

export default function ChairmanSpeechForm() {
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
      label: 'Chairman Photo',
      type: 'file',
      accept: 'image/*',
      required: true,
      helpText: 'Recommended size: 400x500px. Professional headshot preferred.'
    },
    {
      name: 'name',
      label: 'Chairman\'s Name',
      type: 'text',
      placeholder: 'Full Name',
      required: true,
    },
    {
      name: 'position',
      label: 'Position',
      type: 'text',
      placeholder: 'e.g., Chairman & CEO',
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
    title: 'Chairman\'s Message',
    image: null,
    name: '',
    position: '',
    content: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    try {
      // Simulate API call
      console.log('Saving chairman\'s speech:', values);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert('Chairman\'s speech updated successfully!');
      
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
      title="Chairman's Speech"
      description="Update the chairman's message and information"
      formFields={formFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitButtonText="Update Speech"
    />
  );
}
