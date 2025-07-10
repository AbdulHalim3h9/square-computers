'use client';

import dynamic from 'next/dynamic';

const BlogList = dynamic(() => import('@/components/BlogList'), { ssr: false });
const { getLatestBlogs } = require('@/data/blogs');

const BlogSection = () => {
  const latestBlogs = getLatestBlogs(3);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest From Our Blog</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest technology trends, tips, and company news
          </p>
        </div>
        {latestBlogs && <BlogList blogs={latestBlogs} />}
      </div>
    </section>
  );
};

export default BlogSection;
