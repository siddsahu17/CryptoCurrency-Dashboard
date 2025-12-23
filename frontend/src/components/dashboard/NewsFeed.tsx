import React, { useState } from 'react';
import { ExternalLinkIcon, ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';
interface NewsFeedProps {
  cryptoId: string;
}
const NewsFeed = ({
  cryptoId
}: NewsFeedProps) => {
  // Mock news data - expanded to 10 items
  const newsItems = [{
    id: 1,
    title: `${cryptoId} Price Surges as Institutional Interest Grows`,
    source: 'CryptoNews',
    time: '2 hours ago',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
    content: `${cryptoId} has seen a significant price increase over the past 24 hours as institutional investors continue to show interest in the cryptocurrency market. Analysts suggest this could be the beginning of a new bull run.`
  }, {
    id: 2,
    title: 'New Regulatory Framework for Cryptocurrencies Proposed',
    source: 'BlockchainTimes',
    time: '5 hours ago',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
    content: 'Lawmakers have proposed a new regulatory framework aimed at providing clarity for cryptocurrency businesses while protecting consumers. The proposal has received mixed reactions from industry leaders.'
  }, {
    id: 3,
    title: `Major Exchange Adds Support for ${cryptoId} Trading Pairs`,
    source: 'CoinDesk',
    time: '1 day ago',
    image: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
    content: `A major cryptocurrency exchange has announced the addition of new ${cryptoId} trading pairs, expanding accessibility for traders and potentially increasing liquidity in the market.`
  }, {
    id: 4,
    title: `${cryptoId} Developer Conference Announces Key Protocol Updates`,
    source: 'CryptoInsider',
    time: '2 days ago',
    image: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
    content: `At the annual developer conference, the ${cryptoId} core team unveiled several key protocol updates aimed at improving scalability and reducing transaction fees. These changes are expected to be implemented in the next quarter.`
  }, {
    id: 5,
    title: 'Institutional Investors Allocate More Capital to Crypto Assets',
    source: 'FinanceDaily',
    time: '3 days ago',
    image: 'https://images.unsplash.com/photo-1551135049-8a33b5883817?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
    content: 'A new report indicates that institutional investors are continuing to increase their allocation to cryptocurrency assets, with Bitcoin and Ethereum receiving the largest share of new investments.'
  }, {
    id: 6,
    title: `${cryptoId} Mining Difficulty Reaches All-Time High`,
    source: 'MiningWeekly',
    time: '3 days ago',
    image: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
    content: `The mining difficulty for ${cryptoId} has reached an all-time high, reflecting increased competition among miners and growing network security. This development comes as more mining operations transition to renewable energy sources.`
  }, {
    id: 7,
    title: 'Central Banks Exploring Digital Currency Options',
    source: 'GlobalEconomics',
    time: '4 days ago',
    image: 'https://images.unsplash.com/photo-1574607383476-f517f260d236?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
    content: 'Several central banks have announced new initiatives to explore digital currency options, potentially creating both challenges and opportunities for existing cryptocurrencies.'
  }, {
    id: 8,
    title: `New ${cryptoId} DeFi Protocol Gains Traction`,
    source: 'DeFiPulse',
    time: '5 days ago',
    image: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
    content: `A new decentralized finance protocol built on ${cryptoId} has gained significant traction, with total value locked exceeding $100 million within its first week of launch. The protocol offers innovative yield farming opportunities.`
  }, {
    id: 9,
    title: 'Cybersecurity Firm Identifies New Crypto Scam Techniques',
    source: 'SecurityAlert',
    time: '6 days ago',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
    content: 'A leading cybersecurity firm has identified new techniques being used by scammers targeting cryptocurrency holders. The report highlights the importance of security best practices and awareness.'
  }, {
    id: 10,
    title: `${cryptoId} Integration Announced for Major Payment Platform`,
    source: 'PaymentTech',
    time: '1 week ago',
    image: 'https://images.unsplash.com/photo-1556742031-c6961e8560b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
    content: `A major global payment platform has announced integration with ${cryptoId}, allowing millions of users to easily buy, sell, and hold the cryptocurrency. This move is expected to significantly increase adoption and accessibility.`
  }];
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const handleNextNews = () => {
    setCurrentNewsIndex(prevIndex => (prevIndex + 1) % newsItems.length);
  };
  const handlePrevNews = () => {
    setCurrentNewsIndex(prevIndex => (prevIndex - 1 + newsItems.length) % newsItems.length);
  };
  const currentNews = newsItems[currentNewsIndex];
  return <div className="bg-gray-800 rounded-lg p-6 shadow-lg h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Latest News</h2>
        <div className="text-sm text-gray-400">
          {currentNewsIndex + 1}/{newsItems.length}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
          <img src={currentNews.image} alt={currentNews.title} className="w-full h-full object-cover" />
        </div>
        <h3 className="text-lg font-medium mb-2 hover:text-blue-400 cursor-pointer flex items-start">
          {currentNews.title}
          <ExternalLinkIcon size={16} className="ml-1 mt-1 inline-block flex-shrink-0" />
        </h3>
        <div className="flex text-xs text-gray-400 mb-3">
          <span>{currentNews.source}</span>
          <span className="mx-2">•</span>
          <span>{currentNews.time}</span>
        </div>
        <p className="text-sm text-gray-300 flex-1">{currentNews.content}</p>
      </div>
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
        <button onClick={handlePrevNews} className="flex items-center text-gray-300 hover:text-white">
          <ChevronLeftIcon size={20} className="mr-1" />
          <span>Previous</span>
        </button>
        <button onClick={handleNextNews} className="flex items-center text-blue-400 hover:text-blue-300">
          <span>Next</span>
          <ChevronRightIcon size={20} className="ml-1" />
        </button>
      </div>
    </div>;
};
export default NewsFeed;