'use client';

import BlogCard from './BlogCard';
import Link from 'next/link';

export default function BlogList({ blogs, title = 'Latest Blogs', showViewAll = true }) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="sm:container mx-auto px-6 sm:px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {showViewAll && (
            <Link 
              href="/blog" 
              className="group inline-flex items-center px-4 py-2 text-sm font-medium rounded-full text-white bg-gradient-to-r from-cyan-600 to-cyan-800 hover:from-cyan-700 hover:to-cyan-900 transition-all duration-300 transform hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              View All
              <svg className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          )}
        </div>
        
        {/* Single row layout */}
        <div className="relative">
          <div className="flex overflow-x-auto pb-4 -mx-2 no-scrollbar">
            <div className="flex space-x-4 md:space-x-6 px-2">
              {blogs.map((blog) => (
                <div key={blog.id} className="w-64 sm:w-72 md:w-80 lg:w-96 xl:w-[28rem] 2xl:w-[32rem] flex-shrink-0">
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>
          </div>
        </div>
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
