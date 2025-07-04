import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }) {
  return (
    <Link 
      href={`/products/${product.slug}`}
      className="block hover:no-underline group"
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <div className="h-48 bg-gray-100 overflow-hidden relative">
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400">
              {product.name} Image
            </span>
          </div>
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <span className="text-sm text-blue-600 font-semibold">{product.category}</span>
          <h2 className="text-lg font-bold mt-1 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h2>
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">{product.description}</p>
          <div className="mt-3">
            <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            <div className="mt-2 text-blue-600 text-sm font-medium flex items-center">
              View Details 
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
