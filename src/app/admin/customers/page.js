'use client';

import CustomersTable from './components/CustomersTable';

// Mock data - replace with actual API calls in production
const mockCustomers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    totalOrders: 5,
    totalSpent: 1250.75,
    joinDate: '2023-01-15',
    lastOrder: '2023-06-20'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 (555) 987-6543',
    totalOrders: 12,
    totalSpent: 3420.50,
    joinDate: '2022-11-05',
    lastOrder: '2023-06-18'
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'robert@example.com',
    phone: '+1 (555) 765-4321',
    totalOrders: 3,
    totalSpent: 845.25,
    joinDate: '2023-03-22',
    lastOrder: '2023-06-15'
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily@example.com',
    phone: '+1 (555) 234-5678',
    totalOrders: 8,
    totalSpent: 2100.00,
    joinDate: '2022-09-10',
    lastOrder: '2023-06-10'
  },
  {
    id: 5,
    name: 'Michael Wilson',
    email: 'michael@example.com',
    phone: '+1 (555) 876-5432',
    totalOrders: 15,
    totalSpent: 4325.75,
    joinDate: '2022-07-18',
    lastOrder: '2023-06-22'
  },
];

export default function CustomersPage() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto">
        <CustomersTable customers={mockCustomers} />
      </div>
    </div>
  );
}
