import React from 'react';
import CustomerForm from './CustomerForm';
import ProductTable from './ProductTable';
import SummarySection from './SummarySection';
import ActionButtons from './ActionButtons';
import { RefreshCcw } from 'lucide-react';

const SalesManagement2 = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-green-50 rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-green-100 border-b border-green-200">
          <h1 className="text-xl font-medium text-gray-800">Manage Sales</h1>
          <button 
            className="p-1.5 rounded-full hover:bg-green-200 transition-colors duration-200"
            aria-label="Refresh"
          >
            <RefreshCcw className="w-5 h-5 text-gray-700" />
          </button>
        </div>
        
        {/* Customer Form */}
        <CustomerForm />
        
        {/* Product Table */}
        <ProductTable />
        
        {/* Note */}
        <div className="px-6 py-2 text-xs text-gray-600 italic">
          * - Multiple values associated. Expand Row to see details
        </div>
        
      
        
        {/* Action Buttons */}
        <ActionButtons />
      </div>
    </div>
  );
};

export default SalesManagement2;