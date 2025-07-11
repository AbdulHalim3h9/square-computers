'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function BlogCard({ blog }) {
  return (
    <div className="h-full bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
      <Link href={`/blog/${blog.slug}`} className="block flex-1 flex flex-col">
        <div className="relative h-24 sm:h-32 md:h-48 w-full">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 10rem, (max-width: 768px) 33vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="p-2 sm:p-3 md:p-6 flex-1 flex flex-col">
          <div className="text-[10px] sm:text-xs md:text-sm text-cyan-600 font-medium mb-0.5 sm:mb-1 md:mb-2 line-clamp-1">
            {blog.category}
          </div>
          <h3 className="text-xs sm:text-sm md:text-base lg:text-xl font-semibold text-gray-900 mb-1 line-clamp-2">
            {blog.title}
          </h3>
          <p className="hidden md:block text-gray-600 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">
            {blog.excerpt}
          </p>
          <div className="mt-auto pt-1 text-[10px] sm:text-xs md:text-sm text-gray-500">
            <div className="truncate">
              <span className="hidden sm:inline">
                {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                <span className="mx-1">•</span>
              </span>
              <span className="truncate">{blog.author}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
