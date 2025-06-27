import React from 'react';
import Link from 'next/link';
import { products } from '@/data/products';

export const metadata = {
  title: 'Products - Square Computers',
  description: 'Browse our wide range of computer products and accessories',
};

export default function ProductsPage() {

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">Our Products</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/products/${product.slug}`}
              className="block hover:no-underline group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <span className="text-gray-500">{product.name} Image</span>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <span className="text-sm text-blue-600 font-semibold">{product.category}</span>
                  <h2 className="text-xl font-bold mt-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 mt-2 flex-grow">{product.description}</p>
                  <div className="mt-4">
                    <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <div className="mt-3 text-blue-600 font-medium">View Details →</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
