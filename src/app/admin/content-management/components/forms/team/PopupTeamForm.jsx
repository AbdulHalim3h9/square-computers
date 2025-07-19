'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function PopupTeamForm({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    bio: '',
    image: null,
    socialLinks: {
      twitter: '',
      linkedin: '',
      github: ''
    },
    isActive: true
  });
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with initialData when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        position: initialData.position || '',
        bio: initialData.bio || '',
        image: initialData.image || null,
        socialLinks: {
          twitter: initialData.socialLinks?.twitter || '',
          linkedin: initialData.socialLinks?.linkedin || '',
          github: initialData.socialLinks?.github || ''
        },
        isActive: initialData.isActive ?? true
      });
      if (initialData.image) {
        setImagePreview(initialData.image);
      }
    } else {
      // Reset form for new member
      setFormData({
        name: '',
        position: '',
        bio: '',
        image: null,
        socialLinks: {
          twitter: '',
          linkedin: '',
          github: ''
        },
        isActive: true
      });
      setImagePreview('');
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, you would upload the image to a server here
      // and get back a URL to store in your database
      const memberData = {
        ...formData,
        // If we're editing and the image hasn't changed, keep the existing URL
        image: formData.image instanceof File ? await uploadImage(formData.image) : formData.image
      };
      
      onSubmit(memberData);
      onClose();
      toast.success(initialData ? 'Team member updated successfully!' : 'Team member added successfully!');
    } catch (error) {
      console.error('Error saving team member:', error);
      toast.error('Failed to save team member. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock function for image upload - replace with actual implementation
  const uploadImage = async (file) => {
    // In a real app, upload to S3, Cloudinary, etc.
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(URL.createObjectURL(file));
      }, 500);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold">
            {initialData ? 'Edit Team Member' : 'Add New Team Member'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isSubmitting}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column - Image upload */}
            <div className="md:col-span-1">
              <div className="space-y-4">
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt={formData.name || 'Team member'}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                        <span>No image</span>
                      </div>
                    )}
                  </div>
                  <label className="mt-4 cursor-pointer">
                    <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      {formData.image ? 'Change Image' : 'Upload Image'}
                    </span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="isActive"
                    name="isActive"
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                    Active Member
                  </label>
                </div>
              </div>
            </div>

            {/* Right column - Form fields */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                  Position <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  value={formData.bio}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div className="pt-2">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Social Links</h3>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="socialLinks.twitter" className="block text-xs font-medium text-gray-500">
                      Twitter
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        twitter.com/
                      </span>
                      <input
                        type="text"
                        id="socialLinks.twitter"
                        name="socialLinks.twitter"
                        value={formData.socialLinks.twitter}
                        onChange={handleChange}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="username"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="socialLinks.linkedin" className="block text-xs font-medium text-gray-500">
                      LinkedIn
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        linkedin.com/in/
                      </span>
                      <input
                        type="text"
                        id="socialLinks.linkedin"
                        name="socialLinks.linkedin"
                        value={formData.socialLinks.linkedin}
                        onChange={handleChange}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="username"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="socialLinks.github" className="block text-xs font-medium text-gray-500">
                      GitHub
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        github.com/
                      </span>
                      <input
                        type="text"
                        id="socialLinks.github"
                        name="socialLinks.github"
                        value={formData.socialLinks.github}
                        onChange={handleChange}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="username"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.position}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? (
                'Saving...'
              ) : initialData ? (
                'Update Member'
              ) : (
                'Add Member'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
