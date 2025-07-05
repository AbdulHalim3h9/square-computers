'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, ArrowLeft, AlertCircle } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;
    let isMounted = true;

    const searchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        if (isMounted) {
          setSearchResults(data);
        }
      } catch (error) {
        if (error.name !== 'AbortError' && isMounted) {
          console.error('Search error:', error);
          setError('Failed to load search results. Please try again.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    const debounceTimer = setTimeout(searchProducts, 300);

    return () => {
      isMounted = false;
      controller.abort();
      clearTimeout(debounceTimer);
    };
  }, [query, router]);

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-cyan-600 hover:text-cyan-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </button>
        <div className="flex items-center mb-8">
          <Search className="w-6 h-6 text-gray-400 mr-3" />
          <h1 className="text-2xl font-bold">Searching for &quot;{query}&quot;</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-cyan-600 hover:text-cyan-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </button>
        <div className="text-center py-12 bg-red-50 rounded-lg">
          <div className="max-w-md mx-auto">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-red-800 mb-2">Error loading results</h3>
            <p className="text-red-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (searchResults.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-cyan-600 hover:text-cyan-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </button>
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="max-w-md mx-auto">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-500 mb-6">We couldn&apos;t find any products matching &quot;{query}&quot;</p>
            <div className="space-x-3">
              <button
                onClick={() => router.push('/')}
                className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
              >
                Browse All Products
              </button>
              <button
                onClick={() => router.push('/collections')}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                View Categories
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-cyan-600 hover:text-cyan-700 mb-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </button>
        
        <div className="flex items-center">
          <Search className="w-6 h-6 text-gray-400 mr-3" />
          <h1 className="text-2xl font-bold">
            {searchResults.length > 0 
              ? `Found ${searchResults.length} ${searchResults.length === 1 ? 'result' : 'results'} for "${query}"`
              : `No results found for "${query}"`}
          </h1>
        </div>
        
        <p className="text-gray-500 mt-2 text-sm">
          {searchResults.length > 0 
            ? 'Browse through the search results below'
            : 'Try different keywords or check out our featured products'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {searchResults.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {/* Search tips */}
      {searchResults.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Search Tips</h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <li className="flex items-start">
              <div className="bg-cyan-100 p-1.5 rounded-full mr-3 mt-0.5">
                <Search className="w-4 h-4 text-cyan-600" />
              </div>
              <div>
                <h4 className="font-medium">Use specific terms</h4>
                <p className="text-sm text-gray-500">Try using product names or categories</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-cyan-100 p-1.5 rounded-full mr-3 mt-0.5">
                <Search className="w-4 h-4 text-cyan-600" />
              </div>
              <div>
                <h4 className="font-medium">Check your spelling</h4>
                <p className="text-sm text-gray-500">Double-check for any typos</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-cyan-100 p-1.5 rounded-full mr-3 mt-0.5">
                <Search className="w-4 h-4 text-cyan-600" />
              </div>
              <div>
                <h4 className="font-medium">Try different keywords</h4>
                <p className="text-sm text-gray-500">Use synonyms or related terms</p>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-48 bg-gray-200 rounded-lg"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
