'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Edit, Trash2, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';

// Dynamically import the popup form to avoid SSR issues with modals
const PopupServiceForm = dynamic(
  () => import('./PopupServiceForm'),
  { ssr: false }
);

// Mock data type for services
const mockServices = [
  {
    id: 1,
    name: 'Web Development',
    description: 'Custom website development services',
    coverImage: '/images/services/web-dev.jpg',
    icon: '/images/icons/web.svg',
    createdAt: '2025-06-15T10:00:00Z'
  },
  {
    id: 2,
    name: 'Mobile App Development',
    description: 'iOS and Android app development',
    coverImage: '/images/services/mobile-app.jpg',
    icon: '/images/icons/mobile.svg',
    createdAt: '2025-06-20T14:30:00Z'
  },
];

export default function ServicesForm() {
  const [services, setServices] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Load services on component mount
  useEffect(() => {
    // In a real app, this would be an API call
    setServices(mockServices);
  }, []);

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    try {
      if (editingService) {
        // Update existing service
        const updatedServices = services.map(service => 
          service.id === editingService.id 
            ? { ...service, ...formData, id: editingService.id } 
            : service
        );
        setServices(updatedServices);
        toast.success('Service updated successfully');
      } else {
        // Create new service
        const newService = {
          id: Date.now(),
          ...formData,
          createdAt: new Date().toISOString()
        };
        setServices([newService, ...services]);
        toast.success('Service created successfully');
      }
      
      // Close the form
      setEditingService(null);
      setIsFormOpen(false);
      
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error('Failed to save service');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEdit = (service) => {
    setEditingService(service);
    setIsFormOpen(true);
  };
  
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
      return;
    }
    
    try {
      setServices(services.filter(service => service.id !== id));
      toast.success('Service deleted successfully');
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete service');
    }
  };
  
  const openAddForm = () => {
    setEditingService(null);
    setIsFormOpen(true);
  };

  // Removed form handling methods as they're now in the PopupServiceForm component

  // Removed duplicate handleSubmit, handleEdit, and handleDelete functions
  // as they've been replaced by handleFormSubmit and the ones defined earlier

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">Services</h2>
          <p className="text-xs sm:text-sm text-gray-500">
            {services.length} {services.length === 1 ? 'service' : 'services'} in total
          </p>
        </div>
        <button
          type="button"
          onClick={openAddForm}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="-ml-0.5 mr-2 h-4 w-4" />
          Add Service
        </button>
      </div>

      {/* Services List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
        {services.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-gray-500 mb-4">No services found. Add your first service to get started.</p>
            <button
              type="button"
              onClick={openAddForm}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="-ml-1 mr-2 h-4 w-4" />
              Add Your First Service
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {services.map((service) => (
              <li key={service.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden bg-gray-100">
                      <Image
                        src={service.icon}
                        alt={service.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-contain p-1"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-1">{service.description}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(service)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50"
                      title="Edit service"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(service.id)}
                      className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
                      title="Delete service"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Popup Form */}
      <PopupServiceForm
        isOpen={isFormOpen}
        onClose={() => {
          setEditingService(null);
          setIsFormOpen(false);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingService}
        isLoading={isLoading}
      />
    </div>
  );
}
