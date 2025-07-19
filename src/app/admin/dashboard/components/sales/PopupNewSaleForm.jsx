'use client';

import { useCallback, useMemo, useEffect, useRef } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { useSalesForm } from '@/hooks/useSalesForm';
import { CUSTOMER_DATA } from '@/app/admin/dashboard/constants';
import Button from '@/components/ui/Button';

export const PopupNewSaleForm = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialData = null,
  disabledFields = {},
  isEditMode = false
}) => {
  const {
    formData,
    setFormData,
    customerQuery,
    setCustomerQuery,
    showCustomerDropdown,
    setShowCustomerDropdown,
    isAddingNewCustomer,
    setIsAddingNewCustomer,
    newCustomer,
    setNewCustomer,
    filteredCustomers,
    handleCustomerSelect,
    handleChange,
    handleNewCustomerChange,
    handleAddNewCustomer,
    handleItemChange,
    addItem,
    removeItem,
    getItemsWithTotals,
    calculateTotal
  } = useSalesForm(initialData);

  const itemsWithTotals = useMemo(() => {
    return getItemsWithTotals(formData.items);
  }, [formData.items, getItemsWithTotals]);

  // Handle click outside to close dropdown
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCustomerDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    if (!formData.customer?.id) {
      alert('Please select or add a customer');
      return;
    }
    
    const saleDate = formData.date || new Date().toISOString().split('T')[0];
    
    const saleData = {
      id: isEditMode ? formData.id : `sale-${Date.now()}`,
      customer: formData.customer?.name || '',
      customerId: formData.customer?.id || '',
      amount: parseFloat(calculateTotal()),
      date: saleDate,
      status: formData.status,
      items: formData.items,
      notes: formData.notes
    };
    
    onSave(saleData);
    onClose();
  }, [formData, calculateTotal, isEditMode, onClose, onSave]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[98vh] sm:max-h-[95vh] flex flex-col mx-2 my-2 sm:my-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b">
          <h2 className="text-lg sm:text-xl font-semibold">
            {isEditMode ? 'Edit Sale' : 'New Sale'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-3 sm:p-6">
          <div className="space-y-4 sm:space-y-6">
            {/* First Row - Customer, Payment Status, Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* Customer */}
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer <span className="text-red-500">*</span>
                </label>
                {!disabledFields.customer ? (
                  <div className="relative" ref={dropdownRef}>
                    <input
                      type="text"
                      value={formData.customer?.name || customerQuery}
                      onChange={(e) => {
                        setCustomerQuery(e.target.value);
                        setShowCustomerDropdown(true);
                      }}
                      onFocus={() => setShowCustomerDropdown(true)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search customer..."
                    />
                    
                    {showCustomerDropdown && (
                      <div className="absolute z-20 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {filteredCustomers.length > 0 ? (
                          <>
                            {filteredCustomers.map((customer) => (
                              <div
                                key={customer.id}
                                onClick={() => {
                                  handleCustomerSelect(customer);
                                  setShowCustomerDropdown(false);
                                }}
                                className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                              >
                                <div className="font-medium">{customer.name}</div>
                                {customer.phone && (
                                  <div className="text-sm text-gray-500">{customer.phone}</div>
                                )}
                              </div>
                            ))}
                            <div 
                              className="border-t border-gray-200 mt-1 pt-1"
                            >
                              <div
                                onClick={() => {
                                  setIsAddingNewCustomer(true);
                                  setNewCustomer(prev => ({
                                    ...prev,
                                    name: customerQuery
                                  }));
                                }}
                                className="cursor-pointer hover:bg-gray-100 px-4 py-2 text-blue-600 font-medium text-sm"
                              >
                                Add "{customerQuery}" as new customer
                              </div>
                            </div>
                          </>
                        ) : customerQuery ? (
                          <div className="p-3">
                            <p className="text-sm text-gray-700 mb-3">No customer found for "{customerQuery}"</p>
                            <button
                              type="button"
                              onClick={() => {
                                setIsAddingNewCustomer(true);
                                setNewCustomer(prev => ({
                                  ...prev,
                                  name: customerQuery
                                }));
                              }}
                              className="w-full text-left px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md"
                            >
                              + Add "{customerQuery}" as new customer
                            </button>
                          </div>
                        ) : (
                          <div className="px-4 py-2 text-sm text-gray-500">
                            Start typing to search for a customer
                          </div>
                        )}
                        
                        {isAddingNewCustomer && (
                          <div className="p-3 border-t border-gray-200 mt-1">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Add New Customer</h4>
                            <div className="space-y-2">
                              <div>
                                <input
                                  type="text"
                                  name="name"
                                  value={newCustomer.name}
                                  onChange={handleNewCustomerChange}
                                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Customer name"
                                  autoFocus
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <input
                                  type="tel"
                                  name="phone"
                                  value={newCustomer.phone}
                                  onChange={handleNewCustomerChange}
                                  className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Phone"
                                />
                                <input
                                  type="email"
                                  name="email"
                                  value={newCustomer.email}
                                  onChange={handleNewCustomerChange}
                                  className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="Email (optional)"
                                />
                              </div>
                              <div className="flex justify-end space-x-2 pt-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setIsAddingNewCustomer(false);
                                    setNewCustomer({ name: '', phone: '', email: '' });
                                  }}
                                  className="px-3 py-1.5 text-xs text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleAddNewCustomer();
                                    setShowCustomerDropdown(false);
                                  }}
                                  disabled={!newCustomer.name.trim() || !newCustomer.phone.trim()}
                                  className="px-3 py-1.5 text-xs text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  Add Customer
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-2 bg-gray-50 rounded-md border border-gray-200">
                    <div className="font-medium">{formData.customer.name}</div>
                    {formData.customer.phone && (
                      <div className="text-sm text-gray-500">{formData.customer.phone}</div>
                    )}
                  </div>
                )}
              </div>

              {/* Payment Status */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  disabled={disabledFields.status}
                  className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    disabledFields.status ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                  }`}
                >
                  <option value="Paid">Paid</option>
                  <option value="Due">Due</option>
                </select>
              </div>

              {/* Date */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  disabled={disabledFields.date}
                  className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    disabledFields.date ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                  }`}
                />
              </div>
            </div>

            {/* Items Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-700">Items</h3>
              </div>

              {/* Mobile-friendly Items List */}
              <div className="space-y-3">
                {itemsWithTotals.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 space-y-3">
                    {/* Item Description */}
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        disabled={disabledFields.items}
                        className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          disabledFields.items ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                        }`}
                        placeholder="Item description"
                      />
                    </div>

                    {/* Quantity, Price, Total */}
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          Qty
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                          disabled={disabledFields.items}
                          className={`w-full px-2 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            disabledFields.items ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          Price
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                            <span className="text-gray-500 text-sm">৳</span>
                          </div>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.price}
                            onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                            disabled={disabledFields.items}
                            className={`w-full pl-6 pr-2 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              disabledFields.items ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                            }`}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          Total
                        </label>
                        <div className="px-2 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-medium">
                          ৳{parseFloat(item.total).toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    {!disabledFields.items && itemsWithTotals.length > 1 && (
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="text-red-600 hover:text-red-900 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Item Button */}
              {!disabledFields.items && (
                <div className="flex justify-start">
                  <button
                    type="button"
                    onClick={addItem}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus className="h-4 w-4 mr-1.5" /> Add Item
                  </button>
                </div>
              )}

              {/* Grand Total */}
              <div className="flex justify-end border-t pt-3">
                <div className="bg-gray-50 rounded-lg p-3 min-w-[200px]">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Total:</span>
                    <span className="font-bold text-lg text-gray-900">
                      ৳{calculateTotal().toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                disabled={disabledFields.notes}
                rows={3}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  disabledFields.notes ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                }`}
                placeholder="Add any additional notes..."
              />
            </div>

            {/* Form Actions */}
            <div className="flex flex-col space-y-3 pt-4 border-t">
              {isEditMode && onDelete && (
                <div className="flex justify-start">
                  <Button
                    type="button"
                    variant="danger"
                    onClick={onDelete}
                    className="w-full sm:w-auto"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete Sale
                  </Button>
                </div>
              )}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full sm:w-auto"
                >
                  {isEditMode ? 'Update Sale' : 'Save Sale'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupNewSaleForm;