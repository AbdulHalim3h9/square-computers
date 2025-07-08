'use client';

import { useState } from 'react';
import FormTemplate from '../FormTemplate';

export default function TestimonialsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const formFields = [
    {
      name: 'clientName',
      label: 'Client Name',
      type: 'text',
      placeholder: 'Enter client name',
      required: true,
    },
    {
      name: 'clientTitle',
      label: 'Client Title/Position',
      type: 'text',
      placeholder: 'e.g., CEO, Marketing Director',
      required: true,
    },
    {
      name: 'clientCompany',
      label: 'Company',
      type: 'text',
      placeholder: 'Enter company name',
    },
    {
      name: 'clientImage',
      label: 'Client Photo',
      type: 'file',
      accept: 'image/*',
      colSpan: 'col-span-2',
    },
    {
      name: 'rating',
      label: 'Rating',
      type: 'select',
      options: [
        { value: 1, label: '1 Star' },
        { value: 2, label: '2 Stars' },
        { value: 3, label: '3 Stars' },
        { value: 4, label: '4 Stars' },
        { value: 5, label: '5 Stars' },
      ],
      required: true,
    },
    {
      name: 'testimonial',
      label: 'Testimonial',
      type: 'textarea',
      placeholder: 'What did the client say?',
      rows: 4,
      required: true,
      colSpan: 'col-span-2',
    },
    {
      name: 'projectType',
      label: 'Project Type',
      type: 'text',
      placeholder: 'e.g., Web Development, IT Consulting',
      colSpan: 'col-span-2',
    },
    {
      name: 'isFeatured',
      label: 'Featured Testimonial',
      type: 'checkbox',
      description: 'Show this testimonial in featured section',
    },
    {
      name: 'isActive',
      label: 'Active',
      type: 'checkbox',
      description: 'Show this testimonial on the website',
      defaultChecked: true,
    },
  ];

  const initialValues = {
    clientName: '',
    clientTitle: '',
    clientCompany: '',
    clientImage: null,
    rating: 5,
    testimonial: '',
    projectType: '',
    isFeatured: false,
    isActive: true,
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsLoading(true);
    try {
      // Simulate API call
      console.log('Submitting testimonial:', values);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert(isEditMode ? 'Testimonial updated successfully!' : 'Testimonial added successfully!');
      
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
      title={isEditMode ? 'Edit Testimonial' : 'Add New Testimonial'}
      description="Add or update client testimonials"
      formFields={formFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitButtonText={isEditMode ? 'Update Testimonial' : 'Add Testimonial'}
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
