'use client';

import { useState } from 'react';

export default function PhoneForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsApp] = useState('');
  const [errors, setErrors] = useState({});

  const validatePhone = (number) => {
    return /^[0-9+\s\-()]*$/.test(number) && number.trim() !== '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    if (!validatePhone(phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!validatePhone(whatsapp)) {
      newErrors.whatsapp = 'Please enter a valid WhatsApp number';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const dataToSubmit = {
        phone,
        whatsapp
      };
      
      console.log('Saving contact numbers:', dataToSubmit);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Contact numbers saved successfully!');
      
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPhone('');
    setWhatsApp('');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="space-y-6">
        {/* Phone Number */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-900">Phone Number</h3>
          <div>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="e.g., +880 2 1234567"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* WhatsApp Number */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-900">WhatsApp Number</h3>
          <div>
            <input
              id="whatsapp"
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsApp(e.target.value)}
              className={`w-full px-3 py-2 border ${errors.whatsapp ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="e.g., +880 1XXXXXXXXX"
            />
            {errors.whatsapp && (
              <p className="mt-1 text-sm text-red-500">{errors.whatsapp}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={handleReset}
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
          {isLoading ? 'Saving...' : 'Save Numbers'}
        </button>
      </div>
    </form>
  );
}
