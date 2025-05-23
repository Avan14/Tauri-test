import React from 'react';
import { Bell, ChevronLeft, Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <ChevronLeft className="w-6 h-6 mr-2 text-gray-500" />
        <h1 className="text-2xl font-bold">Elixire</h1>
      </div>
      
      <div className="relative w-1/3">
        <div className="flex items-center bg-gray-100 rounded-md">
          <input
            type="text"
            placeholder="Search Elixire"
            className="w-full px-4 py-2 bg-gray-100 rounded-md focus:outline-none"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Search className="w-5 h-5 text-gray-500" />
          </div>
        </div>
      </div>
      
      <div className="flex items-center">
        <button className="mr-4 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-800" >
          <div className="font-bold">Day 3</div>
          <div className="text-xs">14-day free trial</div>
        </button>
        <button className="p-2 rounded-full bg-gray-400">
          <Bell className="w-6 h-6 text-gray-500" />
        </button>
      </div>
    </header>
  );
};

export default Header;