'use client';

import { useState, useEffect } from 'react';
import FormTemplate from '../FormTemplate';

// Mock function to fetch order details
const fetchOrderDetails = async (orderId) => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: orderId,
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        status: 'processing',
        items: [
          { id: 1, name: 'Laptop XYZ', quantity: 1, price: 999.99 },
          { id: 2, name: 'Wireless Mouse', quantity: 1, price: 29.99 },
        ],
        shippingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
        },
        paymentMethod: 'credit_card',
        subtotal: 1029.98,
        shipping: 15.00,
        tax: 82.40,
        total: 1127.38,
        notes: 'Please handle with care',
      });
    }, 500);
  });
};

export default function OrdersForm({ orderId }) {
  const [isLoading, setIsLoading] = useState(!!orderId);
  const [isEditMode, setIsEditMode] = useState(!!orderId);
  const [order, setOrder] = useState(null);
  
  useEffect(() => {
    if (orderId) {
      const loadOrder = async () => {
        try {
          const orderData = await fetchOrderDetails(orderId);
          setOrder(orderData);
        } catch (error) {
          console.error('Error loading order:', error);
          alert('Failed to load order details');
        } finally {
          setIsLoading(false);
        }
      };
      
      loadOrder();
    }
  }, [orderId]);
  
  const formFields = [
    {
      name: 'status',
      label: 'Order Status',
      type: 'select',
      options: [
        { value: 'pending', label: 'Pending' },
        { value: 'processing', label: 'Processing' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'delivered', label: 'Delivered' },
        { value: 'cancelled', label: 'Cancelled' },
        { value: 'refunded', label: 'Refunded' },
      ],
      required: true,
    },
    {
      name: 'trackingNumber',
      label: 'Tracking Number',
      type: 'text',
      placeholder: 'Enter tracking number',
    },
    {
      name: 'shippingCarrier',
      label: 'Shipping Carrier',
      type: 'select',
      options: [
        { value: 'usps', label: 'USPS' },
        { value: 'ups', label: 'UPS' },
        { value: 'fedex', label: 'FedEx' },
        { value: 'dhl', label: 'DHL' },
        { value: 'other', label: 'Other' },
      ],
    },
    {
      name: 'shippingDate',
      label: 'Shipping Date',
      type: 'date',
    },
    {
      name: 'estimatedDelivery',
      label: 'Estimated Delivery',
      type: 'date',
    },
    {
      name: 'notes',
      label: 'Order Notes',
      type: 'textarea',
      placeholder: 'Add any internal notes about this order',
      rows: 3,
      colSpan: 'col-span-2',
    },
  ];

  const initialValues = {
    status: order?.status || 'pending',
    trackingNumber: order?.trackingNumber || '',
    shippingCarrier: order?.shippingCarrier || '',
    shippingDate: order?.shippingDate || '',
    estimatedDelivery: order?.estimatedDelivery || '',
    notes: order?.notes || '',
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsLoading(true);
    try {
      // Simulate API call
      console.log('Updating order:', values);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert('Order updated successfully!');
      
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  if (isLoading && orderId) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {order && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6 bg-gray-50">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Order #{order.id} - {order.customerName}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {order.customerEmail} • {new Date().toLocaleDateString()}
            </p>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Order Total</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  ${order.total?.toFixed(2)}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Shipping Address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {Object.values(order.shippingAddress || {}).filter(Boolean).join(', ')}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Payment Method</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {order.paymentMethod === 'credit_card' ? 'Credit Card' : order.paymentMethod}
                </dd>
              </div>
            </dl>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 text-right">
            <button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              View Full Details
            </button>
          </div>
        </div>
      )}
      
      <FormTemplate
        title={orderId ? `Update Order #${orderId}` : 'Create New Order'}
        description={orderId ? 'Update order status and tracking information' : 'Create a new order manually'}
        formFields={formFields}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitButtonText={orderId ? 'Update Order' : 'Create Order'}
        secondaryButton={{
          text: orderId ? 'View Order History' : 'Clear Form',
          onClick: () => {
            if (orderId) {
              // Navigate to order history
              console.log('View order history');
            }
            // Clear form logic is handled by FormTemplate
          },
        }}
      />
    </div>
  );
}
