import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
interface CryptoChartProps {
  cryptoId: string;
}
const CryptoChart = ({
  cryptoId
}: CryptoChartProps) => {
  const [timeframe, setTimeframe] = useState('1D');
  // Mock data for the chart
  const generateMockData = () => {
    const data = [];
    const baseValue = cryptoId === 'BTC' ? 42000 : cryptoId === 'ETH' ? 2200 : cryptoId === 'BNB' ? 310 : cryptoId === 'SOL' ? 100 : 0.5;
    const volatility = baseValue * 0.05;
    for (let i = 0; i < 24; i++) {
      const time = i.toString().padStart(2, '0') + ':00';
      const value = baseValue + (Math.random() - 0.5) * volatility;
      data.push({
        time,
        value
      });
    }
    return data;
  };
  const data = generateMockData();
  const firstValue = data[0].value;
  const lastValue = data[data.length - 1].value;
  const change = lastValue - firstValue;
  const percentChange = (change / firstValue * 100).toFixed(2);
  const isPositive = change >= 0;
  const timeframes = ['1H', '1D', '1W', '1M', '1Y'];
  const formatCurrency = (value: number) => {
    return value >= 1000 ? `$${value.toLocaleString('en-US', {
      maximumFractionDigits: 2
    })}` : `$${value.toFixed(4)}`;
  };
  return <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">{cryptoId} Price Chart</h2>
          <div className="flex items-center mt-1">
            <span className="text-2xl font-bold mr-2">
              {formatCurrency(lastValue)}
            </span>
            <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? <ArrowUpIcon size={16} /> : <ArrowDownIcon size={16} />}
              <span className="ml-1">{percentChange}%</span>
            </div>
          </div>
        </div>
        <div className="flex bg-gray-700 rounded-md">
          {timeframes.map(tf => <button key={tf} className={`px-3 py-1 text-sm ${timeframe === tf ? 'bg-blue-600 text-white rounded-md' : 'text-gray-300'}`} onClick={() => setTimeframe(tf)}>
              {tf}
            </button>)}
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" tick={{
            fill: '#9CA3AF'
          }} axisLine={{
            stroke: '#4B5563'
          }} />
            <YAxis domain={['dataMin - 100', 'dataMax + 100']} tick={{
            fill: '#9CA3AF'
          }} axisLine={{
            stroke: '#4B5563'
          }} tickFormatter={value => `$${Math.round(value)}`} />
            <Tooltip contentStyle={{
            backgroundColor: '#1F2937',
            borderColor: '#374151'
          }} formatter={(value: any) => [`${formatCurrency(value)}`, 'Price']} />
            <Line type="monotone" dataKey="value" stroke={isPositive ? '#10B981' : '#EF4444'} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>;
};
export default CryptoChart;