'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Upload as UploadIcon, Image as ImageIcon, Trash2, Eye } from 'lucide-react';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

export default function PopupBlogForm({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isLoading = false
}) {
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    status: 'draft',
    thumbnail: null,
    images: [],
  });
  
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isPreview, setIsPreview] = useState(false);
  
  // Refs
  const thumbnailInputRef = useRef(null);
  const imagesInputRef = useRef(null);

  // Initialize form with initialData when it changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        slug: initialData.slug || '',
        excerpt: initialData.excerpt || '',
        content: initialData.content || '',
        status: initialData.status || 'draft',
        thumbnail: initialData.thumbnail || null,
        images: initialData.images || [],
      });
      setThumbnailPreview(initialData.thumbnail || '');
      setImagePreviews(initialData.images || []);
    } else {
      resetForm();
    }
  }, [initialData]);

  // Generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-');
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'title' && { slug: generateSlug(value) })
    }));
  };

  // Handle thumbnail upload
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Thumbnail image must be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, thumbnail: file }));
      setThumbnailPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle multiple images upload
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Filter out non-image files
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length !== files.length) {
      alert('Only image files are allowed');
    }

    // Process each image
    const newImagePreviews = [];
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImagePreviews.push(reader.result);
        if (newImagePreviews.length === imageFiles.length) {
          setImagePreviews(prev => [...prev, ...newImagePreviews]);
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...imageFiles]
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove an image
  const removeImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      status: 'draft',
      thumbnail: null,
      images: [],
    });
    setThumbnailPreview('');
    setImagePreviews([]);
    setIsPreview(false);
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
    if (imagesInputRef.current) imagesInputRef.current.value = '';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {initialData ? 'Edit Blog Post' : 'Add New Blog Post'}
            </h3>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setIsPreview(!isPreview)}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isPreview ? (
                  <>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  onClose();
                }}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {isPreview ? (
            <div className="prose max-w-none">
              <h1 className="text-3xl font-bold mb-4">{formData.title}</h1>
              {thumbnailPreview && (
                <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={thumbnailPreview}
                    alt={formData.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div dangerouslySetInnerHTML={{ __html: formData.content }} />
              
              {imagePreviews.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {imagePreviews.map((img, idx) => (
                      <div key={idx} className="relative h-40 rounded-lg overflow-hidden">
                        <Image
                          src={img}
                          alt={`Gallery image ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter blog post title"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                    URL Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                    placeholder="url-slug"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                  Excerpt
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="A short summary of your blog post"
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={8}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your blog post content here..."
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Supports basic HTML. For rich text editing, consider integrating a WYSIWYG editor.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thumbnail Image <span className="text-red-500">*</span>
                </label>
                <div 
                  className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={() => document.getElementById('thumbnail-upload').click()}
                >
                  <div className="space-y-1 text-center w-full">
                    {thumbnailPreview ? (
                      <div className="relative w-full h-40">
                        <Image
                          src={thumbnailPreview}
                          alt="Thumbnail preview"
                          fill
                          className="object-contain"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setThumbnailPreview('');
                            setFormData(prev => ({ ...prev, thumbnail: null }));
                            if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-center">
                          <UploadIcon className="h-10 w-10 text-gray-400" />
                        </div>
                        <div className="flex text-sm text-gray-600 justify-center">
                          <span className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                            Upload a file
                          </span>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG up to 2MB
                        </p>
                      </>
                    )}
                    <input
                      id="thumbnail-upload"
                      ref={thumbnailInputRef}
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      required={!thumbnailPreview}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Images
                </label>
                <div 
                  className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={() => document.getElementById('images-upload').click()}
                >
                  <div className="space-y-1 text-center w-full">
                    {imagePreviews.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {imagePreviews.map((img, idx) => (
                          <div key={idx} className="relative h-32">
                            <Image
                              src={img}
                              alt={`Preview ${idx + 1}`}
                              fill
                              className="object-cover rounded-md"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage(idx);
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-md">
                          <div className="text-center">
                            <UploadIcon className="h-8 w-8 text-gray-400 mx-auto" />
                            <p className="text-xs text-gray-500 mt-1">Add more</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-center">
                          <ImageIcon className="h-10 w-10 text-gray-400" />
                        </div>
                        <div className="flex text-sm text-gray-600 justify-center">
                          <span className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                            Upload files
                          </span>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG up to 5MB each
                        </p>
                      </>
                    )}
                    <input
                      id="images-upload"
                      ref={imagesInputRef}
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      multiple
                      onChange={handleImagesChange}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    onClose();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    'Saving...'
                  ) : initialData ? (
                    'Update Post'
                  ) : (
                    'Create Post'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
