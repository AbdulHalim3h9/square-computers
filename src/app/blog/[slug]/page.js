import { getBlogBySlug } from '@/data/blogs';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogPost({ params }) {
  const blog = getBlogBySlug(params.slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <Link href="/blog" className="text-cyan-600 hover:underline">
            ← Back to all posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/blog" className="inline-flex items-center text-cyan-600 hover:underline mb-8">
        ← Back to all posts
      </Link>
      
      <header className="mb-12">
        <div className="text-cyan-600 font-medium mb-4">{blog.category}</div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{blog.title}</h1>
        <div className="flex items-center text-gray-500 text-sm">
          <span>By {blog.author}</span>
          <span className="mx-2">•</span>
          <time dateTime={blog.date}>
            {new Date(blog.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </time>
        </div>
      </header>

      <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-12">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div 
        className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {blog.images && blog.images.length > 1 && (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {blog.images.slice(1).map((image, index) => (
            <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={image}
                alt={`${blog.title} - Image ${index + 2}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

export async function generateStaticParams() {
  // This function tells Next.js which paths to pre-render at build time
  const { blogPosts } = await import('@/data/blogs');
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}
