import { useRef, useEffect, useState, useCallback } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function SearchBar({ isSearchExpanded, setIsSearchExpanded, searchQuery, setSearchQuery }) {
  const router = useRouter();
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Debounce search function
  const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Search products function
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
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((query) => searchProducts(query), 300),
    []
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchResults([]);
      setIsSearchExpanded(false);
    }
  };

  // Handle click outside to collapse
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        if (isExpanded) {
          setIsExpanded(false);
          setIsSearchExpanded(false);
        }
      }
    };

    // Add event listener when component mounts
    document.addEventListener('mousedown', handleClickOutside);
    
    // Clean up event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded, isSearchExpanded]);

  // Focus handling
  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
      setIsExpanded(true);
    }
  }, [isSearchExpanded]);

  const handleBlur = () => {
    if (isMobile && !searchQuery.trim()) {
      setIsExpanded(false);
      setIsSearchExpanded(false);
    }
  };

  // Handle search result click
  const handleResultClick = () => {
    setSearchResults([]);
    setIsExpanded(false);
    setIsSearchExpanded(false);
    setSearchQuery('');
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
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
        setIsExpanded(false);
        setIsSearchExpanded(false);
        searchInputRef.current?.blur();
        break;
        
      default:
        break;
    }
  };

  // Mobile search overlay
  const searchOverlay = isMobile && isSearchExpanded && (
    <div className="search-overlay">
      <div className="w-full max-w-xl px-4">
        <div className="relative bg-white rounded-lg shadow-xl animate-slide-in">
          <div className="flex items-center px-4 py-3 border-b border-gray-200">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search products and services..."
              className="flex-1 outline-none text-base"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setSearchResults([]);
                  setIsExpanded(false);
                  setIsSearchExpanded(false);
                } else if (e.key === 'Enter' && !searchResults.length) {
                  handleSearch(e);
                } else if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
                  handleKeyDown(e);
                }
              }}
              aria-expanded={searchResults.length > 0}
              aria-controls="search-results"
              aria-label="Search products"
              aria-autocomplete="list"
              role="combobox"
            />
            <button
              onClick={() => {
                setSearchQuery('');
                setSearchResults([]);
                setIsExpanded(false);
                setIsSearchExpanded(false);
              }}
              className="ml-2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {searchQuery.trim() && (
            <div 
              id="search-results"
              className="max-h-[calc(100vh-120px)] overflow-y-auto search-results-scrollbar"
              role="listbox"
              aria-label="Search results"
            >
              {renderSearchResults()}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Render search results
  const renderSearchResults = () => {
    if (isLoading) {
      return (
        <div className="p-4 text-center text-gray-500">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-500 mx-auto mb-2"></div>
          <p>Searching...</p>
        </div>
      );
    }

    if (searchResults.length > 0) {
      return (
        <>
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Products ({searchResults.length})
          </div>
          {searchResults.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="search-result-item"
              onClick={handleResultClick}
              data-search-result
              tabIndex="0"
              role="option"
              aria-selected="false"
            >
              <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md overflow-hidden">
                {product.image && (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </>
      );
    }

    if (searchQuery.trim() && !isLoading) {
      return (
        <div className="p-4 text-center text-gray-500">
          <p>No results found for "{searchQuery}"</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div 
      ref={searchContainerRef}
      className={`relative transition-all duration-300 px-2 w-full ${isMobile ? 'z-50' : ''}`}
    >
      {!isMobile || !isSearchExpanded ? (
        <form 
          onSubmit={handleSearch} 
          className="relative flex items-center w-full"
          onClick={(e) => {
            if (!isExpanded && !isMobile) {
              e.preventDefault();
              setIsExpanded(true);
              setIsSearchExpanded(true);
            }
          }}
        >
          <input
            ref={searchInputRef}
            type="text"
            placeholder={isExpanded ? "Search products and services..." : "Search"}
            className={`search-input ${isExpanded ? 'pl-10 pr-10' : 'pl-10 pr-8'} ${isExpanded ? 'opacity-100' : 'opacity-70'}`}
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => {
              if (!isMobile) {
                setIsExpanded(true);
                setIsSearchExpanded(true);
                if (searchQuery.trim()) {
                  searchProducts(searchQuery);
                }
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !searchResults.length) {
                handleSearch(e);
              } else if (['ArrowDown', 'ArrowUp', 'Escape'].includes(e.key)) {
                handleKeyDown(e);
              }
            }}
            aria-expanded={searchResults.length > 0}
            aria-controls="search-results"
            aria-label="Search products"
            aria-autocomplete="list"
            role="combobox"
          />
          <SearchIcon className="absolute left-3 w-4 h-4 text-gray-400" />
          
          {isExpanded && searchQuery && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setSearchQuery('');
                setSearchResults([]);
                if (isMobile) {
                  setIsExpanded(false);
                  setIsSearchExpanded(false);
                }
              }}
              className={`search-button ${isExpanded ? 'right-8' : 'right-0'}`}
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          
          <button 
            type="submit"
            className="search-button"
            aria-label="Search"
          >
            <SearchIcon className="w-4 h-4" />
          </button>
        </form>
      ) : null}
      
      {/* Screen reader announcements */}
      <div 
        className="sr-only" 
        aria-live="polite"
        aria-atomic="true"
      >
        {isLoading 
          ? 'Searching...' 
          : searchResults.length > 0 
            ? `${searchResults.length} results found`
            : searchQuery.trim() && 'No results found'}
      </div>

      {/* Desktop Search Results Dropdown */}
      {!isMobile && isExpanded && searchQuery.trim() && (
        <div 
          id="search-results"
          className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto search-results-scrollbar animate-fade-in"
          role="listbox"
          aria-label="Search results"
        >
          {renderSearchResults()}
        </div>
      )}
      
      {/* Mobile search overlay */}
      {searchOverlay}
    </div>
  );
}