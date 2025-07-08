'use client';

import { useState } from 'react';
import { Facebook, Twitter, Instagram, Globe } from 'lucide-react';

const socialPlatforms = [
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    placeholder: 'https://facebook.com/squarecomputers',
    color: 'text-blue-600',
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    icon: Twitter,
    placeholder: 'https://twitter.com/squarecomputers',
    color: 'text-sky-400',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    placeholder: 'https://instagram.com/squarecomputers',
    color: 'text-pink-500',
  },
];

export default function SocialLinksForm() {
  const [links, setLinks] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLinks(prev => ({
      ...prev,
      [name]: value.trim()
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        
      <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" /> Social Media Links
              </h2>
        <p className="mt-1 text-sm text-gray-500">
          Add links to your social media profiles
        </p>
      </div>

      <div className="space-y-4">
        {socialPlatforms.map((platform) => (
          <div key={platform.id} className="space-y-1">
            <div className="flex items-center">
              <platform.icon className={`h-5 w-5 mr-2 ${platform.color}`} />
              <label htmlFor={platform.id} className="block text-sm font-medium text-gray-700">
                {platform.name}
              </label>
            </div>
            <div className="mt-1">
              <input
                type="url"
                name={platform.id}
                id={platform.id}
                value={links[platform.id]}
                onChange={handleChange}
                placeholder={platform.placeholder}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Social Links
        </button>
      </div>
    </div>
  );
}
