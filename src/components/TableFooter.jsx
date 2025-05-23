import { 
  ChevronsLeft, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsRight, 
  Plus, 
  X,
  RefreshCw
} from 'lucide-react';

const TableFooter = () => {
  return (
    <div className="flex justify-between items-center bg-gray-200 border-t border-gray-300 py-2 px-4">
      <div className="flex items-center">
        <div className="flex items-center bg-yellow-400 px-2 py-1 rounded-sm">
          <button className="text-sm font-medium focus:bg-yellow-600">Small Sales</button>
          <RefreshCw className="w-4 h-4 ml-2" />
        </div>
        
        <div className="flex items-center ml-2 bg-gray-400 px-3 py-1 rounded-sm">
          <button className="text-sm text-white focus:bg-slate-600">New Sell</button>
          <X className="w-4 h-4 ml-2 text-white" />
        </div>
        
        <div className="flex items-center ml-2 bg-gray-400 px-3 py-1 rounded-sm">
          <button className="text-sm text-white focus:bg-slate-600">New Sell</button>
          <X className="w-4 h-4 ml-2 text-white" />
        </div>
        
        <button className="flex items-center justify-center ml-2 bg-gray-300 w-8 h-8 rounded-sm focus:bg-slate-600">
          <Plus className="w-5 h-5 text-gray-700" />
        </button>
      </div>
      
      <div className="flex items-center">
        <button className="p-1 mx-1 border border-gray-300 bg-white rounded focus:bg-slate-600">
          <ChevronsLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button className="p-1 mx-1 border border-gray-300 bg-white rounded focus:bg-slate-600">
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        
        <button className="mx-2 text-gray-700 focus:bg-slate-600">1</button>
        
        <button className="p-1 mx-1 border border-gray-300 bg-white focus:bg-slate-600 rounded ">
          <button className="px-2 font-medium text-gray-700 focus:bg-slate-600">2</button>
        </button>
        
        <button className="p-1 mx-1 border border-gray-300 bg-white rounded focus:bg-slate-600">
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
        <button className="p-1 mx-1 border border-gray-300 bg-white rounded focus:bg-slate-600">
          <ChevronsRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default TableFooter;