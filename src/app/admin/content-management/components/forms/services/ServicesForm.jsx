'use client';

import { useState } from 'react';

export default function ServicesForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log('Saving service:', { name, description });
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Show success message
    } catch (error) {
      console.error('Error saving service:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">Manage Services</h2>
        <p className="text-xs sm:text-sm text-gray-500">Add or update your services</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <label htmlFor="service-name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Service Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="service-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter service name"
            required
          />
        </div>

        <div>
          <label htmlFor="service-description" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="service-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter service description"
          />
        </div>

        <div className="flex justify-end pt-2 sm:pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Saving...' : 'Save Service'}
          </button>
        </div>
      </form>
    </div>
  );
}
