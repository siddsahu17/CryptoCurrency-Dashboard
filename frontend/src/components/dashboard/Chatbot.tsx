import React, { useState } from 'react';
import { SendIcon, BotIcon, UserIcon } from 'lucide-react';
interface ChatbotProps {
  cryptoId: string;
}
const Chatbot = ({
  cryptoId
}: ChatbotProps) => {
  const [messages, setMessages] = useState([{
    text: `Hello! I'm your crypto assistant. Ask me anything about ${cryptoId} or other cryptocurrencies!`,
    sender: 'bot'
  }]);
  const [input, setInput] = useState('');
  const handleSend = () => {
    if (input.trim() === '') return;
    // Add user message
    const newMessages = [...messages, {
      text: input,
      sender: 'user'
    }];
    setMessages(newMessages);
    setInput('');
    // Simulate bot response
    setTimeout(() => {
      let botResponse = '';
      if (input.toLowerCase().includes('price') || input.toLowerCase().includes('worth')) {
        botResponse = `${cryptoId} is currently trading at ${cryptoId === 'BTC' ? '$42,384.25' : cryptoId === 'ETH' ? '$2,271.09' : cryptoId === 'BNB' ? '$312.75' : cryptoId === 'SOL' ? '$103.42' : '$0.52'}.`;
      } else if (input.toLowerCase().includes('invest') || input.toLowerCase().includes('buy')) {
        botResponse = `${cryptoId} has shown ${cryptoId === 'BTC' || cryptoId === 'ETH' || cryptoId === 'SOL' ? 'positive' : 'mixed'} performance recently. Remember that all investments carry risk and you should do your own research before investing.`;
      } else if (input.toLowerCase().includes('market cap') || input.toLowerCase().includes('volume')) {
        botResponse = `${cryptoId} has a market cap of ${cryptoId === 'BTC' ? '$817.5B' : cryptoId === 'ETH' ? '$272.1B' : cryptoId === 'BNB' ? '$48.2B' : cryptoId === 'SOL' ? '$42.8B' : '$18.1B'} with a 24h trading volume of ${cryptoId === 'BTC' ? '$21.4B' : cryptoId === 'ETH' ? '$11.8B' : cryptoId === 'BNB' ? '$1.2B' : cryptoId === 'SOL' ? '$2.1B' : '$0.7B'}.`;
      } else {
        botResponse = `Thanks for your question about ${cryptoId}. I'm still learning and improving my knowledge base. Is there anything specific about price trends, market statistics, or investment strategies you'd like to know?`;
      }
      setMessages([...newMessages, {
        text: botResponse,
        sender: 'bot'
      }]);
    }, 1000);
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };
  return <div className="bg-gray-800 rounded-lg shadow-lg flex flex-col h-full">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold flex items-center">
          <BotIcon className="mr-2" size={20} />
          Crypto Assistant
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-3/4 rounded-lg px-4 py-2 ${message.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-700 text-white rounded-bl-none'}`}>
              <div className="flex items-center mb-1">
                {message.sender === 'bot' ? <BotIcon size={16} className="mr-1" /> : <UserIcon size={16} className="mr-1" />}
                <span className="text-xs text-gray-300">
                  {message.sender === 'bot' ? 'Assistant' : 'You'}
                </span>
              </div>
              <p>{message.text}</p>
            </div>
          </div>)}
      </div>
      <div className="p-4 border-t border-gray-700">
        <div className="flex rounded-lg bg-gray-700 overflow-hidden">
          <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyPress={handleKeyPress} placeholder={`Ask about ${cryptoId}...`} className="flex-1 bg-transparent border-0 focus:ring-0 px-4 py-2 text-white" />
          <button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700 px-4 flex items-center">
            <SendIcon size={18} />
          </button>
        </div>
      </div>
    </div>;
};
export default Chatbot;