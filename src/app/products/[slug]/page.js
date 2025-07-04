import React from 'react';
import Image from 'next/image';
import Link from 'next/link.js';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/data/products';

export async function generateMetadata({ params }) {
  const product = getProductBySlug(params.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found - Square Computers',
    };
  }

  return {
    title: `${product.name} - Square Computers`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{
        url: product.image,
        width: 800,
        height: 600,
        alt: product.name,
      }],
    },
  };
}

export default function ProductDetailPage({ params }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/" className="text-gray-700 hover:text-blue-600" legacyBehavior>
                  <a>Home</a>
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <Link href="/products" className="ml-1 text-gray-700 hover:text-blue-600 md:ml-2" legacyBehavior>
                    <a>Products</a>
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <span className="ml-1 text-gray-500 md:ml-2">{product.name}</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Product Grid */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-6">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <div className="aspect-w-1 aspect-h-1 w-full">
                    <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">{product.name} Main Image</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((img, index) => (
                    <div key={index} className="bg-gray-100 rounded-md overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500">
                      <div className="w-full h-20 bg-gray-200 flex items-center justify-center">
                        <span className="text-xs text-gray-500">Image {index + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                  <p className="text-blue-600 text-xl font-medium mt-2">${product.price.toFixed(2)}</p>
                  <div className="mt-4">
                    <span className="text-sm bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded">
                      {product.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-lg font-medium text-gray-900">Description</h2>
                  <p className="text-gray-600">{product.description}</p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-lg font-medium text-gray-900">Key Features</h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {product.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium">
                      Add to Cart
                    </button>
                    <button className="p-3 text-gray-600 hover:text-blue-600 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Specifications */}
            <div className="border-t border-gray-200 px-6 py-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex">
                    <span className="text-gray-600 font-medium w-40 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  const products = require('@/data/products').products;
  return products.map((product) => ({
    slug: product.slug,
  }));
}
