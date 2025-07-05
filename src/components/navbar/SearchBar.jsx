import { useRef, useEffect, useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ isSearchExpanded, setIsSearchExpanded, searchQuery, setSearchQuery }) {
  const router = useRouter();
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
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

  return (
    <div 
      ref={searchContainerRef}
      className={`relative transition-all duration-300 ${isExpanded ? 'px-2 ms-4 w-full' : 'w-auto'}`}
    >
      <form 
        onSubmit={handleSearch} 
        className={`relative flex items-center ${isExpanded ? 'w-full' : 'w-8'}`}
        onClick={(e) => {
          if (!isExpanded) {
            e.preventDefault();
            setIsExpanded(true);
            setIsSearchExpanded(true);
          }
        }}
      >
        <input
          ref={searchInputRef}
          type="text"
          placeholder={isExpanded ? "Search..." : ""}
          className={`${isExpanded ? 'w-full px-4' : 'w-0 opacity-0'} py-2 rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm transition-all duration-300`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            setIsExpanded(true);
            setIsSearchExpanded(true);
          }}
          onBlur={handleBlur}
        />
        <button 
          type={isExpanded ? "submit" : "button"}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-cyan-600 transition-colors ${!isExpanded ? 'right-0' : ''}`}
          onClick={(e) => {
            if (!isExpanded) {
              e.preventDefault();
              setIsExpanded(true);
              setIsSearchExpanded(true);
            }
          }}
        >
          {isExpanded ? (
            <SearchIcon className="w-4 h-4" />
          ) : (
            <SearchIcon className="w-6 h-6" />
          )}
        </button>
        {isExpanded && isMobile && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setSearchQuery('');
              setIsExpanded(false);
              setIsSearchExpanded(false);
            }}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
          </button>
        )}
      </form>
    </div>
  );
}