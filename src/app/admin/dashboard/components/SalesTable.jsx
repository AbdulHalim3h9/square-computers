import { Clock } from 'lucide-react';
import { ResponsiveTable } from './ResponsiveTable';

export const SalesTable = ({ sales }) => {
  const columns = [
    {
      key: 'id',
      header: 'ID',
      renderCell: (item) => `#${item.id}`,
      renderMobileTitle: (item) => `#${item.id} - ${item.customer}`,
      className: 'w-20',
    },
    {
      key: 'customer',
      header: 'Customer',
      renderCell: (item) => item.customer,
      className: 'hidden md:table-cell',
    },
    {
      key: 'amount',
      header: 'Amount',
      renderCell: (item) => `$${item.amount.toLocaleString()}`,
      className: 'whitespace-nowrap',
    },
    {
      key: 'date',
      header: 'Date',
      renderCell: (item) => (
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-gray-400 mr-1 hidden sm:block" />
          {new Date(item.date).toLocaleDateString()}
        </div>
      ),
      className: 'whitespace-nowrap',
    },
    {
      key: 'status',
      header: 'Status',
      renderCell: (item) => (
        <span 
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            item.status === 'Paid' 
              ? 'bg-green-100 text-green-800' 
              : item.status === 'Partial' 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-red-100 text-red-800'
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      renderCell: (item) => (
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-900 text-sm">
            View
          </button>
          <button className="text-indigo-600 hover:text-indigo-900 text-sm">
            Edit
          </button>
        </div>
      ),
      cellClassName: 'text-right',
    },
  ];

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <ResponsiveTable 
        columns={columns} 
        data={sales} 
        keyField="id"
        className="min-w-full divide-y divide-gray-200"
      />
    </div>
  );
};

export default SalesTable;
