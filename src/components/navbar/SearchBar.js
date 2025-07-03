'use client';

import { useRef, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SearchBar = ({ isSearchExpanded, setIsSearchExpanded, searchQuery, setSearchQuery }) => {
  const router = useRouter();
  const searchInputRef = useRef(null);
  const searchFormRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  return (
    <div 
      className={`flex-1 px-2 sm:px-4 transition-all duration-300 ${
        isSearchExpanded ? 'absolute left-16 right-16 z-50' : 'relative md:mr-2'
      } ${!isSearchExpanded ? 'mr-2' : ''}`}
    >
      <form 
        ref={searchFormRef}
        onSubmit={handleSearch} 
        className={`search-container ${isSearchExpanded ? 'w-full' : 'md:w-full'}`}
        onClick={(e) => {
          if (window.innerWidth < 768) {
            e.stopPropagation();
            if (!isSearchExpanded) {
              setIsSearchExpanded(true);
            }
          }
        }}
      >
        <input
          ref={searchInputRef}
          type="text"
          placeholder={isSearchExpanded ? "Search products, services..." : "Search..."}
          className={`search-input ${isSearchExpanded ? 'w-full' : 'w-24 md:w-full'}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onBlur={() => {
            if (window.innerWidth < 768) {
              setTimeout(() => {
                if (searchQuery.trim() === '') {
                  setIsSearchExpanded(false);
                }
              }, 200);
            }
          }}
        />
        <button 
          type="submit"
          className={`search-button ${isSearchExpanded ? 'block' : 'hidden md:block'}`}
        >
          <SearchIcon className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
