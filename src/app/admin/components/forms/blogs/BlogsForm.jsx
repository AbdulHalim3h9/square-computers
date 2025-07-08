'use client';

import { useState } from 'react';
import FormTemplate from '../FormTemplate';

export default function BlogsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      console.log('Submitting blog:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(isEditMode ? 'Blog updated successfully!' : 'Blog created successfully!');
    } catch (error) {
      console.error('Error saving blog:', error);
      alert(`Failed to ${isEditMode ? 'update' : 'create'} blog. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    {
      name: 'title',
      label: 'Blog Title',
      type: 'text',
      required: true,
      placeholder: 'Enter blog title',
    },
    {
      name: 'slug',
      label: 'URL Slug',
      type: 'text',
      required: true,
      placeholder: 'blog-post-url',
      helpText: 'Used in the URL. Use lowercase letters, numbers, and hyphens only.'
    },
    {
      name: 'excerpt',
      label: 'Excerpt',
      type: 'textarea',
      required: true,
      placeholder: 'A short summary of the blog post...',
      rows: 3
    },
    {
      name: 'content',
      label: 'Content',
      type: 'textarea',
      required: true,
      placeholder: 'Write your blog post here...',
      rows: 8
    },
    {
      name: 'featuredImage',
      label: 'Featured Image',
      type: 'file',
      helpText: 'Recommended size: 1200x630px. Max file size: 2MB.'
    },
    {
      name: 'author',
      label: 'Author',
      type: 'text',
      required: true,
      placeholder: 'Author name'
    },
    {
      name: 'publishDate',
      label: 'Publish Date',
      type: 'date',
      required: true
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'text',
      placeholder: 'tag1, tag2, tag3',
      helpText: 'Separate tags with commas'
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
      name: 'isFeatured',
      label: 'Featured',
      type: 'checkbox',
      checkboxLabel: 'Feature this blog post on the homepage',
      initialValue: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h1>
        <button
          type="button"
          onClick={() => setIsEditMode(!isEditMode)}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          {isEditMode ? 'Create New' : 'Edit Existing'}
        </button>
      </div>
      
      <FormTemplate
        title={isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}
        fields={fields}
        onSubmit={handleSubmit}
        submitButtonText={isSubmitting ? 'Saving...' : isEditMode ? 'Update Post' : 'Publish Post'}
      />
    </div>
  );
}
