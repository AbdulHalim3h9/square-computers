'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Button from '@/components/ui/Button';
import AdminPageLayout from '@/components/admin/AdminPageLayout';
import { ActionBar, MobileFloatingActionButton } from '@/components/admin/ActionBar';

// Import components
import StatsCards, { StatCard } from './components/StatsCards';
import SalesTable from './components/SalesTable';
import DuesTable from './components/DuesTable';
import CustomersTable from './components/CustomersTable';
import NewSaleForm from './components/NewSaleForm';

// Mock data
const salesData = [
  { id: 1, customer: 'John Doe', amount: 1250, date: '2025-07-10', status: 'Paid' },
  { id: 2, customer: 'Jane Smith', amount: 850, date: '2025-07-09', status: 'Paid' },
  { id: 3, customer: 'Acme Inc', amount: 4200, date: '2025-07-08', status: 'Pending' },
  { id: 4, customer: 'Bob Johnson', amount: 320, date: '2025-07-07', status: 'Partial' },
  { id: 5, customer: 'Alice Williams', amount: 1500, date: '2025-07-06', status: 'Paid' },
];

const duesData = [
  { id: 1, customer: 'Acme Inc', total: 10000, paid: 6000, due: 4000, dueDate: '2025-07-25' },
  { id: 2, customer: 'XYZ Corp', total: 5000, paid: 2000, due: 3000, dueDate: '2025-07-20' },
  { id: 3, customer: 'ABC Ltd', total: 8000, paid: 5000, due: 3000, dueDate: '2025-07-15' },
];

const customerData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 (555) 123-4567', totalPurchases: 5, totalSpent: 3250 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 (555) 987-6543', totalPurchases: 3, totalSpent: 1850 },
  { id: 3, name: 'Acme Inc', email: 'acme@example.com', phone: '+1 (555) 555-1234', totalPurchases: 12, totalSpent: 12500 },
  { id: 4, name: 'Bob Johnson', email: 'bob@example.com', phone: '+1 (555) 222-3333', totalPurchases: 2, totalSpent: 720 },
  { id: 5, name: 'Alice Williams', email: 'alice@example.com', phone: '+1 (555) 444-5555', totalPurchases: 7, totalSpent: 4250 },
];

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('sales');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!authStatus || !user?.isAdmin) {
      router.push('/auth/login');
    } else {
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  }, [router]);

  // Filter data based on search query
  const filteredSales = salesData.filter(sale => 
    sale.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sale.id.toString().includes(searchQuery) ||
    sale.amount.toString().includes(searchQuery)
  );

  const filteredDues = duesData.filter(due => 
    due.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    due.total.toString().includes(searchQuery) ||
    due.due.toString().includes(searchQuery)
  );

  const filteredCustomers = customerData.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );

  // Calculate stats
  const stats = {
    totalSales: salesData.length,
    totalRevenue: salesData.reduce((sum, sale) => sum + sale.amount, 0),
    totalCustomers: customerData.length,
    totalProducts: 42, // This would come from your products data
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminPageLayout 
      title="Dashboard"
      description="Welcome back! Here's what's happening with your store today."
      actionButton={
        <Button
          onClick={() => setActiveTab('new-sale')}
          className="hidden sm:flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Sale
        </Button>
      }
    >
      <MobileFloatingActionButton 
        onClick={() => setActiveTab('new-sale')} 
        icon={Plus} 
        label="New Sale" 
      />

      {/* Stats */}
      <div className="mb-8">
        <StatsCards stats={stats} />
      </div>

      {/* Tabs */}
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="sales">Recent Sales</TabsTrigger>
          <TabsTrigger value="dues">Dues</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <ActionBar
            searchPlaceholder="Search..."
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            onSearch={setSearchQuery}
            className="mb-6"
          />
          <SalesTable sales={filteredSales} />
        </TabsContent>

        <TabsContent value="dues">
          <DuesTable dues={filteredDues} />
        </TabsContent>

        <TabsContent value="customers">
          <CustomersTable customers={filteredCustomers} />
        </TabsContent>

        <TabsContent value="new-sale">
          <NewSaleForm onCancel={() => setActiveTab('sales')} />
        </TabsContent>
      </Tabs>
    </AdminPageLayout>
  );
}
