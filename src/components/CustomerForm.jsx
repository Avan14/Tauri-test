import React from 'react';

const CustomerForm = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-green-50">
      {/* First column */}
      <div className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">ABHA No.</label>
          <input 
            type="text" 
            placeholder="enter ABHA no."
            className="p-2 bg-white border-b border-green-300 focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">Doctor Registration No.</label>
          <input 
            type="text" 
            placeholder="enter dr. reg. no."
            className="p-2 bg-white border-b border-green-300 focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>
      </div>
      
      {/* Second column */}
      <div className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">Customer Mobile No.</label>
          <input 
            type="text" 
            placeholder="enter customer mobile no."
            className="p-2 bg-white border-b border-green-300 focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>
        
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">Doctor Name</label>
          <input 
            type="text" 
            placeholder="enter doctor name"
            className="p-2 bg-white border-b border-green-300 focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>
      </div>
      
      {/* Third column */}
      <div className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">Customer Name<span className="text-red-500">*</span></label>
          <input 
            type="text" 
            placeholder="enter customer name"
            className="p-2 bg-white border-b border-green-300 focus:outline-none focus:border-green-500 transition-colors"
            required
          />
        </div>
        
        <div className="flex flex-col">
          <label className="mb-1 text-sm text-gray-600">Patient Name<span className="text-red-500">*</span></label>
          <input 
            type="text" 
            placeholder="enter patient name"
            className="p-2 bg-white border-b border-green-300 focus:outline-none focus:border-green-500 transition-colors"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;