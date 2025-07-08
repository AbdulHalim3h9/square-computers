'use client';

import { useState, useEffect } from 'react';
import { Trash2, Edit, MapPin, Plus } from 'lucide-react';
import FormTemplate from '../FormTemplate';

export default function LocationsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [locations, setLocations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  const formFields = [
    {
      name: 'name',
      label: 'Location Name',
      type: 'text',
      placeholder: 'e.g., Head Office, Showroom',
      required: true,
    },
    {
      name: 'type',
      label: 'Location Type',
      type: 'select',
      options: [
        { value: 'office', label: 'Office' },
        { value: 'showroom', label: 'Showroom' },
        { value: 'warehouse', label: 'Warehouse' },
        { value: 'service-center', label: 'Service Center' },
      ],
      required: true,
    },
    {
      name: 'address',
      label: 'Full Address',
      type: 'textarea',
      placeholder: 'Enter full address',
      required: true,
      colSpan: 'col-span-2',
      rows: 2,
    },
    {
      name: 'city',
      label: 'City',
      type: 'text',
      required: true,
    },
    {
      name: 'state',
      label: 'State/Province',
      type: 'text',
      required: true,
    },
    {
      name: 'postalCode',
      label: 'Postal Code',
      type: 'text',
      required: true,
    },
    {
      name: 'country',
      label: 'Country',
      type: 'text',
      required: true,
      value: 'Bangladesh',
      readOnly: true,
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: 'e.g., +880 2 1234567',
      required: true,
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'e.g., info@example.com',
    },
    {
      name: 'mapEmbed',
      label: 'Google Maps Embed Code',
      type: 'textarea',
      placeholder: 'Paste Google Maps iframe code here',
      helpText: 'Get the embed code from Google Maps and paste it here',
      colSpan: 'col-span-2',
      rows: 4,
    },
    {
      name: 'isPrimary',
      label: 'Primary Location',
      type: 'checkbox',
      description: 'Set as the main/primary location',
    },
  ];

  const initialValues = {
    id: '',
    name: '',
    type: 'office',
    address: '',
    city: 'Dhaka',
    state: '',
    postalCode: '',
    country: 'Bangladesh',
    phone: '',
    email: '',
    mapEmbed: '',
    isPrimary: false,
  };

  // Load locations from localStorage on component mount
  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = () => {
    try {
      const savedLocations = JSON.parse(localStorage.getItem('locations') || '[]');
      setLocations(savedLocations);
    } catch (error) {
      console.error('Error loading locations:', error);
    }
  };

  const saveLocations = (updatedLocations) => {
    localStorage.setItem('locations', JSON.stringify(updatedLocations));
    setLocations(updatedLocations);
  };

  const handleEdit = (location) => {
    setEditingId(location.id);
    setIsEditMode(true);
    setShowForm(true);
    // Scroll to form
    document.getElementById('location-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      const updatedLocations = locations.filter(loc => loc.id !== id);
      saveLocations(updatedLocations);
      if (editingId === id) {
        setIsEditMode(false);
        setEditingId(null);
      }
    }
  };

  const resetForm = () => {
    setIsEditMode(false);
    setEditingId(null);
    setShowForm(false);
    return initialValues;
  };

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedLocations = [...locations];
      const locationData = { ...formData };
      
      if (isEditMode && editingId) {
        // Update existing location
        const index = updatedLocations.findIndex(loc => loc.id === editingId);
        if (index !== -1) {
          updatedLocations[index] = { ...locationData, id: editingId };
        }
      } else {
        // Add new location
        locationData.id = Date.now().toString();
        updatedLocations.push(locationData);
      }
      
      // If this is set as primary, unset others
      if (locationData.isPrimary) {
        updatedLocations.forEach(loc => {
          if (loc.id !== locationData.id) {
            loc.isPrimary = false;
          }
        });
      }
      
      saveLocations(updatedLocations);
      
      // Reset form
      resetForm();
      
      // Show success message
      alert(isEditMode ? 'Location updated successfully!' : 'Location added successfully!');
      
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Get initial values for edit mode
  const getInitialValues = () => {
    if (isEditMode && editingId) {
      const location = locations.find(loc => loc.id === editingId);
      if (location) return { ...initialValues, ...location };
    }
    return { ...initialValues };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          
        <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" /> Business Locations
              </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your business locations
          </p>
        </div>
        {!showForm && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Add New Location
          </button>
        )}
      </div>

      {showForm && (
        <div id="location-form" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <FormTemplate
            title={isEditMode ? 'Update' : 'Add Location'}
            description={isEditMode ? 'Update the location details' : 'Add a new business location'}
            fields={formFields}
            onSubmit={handleSubmit}
            submitButtonText={isEditMode ? 'Update Location' : 'Add Location'}
          />
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-base font-medium text-gray-900 mb-4">Saved Locations</h3>
        {locations.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <MapPin className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No locations</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding a new location.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
              <div key={location.id} className="relative bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                {location.isPrimary && (
                  <span className="absolute top-2 right-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Primary
                  </span>
                )}
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <MapPinIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{location.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {location.address}, {location.city}, {location.state} {location.postalCode}
                    </p>
                    {location.phone && (
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="font-medium">Phone:</span> {location.phone}
                      </p>
                    )}
                    {location.email && (
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="font-medium">Email:</span> {location.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(location)}
                    className="p-1.5 text-gray-500 hover:text-blue-600 focus:outline-none"
                    title="Edit location"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(location.id)}
                    className="p-1.5 text-gray-500 hover:text-red-600 focus:outline-none"
                    title="Delete location"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
