import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
interface PortfolioProps {
  cryptoId: string;
}
const Portfolio = ({
  cryptoId
}: PortfolioProps) => {
  // Mock portfolio data
  const portfolioData = [{
    name: 'Bitcoin',
    value: 45,
    color: '#F7931A'
  }, {
    name: 'Ethereum',
    value: 30,
    color: '#627EEA'
  }, {
    name: 'Binance Coin',
    value: 15,
    color: '#F3BA2F'
  }, {
    name: 'Solana',
    value: 7,
    color: '#00FFA3'
  }, {
    name: 'Other',
    value: 3,
    color: '#8247E5'
  }];
  const totalValue = 24680.75;
  const dailyChange = 823.42;
  const dailyChangePercent = 3.45;
  return <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Portfolio Overview</h2>
        <button className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md">
          Manage
        </button>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 mb-4 md:mb-0">
          <div className="mb-6">
            <p className="text-gray-300 mb-1">Total Value</p>
            <p className="text-2xl font-bold">
              $
              {totalValue.toLocaleString('en-US', {
              maximumFractionDigits: 2
            })}
            </p>
            <div className="flex items-center mt-1">
              <span className={`text-sm ${dailyChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {dailyChange >= 0 ? '+' : ''}
                {dailyChange.toLocaleString('en-US', {
                maximumFractionDigits: 2
              })}{' '}
                ({dailyChangePercent}%)
              </span>
              <span className="text-gray-400 text-sm ml-1">24h</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300">Assets</span>
              <span className="text-gray-300">Allocation</span>
            </div>
            {portfolioData.map((item, index) => <div key={index} className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{
                backgroundColor: item.color
              }}></div>
                  <span>{item.name}</span>
                </div>
                <span>{item.value}%</span>
              </div>)}
          </div>
        </div>
        <div className="md:w-1/2 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={portfolioData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {portfolioData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={value => [`${value}%`, 'Allocation']} contentStyle={{
              backgroundColor: '#1F2937',
              borderColor: '#374151'
            }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>;
};
export default Portfolio;