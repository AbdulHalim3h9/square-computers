'use client';

import BlogCard from './BlogCard';
import Link from 'next/link';

export default function BlogList({ blogs, title = 'Latest Blogs', showViewAll = true }) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          {showViewAll && (
            <Link 
              href="/blog" 
              className="text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
            >
              View All →
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
