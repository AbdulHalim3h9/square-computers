'use client';

import BlogCard from './BlogCard';
import Link from 'next/link';

export default function BlogList({ blogs, title = 'Latest Blogs', showViewAll = true }) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
          {showViewAll && (
            <Link 
              href="/blog" 
              className="hidden sm:block text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
            >
              View All →
            </Link>
          )}
        </div>
        
        {/* Mobile horizontal scrollable list */}
        <div className="sm:hidden relative">
          <div className="flex overflow-x-auto pb-6 -mx-4 px-4 no-scrollbar">
            <div className="flex space-x-4">
              {blogs.map((blog) => (
                <div key={blog.id} className="w-40 flex-shrink-0">
                  <BlogCard blog={blog} />
                </div>
              ))}
              {showViewAll && (
                <div className="w-40 flex-shrink-0">
                  <Link 
                    href="/blog"
                    className="h-full flex items-center justify-center bg-white rounded-xl shadow-md p-4 text-cyan-600 hover:bg-gray-50 transition-colors border-2 border-dashed border-gray-200"
                  >
                    <div className="text-center">
                      <div className="text-lg font-bold">View All</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Desktop grid layout */}
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
        
        {/* Mobile View All button (hidden on larger screens) */}
        {showViewAll && (
          <div className="mt-6 text-center sm:hidden">
            <Link 
              href="/blog" 
              className="inline-block px-6 py-3 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors"
            >
              View All Blog Posts
            </Link>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
