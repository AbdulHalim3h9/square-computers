'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import { toast } from 'react-hot-toast';

const NoticesPage = () => {
  const router = useRouter();
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    isActive: true,
    activeTill: '',
  });

  // Fetch notices
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/admin/notices');
        // const data = await response.json();
        // setNotices(data);
        
        // Mock data for now
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);
        
        setNotices([
          { 
            id: 1, 
            title: 'System Maintenance', 
            content: 'Scheduled maintenance on July 15th', 
            isActive: true, 
            createdAt: '2025-07-10',
            activeTill: nextWeek.toISOString().split('T')[0]
          },
          { 
            id: 2, 
            title: 'New Feature Update', 
            content: 'New dashboard features are now available', 
            isActive: true, 
            createdAt: '2025-07-05',
            activeTill: '2025-07-31'
          },
        ]);
      } catch (error) {
        console.error('Error fetching notices:', error);
        toast.error('Failed to load notices');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      // Replace with actual API call
      // const response = await fetch('/api/admin/notices', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // const newNotice = await response.json();
      
      // Mock response
      const newNotice = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setNotices([newNotice, ...notices]);
      toast.success('Notice created successfully');
      setFormData({ 
        title: '', 
        content: '', 
        isActive: true, 
        activeTill: '' 
      });
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error creating notice:', error);
      toast.error('Failed to create notice');
    }
  };

  const toggleNoticeStatus = async (id, currentStatus) => {
    try {
      // Replace with actual API call
      // await fetch(`/api/admin/notices/${id}`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ isActive: !currentStatus })
      // });
      
      setNotices(notices.map(notice => 
        notice.id === id ? { ...notice, isActive: !currentStatus } : notice
      ));
      
      toast.success(`Notice ${currentStatus ? 'deactivated' : 'activated'} successfully`);
    } catch (error) {
      console.error('Error updating notice status:', error);
      toast.error('Failed to update notice status');
    }
  };

  const deleteNotice = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) return;
    
    try {
      // Replace with actual API call
      // await fetch(`/api/admin/notices/${id}`, { method: 'DELETE' });
      
      setNotices(notices.filter(notice => notice.id !== id));
      toast.success('Notice deleted successfully');
    } catch (error) {
      console.error('Error deleting notice:', error);
      toast.error('Failed to delete notice');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Notices</h1>
          <p className="text-gray-600">Manage and publish important notices</p>
        </div>
        <Button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white"
        >
          <Plus className="w-4 h-4" />
          {isFormOpen ? 'Cancel' : 'New Notice'}
        </Button>
      </div>

      {/* Create Notice Form */}
      {isFormOpen && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Create New Notice</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter notice title"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter notice content"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="activeTill" className="block text-sm font-medium text-gray-700 mb-1">
                Active Till <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="activeTill"
                name="activeTill"
                value={formData.activeTill}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Publish immediately</span>
              </label>
              <div className="space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsFormOpen(false)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  Publish Notice
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Notices List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Active Till
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    Loading notices...
                  </td>
                </tr>
              ) : notices.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    No notices found. Create your first notice above.
                  </td>
                </tr>
              ) : (
                notices.map((notice) => (
                  <tr key={notice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        onClick={() => toggleNoticeStatus(notice.id, notice.isActive)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer ${
                          notice.isActive 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {notice.isActive ? (
                          <>
                            <Check className="w-3.5 h-3.5 mr-1" /> Active
                          </>
                        ) : (
                          <>
                            <X className="w-3.5 h-3.5 mr-1" /> Inactive
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{notice.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 line-clamp-2">{notice.content}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`${new Date(notice.activeTill) < new Date() ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                        {notice.activeTill ? new Date(notice.activeTill).toLocaleDateString() : 'N/A'}
                        {new Date(notice.activeTill) < new Date() && ' (Expired)'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => deleteNotice(notice.id)}
                        className="text-red-600 hover:text-red-900 mr-4"
                        title="Delete notice"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setFormData({
                            title: notice.title,
                            content: notice.content,
                            isActive: notice.isActive,
                            activeTill: notice.activeTill || '',
                          });
                          setIsFormOpen(true);
                        }}
                        className="text-cyan-600 hover:text-cyan-900"
                        title="Edit notice"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NoticesPage;
