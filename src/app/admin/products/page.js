'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import ProductsTable from './components/ProductsTable';
import CategoriesTable from './components/CategoriesTable';
import ProductForm from './components/ProductForm';
import CategoryForm from './components/CategoryForm';

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState('products');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddClick = () => {
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleFormSubmit = (data) => {
    console.log('Form submitted:', data);
    setIsFormOpen(false);
    // Handle form submission here
  };

  return (
    <div className="flex flex-col space-y-4 p-4 sm:p-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Products Management</h1>
        <button
          onClick={handleAddClick}
          className="flex items-center justify-center sm:justify-start px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-1 sm:mr-2" />
          <span>Add {activeTab === 'products' ? 'Product' : 'Category'}</span>
        </button>
      </div>

      <div className="border-b border-gray-200 overflow-x-auto">
        <nav className="-mb-px flex space-x-4 sm:space-x-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`whitespace-nowrap py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm ${
              activeTab === 'products'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`whitespace-nowrap py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm ${
              activeTab === 'categories'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Categories
          </button>
        </nav>
      </div>

      <div className="mt-4 sm:mt-6">
        {activeTab === 'products' ? <ProductsTable /> : <CategoriesTable />}
      </div>

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-medium text-gray-900">
                  {activeTab === 'products' ? 'Add New Product' : 'Add New Category'}
                </h3>
                <button
                  onClick={handleFormClose}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-2">
                {activeTab === 'products' ? (
                  <ProductForm onClose={handleFormClose} onSubmit={handleFormSubmit} />
                ) : (
                  <CategoryForm onClose={handleFormClose} onSubmit={handleFormSubmit} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
