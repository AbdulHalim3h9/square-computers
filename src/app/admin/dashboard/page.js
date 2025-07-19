'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Calendar, X } from 'lucide-react';
import { format, subDays, isWithinInterval, parseISO } from 'date-fns';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

// UI Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Button from '@/components/ui/Button';
import AdminPageLayout from '@/components/admin/AdminPageLayout';
import { ActionBar, MobileFloatingActionButton } from '@/components/admin/ActionBar';

// Components
import { SalesTable, PopupNewSaleForm } from './components/sales';
import CustomersTable from './components/customers/CustomersTable';

// Mock data - In a real app, this would come from an API
const MOCK_DATA = {
  sales: [
    { 
      id: '1', 
      customer: { id: '1', name: 'আহমেদ করিম' }, 
      amount: 1250, 
      date: '2025-07-10', 
      status: 'Paid',
      items: [
        { type: 'product', description: 'Laptop', quantity: 1, price: 1000 },
        { type: 'service', description: 'Setup', quantity: 1, price: 250 }
      ]
    },
    { 
      id: '2', 
      customer: { id: '2', name: 'ফাতেমা আক্তার' }, 
      amount: 850, 
      date: '2025-07-09', 
      status: 'Paid',
      items: [
        { type: 'product', description: 'Monitor', quantity: 2, price: 350 },
        { type: 'product', description: 'Keyboard', quantity: 1, price: 150 }
      ]
    },
    { 
      id: '3', 
      customer: { id: '3', name: 'আল-আমিন স্টোর' }, 
      amount: 4200, 
      date: '2025-07-08', 
      status: 'Partial',
      items: [
        { type: 'product', description: 'Workstation', quantity: 3, price: 1400 }
      ]
    },
    { 
      id: '4', 
      customer: { id: '4', name: 'করিম উদ্দিন' }, 
      amount: 320, 
      date: '2025-07-07', 
      status: 'Due',
      items: [
        { type: 'service', description: 'Virus Removal', quantity: 1, price: 100 },
        { type: 'product', description: 'Mouse', quantity: 2, price: 110 }
      ]
    },
    { 
      id: '5', 
      customer: { id: '5', name: 'আয়শা সুলতানা' }, 
      amount: 1500, 
      date: '2025-07-06', 
      status: 'Paid',
      items: [
        { type: 'product', description: 'Laptop', quantity: 1, price: 1200 },
        { type: 'service', description: 'Data Transfer', quantity: 1, price: 100 },
        { type: 'product', description: 'Laptop Bag', quantity: 1, price: 200 }
      ]
    },
  ],
  dues: [
    { id: 1, customer: 'আল-আমিন স্টোর', total: 10000, paid: 6000, due: 4000, dueDate: '2025-07-25' },
    { id: 2, customer: 'নিউ টেক সলিউশন', total: 5000, paid: 2000, due: 3000, dueDate: '2025-07-20' },
    { id: 3, customer: 'ডিজিটাল ওয়ার্ল্ড', total: 8000, paid: 5000, due: 3000, dueDate: '2025-07-15' },
  ],
  customers: [
    { id: 1, name: 'আহমেদ করিম', email: 'ahmed@example.com', phone: '+880 1712 345678', totalPurchases: 5, totalSpent: 3250 },
    { id: 2, name: 'ফাতেমা আক্তার', email: 'fatema@example.com', phone: '+880 1712 345679', totalPurchases: 3, totalSpent: 1850 },
    { id: 3, name: 'আল-আমিন স্টোর', email: 'alamin@example.com', phone: '+880 2 9123456', totalPurchases: 12, totalSpent: 12500 },
    { id: 4, name: 'করিম উদ্দিন', email: 'karim@example.com', phone: '+880 1712 345680', totalPurchases: 2, totalSpent: 720 },
    { id: 5, name: 'আয়শা সুলতানা', email: 'ayesha@example.com', phone: '+880 1712 345681', totalPurchases: 7, totalSpent: 4250 },
  ]
};

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('sales');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: subDays(new Date(), 30),
    endDate: new Date(),
    key: 'selection',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewSaleForm, setShowNewSaleForm] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // State management
  const [sales, setSales] = useState(MOCK_DATA.sales);
  const [dues, setDues] = useState(MOCK_DATA.dues);
  const [customers, setCustomers] = useState(MOCK_DATA.customers);

  // Initialize data from localStorage on component mount
  useEffect(() => {
    const savedSales = localStorage.getItem('sales');
    const savedDues = localStorage.getItem('dues');
    const savedCustomers = localStorage.getItem('customers');
    
    if (savedSales) setSales(JSON.parse(savedSales));
    if (savedDues) setDues(JSON.parse(savedDues));
    if (savedCustomers) setCustomers(JSON.parse(savedCustomers));
    
    setIsInitialized(true);
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem('sales', JSON.stringify(sales));
  }, [sales, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem('dues', JSON.stringify(dues));
  }, [dues, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers, isInitialized]);

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

  // Filter sales based on search query and date range
  const filteredSales = useMemo(() => {
    return sales.filter(sale => {
      const saleDate = new Date(sale.date);
      return isWithinInterval(saleDate, { start: dateRange.startDate, end: dateRange.endDate });
    });
  }, [sales, dateRange]);

  const handleDateRangeChange = (ranges) => {
    setDateRange(ranges.selection);
    setShowDatePicker(false);
  };

  const formatDateRange = () => {
    if (!dateRange.startDate || !dateRange.endDate) return 'Select date range';
    return `${format(dateRange.startDate, 'MMM d, yyyy')} - ${format(dateRange.endDate, 'MMM d, yyyy')}`;
  };

  const clearDateRange = (e) => {
    e.stopPropagation();
    setDateRange({
      startDate: null,
      endDate: null,
      key: 'selection',
    });
  };

  // Calculate sales statistics
  const totalSales = sales.length;
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.amount, 0);
  const averageSale = totalSales > 0 ? totalRevenue / totalSales : 0;
  const paidSales = sales.filter(sale => sale.status === 'Paid').length;
  const pendingSales = sales.filter(sale => sale.status === 'Pending').length;
  const partialPayments = sales.filter(sale => sale.status === 'Partial').length;

  // Handle new sale
  const handleNewSale = (sale) => {
    setSales(prevSales => [sale, ...prevSales]);
    setShowNewSaleForm(false);
  };

  // Update sale
  const handleUpdateSale = (updatedSale) => {
    setSales(prevSales => 
      prevSales.map(sale => 
        sale.id === updatedSale.id ? updatedSale : sale
      )
    );
  };

  // Delete sale
  const handleDeleteSale = (saleId) => {
    setSales(prevSales => prevSales.filter(sale => sale.id !== saleId));
  };

  const filteredDues = dues.filter(due => 
    due.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    due.total.toString().includes(searchQuery) ||
    due.due.toString().includes(searchQuery)
  );

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );

  // Calculate stats
  const stats = {
    totalSales: sales.length,
    totalRevenue: sales.reduce((sum, sale) => sum + sale.amount, 0),
    totalCustomers: customers.length,
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
    >
      <MobileFloatingActionButton 
        onClick={() => setShowNewSaleForm(true)} 
        icon={Plus} 
        label="New Sale" 
      />

      {/* Tabs */}
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <div className="flex items-center justify-between w-full gap-4">
          <TabsList className="flex-1 justify-start overflow-x-auto">
            <TabsTrigger value="sales">Recent Sales</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>
          <Button
            onClick={() => setShowNewSaleForm(true)}
            className="hidden sm:flex items-center whitespace-nowrap"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Sale
          </Button>
        </div>

        <TabsContent value="sales">
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-900">Recent Sales</h2>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Search sales..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className="flex items-center justify-between w-full sm:w-64 px-4 py-2 text-sm border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <div className="flex items-center w-full">
                      <Calendar className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                      <span className={`flex-grow text-left ${!dateRange.startDate ? 'text-gray-400' : ''}`}>
                        {formatDateRange()}
                      </span>
                      {dateRange.startDate && (
                        <span 
                          onClick={clearDateRange}
                          className="text-gray-400 hover:text-gray-600 ml-2 cursor-pointer flex-shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </span>
                      )}
                    </div>
                  </button>
                  
                  {showDatePicker && (
                    <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2">
                      <DateRange
                        editableDateInputs={true}
                        onChange={handleDateRangeChange}
                        moveRangeOnFirstSelection={false}
                        ranges={[dateRange]}
                        maxDate={new Date()}
                        className="border-0"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {dateRange.startDate && (
              <div className="flex items-center text-sm text-gray-600">
                <span>Showing sales from {format(dateRange.startDate, 'MMM d, yyyy')} to {format(dateRange.endDate, 'MMM d, yyyy')}</span>
                <button
                  type="button"
                  onClick={() => setDateRange({
                    startDate: null,
                    endDate: null,
                    key: 'selection',
                  })}
                  className="ml-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Clear dates
                </button>
              </div>
            )}
          </div>
          <SalesTable 
            sales={filteredSales} 
            onUpdateSale={handleUpdateSale}
            onDeleteSale={handleDeleteSale}
          />
        </TabsContent>

        <TabsContent value="customers">
          <CustomersTable customers={filteredCustomers} />
        </TabsContent>
      </Tabs>
      
      {/* New Sale Popup */}
      <PopupNewSaleForm 
        isOpen={showNewSaleForm} 
        onClose={() => setShowNewSaleForm(false)}
        onSave={handleNewSale}
      />
    </AdminPageLayout>
  );
}
