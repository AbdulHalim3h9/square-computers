import { ResponsiveTable } from './ResponsiveTable';

export const CustomersTable = ({ customers }) => {
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
            <div className="text-xs sm:text-sm text-gray-500">{item.email}</div>
          </div>
        </div>
      ),
      renderMobileTitle: (item) => item.name,
      className: 'min-w-[200px]',
    },
    {
      key: 'contact',
      header: 'Contact',
      renderCell: (item) => item.phone,
      className: 'hidden md:table-cell',
    },
    {
      key: 'purchases',
      header: 'Purchases',
      renderCell: (item) => `${item.totalPurchases} ${item.totalPurchases === 1 ? 'purchase' : 'purchases'}`,
      className: 'whitespace-nowrap',
    },
    {
      key: 'totalSpent',
      header: 'Total Spent',
      renderCell: (item) => `$${item.totalSpent.toLocaleString()}`,
      className: 'whitespace-nowrap font-medium',
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
        data={customers} 
        keyField="id"
        className="min-w-full divide-y divide-gray-200"
      />
    </div>
  );
};

export default CustomersTable;
