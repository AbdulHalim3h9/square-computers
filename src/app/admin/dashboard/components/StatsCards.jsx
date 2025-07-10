import { DollarSign, Users, Package, Clock, TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, trendValue }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">
              {title}
            </dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">
                {title.includes('$') ? `$${value.toLocaleString()}` : value}
              </div>
              {trend && (
                <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                  trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className="sr-only">
                    {trend === 'up' ? 'Increased' : 'Decreased'} by
                  </span>
                  {trendValue}%
                </div>
              )}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
);

export const StatsCards = ({ stats }) => (
  <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
    <StatCard 
      title="Total Sales" 
      value={stats.totalSales} 
      icon={DollarSign} 
      trend="up" 
      trendValue={12.5} 
    />
    <StatCard 
      title="Total Revenue" 
      value={stats.totalRevenue} 
      icon={DollarSign} 
      trend="up" 
      trendValue={8.2} 
    />
    <StatCard 
      title="Total Customers" 
      value={stats.totalCustomers} 
      icon={Users} 
      trend="up" 
      trendValue={5.7} 
    />
    <StatCard 
      title="Total Products" 
      value={stats.totalProducts} 
      icon={Package} 
      trend="down" 
      trendValue={2.3} 
    />
  </div>
);

export default StatsCards;
