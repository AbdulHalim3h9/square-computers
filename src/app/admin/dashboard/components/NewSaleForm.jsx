import { Plus } from 'lucide-react';

export const NewSaleForm = ({ customerData, onCancel }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">New Sale</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Create a new sale transaction
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <div className="px-4 py-5 sm:p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="customer" className="block text-sm font-medium text-gray-700">
                  Customer
                </label>
                <select
                  id="customer"
                  name="customer"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select a customer</option>
                  {customerData.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-4">Items</h4>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="grid grid-cols-12 gap-4">
                    <div className="col-span-5">
                      <select
                        name={`item-${item}-product`}
                        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="">Select a product</option>
                        <option value="1">Product 1</option>
                        <option value="2">Product 2</option>
                        <option value="3">Product 3</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        name={`item-${item}-quantity`}
                        placeholder="Qty"
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-3">
                      <input
                        type="text"
                        name={`item-${item}-price`}
                        placeholder="Price"
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-2 flex items-center">
                      <span className="text-gray-700">$0.00</span>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="-ml-0.5 mr-2 h-4 w-4" />
                  Add Item
                </button>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-between items-center">
                <div className="text-xl font-semibold">
                  Total: $0.00
                </div>
                <div>
                  <button
                    type="button"
                    onClick={onCancel}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Sale
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewSaleForm;
