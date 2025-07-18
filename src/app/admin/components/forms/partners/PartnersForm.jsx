'use client';

import { useState } from 'react';

export default function PartnersForm() {
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [logo, setLogo] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log('Saving partner:', { name, website, logo });
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Show success message
    } catch (error) {
      console.error('Error saving partner:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Add New Partner</h2>
        <p className="text-sm text-gray-500">Add a new partner to your network</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="partner-name" className="block text-sm font-medium text-gray-700 mb-1">
            Partner Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="partner-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter partner name"
            required
          />
        </div>

        <div>
          <label htmlFor="partner-website" className="block text-sm font-medium text-gray-700 mb-1">
            Website
          </label>
          <input
            type="url"
            id="partner-website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://partner-website.com"
          />
        </div>

        <div>
          <label htmlFor="partner-logo" className="block text-sm font-medium text-gray-700 mb-1">
            Logo URL
          </label>
          <input
            type="url"
            id="partner-logo"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://example.com/partner-logo.png"
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Partner'}
          </button>
        </div>
      </form>
    </div>
  );
}
