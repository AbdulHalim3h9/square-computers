'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter, Download, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ActionBar({
  searchPlaceholder = 'Search...',
  onSearch,
  onAdd,
  addLabel = 'Add New',
  filterOptions = [],
  onFilterChange,
  onExport,
  className = '',
  rightContent,
  searchValue = '',
  onSearchChange,
}) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    onFilterChange?.(filter);
  };

  return (
    <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 ${className}`}>
      <div className="flex-1 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder={searchPlaceholder}
            className={`pl-10 ${isSearchExpanded ? 'block' : 'hidden sm:block'}`}
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch?.(e.target.value)}
          />
          <Button
            variant="outline"
            size="icon"
            className="sm:hidden"
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {filterOptions.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="whitespace-nowrap">
                <Filter className="mr-2 h-4 w-4" />
                {selectedFilter?.label || 'Filter'}
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {filterOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => handleFilterSelect(option)}
                  className={selectedFilter?.value === option.value ? 'bg-gray-100' : ''}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {onExport && (
          <Button variant="outline" onClick={onExport}>
            <Download className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        )}
      </div>

      <div className="flex items-center gap-3">
        {rightContent}
        {onAdd && (
          <Button onClick={onAdd} className="whitespace-nowrap">
            <Plus className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">{addLabel}</span>
          </Button>
        )}
      </div>
    </div>
  );
}

export function MobileFloatingActionButton({ onClick, icon: Icon = Plus, label }) {
  return (
    <div className="fixed bottom-6 right-6 z-40 md:hidden">
      <Button
        onClick={onClick}
        size="lg"
        className="rounded-full h-14 w-14 p-0 shadow-lg"
        aria-label={label}
      >
        <Icon className="h-6 w-6" />
      </Button>
    </div>
  );
}
