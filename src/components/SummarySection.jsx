import React from 'react';

const SummarySection = () => {
  return (
    <div className="bg-green-100/50 rounded-lg p-4 space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium uppercase text-gray-700">Value of Goods</span>
        <span className="text-sm">: 0.00</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium uppercase text-gray-700">Discount</span>
        <span className="text-sm">: 0.00</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium uppercase text-gray-700">SGST</span>
        <span className="text-sm">: 0.00</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium uppercase text-gray-700">CGST</span>
        <span className="text-sm">: 0.00</span>
      </div>
    </div>
  );
};

export default SummarySection;