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
              className="text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
            >
              View All →
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
