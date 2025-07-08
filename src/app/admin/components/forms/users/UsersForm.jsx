'use client';

import { useState } from 'react';
import FormTemplate from '../FormTemplate';

export default function UsersForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const formFields = [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      placeholder: 'Enter first name',
      required: true,
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Enter last name',
      required: true,
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'user@example.com',
      required: true,
      colSpan: 'col-span-2',
    },
    {
      name: 'password',
      label: isEditMode ? 'New Password' : 'Password',
      type: 'password',
      placeholder: isEditMode ? 'Leave blank to keep current' : 'Enter password',
      required: !isEditMode,
      colSpan: 'col-span-2',
      description: isEditMode ? 'Leave blank to keep current password' : 'Password must be at least 8 characters',
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm password',
      required: !isEditMode,
      colSpan: 'col-span-2',
      validate: (value, values) => {
        if (isEditMode && !value && !values.password) return true;
        if (value !== values.password) return 'Passwords do not match';
        return true;
      },
    },
    {
      name: 'role',
      label: 'User Role',
      type: 'select',
      options: [
        { value: 'admin', label: 'Administrator' },
        { value: 'editor', label: 'Editor' },
        { value: 'author', label: 'Author' },
        { value: 'contributor', label: 'Contributor' },
        { value: 'subscriber', label: 'Subscriber' },
      ],
      required: true,
    },
    {
      name: 'profileImage',
      label: 'Profile Picture',
      type: 'file',
      accept: 'image/*',
      colSpan: 'col-span-2',
    },
    {
      name: 'bio',
      label: 'Biography',
      type: 'textarea',
      placeholder: 'Tell us about yourself...',
      rows: 3,
      colSpan: 'col-span-2',
    },
    {
      name: 'isActive',
      label: 'Account Status',
      type: 'radio',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'pending', label: 'Pending' },
      ],
      required: true,
      colSpan: 'col-span-2',
    },
  ];

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'subscriber',
    profileImage: null,
    bio: '',
    isActive: 'active',
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsLoading(true);
    try {
      // Don't send confirmPassword to the server
      const { confirmPassword, ...userData } = values;
      
      // If in edit mode and password is empty, remove it from the data
      if (isEditMode && !userData.password) {
        delete userData.password;
      }
      
      // Simulate API call
      console.log('Submitting user:', userData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert(isEditMode ? 'User updated successfully!' : 'User created successfully!');
      
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
      title={isEditMode ? 'Edit User' : 'Add New User'}
      description={isEditMode ? 'Update user information' : 'Create a new user account'}
      formFields={formFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitButtonText={isEditMode ? 'Update User' : 'Create User'}
      secondaryButton={{
        text: isEditMode ? 'View Activity' : 'Clear Form',
        onClick: () => {
          if (isEditMode) {
            // Navigate to user activity
            console.log('View user activity');
          }
          // Clear form logic is handled by FormTemplate
        },
      }}
    />
  );
}
