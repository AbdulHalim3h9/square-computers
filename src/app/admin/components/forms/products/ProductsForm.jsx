'use client';

import { useState } from 'react';
import FormTemplate from '../FormTemplate';

export default function ProductsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const formFields = [
    {
      name: 'name',
      label: 'Product Name',
      type: 'text',
      placeholder: 'Enter product name',
      required: true,
      colSpan: 'col-span-2',
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: [
        { value: 'laptops', label: 'Laptops' },
        { value: 'desktops', label: 'Desktops' },
        { value: 'accessories', label: 'Accessories' },
        { value: 'components', label: 'Components' },
        { value: 'networking', label: 'Networking' },
      ],
      required: true,
    },
    {
      name: 'brand',
      label: 'Brand',
      type: 'text',
      placeholder: 'Enter brand name',
      required: true,
    },
    {
      name: 'images',
      label: 'Product Images',
      type: 'file',
      accept: 'image/*',
      multiple: true,
      required: true,
      colSpan: 'col-span-2',
    },
    {
      name: 'price',
      label: 'Price ($)',
      type: 'number',
      placeholder: '0.00',
      min: 0,
      step: '0.01',
      required: true,
    },
    {
      name: 'stock',
      label: 'Stock Quantity',
      type: 'number',
      placeholder: '0',
      min: 0,
      required: true,
    },
    {
      name: 'sku',
      label: 'SKU',
      type: 'text',
      placeholder: 'Enter SKU',
      required: true,
    },
    {
      name: 'shortDescription',
      label: 'Short Description',
      type: 'textarea',
      placeholder: 'Enter a brief product description',
      rows: 2,
      colSpan: 'col-span-2',
      required: true,
    },
    {
      name: 'description',
      label: 'Full Description',
      type: 'textarea',
      placeholder: 'Enter detailed product description',
      rows: 4,
      colSpan: 'col-span-2',
      required: true,
    },
    {
      name: 'specifications',
      label: 'Specifications (JSON)',
      type: 'textarea',
      placeholder: 'Enter specifications as JSON',
      rows: 4,
      colSpan: 'col-span-2',
      description: 'Example: {"Processor": "Intel Core i7", "RAM": "16GB", "Storage": "512GB SSD"}',
    },
    {
      name: 'isFeatured',
      label: 'Featured Product',
      type: 'checkbox',
      description: 'Show this product in featured section',
    },
    {
      name: 'isActive',
      label: 'Active',
      type: 'checkbox',
      description: 'Show this product in the store',
      defaultChecked: true,
    },
  ];

  const initialValues = {
    name: '',
    category: '',
    brand: '',
    images: [],
    price: '',
    stock: 0,
    sku: '',
    shortDescription: '',
    description: '',
    specifications: '',
    isFeatured: false,
    isActive: true,
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsLoading(true);
    try {
      // Simulate API call
      console.log('Submitting product:', values);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert(isEditMode ? 'Product updated successfully!' : 'Product added successfully!');
      
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
      title={isEditMode ? 'Edit Product' : 'Add New Product'}
      description="Add or update product information"
      formFields={formFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitButtonText={isEditMode ? 'Update Product' : 'Add Product'}
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
