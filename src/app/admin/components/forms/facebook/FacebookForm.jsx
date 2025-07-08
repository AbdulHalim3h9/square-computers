'use client';

import { useState } from 'react';
import { Facebook } from 'lucide-react';

export default function FacebookForm() {
  const [contactId, setContactId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Facebook Contact ID:', contactId);
    // In a real app, you would save this ID to your backend
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Facebook className="h-5 w-5 text-blue-600" />
          Facebook Contact
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Enter your Facebook Page ID to enable contact via Facebook
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="contactId" className="block text-sm font-medium text-gray-700">
            Facebook Page ID
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="contactId"
              value={contactId}
              onChange={(e) => setContactId(e.target.value.trim())}
              placeholder="e.g., squarecomputers"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            This is the username or ID of your Facebook page
          </p>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Facebook ID
          </button>
        </div>
      </form>

      {contactId && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-500">
            Your Facebook page will be linked as: 
            <a 
              href={`https://facebook.com/${contactId}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline ml-1"
            >
              facebook.com/{contactId}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
