
import { 
  Package, 
  Users, 
  DollarSign, 
  BarChart, 
  ShoppingBag, 
  Clock, 
  BookOpen, 
  Settings 
} from 'lucide-react';

const Sidebar= () => {
  return (
    <aside className="w-16 bg-[#f8f0f8] border-r border-gray-200 flex flex-col items-center">

      <SidebarIcon icon={ <Package className="w-6 h-6 text-gray-600" />} />
      <SidebarIcon icon={<Users className="w-6 h-6 text-gray-600" />} />
      <SidebarIcon icon={<DollarSign className="w-6 h-6 text-gray-600" />} />
      <SidebarIcon icon={<BarChart className="w-6 h-6 text-gray-600" />} />
      <SidebarIcon icon={<ShoppingBag className="w-6 h-6 text-gray-600" />} />
      <SidebarIcon icon={<Clock className="w-6 h-6 text-gray-600" />} />
      <SidebarIcon icon={<BookOpen className="w-6 h-6 text-gray-600" />} />
      
      <div className="mt-auto">
        <SidebarIcon icon={<Settings className="w-10 h-10 p-2 text-gray-600" />} />
      </div>
    </aside>
  );
};

const SidebarIcon = ({ icon }) => {
  return (
    <button className="w-full py-4 flex justify-center hover:bg-blue-100 cursor-pointer focus:bg-blue-400">
      {icon}
    </button>
  );
};

export default Sidebar;