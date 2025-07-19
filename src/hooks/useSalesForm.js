import { useState, useCallback } from 'react';

export const useSalesForm = (initialData = null) => {
  const [formData, setFormData] = useState(initialData || {
    customer: null,
    items: [
      {
        type: 'product',
        description: '',
        quantity: 1,
        price: 0,
      },
    ],
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
    notes: '',
  });

  const [customerQuery, setCustomerQuery] = useState('');
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [isAddingNewCustomer, setIsAddingNewCustomer] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: field === 'quantity' || field === 'price' ? Number(value) : value,
    };
    setFormData(prev => ({
      ...prev,
      items: updatedItems,
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          type: 'product',
          description: '',
          quantity: 1,
          price: 0,
        },
      ],
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length <= 1) return;
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      items: updatedItems,
    }));
  };

  const handleCustomerSelect = (customer) => {
    setFormData(prev => ({
      ...prev,
      customer,
    }));
    setCustomerQuery(customer.name);
    setShowCustomerDropdown(false);
  };

  const handleNewCustomerChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddNewCustomer = () => {
    const customer = {
      id: Date.now().toString(),
      ...newCustomer,
    };
    handleCustomerSelect(customer);
    setIsAddingNewCustomer(false);
    setNewCustomer({
      name: '',
      phone: '',
      email: '',
      address: '',
    });
  };

  const resetForm = useCallback(() => {
    setFormData({
      customer: null,
      items: [
        {
          type: 'product',
          description: '',
          quantity: 1,
          price: 0,
        },
      ],
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      notes: '',
    });
    setCustomerQuery('');
    setShowCustomerDropdown(false);
    setIsAddingNewCustomer(false);
  }, []);

  const calculateTotal = useCallback(() => {
    return formData.items.reduce((total, item) => {
      return total + (item.quantity * (Number(item.price) || 0));
    }, 0);
  }, [formData.items]);

  // Calculate items with their individual totals
  const getItemsWithTotals = (items) => {
    return items.map(item => ({
      ...item,
      total: (item.quantity || 0) * (Number(item.price) || 0)
    }));
  };

  // Filter customers based on search query
  const filteredCustomers = []; // This should be populated with your actual customers data
  
  return {
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
    filteredCustomers, // Add this line
    handleChange,
    handleItemChange,
    addItem,
    removeItem,
    handleCustomerSelect,
    handleNewCustomerChange,
    handleAddNewCustomer,
    resetForm,
    calculateTotal,
    getItemsWithTotals,
  };
};
