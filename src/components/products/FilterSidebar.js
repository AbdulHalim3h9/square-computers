import { useState, useCallback, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const FilterSection = ({ title, children, className = '' }) => (
  <div className={`mb-6 ${className}`}>
    <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

export default function FilterSidebar({ filters = {}, onFilterChange }) {
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);

  // Initialize price range from filters
  useEffect(() => {
    if (filters.priceRange) {
      setPriceRange([Number(filters.priceRange[0]), Number(filters.priceRange[1])]);
      setMinPrice(Number(filters.priceRange[0]));
      setMaxPrice(Number(filters.priceRange[1]));
    }
  }, [filters.priceRange]);

  // Debounce the price range update
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFilterChange) {
        onFilterChange({
          ...filters,
          priceRange: [minPrice, maxPrice]
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [minPrice, maxPrice, filters, onFilterChange]);

  const handleSliderChange = (values) => {
    setPriceRange(values);
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
  };

  const handleMinPriceChange = (e) => {
    const value = Math.min(Number(e.target.value), priceRange[1] - 1);
    setMinPrice(value);
    setPriceRange([value, priceRange[1]]);
  };

  const handleMaxPriceChange = (e) => {
    const value = Math.max(Number(e.target.value), priceRange[0] + 1);
    setMaxPrice(value);
    setPriceRange([priceRange[0], value]);
  };

  const clearFilters = () => {
    setPriceRange([0, 5000]);
    setMinPrice(0);
    setMaxPrice(5000);
    if (onFilterChange) {
      onFilterChange({
        ...filters,
        priceRange: [0, 5000]
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Filters</h2>
        <button 
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
        >
          Clear all
        </button>
      </div>
      
      <FilterSection title="Price Range">
        <div className="space-y-4">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex-1">
              <Label htmlFor="min-price" className="text-sm font-medium text-gray-700 block mb-1">
                Min Price
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="min-price"
                  type="number"
                  min="0"
                  max={priceRange[1] - 1}
                  value={minPrice}
                  onChange={handleMinPriceChange}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex-1">
              <Label htmlFor="max-price" className="text-sm font-medium text-gray-700 block mb-1">
                Max Price
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="max-price"
                  type="number"
                  min={priceRange[0] + 1}
                  max="10000"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                  className="pl-8"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between text-sm text-gray-500">
            <span>${priceRange[0].toLocaleString()}</span>
            <span>${priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </FilterSection>
    </div>
  );
}
