'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function BlogCard({ blog }) {
  return (
    <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 w-full">
      <Link href={`/blog/${blog.slug}`} className="block">
        <div className="relative w-full" style={{ paddingTop: '56.25%' }}> {/* 16:9 Aspect Ratio */}
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          </div>
          
          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 md:p-8 text-white">
            <div className="mb-2">
              <span className="inline-block px-2 py-1 text-[10px] sm:text-xs font-medium bg-cyan-600/90 text-white rounded-full">
                {blog.category}
              </span>
            </div>
            
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold line-clamp-2">
              {blog.title}
            </h3>
            
            <div className="flex items-center text-xs text-gray-300">
              <span className="flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
              <span className="mx-2">•</span>
              <span>{blog.author}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
