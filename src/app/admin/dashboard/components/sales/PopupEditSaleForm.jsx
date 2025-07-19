'use client';

import { useState } from 'react';
import { PopupNewSaleForm } from './PopupNewSaleForm';
import { Modal } from '../ui/Modal';

export function PopupEditSaleForm({ isOpen, onClose, onSave, onDelete, saleData }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Define which fields should be disabled in edit mode
  const disabledFields = {
    customer: true,     // Disable customer field
    date: true,         // Disable date field
    items: true,        // Disable editing items
    status: false,      // Allow changing status
    notes: false        // Allow editing notes
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete(saleData.id);
    setShowDeleteConfirm(false);
    onClose();
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleSave = (updatedSale) => {
    onSave({
      id: saleData.id,
      ...saleData,
      ...updatedSale,
      // Ensure we're not losing any existing data
      customer: updatedSale.customer || saleData.customer,
      items: updatedSale.items || saleData.items,
      date: updatedSale.date || saleData.date
    });
  };

  // Format the sale data for the form
  const formatSaleData = () => {
    if (!saleData) {
      return {
        customer: { id: '', name: '' },
        date: new Date().toISOString().split('T')[0],
        items: [{ description: '', quantity: 1, price: 0, total: 0 }],
        status: 'Paid',
        notes: '',
        amount: 0
      };
    }
    
    // Ensure items have all required fields
    const items = (saleData.items || []).map(item => ({
      description: item.description || '',
      quantity: item.quantity || 1,
      price: item.price || 0,
      total: (item.quantity || 1) * (item.price || 0)
    }));
    
    // Handle customer data
    let customer = { id: '', name: '' };
    if (saleData.customer) {
      customer = typeof saleData.customer === 'string' 
        ? { id: '', name: saleData.customer } 
        : { id: saleData.customer.id || '', name: saleData.customer.name || '' };
    }
    
    return {
      id: saleData.id || `sale-${Date.now()}`,
      customer,
      date: saleData.date || new Date().toISOString().split('T')[0],
      items: items.length ? items : [{ description: '', quantity: 1, price: 0, total: 0 }],
      status: saleData.status || 'Paid',
      notes: saleData.notes || '',
      amount: saleData.amount || 0
    };
  };

  return (
    <>
      <PopupNewSaleForm
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleSave}
        onDelete={handleDeleteClick}
        initialData={formatSaleData()}
        disabledFields={disabledFields}
        isEditMode={true}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={handleCancelDelete}
        title="Confirm Delete"
      >
        <div className="p-4">
          <p className="mb-4">Are you sure you want to delete this sale? This action cannot be undone.</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleCancelDelete}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
