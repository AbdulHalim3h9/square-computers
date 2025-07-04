import { useState } from 'react';

const FilterSection = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
    <div className="space-y-2">
      {children}
    </div>
  </div>
);

const FilterCheckbox = ({ id, label, value, checked, onChange, count }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        checked={checked}
        onChange={onChange}
        value={value}
      />
      <label htmlFor={id} className="ml-2 text-sm text-gray-700">
        {label}
      </label>
    </div>
    {count !== undefined && (
      <span className="text-xs text-gray-500">{count}</span>
    )}
  </div>
);

export default function FilterSidebar({ filters, onFilterChange }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);

  const handleCategoryChange = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newCategories);
    onFilterChange({ categories: newCategories, priceRange });
  };

  const handlePriceChange = (min, max) => {
    const newRange = [min, max];
    setPriceRange(newRange);
    onFilterChange({ categories: selectedCategories, priceRange: newRange });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Filters</h2>
      
      <FilterSection title="Categories">
        {filters.categories.map(({ name, count }) => (
          <FilterCheckbox
            key={name}
            id={`category-${name}`}
            label={`${name} (${count})`}
            value={name}
            checked={selectedCategories.includes(name)}
            onChange={() => handleCategoryChange(name)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Price Range">
        <div className="px-2">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}+</span>
          </div>
          <div className="relative">
            <div className="h-1 bg-gray-200 rounded-full">
              <div 
                className="h-1 bg-blue-600 rounded-full" 
                style={{
                  width: '100%',
                  left: '0%',
                }}
              />
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(Number(e.target.value), priceRange[1])}
              className="absolute w-full h-1 -top-1 appearance-none pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto"
            />
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(priceRange[0], Number(e.target.value))}
              className="absolute w-full h-1 -top-1 appearance-none pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto"
            />
          </div>
        </div>
      </FilterSection>

      <button 
        onClick={() => {
          setSelectedCategories([]);
          setPriceRange([0, 5000]);
          onFilterChange({ categories: [], priceRange: [0, 5000] });
        }}
        className="mt-4 text-sm text-blue-600 hover:text-blue-700"
      >
        Clear all filters
      </button>
    </div>
  );
}
