import React, { useState } from 'react';
import { Trash2, Circle, AlertCircle, MoveVertical } from 'lucide-react';



const ProductTable= () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      skuName: '',
      pack: '',
      batch: '',
      expiry: '',
      quantity: 0,
      tablets: 0,
      mrp: 0,
      discountPercentage: 0,
      sRate: 0,
      gst: 0,
      amount: 0
    },
    {
      id: 2,
      skuName: '',
      pack: '',
      batch: '',
      expiry: '',
      quantity: 0,
      tablets: 0,
      mrp: 0,
      discountPercentage: 0,
      sRate: 0,
      gst: 0,
      amount: 0
    }
  ]);

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-green-200">
        <thead className="bg-green-200">
          <tr>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">
              S.No.
            </th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              SKU Name
            </th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Pack
            </th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Batch
            </th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Expiry
            </th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Quantity{' '}
              <span className="inline-block align-middle">
                <AlertCircle className="w-3.5 h-3.5 text-gray-600" />
              </span>
            </th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Tablets
            </th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              MRP
            </th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Disc. %
            </th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              S.Rate
            </th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              GST
            </th>
            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Amount
            </th>
            <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
              <Trash2 className="w-4 h-4 inline-block" />
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-green-100">
          {products.map((product, index) => (
            <tr key={product.id} className={index % 2 === 0 ? 'bg-green-50' : 'bg-gray-50'}>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                {index + 1}
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                <input 
                  type="text" 
                  className="w-full p-1 border-b border-transparent focus:border-green-500 focus:outline-none bg-transparent"
                  placeholder="Select SKU"
                />
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                <input 
                  type="text" 
                  className="w-full p-1 border-b border-transparent focus:border-green-500 focus:outline-none bg-transparent"
                />
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                <input 
                  type="text" 
                  className="w-full p-1 border-b border-transparent focus:border-green-500 focus:outline-none bg-transparent"
                />
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                <input 
                  type="text" 
                  className="w-full p-1 border-b border-transparent focus:border-green-500 focus:outline-none bg-transparent"
                />
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                <input 
                  type="number" 
                  className="w-full p-1 border-b border-transparent focus:border-green-500 focus:outline-none bg-transparent"
                  min="0"
                />
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                <input 
                  type="number" 
                  className="w-full p-1 border-b border-transparent focus:border-green-500 focus:outline-none bg-transparent"
                  min="0"
                />
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                <input 
                  type="number" 
                  className="w-full p-1 border-b border-transparent focus:border-green-500 focus:outline-none bg-transparent"
                  min="0"
                  step="0.01"
                />
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                <input 
                  type="number" 
                  className="w-full p-1 border-b border-transparent focus:border-green-500 focus:outline-none bg-transparent"
                  min="0"
                  max="100"
                />
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                <input 
                  type="number" 
                  className="w-full p-1 border-b border-transparent focus:border-green-500 focus:outline-none bg-transparent"
                  min="0"
                  step="0.01"
                />
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                <input 
                  type="number" 
                  className="w-full p-1 border-b border-transparent focus:border-green-500 focus:outline-none bg-transparent"
                  min="0"
                />
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                <input 
                  type="number" 
                  className="w-full p-1 border-b border-transparent focus:border-green-500 focus:outline-none bg-transparent"
                  min="0"
                  step="0.01"
                  readOnly
                />
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-center">
                <div className="flex space-x-2 justify-center">
                  <button
                    className="p-1.5 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Circle className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    className="p-1.5 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    className="p-1.5 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
                  >
                    <MoveVertical className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;