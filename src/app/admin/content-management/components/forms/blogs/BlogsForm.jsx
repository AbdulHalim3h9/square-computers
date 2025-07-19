'use client';

import { useState } from 'react';
import { Plus, Trash2, Edit, Eye, Check } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';

// Import the popup form with no SSR
const PopupBlogForm = dynamic(
  () => import('./PopupBlogForm'),
  { ssr: false }
);

// Mock data - replace with API calls in a real application
const mockBlogs = [
  {
    id: '1',
    title: 'Getting Started with Web Development',
    slug: 'getting-started-with-web-development',
    excerpt: 'Learn the basics of web development',
    content: '<p>This is a sample blog post about web development.</p>',
    thumbnail: '/images/blog/placeholder.jpg',
    images: ['/images/blog/placeholder.jpg'],
    status: 'published',
    createdAt: '2025-07-01T10:00:00Z',
    updatedAt: '2025-07-01T10:00:00Z',
  },
];

export default function BlogsForm() {
  // State
  const [blogs, setBlogs] = useState(mockBlogs);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  // Generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-');
  };

  // Handle form submission from popup
  const handleSubmit = (data) => {
    const timestamp = new Date().toISOString();
    
    if (editingBlog) {
      // Update existing blog
      setBlogs(prev => 
        prev.map(blog => 
          blog.id === editingBlog.id
            ? { 
                ...data, 
                id: editingBlog.id,
                updatedAt: timestamp,
                createdAt: blog.createdAt || timestamp
              }
            : blog
        )
      );
      toast.success('Blog post updated successfully');
    } else {
      // Create new blog
      const newBlog = {
        ...data,
        id: Date.now().toString(),
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      setBlogs(prev => [newBlog, ...prev]);
      toast.success('Blog post created successfully');
    }
    
    // Close the form
    setEditingBlog(null);
    setIsFormOpen(false);
  };

  // Delete a blog post
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      setBlogs(prev => prev.filter(blog => blog.id !== id));
      toast.success('Blog post deleted successfully');
    }
  };

  // Toggle blog status
  const toggleStatus = (id) => {
    setBlogs(prev =>
      prev.map(blog =>
        blog.id === id
          ? { 
              ...blog, 
              status: blog.status === 'published' ? 'draft' : 'published',
              updatedAt: new Date().toISOString()
            }
          : blog
      )
    );
    toast.success('Blog post status updated');
  };
  
  // Open form for editing
  const openEditForm = (blog) => {
    setEditingBlog(blog);
    setIsFormOpen(true);
  };
  
  // Open form for new post
  const openNewForm = () => {
    setEditingBlog(null);
    setIsFormOpen(true);
  };
  
  // Close form
  const closeForm = () => {
    setEditingBlog(null);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <button
          onClick={openNewForm}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Blog Post
        </button>
      </div>

      {/* Blog Posts List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {blogs.length === 0 ? (
            <li className="px-4 py-6 text-center text-gray-500">
              No blog posts found. Create your first blog post!
            </li>
          ) : (
            blogs.map((blog) => (
              <li key={blog.id} className="hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        blog.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {blog.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                      <p className="text-sm font-medium text-blue-600 truncate">
                        {blog.title}
                      </p>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex space-x-2">
                      <button
                        type="button"
                        onClick={() => toggleStatus(blog.id)}
                        className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        title={blog.status === 'published' ? 'Set as Draft' : 'Publish'}
                      >
                        {blog.status === 'published' ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <Check className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => openEditForm(blog)}
                        className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(blog.id)}
                        className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {blog.excerpt || 'No excerpt provided'}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        Last updated on{' '}
                        <time dateTime={blog.updatedAt}>
                          {format(new Date(blog.updatedAt), 'MMM d, yyyy')}
                        </time>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Popup Form */}
      <PopupBlogForm
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={handleSubmit}
        initialData={editingBlog}
      />
    </div>
  );
}
