import React from 'react';
import CryptoChart from './CryptoChart';
import Chatbot from './Chatbot';
import TimeseriesForecasting from './TimeseriesForecasting';
import NewsFeed from './NewsFeed';
interface DashboardProps {
  activeCrypto: string;
}
const Dashboard = ({
  activeCrypto
}: DashboardProps) => {
  return <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <CryptoChart cryptoId={activeCrypto} />
      </div>
      <div>
        <Chatbot cryptoId={activeCrypto} />
      </div>
      <div className="lg:col-span-2">
        <TimeseriesForecasting />
      </div>
      <div>
        <NewsFeed cryptoId={activeCrypto} />
      </div>
    </div>;
};
export default Dashboard;