import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from 'recharts';
const TimeseriesForecasting = () => {
  const [forecastPeriod, setForecastPeriod] = useState('7d');
  // Generate mock forecast data for each cryptocurrency
  const generateForecastData = (baseCurrency: string, baseValue: number) => {
    const data = [];
    const volatility = baseValue * 0.02;
    const trend = Math.random() > 0.5 ? 1 : -1;
    // Current date
    const startDate = new Date();
    // Past data (7 days)
    for (let i = 7; i >= 1; i--) {
      const date = new Date(startDate);
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
      const value = baseValue + (Math.random() - 0.5) * volatility * i;
      const upperBound = value;
      const lowerBound = value;
      data.push({
        date: dateStr,
        [baseCurrency]: value,
        [`${baseCurrency}_upper`]: upperBound,
        [`${baseCurrency}_lower`]: lowerBound,
        forecast: false
      });
    }
    // Today's value
    const todayValue = baseValue + (Math.random() - 0.5) * volatility;
    data.push({
      date: 'Today',
      [baseCurrency]: todayValue,
      [`${baseCurrency}_upper`]: todayValue,
      [`${baseCurrency}_lower`]: todayValue,
      forecast: false
    });
    // Forecast data (7 days)
    let lastValue = todayValue;
    for (let i = 1; i <= 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateStr = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
      // Add some randomness but maintain a trend
      const trendFactor = trend * (i * 0.005);
      const randomFactor = (Math.random() - 0.5) * 0.01;
      const changePercent = trendFactor + randomFactor;
      lastValue = lastValue * (1 + changePercent);
      const confidenceFactor = 0.02 * i; // Confidence interval widens with time
      data.push({
        date: dateStr,
        [baseCurrency]: lastValue,
        [`${baseCurrency}_upper`]: lastValue * (1 + confidenceFactor),
        [`${baseCurrency}_lower`]: lastValue * (1 - confidenceFactor),
        forecast: true
      });
    }
    return data;
  };
  const cryptoData = {
    BTC: {
      baseValue: 42384.25,
      color: '#F7931A'
    },
    ETH: {
      baseValue: 2271.09,
      color: '#627EEA'
    },
    BNB: {
      baseValue: 312.75,
      color: '#F3BA2F'
    },
    SOL: {
      baseValue: 103.42,
      color: '#00FFA3'
    },
    ADA: {
      baseValue: 0.52,
      color: '#8247E5'
    }
  };
  const [activeCryptos, setActiveCryptos] = useState<string[]>(['BTC', 'ETH']);
  const toggleCrypto = (crypto: string) => {
    if (activeCryptos.includes(crypto)) {
      setActiveCryptos(activeCryptos.filter(c => c !== crypto));
    } else {
      setActiveCryptos([...activeCryptos, crypto]);
    }
  };
  // Generate data for each cryptocurrency
  const btcData = generateForecastData('BTC', cryptoData.BTC.baseValue);
  const ethData = generateForecastData('ETH', cryptoData.ETH.baseValue);
  const bnbData = generateForecastData('BNB', cryptoData.BNB.baseValue);
  const solData = generateForecastData('SOL', cryptoData.SOL.baseValue);
  const adaData = generateForecastData('ADA', cryptoData.ADA.baseValue);
  // Get forecast start index based on selected period
  const getForecastData = (data: any[]) => {
    const todayIndex = data.findIndex(item => item.date === 'Today');
    switch (forecastPeriod) {
      case '3d':
        return data.slice(todayIndex - 3, todayIndex + 4);
      case '5d':
        return data.slice(todayIndex - 5, todayIndex + 6);
      case '7d':
      default:
        return data;
    }
  };
  const formatYAxis = (value: number) => {
    if (value >= 1000) {
      return `$${Math.round(value / 1000)}k`;
    }
    return `$${value.toFixed(value < 10 ? 2 : 0)}`;
  };
  const formatTooltipValue = (value: number) => {
    return value >= 1000 ? `$${value.toLocaleString('en-US', {
      maximumFractionDigits: 2
    })}` : `$${value.toFixed(4)}`;
  };
  return <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Time Series Forecasting</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-300">Period:</span>
          <div className="flex bg-gray-700 rounded-md">
            {['3d', '5d', '7d'].map(period => <button key={period} className={`px-3 py-1 text-sm ${forecastPeriod === period ? 'bg-blue-600 text-white rounded-md' : 'text-gray-300'}`} onClick={() => setForecastPeriod(period)}>
                {period}
              </button>)}
          </div>
        </div>
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        {Object.entries(cryptoData).map(([crypto, data]) => <button key={crypto} onClick={() => toggleCrypto(crypto)} className={`px-3 py-1 rounded-full text-sm flex items-center ${activeCryptos.includes(crypto) ? 'bg-gray-700 text-white' : 'bg-gray-700 text-gray-400 opacity-50'}`}>
            <div className="w-3 h-3 rounded-full mr-2" style={{
          backgroundColor: data.color
        }}></div>
            {crypto}
          </button>)}
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={getForecastData(btcData)} margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" tick={{
            fill: '#9CA3AF'
          }} axisLine={{
            stroke: '#4B5563'
          }} />
            <YAxis yAxisId="left" tick={{
            fill: '#9CA3AF'
          }} axisLine={{
            stroke: '#4B5563'
          }} tickFormatter={formatYAxis} domain={['auto', 'auto']} hide={activeCryptos.includes('BTC') || activeCryptos.includes('ETH') ? false : true} />
            <YAxis yAxisId="right" orientation="right" tick={{
            fill: '#9CA3AF'
          }} axisLine={{
            stroke: '#4B5563'
          }} tickFormatter={formatYAxis} domain={['auto', 'auto']} hide={activeCryptos.includes('BNB') || activeCryptos.includes('SOL') || activeCryptos.includes('ADA') ? false : true} />
            <Tooltip contentStyle={{
            backgroundColor: '#1F2937',
            borderColor: '#374151'
          }} formatter={(value: any) => [formatTooltipValue(value), '']} />
            <Legend />
            {/* Bitcoin */}
            {activeCryptos.includes('BTC') && <>
                <Area yAxisId="left" type="monotone" dataKey="BTC_upper" data={getForecastData(btcData)} stroke="transparent" fillOpacity={0.1} fill={cryptoData.BTC.color} activeDot={false} isAnimationActive={false} legendType="none" />
                <Area yAxisId="left" type="monotone" dataKey="BTC_lower" data={getForecastData(btcData)} stroke="transparent" fillOpacity={0.1} fill={cryptoData.BTC.color} activeDot={false} isAnimationActive={false} legendType="none" />
                <Line yAxisId="left" type="monotone" dataKey="BTC" data={getForecastData(btcData)} name="Bitcoin (BTC)" stroke={cryptoData.BTC.color} strokeWidth={2} dot={{
              r: 3
            }} activeDot={{
              r: 5
            }} />
              </>}
            {/* Ethereum */}
            {activeCryptos.includes('ETH') && <>
                <Area yAxisId="left" type="monotone" dataKey="ETH_upper" data={getForecastData(ethData)} stroke="transparent" fillOpacity={0.1} fill={cryptoData.ETH.color} activeDot={false} isAnimationActive={false} legendType="none" />
                <Area yAxisId="left" type="monotone" dataKey="ETH_lower" data={getForecastData(ethData)} stroke="transparent" fillOpacity={0.1} fill={cryptoData.ETH.color} activeDot={false} isAnimationActive={false} legendType="none" />
                <Line yAxisId="left" type="monotone" dataKey="ETH" data={getForecastData(ethData)} name="Ethereum (ETH)" stroke={cryptoData.ETH.color} strokeWidth={2} dot={{
              r: 3
            }} activeDot={{
              r: 5
            }} />
              </>}
            {/* Binance Coin */}
            {activeCryptos.includes('BNB') && <>
                <Area yAxisId="right" type="monotone" dataKey="BNB_upper" data={getForecastData(bnbData)} stroke="transparent" fillOpacity={0.1} fill={cryptoData.BNB.color} activeDot={false} isAnimationActive={false} legendType="none" />
                <Area yAxisId="right" type="monotone" dataKey="BNB_lower" data={getForecastData(bnbData)} stroke="transparent" fillOpacity={0.1} fill={cryptoData.BNB.color} activeDot={false} isAnimationActive={false} legendType="none" />
                <Line yAxisId="right" type="monotone" dataKey="BNB" data={getForecastData(bnbData)} name="Binance Coin (BNB)" stroke={cryptoData.BNB.color} strokeWidth={2} dot={{
              r: 3
            }} activeDot={{
              r: 5
            }} />
              </>}
            {/* Solana */}
            {activeCryptos.includes('SOL') && <>
                <Area yAxisId="right" type="monotone" dataKey="SOL_upper" data={getForecastData(solData)} stroke="transparent" fillOpacity={0.1} fill={cryptoData.SOL.color} activeDot={false} isAnimationActive={false} legendType="none" />
                <Area yAxisId="right" type="monotone" dataKey="SOL_lower" data={getForecastData(solData)} stroke="transparent" fillOpacity={0.1} fill={cryptoData.SOL.color} activeDot={false} isAnimationActive={false} legendType="none" />
                <Line yAxisId="right" type="monotone" dataKey="SOL" data={getForecastData(solData)} name="Solana (SOL)" stroke={cryptoData.SOL.color} strokeWidth={2} dot={{
              r: 3
            }} activeDot={{
              r: 5
            }} />
              </>}
            {/* Cardano */}
            {activeCryptos.includes('ADA') && <>
                <Area yAxisId="right" type="monotone" dataKey="ADA_upper" data={getForecastData(adaData)} stroke="transparent" fillOpacity={0.1} fill={cryptoData.ADA.color} activeDot={false} isAnimationActive={false} legendType="none" />
                <Area yAxisId="right" type="monotone" dataKey="ADA_lower" data={getForecastData(adaData)} stroke="transparent" fillOpacity={0.1} fill={cryptoData.ADA.color} activeDot={false} isAnimationActive={false} legendType="none" />
                <Line yAxisId="right" type="monotone" dataKey="ADA" data={getForecastData(adaData)} name="Cardano (ADA)" stroke={cryptoData.ADA.color} strokeWidth={2} dot={{
              r: 3
            }} activeDot={{
              r: 5
            }} />
              </>}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 bg-gray-700 p-3 rounded-lg">
        <p className="text-sm text-gray-300">
          <span className="font-bold">Forecast Analysis:</span> The shaded areas
          represent confidence intervals for predicted values. Past data points
          are shown with solid lines, while forecast values are indicated with
          lighter opacity. Select different cryptocurrencies to compare their
          forecast trends.
        </p>
      </div>
    </div>;
};
export default TimeseriesForecasting;