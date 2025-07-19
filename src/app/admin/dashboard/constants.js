// Customer data - In a real app, this would come from an API
export const CUSTOMER_DATA = [
  { id: '1', name: 'John Doe', phone: '01712345678', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', phone: '01787654321', email: 'jane@example.com' },
  { id: '3', name: 'Bob Johnson', phone: '01876543210', email: 'bob@example.com' },
  { id: '5', name: 'Alice Williams', phone: '01987654321', email: 'alice@example.com' },
];

// Payment status options
export const PAYMENT_STATUS = {
  PAID: 'Paid',
  PARTIAL: 'Partial',
  DUE: 'Due',
};

// Table columns configuration
export const SALES_COLUMNS = [
  { key: 'date', label: 'Date', sortable: true },
  { key: 'customer', label: 'Customer', sortable: true },
  { key: 'invoice', label: 'Invoice', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'amount', label: 'Amount', sortable: true, numeric: true },
  { key: 'actions', label: 'Actions' },
];
