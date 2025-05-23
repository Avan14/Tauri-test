import React from "react";
import SalesTable from "./SalesTable";
import TableFooter from "./TableFooter";
import { Calendar, HelpCircle, RefreshCw } from "lucide-react";

const SalesManagement = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex w-full h-full ">
        <div className="w-3/4">
          <div className="p-4 bg-white border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium text-gray-800">
                Manage Sales
              </h2>
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            <SalesTable />
          </div>
        </div>
        <div className="bg-gray-300 w-[2px]"></div>
        <div className="w-1/4">
          <div className="p-4 bg-white border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <button className="mr-2 text-gray-700 hover:bg-slate-850 focus:bg-slate-300 p-2 rounded-md">Revenue</button>
                  <div className="flex items-center border border-gray-300 rounded px-2 py-1">
                    <span className="mx-1">₹ 0.00</span>
                    <HelpCircle className="w-4 h-4 ml-1 text-gray-500" />
                  </div>
                </div>

                <button className="flex items-center border border-gray-300  px-2 py-1 focus:bg-slate-300 p-2 rounded-sm">
                  <span className="mx-1 text-xs">23-May-25</span>
                  <Calendar className="w-4 h-4 ml-1 text-gray-500" />
                  <RefreshCw className="w-4 h-4 ml-1 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-auto"></div>
        </div>
      </div>
      <TableFooter />
    </div>
  );
};

export default SalesManagement;
