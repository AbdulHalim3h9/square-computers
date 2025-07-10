'use client';

import { DollarSign as FiDollarSign, ShoppingCart as FiShoppingCart, Users as FiUsers, TrendingUp as FiTrendingUp, Package as FiPackage, CreditCard as FiCreditCard, AlertCircle as FiAlertCircle} from 'lucide-react';

const stats = [
  { 
    id: 1, 
    name: 'Total Revenue', 
    stat: '$24,780.00', 
    icon: FiDollarSign, 
    change: '+12%', 
    changeType: 'increase',
    description: 'Last 30 days' 
  },
  { 
    id: 2, 
    name: 'Total Orders', 
    stat: '1,234', 
    icon: FiShoppingCart, 
    change: '+5.4%', 
    changeType: 'increase',
    description: 'Last 30 days' 
  },
  { 
    id: 3, 
    name: 'Active Customers', 
    stat: '2,145', 
    icon: FiUsers, 
    change: '+3.2%', 
    changeType: 'increase',
    description: 'Since last month' 
  },
  { 
    id: 4, 
    name: 'Products in Stock', 
    stat: '1,234', 
    icon: FiPackage, 
    change: '-2.1%', 
    changeType: 'decrease',
    description: 'Low stock: 23 items' 
  },
];

export default function DashboardStats() {
  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">Overview</h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
            >
              <dt>
                <div className="absolute bg-blue-500 rounded-md p-3">
                  <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
              </dt>
              <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {item.changeType === 'increase' ? (
                    <FiTrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                  ) : (
                    <FiTrendingUp className="self-center flex-shrink-0 h-4 w-4 text-red-500 transform rotate-180" />
                  )}
                  <span className="sr-only">
                    {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by
                  </span>
                  {item.change}
                </p>
                <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                      View all<span className="sr-only"> {item.name} stats</span>
                    </a>
                  </div>
                </div>
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
