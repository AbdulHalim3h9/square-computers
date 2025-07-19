import { useState } from 'react';
import { ResponsiveTable } from '../shared/ResponsiveTable';
import { CustomerForm } from './CustomerForm';

export const CustomersTable = ({ customers, onUpdateCustomer }) => {
  const [editingCustomer, setEditingCustomer] = useState(null);

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
  };

  const handleSave = (customerData) => {
    onUpdateCustomer(customerData);
    setEditingCustomer(null);
  };

  const columns = [
    {
      key: 'name',
      header: 'Name',
      renderCell: (item) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-medium text-xs sm:text-sm">
              {item.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="ml-2 sm:ml-4">
            <div className="text-sm font-medium text-gray-900">{item.name}</div>
            <div className="text-xs sm:text-sm text-gray-500">{item.phone}</div>
          </div>
        </div>
      ),
      renderMobileTitle: (item) => item.name,
      className: 'min-w-[200px]',
    },
    {
      key: 'phone',
      header: 'Phone',
      renderCell: (item) => (
        <div className="text-sm text-gray-700">
          {item.phone || '—'}
        </div>
      ),
      className: 'hidden md:table-cell',
    },
    {
      key: 'address',
      header: 'Address',
      renderCell: (item) => (
        <div className="text-sm text-gray-700 line-clamp-2">
          {item.address || '—'}
        </div>
      ),
      className: 'hidden lg:table-cell',
    },
    {
      key: 'actions',
      header: '',
      renderCell: (item) => (
        <button 
          onClick={() => handleEdit(item)}
          className="text-indigo-600 hover:text-indigo-900 text-sm whitespace-nowrap"
        >
          Edit
        </button>
      ),
      cellClassName: 'text-right',
    },
  ];

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Customers</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          View and manage customer information
        </p>
      </div>
      
      <div className="border-t border-gray-200">
        <ResponsiveTable 
          columns={columns} 
          data={customers} 
          keyField="id"
          className="min-w-full divide-y divide-gray-200"
        />
      </div>

      {/* Edit Customer Modal */}
      {editingCustomer && (
        <CustomerForm
          initialData={editingCustomer}
          onSave={handleSave}
          onCancel={() => setEditingCustomer(null)}
        />
      )}
    </div>
  );
};

export default CustomersTable;
