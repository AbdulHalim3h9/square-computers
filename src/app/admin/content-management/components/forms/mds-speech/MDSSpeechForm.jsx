'use client';

import { useState } from 'react';

export default function MDSSpeechForm() {
  const [speech, setSpeech] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log('Saving MDS speech:', { speech });
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Show success message
    } catch (error) {
      console.error('Error saving MDS speech:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">MDS Speech</h2>
        <p className="text-sm text-gray-500">Update the Managing Director's speech content</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="mds-speech-content" className="block text-sm font-medium text-gray-700 mb-1">
            Speech Content <span className="text-red-500">*</span>
          </label>
          <textarea
            id="mds-speech-content"
            value={speech}
            onChange={(e) => setSpeech(e.target.value)}
            rows={12}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter MDS speech content"
            required
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Speech'}
          </button>
        </div>
      </form>
    </div>
  );
}
