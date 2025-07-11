'use client';

import { Fragment } from 'react';
import { ShoppingBag as FiShoppingBag, User as FiUser, DollarSign as FiDollarSign, Package as FiPackage, CheckCircle as FiCheckCircle, AlertCircle as FiAlertCircle, Clock as FiClock} from 'lucide-react';

const activity = [
  {
    id: 1,
    type: 'order',
    title: 'New order received',
    description: 'Order #1234 for $1,234.00',
    time: '2 minutes ago',
    icon: FiShoppingBag,
    iconBackground: 'bg-blue-500',
    read: false,
  },
  {
    id: 2,
    type: 'user',
    title: 'New customer registered',
    description: 'John Doe (john@example.com)', 
    time: '1 hour ago',
    icon: FiUser,
    iconBackground: 'bg-green-500',
    read: false,
  },
  {
    id: 3,
    type: 'payment',
    title: 'Payment received',
    description: 'Payment of $1,234.00 for order #1234',
    time: '3 hours ago',
    icon: FiDollarSign,
    iconBackground: 'bg-yellow-500',
    read: true,
  },
  {
    id: 4,
    type: 'inventory',
    title: 'Low stock alert',
    description: 'Only 2 items left for Product XYZ',
    time: '5 hours ago',
    icon: FiPackage,
    iconBackground: 'bg-red-500',
    read: true,
  },
  {
    id: 5,
    type: 'order',
    title: 'Order shipped',
    description: 'Order #1233 has been shipped',
    time: '1 day ago',
    icon: FiCheckCircle,
    iconBackground: 'bg-indigo-500',
    read: true,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function RecentActivity() {
  return (
    <div className="mt-8">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Activity</h3>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {activity.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <div className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <span className={classNames(
                          item.iconBackground,
                          'h-8 w-8 rounded-full flex items-center justify-center'
                        )}>
                          <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 px-4">
                        <div>
                          <p className={classNames(
                            'text-sm font-medium',
                            item.read ? 'text-gray-900' : 'text-blue-600'
                          )}>
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                        <div className="mt-2 flex
                        ">
                          <div className="flex items-center text-sm text-gray-500">
                            <FiClock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            <p>{item.time}</p>
                          </div>
                        </div>
                      </div>
                      {!item.read && (
                        <div className="flex-shrink-0">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            New
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            View all activity
          </button>
        </div>
      </div>
    </div>
  );
}
