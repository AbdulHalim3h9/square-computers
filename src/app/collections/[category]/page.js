"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { getProductsByCategory } from '@/data/products';
import ProductList from '@/components/products/ProductList';
import FilterSidebar from '@/components/products/FilterSidebar';

/** @type {{ price: Array<{ id: string, label: string, value: [number, number] }> }} */
const FILTER_OPTIONS = {
  price: [
    { id: 'under-500', label: 'Under $500', value: [0, 500] },
    { id: '500-1000', label: '$500 - $1000', value: [500, 1000] },
    { id: '1000-2000', label: '$1000 - $2000', value: [1000, 2000] },
    { id: 'over-2000', label: 'Over $2000', value: [2000, Infinity] },
  ],
};

/**
 * Category page component displaying products with filters and sorting.
 * @returns {JSX.Element} The category page component.
 */
export default function CategoryPage() {
  const params = useParams();
  const category = params.category;
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('default');
  const [itemsPerPage, setItemsPerPage] = useState(16);

  // Debounce utility
  const debounce = useCallback((func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }, []);

  // Format category name
  const categoryName = useMemo(() => 
    category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
    [category]
  );

  // Load products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categoryProducts = await getProductsByCategory(category);
        setProducts(categoryProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  // Debounced filter and sort updates
  const applyFiltersAndSort = useCallback((newFilters, newSortBy) => {
    let result = [...products];

    // Apply price filter
    if (newFilters.price) {
      result = result.filter(product => 
        product.price >= newFilters.price[0] && product.price <= newFilters.price[1]
      );
    }

    // Apply sorting
    switch (newSortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - b.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [products]);

  const debouncedApplyFiltersAndSort = useMemo(() => 
    debounce((filters, sortBy) => {
      const filtered = applyFiltersAndSort(filters, sortBy);
      setProducts(filtered); // Update visible products
    }, 300),
    [applyFiltersAndSort, debounce]
  );

  // Memoized filtered and sorted products
  const filteredProducts = useMemo(() => applyFiltersAndSort(filters, sortBy), [filters, sortBy, applyFiltersAndSort]);

  // Handle filter change
  const handleFilterChange = useCallback((filterType, value) => {
    setFilters(prev => {
      const newFilters = { ...prev, [filterType]: value };
      debouncedApplyFiltersAndSort(newFilters, sortBy);
      return newFilters;
    });
  }, [debouncedApplyFiltersAndSort, sortBy]);

  // Handle sort change
  const handleSortChange = useCallback((value) => {
    setSortBy(value);
    debouncedApplyFiltersAndSort(filters, value);
  }, [debouncedApplyFiltersAndSort, filters]);

  // Handle items per page change
  const handleItemsPerPageChange = useCallback((value) => {
    setItemsPerPage(value);
  }, []);

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
                <div key={i} className="bg-gray-100 rounded-lg h-96 shadow-sm"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">{categoryName}</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 flex-shrink-0">
          <FilterSidebar
            filters={FILTER_OPTIONS}
            onFilterChange={handleFilterChange}
            aria-label="Product filters"
          />
        </aside>
        <main className="flex-1">
          <ProductList
            products={filteredProducts.slice(0, itemsPerPage)}
            onSortChange={handleSortChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            aria-label="Product list"
          />
        </main>
      </div>
    </div>
  );
}