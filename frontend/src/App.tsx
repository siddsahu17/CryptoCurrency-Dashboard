import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
export function App() {
  const [activeCrypto, setActiveCrypto] = useState('BTC');
  return <div className="flex flex-col h-screen bg-gray-900 text-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeCrypto={activeCrypto} setActiveCrypto={setActiveCrypto} />
        <main className="flex-1 overflow-y-auto p-4">
          <Dashboard activeCrypto={activeCrypto} />
        </main>
      </div>
    </div>;
}