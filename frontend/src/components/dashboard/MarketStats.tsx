import React from 'react';
import { TrendingUpIcon, TrendingDownIcon, DollarSignIcon, BarChart2Icon } from 'lucide-react';
interface MarketStatsProps {
  cryptoId: string;
}
const MarketStats = ({
  cryptoId
}: MarketStatsProps) => {
  // Mock data for market statistics
  const stats = {
    BTC: {
      marketCap: '$817.5B',
      volume24h: '$21.4B',
      circulatingSupply: '19.3M BTC',
      allTimeHigh: '$69,044.77'
    },
    ETH: {
      marketCap: '$272.1B',
      volume24h: '$11.8B',
      circulatingSupply: '120.1M ETH',
      allTimeHigh: '$4,891.70'
    },
    BNB: {
      marketCap: '$48.2B',
      volume24h: '$1.2B',
      circulatingSupply: '153.8M BNB',
      allTimeHigh: '$686.31'
    },
    SOL: {
      marketCap: '$42.8B',
      volume24h: '$2.1B',
      circulatingSupply: '412.3M SOL',
      allTimeHigh: '$259.96'
    },
    ADA: {
      marketCap: '$18.1B',
      volume24h: '$0.7B',
      circulatingSupply: '35.1B ADA',
      allTimeHigh: '$3.10'
    }
  };
  const currentStats = stats[cryptoId as keyof typeof stats] || stats.BTC;
  return <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Market Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <DollarSignIcon size={16} className="text-blue-400 mr-2" />
            <span className="text-gray-300 text-sm">Market Cap</span>
          </div>
          <p className="text-lg font-bold">{currentStats.marketCap}</p>
        </div>
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <BarChart2Icon size={16} className="text-purple-400 mr-2" />
            <span className="text-gray-300 text-sm">24h Volume</span>
          </div>
          <p className="text-lg font-bold">{currentStats.volume24h}</p>
        </div>
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <TrendingUpIcon size={16} className="text-green-400 mr-2" />
            <span className="text-gray-300 text-sm">Circulating Supply</span>
          </div>
          <p className="text-lg font-bold">{currentStats.circulatingSupply}</p>
        </div>
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <TrendingDownIcon size={16} className="text-amber-400 mr-2" />
            <span className="text-gray-300 text-sm">All Time High</span>
          </div>
          <p className="text-lg font-bold">{currentStats.allTimeHigh}</p>
        </div>
      </div>
    </div>;
};
export default MarketStats;