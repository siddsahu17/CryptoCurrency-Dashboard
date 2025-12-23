import React from 'react';
import { BellIcon, UserIcon } from 'lucide-react';
const Header = () => {
  return <header className="bg-gray-800 border-b border-gray-700 py-4 px-6 flex items-center justify-between">
      <div className="w-1/4"></div> {/* Empty space for balance */}
      <h1 className="text-xl font-bold text-center">CryptoAnalytics</h1>
      <div className="flex items-center space-x-4 w-1/4 justify-end">
        <button className="p-1 rounded-md hover:bg-gray-700">
          <BellIcon size={20} />
        </button>
        <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
          <UserIcon size={20} />
        </div>
      </div>
    </header>;
};
export default Header;