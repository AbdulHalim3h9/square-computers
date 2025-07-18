'use client';

import dynamic from 'next/dynamic';

const BlogList = dynamic(() => import('@/components/BlogList'), { ssr: false });
const { getLatestBlogs } = require('@/data/blogs');

const BlogSection = () => {
  const latestBlogs = getLatestBlogs(3);
  
  return (
    <section className="py-0 sm:py-16 bg-gray-50">
      <div className="sm:container mx-auto">
        {latestBlogs && <BlogList blogs={latestBlogs} />}
      </div>
    </section>
  );
};

export default BlogSection;
