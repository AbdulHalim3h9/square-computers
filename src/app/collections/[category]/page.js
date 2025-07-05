"use client";

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { getProductsByCategory } from '@/data/products';
import ProductList from '@/components/products/ProductList';
import FilterSidebar from '@/components/products/FilterSidebar';

// Sample filter options (you can customize these based on your product data)
const FILTER_OPTIONS = {
  price: [
    { id: 'under-500', label: 'Under $500', value: [0, 500] },
    { id: '500-1000', label: '$500 - $1000', value: [500, 1000] },
    { id: '1000-2000', label: '$1000 - $2000', value: [1000, 2000] },
    { id: 'over-2000', label: 'Over $2000', value: [2000, Infinity] },
  ],
  // Add more filter categories as needed
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.category;
  const [isLoading, setIsLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('default');
  const [itemsPerPage, setItemsPerPage] = useState(16);
  
  // Format category name for display
  const categoryName = useMemo(() => 
    category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
    [category]
  );

  // Load products
  useEffect(() => {
    const categoryProducts = getProductsByCategory(category);
    setAllProducts(categoryProducts);
    setIsLoading(false);
  }, [category]);

  // Apply filters and sorting
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Apply price filter
    if (filters.price) {
      result = result.filter(product => 
        product.price >= filters.price[0] && product.price <= filters.price[1]
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Default sorting (e.g., by relevance or as they come from the API)
        break;
    }

    return result;
  }, [allProducts, filters, sortBy]);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Handle sort change
  const handleSortChange = (value) => {
    setSortBy(value);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="flex gap-8">
            <div className="w-64 space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-6 bg-gray-100 rounded w-3/4"></div>
              ))}
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-lg h-96"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{categoryName}</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <FilterSidebar
            filters={FILTER_OPTIONS}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Product List */}
        <div className="flex-1">
          <ProductList
            products={filteredProducts}
            onSortChange={handleSortChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      </div>
    </div>
  );
}
