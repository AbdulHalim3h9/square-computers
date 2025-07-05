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
  const [searchAnimation, setSearchAnimation] = useState(false);

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
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 150);
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

  const openOverlay = () => {
    setSearchAnimation(true);
    setIsOverlayOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeOverlay = () => {
    setSearchAnimation(false);
    setTimeout(() => {
      setIsOverlayOpen(false);
      setIsSearchExpanded(false);
      document.body.style.overflow = '';
    }, 200);
  };

  // Simplified debounce utility
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

    try {
      setIsLoading(true);
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedSearch = useCallback(debounce(searchProducts, 300), [searchProducts]);

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
      setSearchResults([]);
      setIsSearchExpanded(false);
    }
  }, [searchQuery, router, setIsSearchExpanded]);

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

    if (isOverlayOpen) {
      const timer = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
      }, 10);

      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchstart', handleClickOutside);
      };
    }
  }, [isOverlayOpen]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (!searchResults.length) return;

    const focusedElement = document.activeElement;
    const items = Array.from(document.querySelectorAll('[data-search-result]'));
    const currentIndex = items.findIndex(item => item === focusedElement);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (currentIndex < items.length - 1) {
          items[currentIndex + 1]?.focus();
        } else {
          items[0]?.focus();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (currentIndex > 0) {
          items[currentIndex - 1]?.focus();
        } else {
          items[items.length - 1]?.focus();
        }
        break;
      case 'Escape':
        setSearchResults([]);
        setIsSearchExpanded(false);
        searchInputRef.current?.blur();
        break;
      default:
        break;
    }
  }, [searchResults, setIsSearchExpanded]);

  // Render search results
  const renderSearchResults = () => {
    if (isLoading) {
      return (
        <div className="py-8 text-center">
          <div className="inline-flex items-center gap-2 text-gray-500">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            Searching...
          </div>
        </div>
      );
    }

    if (searchResults.length > 0) {
      return (
        <div className="py-2 space-y-1">
          {searchResults.map((product, index) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="flex items-center p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-sm group"
              onClick={(e) => {
                e.preventDefault();
                setSearchResults([]);
                setSearchQuery('');
                closeOverlay();
                router.push(`/products/${product.slug}`);
              }}
              tabIndex={0}
              role="option"
              aria-selected="false"
              style={{
                animationDelay: `${index * 50}ms`
              }}
            >
              <div className="flex-shrink-0 h-12 w-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-300">
                {product.image && (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="ml-4 overflow-hidden flex-1">
                <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-200">
                  {product.name}
                </p>
                <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-200">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      );
    }

    if (searchQuery.trim() && !isLoading) {
      return (
        <div className="py-12 text-center">
          <div className="text-gray-400 mb-2">
            <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">No results found</p>
          <p className="text-gray-400 text-sm mt-1">Try searching for something else</p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {/* Search Button */}
      <button
        onClick={openOverlay}
        className="relative p-3 text-gray-600 hover:text-blue-600 focus:outline-none transition-all duration-200 rounded-xl hover:bg-blue-50 group"
        aria-label="Open search"
      >
        <SearchIcon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
      </button>

      {/* Overlay */}
      {isOverlayOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Blurred Background */}
          <div 
            className={`fixed inset-0 bg-black/40 backdrop-blur-md transition-all duration-300 ${
              searchAnimation ? 'opacity-100' : 'opacity-0'
            }`}
          />
          
          {/* Search Container */}
          <div className="relative flex items-center justify-center min-h-screen text-center sm:block m-2">
            <div 
              ref={searchContainerRef}
              className={`inline-block w-full max-w-2xl px-6 pt-6 pb-6 overflow-hidden text-left align-middle transition-all duration-300 transform bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 sm:my-8 sm:max-w-3xl sm:p-8 ${
                searchAnimation 
                  ? 'opacity-100 scale-100 translate-y-0' 
                  : 'opacity-0 scale-95 translate-y-4'
              }`}
            >
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                  <SearchIcon className="w-6 h-6 text-gray-400" />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products and services..."
                  className="w-full py-5 pl-14 pr-14 text-lg bg-gray-50/50 border-2 border-gray-200/50 rounded-2xl focus:ring-0 focus:border-blue-500 focus:bg-white/80 focus:outline-none transition-all duration-300 placeholder-gray-400"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      handleSearch(e);
                      closeOverlay();
                    }
                  }}
                  autoComplete="off"
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

              {/* Search Results */}
              {searchQuery.trim() && (
                <div className={`mt-4 max-h-[60vh] overflow-y-auto rounded-2xl transition-all duration-300 ${
                  searchResults.length > 0 ? 'bg-white/30 backdrop-blur-sm border border-white/20' : ''
                }`}>
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