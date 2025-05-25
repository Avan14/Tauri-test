import React from 'react';

const ActionButtons = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-green-50">
      <button 
        className="py-3 px-6 bg-green-700 hover:bg-green-800 text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        Preview
      </button>
      <button 
        className="py-3 px-6 bg-green-700 hover:bg-green-800 text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        Submit & Preview
      </button>
      <button 
        className="py-3 px-6 bg-green-700 hover:bg-green-800 text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        Submit
      </button>
    </div>
  );
};

export default ActionButtons;