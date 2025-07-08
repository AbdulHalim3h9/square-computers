'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

export default function EmailForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset messages
    setError('');
    setSuccess('');
    
    // Validate email
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      console.log('Saving email:', email);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setSuccess('Email address saved successfully!');
      
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to save email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          
        <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" /> Email Settings
              </h2>
          <p className="text-sm text-gray-500">
            Save Email Address for outgoing communications
          </p>
          
          <div className="mt-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="e.g., info@yourdomain.com"
              disabled={isLoading}
            />
            {error && (
              <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
            {success && (
              <p className="mt-1 text-sm text-green-600">{success}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => setEmail('')}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Email'}
          </button>
        </div>
      </form>
    </div>
  );
}
