'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import brands from '@/data/brands';

export default function BrandsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Get unique categories
  const categories = ['All', ...new Set(brands.map(brand => brand.category))];
  
  // Filter brands based on active category
  const filteredBrands = activeCategory === 'All' 
    ? brands 
    : brands.filter(brand => brand.category === activeCategory);
    
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-0 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Trusted Brands</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We partner with the world&apos;s leading technology brands to bring you the best products and solutions.
          </p>
        </div>
      </section>
      
      {/* Category Filter */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 overflow-x-auto">
          <div className="flex space-x-2 md:space-x-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Brands Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {filteredBrands.map((brand) => (
            <Link 
              href={brand.website} 
              key={brand.name}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-cyan-100 flex flex-col items-center"
            >
              <div className="h-24 w-full mb-4 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain object-center transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                  />
                </div>
              </div>
              <h3 className="text-center font-medium text-gray-800 group-hover:text-cyan-600 transition-colors">
                {brand.name}
              </h3>
              <p className="text-xs text-gray-500 text-center mt-1">{brand.category}</p>
            </Link>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-50 to-blue-50 py-0 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Become a Partner</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Interested in partnering with us? Contact our team to explore partnership opportunities.
          </p>
          <Link 
            href="/contact"
            className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
