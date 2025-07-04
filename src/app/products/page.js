'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { products } from '@/data/products';
import FilterSidebar from '@/components/products/FilterSidebar';
import ProductList from '@/components/products/ProductList';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  // Get filter and sort params from URL
  const categoryParam = searchParams.get('category');
  const minPriceParam = searchParams.get('minPrice');
  const maxPriceParam = searchParams.get('maxPrice');
  const sortParam = searchParams.get('sort');
  const pageParam = searchParams.get('page');
  const limitParam = searchParams.get('limit');

  // State for filters and sorting
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 5000]
  });

  // Initialize categories from products
  useEffect(() => {
    const categoryCounts = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});

    const categoryList = Object.entries(categoryCounts).map(([name, count]) => ({
      name,
      count
    }));

    setCategories(categoryList);

    // Set initial filters from URL params
    const initialFilters = {
      categories: categoryParam ? categoryParam.split(',') : [],
      priceRange: [
        minPriceParam ? parseInt(minPriceParam, 10) : 0,
        maxPriceParam ? parseInt(maxPriceParam, 10) : 5000
      ]
    };

    setFilters(initialFilters);
    setIsLoading(false);
  }, [categoryParam, maxPriceParam, minPriceParam, products]);

  // Filter and sort products when filters or sort changes
  useEffect(() => {
    if (isLoading) return;

    let result = [...products];

    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter(product => 
        filters.categories.includes(product.category)
      );
    }

    // Apply price range filter
    result = result.filter(product => 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    );

    // Apply sorting
    if (sortParam) {
      switch (sortParam) {
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
          // Default sorting (by ID or any other default)
          result.sort((a, b) => a.id - b.id);
      }
    }

    setFilteredProducts(result);

    // Update URL with current filters and sort
    const params = new URLSearchParams();
    
    if (filters.categories.length > 0) {
      params.set('category', filters.categories.join(','));
    }
    
    if (filters.priceRange[0] > 0) {
      params.set('minPrice', filters.priceRange[0]);
    }
    
    if (filters.priceRange[1] < 5000) {
      params.set('maxPrice', filters.priceRange[1]);
    }
    
    if (sortParam) {
      params.set('sort', sortParam);
    }
    
    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    
    // Only update URL if it's different to prevent infinite loops
    if (searchParams.toString() !== queryString) {
      router.replace(newUrl, { scroll: false });
    }
  }, [filters, sortParam, isLoading, pathname, router, searchParams]);

  const handleFilterChange = (newFilters) => {
    setFilters({
      categories: newFilters.categories || [],
      priceRange: newFilters.priceRange || [0, 5000]
    });
  };

  const handleSortChange = (sortValue) => {
    const params = new URLSearchParams(searchParams);
    
    if (sortValue === 'default') {
      params.delete('sort');
    } else {
      params.set('sort', sortValue);
    }
    
    const queryString = params.toString();
    router.push(`${pathname}?${queryString}`, { scroll: false });
  };

  const handleItemsPerPageChange = (limit) => {
    const params = new URLSearchParams(searchParams);
    
    if (limit === 16) { // Default value
      params.delete('limit');
    } else {
      params.set('limit', limit);
    }
    
    const queryString = params.toString();
    router.push(`${pathname}?${queryString}`, { scroll: false });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow p-4">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900">Our Products</h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Browse our wide range of high-quality products designed to meet all your needs.
        </p>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <FilterSidebar 
              filters={{ categories }}
              onFilterChange={handleFilterChange}
              initialFilters={{
                categories: filters.categories,
                priceRange: filters.priceRange
              }}
            />
          </div>
          
          {/* Products Grid */}
          <div className="lg:w-3/4">
            <ProductList 
              products={filteredProducts}
              onSortChange={handleSortChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
