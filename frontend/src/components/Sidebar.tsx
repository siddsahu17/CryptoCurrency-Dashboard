import React from 'react';
interface SidebarProps {
  activeCrypto: string;
  setActiveCrypto: (crypto: string) => void;
}
const Sidebar = ({
  activeCrypto,
  setActiveCrypto
}: SidebarProps) => {
  const cryptoList = [{
    id: 'BTC',
    name: 'Bitcoin',
    price: '$42,384.25',
    change: '+2.5%'
  }, {
    id: 'ETH',
    name: 'Ethereum',
    price: '$2,271.09',
    change: '+3.2%'
  }, {
    id: 'BNB',
    name: 'Binance Coin',
    price: '$312.75',
    change: '-0.8%'
  }, {
    id: 'SOL',
    name: 'Solana',
    price: '$103.42',
    change: '+5.7%'
  }, {
    id: 'ADA',
    name: 'Cardano',
    price: '$0.52',
    change: '-1.2%'
  }];
  return <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col h-full">
      <div className="p-4 border-b border-gray-700">
        <h2 className="font-bold text-center">Cryptocurrencies</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {cryptoList.map(crypto => <div key={crypto.id} onClick={() => setActiveCrypto(crypto.id)} className={`p-3 border-b border-gray-700 cursor-pointer ${activeCrypto === crypto.id ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                  {crypto.id.substring(0, 1)}
                </div>
                <div>
                  <p className="font-medium">{crypto.name}</p>
                  <p className="text-xs text-gray-400">{crypto.id}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{crypto.price}</p>
                <p className={`text-xs ${crypto.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {crypto.change}
                </p>
              </div>
            </div>
          </div>)}
      </div>
    </div>;
};
export default Sidebar;