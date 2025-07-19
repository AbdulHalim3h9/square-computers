'use client';

import { useState, useMemo, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { 
  ChevronUp, ChevronDown, ChevronLeft, ChevronRight, 
  ChevronsLeft, ChevronsRight, ArrowUpDown, 
  Eye, Pencil, DollarSign, EyeOff, Calendar as CalendarIcon,
  User, FileText, CheckCircle, Clock, AlertCircle
} from 'lucide-react';

import { Modal } from '../ui/Modal';
import { PopupEditSaleForm } from './PopupEditSaleForm';
import { useMediaQuery } from '@/hooks/useMediaQuery';

// Helper function to sort data
const sortData = (data, sortBy, sortDirection) => {
  if (!sortBy || !data) return [];
  
  return [...data].sort((a, b) => {
    let valueA = a[sortBy];
    let valueB = b[sortBy];
    
    // Handle date sorting
    if (sortBy === 'date') {
      valueA = new Date(valueA).getTime();
      valueB = new Date(valueB).getTime();
    }
    
    // Handle numeric values
    if (sortBy === 'amount') {
      valueA = parseFloat(valueA) || 0;
      valueB = parseFloat(valueB) || 0;
    }
    
    // Handle string comparison
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortDirection === 'asc' 
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
    
    // Handle numeric/date comparison
    return sortDirection === 'asc' 
      ? valueA - valueB
      : valueB - valueA;
  });
};

// Mobile breakpoint
const MOBILE_BREAKPOINT = '768px';

export function SalesTable({ sales = [], itemsPerPage = 5, onUpdateSale, onDeleteSale }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [editingSale, setEditingSale] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showRevenue, setShowRevenue] = useState(false);
  const [showAmounts, setShowAmounts] = useState(false);
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}`);
  
  // Reset to first page when items per page changes or when switching between mobile/desktop
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage, isMobile]);

  // Sort the data based on sortConfig
  const sortedSales = useMemo(() => {
    return sortData(sales, sortConfig.key, sortConfig.direction);
  }, [sales, sortConfig]);

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(sales.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSales = sortedSales.slice(startIndex, startIndex + itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Handle sort
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Handle edit sale
  const handleUpdateSale = (updatedSale) => {
    onUpdateSale?.(updatedSale);
    setIsEditModalOpen(false);
  };

  // Handle delete sale
  const handleDeleteSale = (saleId) => {
    onDeleteSale?.(saleId);
    setIsEditModalOpen(false);
  };

  // Table columns configuration
  const columns = [
    {
      key: 'date',
      label: 'Date',
      renderCell: (item) => format(parseISO(item.date), 'MMM dd, yyyy'),
      sortable: true,
      className: 'w-32'
    },
    {
      key: 'customer',
      label: 'Customer',
      renderCell: (item) => item.customer?.name || 'N/A',
      sortable: true,
      className: 'min-w-40'
    },
    {
      key: 'invoice',
      label: 'Invoice',
      renderCell: (item) => `#${item.id?.slice(-6).toUpperCase() || '------'}`,
      sortable: true,
      className: 'w-24'
    },
    {
      key: 'status',
      label: 'Status',
      renderCell: (item) => {
        const statusConfig = {
          'Paid': { bg: 'bg-green-100', text: 'text-green-800', icon: <CheckCircle className="h-4 w-4 mr-1" /> },
          'Partial': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: <Clock className="h-4 w-4 mr-1" /> },
          'Due': { bg: 'bg-red-100', text: 'text-red-800', icon: <AlertCircle className="h-4 w-4 mr-1" /> },
        }[item.status] || { bg: 'bg-gray-100', text: 'text-gray-800', icon: null };
        
        return (
          <span className={`px-2 py-1 text-xs rounded-full inline-flex items-center ${statusConfig.bg} ${statusConfig.text}`}>
            {statusConfig.icon}
            {item.status}
          </span>
        );
      },
      sortable: true,
      className: 'w-24'
    },
    {
      key: 'amount',
      label: (
        <div className="flex items-center justify-end space-x-1">
          <span>Amount</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowAmounts(!showAmounts);
            }}
            className="text-gray-400 hover:text-gray-600"
            aria-label={showAmounts ? 'Hide amounts' : 'Show amounts'}
          >
            {showAmounts ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </button>
        </div>
      ),
      renderCell: (item) => (
        <div className="font-medium text-right">
          {showAmounts 
            ? `৳${parseFloat(item.amount || 0).toLocaleString('en-BD')}`
            : '••••'}
        </div>
      ),
      sortable: true,
      className: 'text-right w-32',
      headerClassName: 'text-right',
      disableHeaderClick: true
    },
    {
      key: 'actions',
      label: 'Actions',
      renderCell: (item) => (
        <button 
          onClick={() => {
            setEditingSale(item);
            setIsEditModalOpen(true);
          }}
          className="text-blue-600 hover:text-blue-800"
          aria-label="Edit sale"
        >
          <Pencil className="h-4 w-4" />
        </button>
      ),
      className: 'w-16 text-center'
    }
  ];

  // Render mobile card view
  const renderMobileView = () => (
    <div className="space-y-3 p-2">
      {paginatedSales.length > 0 ? (
        paginatedSales.map((sale) => (
          <div key={sale.id} className="border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center text-sm font-medium text-gray-900 mb-1">
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  {sale.customer?.name || 'N/A'}
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {format(parseISO(sale.date), 'MMM dd, yyyy')}
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <FileText className="h-4 w-4 mr-2" />
                  #{sale.id?.slice(-6).toUpperCase() || '------'}
                </div>
                <div className="flex items-center">
                  {columns.find(col => col.key === 'status')?.renderCell(sale)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900 mb-2">
                  {showAmounts 
                    ? `৳${parseFloat(sale.amount || 0).toLocaleString('en-BD')}`
                    : '••••'}
                </div>
                <button 
                  onClick={() => {
                    setEditingSale(sale);
                    setIsEditModalOpen(true);
                  }}
                  className="text-blue-600 hover:text-blue-800 p-1"
                  aria-label="Edit sale"
                >
                  <Pencil className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-6 text-gray-500">
          No sales found
        </div>
      )}
    </div>
  );

  // Render desktop table view
  const renderDesktopView = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  (column.sortable && !column.disableHeaderClick) ? 'cursor-pointer hover:bg-gray-100' : ''
                } ${column.className || ''} ${column.headerClassName || ''}`}
                onClick={() => column.sortable && !column.disableHeaderClick && handleSort(column.key)}
              >
                <div className="flex items-center">
                  {column.label}
                  {column.sortable && (
                    <span className="ml-1">
                      {sortConfig.key === column.key ? (
                        sortConfig.direction === 'asc' ? (
                          <ChevronUp className="h-4 w-4 inline" />
                        ) : (
                          <ChevronDown className="h-4 w-4 inline" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3 inline opacity-0 group-hover:opacity-100" />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedSales.map((sale) => (
            <tr key={sale.id} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td 
                  key={`${sale.id}-${column.key}`} 
                  className={`px-4 py-3 whitespace-nowrap text-sm ${column.className || ''}`}
                >
                  {column.renderCell ? column.renderCell(sale) : sale[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Render summary row
  const renderSummaryRow = () => {
    if (sales.length === 0) return null;

    const partialCount = sales.filter(sale => sale.status === 'Partial').length;
    const dueCount = sales.filter(sale => sale.status === 'Due').length;
    const totalRevenue = sales.reduce((sum, sale) => sum + (parseFloat(sale.amount) || 0), 0);
    const paidCount = sales.length - partialCount - dueCount;

    return (
      <div className={`${isMobile ? 'p-3' : 'px-4 py-3'} bg-gray-50 border-t border-gray-200`}>
        <div className={`${isMobile ? 'space-y-3' : 'flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'}`}>
          <div className={`${isMobile ? 'space-y-2' : 'flex flex-wrap items-center gap-x-6 gap-y-2'}`}>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm text-gray-600">
                <span className="font-medium">Paid:</span> {paidCount}
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
              <span className="text-sm text-gray-600">
                <span className="font-medium">Partial:</span> {partialCount}
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
              <span className="text-sm text-gray-600">
                <span className="font-medium">Due:</span> {dueCount}
              </span>
            </div>
          </div>
          
          <div className={`flex items-center justify-end w-full sm:w-auto ${isMobile ? 'pt-2 border-t border-gray-200' : ''} space-x-2`}>
            <div className="text-sm text-gray-500 mr-2">
              <span className="font-medium">Total Revenue:</span>
            </div>
            <button 
              onClick={() => setShowRevenue(!showRevenue)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={showRevenue ? 'Hide revenue details' : 'Show revenue details'}
              title={showRevenue ? 'Hide amount' : 'Show amount'}
            >
              {showRevenue ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
            <div className="flex items-center bg-green-50 px-3 py-1.5 rounded border border-green-100">
              <DollarSign className="h-4 w-4 text-green-600 mr-1.5" />
              <span className={`text-green-700 font-semibold text-sm`}>
                {showRevenue ? `৳${totalRevenue.toLocaleString('en-BD')}` : '•••••'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render pagination
  const renderPagination = () => {
    if (sales.length === 0) return null;

    const renderPageNumbers = () => {
      const pageNumbers = [];
      const maxVisiblePages = 5;
      
      if (totalPages <= maxVisiblePages) {
        // Show all pages if total pages is less than max visible pages
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Always show first page
        pageNumbers.push(1);
        
        // Calculate start and end of the visible range
        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);
        
        // Adjust if we're at the start or end
        if (currentPage <= 2) {
          endPage = 3;
        } else if (currentPage >= totalPages - 1) {
          startPage = totalPages - 2;
        }
        
        // Add ellipsis if needed
        if (startPage > 2) {
          pageNumbers.push('...');
        }
        
        // Add middle range
        for (let i = startPage; i <= endPage; i++) {
          if (i > 1 && i < totalPages) {
            pageNumbers.push(i);
          }
        }
        
        // Add ellipsis if needed
        if (endPage < totalPages - 1) {
          pageNumbers.push('...');
        }
        
        // Always show last page
        if (totalPages > 1) {
          pageNumbers.push(totalPages);
        }
      }
      
      return pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-3 py-1 text-gray-500">
              ...
            </span>
          );
        }
        
        return (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              currentPage === page
                ? 'bg-blue-50 text-blue-600 border border-blue-500'
                : 'text-gray-700 hover:bg-gray-100 border border-transparent'
            }`}
          >
            {page}
          </button>
        );
      });
    };

    return (
      <div className={`flex items-center justify-between ${isMobile ? 'px-2' : 'px-4'} py-3 border-t border-gray-200`}>
        {isMobile ? (
          <div className="flex-1 flex justify-between items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <div className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(startIndex + itemsPerPage, sales.length)}
                </span>{' '}
                of <span className="font-medium">{sales.length}</span> results
              </p>
            </div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">First</span>
                <ChevronsLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              <div className="hidden sm:flex items-center px-2 space-x-1">
                {renderPageNumbers()}
              </div>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Last</span>
                <ChevronsRight className="h-4 w-4" />
              </button>
            </nav>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {isMobile ? renderMobileView() : renderDesktopView()}
      
      {paginatedSales.length === 0 && !isMobile && (
        <div className="px-4 py-4 text-center text-sm text-gray-500">
          No sales found
        </div>
      )}
      
      {renderSummaryRow()}
      {renderPagination()}
      
      {/* Edit Sale Modal */}
      {editingSale && (
        <PopupEditSaleForm
          isOpen={isEditModalOpen}
          sale={editingSale}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingSale(null);
          }}
          onSave={(updatedSale) => {
            handleUpdateSale(updatedSale);
            setIsEditModalOpen(false);
            setEditingSale(null);
          }}
          onDelete={(saleId) => {
            handleDeleteSale(saleId);
            setIsEditModalOpen(false);
            setEditingSale(null);
          }}
        />
      )}
    </div>
  );
}

export default SalesTable;
