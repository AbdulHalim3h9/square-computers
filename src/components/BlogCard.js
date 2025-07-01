'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function BlogCard({ blog }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link href={`/blog/${blog.slug}`} className="block">
        <div className="relative h-48 w-full">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6">
          <div className="text-sm text-cyan-600 font-medium mb-2">{blog.category}</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {blog.excerpt}
          </p>
          <div className="flex items-center text-sm text-gray-500">
            <span>{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="mx-2">•</span>
            <span>{blog.author}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
