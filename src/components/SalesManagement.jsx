import React, { useState } from "react";
import SalesTable from "./SalesTable";
import TableFooter from "./TableFooter";
import { Calendar, HelpCircle, RefreshCw } from "lucide-react";
import SalesTable2 from "./SalesManagement2";

const SalesManagement = ({ setCurrentFocus }) => {
  const [tab, settab] = useState(true);
  const [sales, setSales] = useState([
    {
      id: "1",
      itemName: "",
      pack: "",
      batch: "",
      expiry: "",
      quantityBulk: 0,
      quantityLoose: 0,
      mrp: 0,
      discount: 0,
      sellingRate: 0,
      gst: 0,
      amount: 0,
      payMode: "",
    },
  ]);
  const [focusedRowId, setFocusedRowId] = useState("1"); // Initialize to first sale's id
  const [focusedField, setFocusedField] = useState("itemName"); // Default to itemName

  return (
    <div className="flex flex-col h-full">
      <div className="flex w-full h-full">
        <div className="w-4/5">
          <div className="p-4 bg-white border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium text-gray-800">
                Manage Sales
              </h2>
              <button
                onClick={() => {
                  settab(!tab);
                }}
                className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Switch Tab
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            {tab ? (
              <SalesTable2 setCurrentFocus={setCurrentFocus} />
            ) : (
              <SalesTable
                sales={sales}
                setSales={setSales}
                focusedRowId={focusedRowId}
                setFocusedRowId={setFocusedRowId}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
                setCurrentFocus={setCurrentFocus}
              />
            )}
          </div>
        </div>
        <div className="bg-gray-300 w-[2px]"></div>
        <div className="">
          <div className="p-4 bg-white border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <button className="mr-2 text-gray-700 hover:bg-slate-850 focus:bg-slate-300 p-2 rounded-md">
                    Revenue
                  </button>
                  <div className="flex items-center border border-gray-300 rounded px-2 py-1">
                    <span className="mx-1">₹ 0.00</span>
                    <HelpCircle className="w-4 h-4 ml-1 text-gray-500" />
                  </div>
                </div>

                <button className="flex items-center border border-gray-300 px-2 py-1 focus:bg-slate-300 p-2 rounded-sm">
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