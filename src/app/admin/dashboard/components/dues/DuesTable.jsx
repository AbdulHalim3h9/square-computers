import { Clock } from 'lucide-react';
import { ResponsiveTable } from './ResponsiveTable';

export const DuesTable = ({ dues }) => {
  const columns = [
    {
      key: 'customer',
      header: 'Customer',
      renderCell: (item) => item.customer,
      renderMobileTitle: (item) => item.customer,
      className: 'font-medium',
    },
    {
      key: 'total',
      header: 'Total',
      renderCell: (item) => `$${item.total.toLocaleString()}`,
      className: 'hidden sm:table-cell',
    },
    {
      key: 'paid',
      header: 'Paid',
      renderCell: (item) => `$${item.paid.toLocaleString()}`,
      className: 'hidden md:table-cell',
    },
    {
      key: 'due',
      header: 'Due',
      renderCell: (item) => (
        <span className="font-semibold text-red-600">
          ${item.due.toLocaleString()}
        </span>
      ),
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      renderCell: (item) => (
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-gray-400 mr-1 hidden sm:block" />
          {new Date(item.dueDate).toLocaleDateString()}
        </div>
      ),
      className: 'whitespace-nowrap',
    },
    {
      key: 'actions',
      header: 'Actions',
      renderCell: (item) => (
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-900 text-sm">
            Collect
          </button>
          <button className="text-indigo-600 hover:text-indigo-900 text-sm">
            View
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
        data={dues} 
        keyField="id"
        className="min-w-full divide-y divide-gray-200"
      />
    </div>
  );
};

export default DuesTable;
