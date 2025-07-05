import { useRef, useEffect, useState, useCallback, memo } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Throttle function for resize events
const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const SearchBar = memo(({ 
  isSearchExpanded, 
  setIsSearchExpanded, 
  searchQuery, 
  setSearchQuery 
}) => {
  const router = useRouter();
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Memoize the mobile check function
  const checkIfMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Optimized resize handler
  useEffect(() => {
    const throttledCheck = throttle(checkIfMobile, 100);
    
    // Initial check
    throttledCheck();
    
    // Add throttled resize listener
    window.addEventListener('resize', throttledCheck, { passive: true });
    
    return () => {
      window.removeEventListener('resize', throttledCheck);
    };
  }, [checkIfMobile]);

  // Memoize the search handler
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
      setIsSearchExpanded(false);
    }
  }, [searchQuery, router, setIsSearchExpanded]);

  // Optimized click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current && 
        !searchContainerRef.current.contains(event.target) && 
        isExpanded
      ) {
        setIsExpanded(false);
        setIsSearchExpanded(false);
      }
    };

    // Use capture phase for better performance
    document.addEventListener('mousedown', handleClickOutside, true);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [isExpanded, setIsSearchExpanded]);
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

  // Memoize the input change handler
  const handleInputChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // Memoize the form click handler
  const handleFormClick = useCallback((e) => {
    if (!isExpanded) {
      e.preventDefault();
      setIsExpanded(true);
      setIsSearchExpanded(true);
    }
  }, [isExpanded, setIsSearchExpanded]);

  // Memoize the search button click handler
  const handleSearchButtonClick = useCallback((e) => {
    if (!isExpanded) {
      e.preventDefault();
      setIsExpanded(true);
      setIsSearchExpanded(true);
    }
  }, [isExpanded, setIsSearchExpanded]);

  // Memoize the clear button click handler
  const handleClearClick = useCallback((e) => {
    e.preventDefault();
    setSearchQuery('');
    setIsExpanded(false);
    setIsSearchExpanded(false);
  }, [setSearchQuery, setIsSearchExpanded]);

  // Memoize the focus handler
  const handleFocus = useCallback(() => {
    setIsExpanded(true);
    setIsSearchExpanded(true);
  }, [setIsSearchExpanded]);

  return (
    <div 
      ref={searchContainerRef}
      className={`relative transition-all duration-300 ${isExpanded ? 'px-2 ms-4 w-full' : 'w-auto'}`}
    >
      <form 
        onSubmit={handleSearch}
        className={`relative flex items-center ${isExpanded ? 'w-full' : 'w-8'}`}
        onClick={handleFormClick}
      >
        <input
          ref={searchInputRef}
          type="text"
          placeholder={isExpanded ? "Search..." : ""}
          className={`${
            isExpanded ? 'w-full px-4' : 'w-0 opacity-0'
          } py-2 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm transition-all duration-300`}
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-label="Search products"
        />
        <button 
          type={isExpanded ? "submit" : "button"}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-cyan-600 transition-colors ${
            !isExpanded ? 'right-0' : ''
          }`}
          onClick={handleSearchButtonClick}
          aria-label={isExpanded ? "Submit search" : "Open search"}
        >
          <SearchIcon className={isExpanded ? "w-4 h-4" : "w-6 h-6"} />
        </button>
        {isExpanded && isMobile && (
          <button
            type="button"
            onClick={handleClearClick}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </form>
    </div>
  );
});

// Set display name for better debugging
SearchBar.displayName = 'SearchBar';

export default SearchBar;