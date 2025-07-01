import { blogPosts } from '@/data/blogs';
import BlogList from '@/components/BlogList';

export default function BlogPage() {
  // Sort blogs by date (newest first)
  const sortedBlogs = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return (
    <main>
      <section className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
            Insights, news, and updates about technology, business, and innovation.
          </p>
        </div>
      </section>
      
      <BlogList blogs={sortedBlogs} title="All Articles" showViewAll={false} />
    </main>
  );
}
