import { useRef, useEffect, useState, useCallback, memo } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

function SearchBar({ isSearchExpanded, setIsSearchExpanded, searchQuery, setSearchQuery }) {
  const router = useRouter();
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  // Handle window resize for mobile detection
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Focus input when overlay opens
  useEffect(() => {
    if (isOverlayOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOverlayOpen]);

  // Close overlay with Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOverlayOpen) {
        closeOverlay();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOverlayOpen]);

  const openOverlay = useCallback(() => {
    setIsOverlayOpen(true);
    setIsSearchExpanded(true);
    document.body.style.overflow = 'hidden';
  }, [setIsSearchExpanded]);

  const closeOverlay = useCallback(() => {
    setIsOverlayOpen(false);
    setIsSearchExpanded(false);
    setSearchQuery('');
    setSearchResults([]);
    document.body.style.overflow = '';
  }, [setIsSearchExpanded, setSearchQuery]);

  // Debounce utility
  const debounce = useCallback((func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }, []);

  // Search products
  const searchProducts = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSearchResults(response.ok ? data : []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedSearch = useCallback(debounce(searchProducts, 500), [searchProducts]);

  // Handle search input
  const handleSearchChange = useCallback((e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  }, [setSearchQuery, debouncedSearch]);

  // Handle form submission
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      closeOverlay();
    }
  }, [searchQuery, router, closeOverlay]);

  // Handle click outside to close overlay
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOverlayOpen &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target) &&
        !event.target.closest('button[aria-label="Open search"]')
      ) {
        closeOverlay();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOverlayOpen, closeOverlay]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (!searchResults.length) return;
    const items = document.querySelectorAll('[data-search-result]');
    const currentIndex = Array.from(items).indexOf(document.activeElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items[currentIndex + 1]?.focus() || items[0]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      items[currentIndex - 1]?.focus() || items[items.length - 1]?.focus();
    } else if (e.key === 'Escape') {
      closeOverlay();
    }
  }, [searchResults, closeOverlay]);

  // Render search results
  const renderSearchResults = () => {
    if (isLoading) {
      return (
        <div className="py-8 text-center">
          <div className="inline-flex items-center gap-2 text-gray-500">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            Searching...
          </div>
        </div>
      );
    }

    if (searchResults.length > 0) {
      return (
        <ul className="py-2 space-y-1" role="listbox">
          {searchResults.map((product, index) => (
            <li key={product.id} data-search-result role="option" aria-selected="false">
              <Link
                href={`/products/${product.slug}`}
                className="flex items-center p-4 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-[1.02] hover:shadow-sm"
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                  closeOverlay();
                  router.push(`/products/${product.slug}`);
                }}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex-shrink-0 h-12 w-12 bg-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-semibold text-gray-900 truncate hover:text-blue-600 transition-colors duration-200">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-500 hover:text-gray-600 transition-colors duration-200">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <div className="opacity-0 hover:opacity-100 transition-opacity duration-200">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      );
    }

    if (searchQuery.trim() && !isLoading) {
      return (
        <div className="py-12 text-center">
          <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-gray-500 text-lg">No results found</p>
          <p className="text-gray-400 text-sm mt-1">Try searching for something else</p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <button
        onClick={openOverlay}
        className="p-3 text-gray-600 hover:text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-200"
        aria-label="Open search"
      >
        <SearchIcon className="w-5 h-5 hover:scale-110 transition-transform duration-200" />
      </button>

      {isOverlayOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300" />
          <div className="relative flex min-h-screen items-start justify-center pt-10 px-4">
            <div
              ref={searchContainerRef}
              className="w-full max-w-2xl sm:max-w-3xl p-4 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 transition-all duration-300 transform data-[open=true]:opacity-100 data-[open=true]:scale-100 data-[open=false]:opacity-0 data-[open=false]:scale-95"
              data-open={isOverlayOpen}
            >
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products and services..."
                  className="w-full py-5 pl-14 pr-14 text-lg bg-gray-50/50 border-2 border-gray-200/50 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:bg-white/80 transition-all duration-300 placeholder-gray-400 outline-none"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={(e) => {
                    handleKeyDown(e);
                    if (e.key === 'Enter' && searchQuery.trim()) handleSearch(e);
                  }}
                  autoComplete="off"
                  aria-label="Search products"
                />
                <button
                  type="button"
                  onClick={closeOverlay}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {searchQuery.trim() && (
                <div className="mt-4 max-h-[60vh] overflow-y-auto rounded-2xl bg-white/30 backdrop-blur-sm border border-white/20">
                  {renderSearchResults()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(SearchBar);