import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import  {useContract}  from '../hooks/useContract';

 const TradeList = () => {
  const {contracts} = useContract();
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!contracts) return;
    
    const fetchTrades = async () => {
      try {
        // Example: Fetch last 10 trades
        const events = await contracts.p2pTrading.queryFilter(
          contracts.p2pTrading.filters.TradeListed()
        );
        
        const activeTrades = await Promise.all(
          events.map(async (event) => {
            const trade = await contracts.p2pTrading.trades(event.args.tradeId);
            return {
              id: event.args.tradeId.toString(),
              producer: trade.producer,
              energyAmount: ethers.formatUnits(trade.energyAmount, 18),
              pricePerUnit: ethers.formatUnits(trade.pricePerUnit, 6),
              isActive: trade.isActive
            };
          })
        );

        setTrades(activeTrades.filter(t => t.isActive));
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchTrades();
  }, [contracts]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Available Trades</h2>
      {loading ? (
        <p>Loading trades...</p>
      ) : (
        <div className="grid gap-4">
          {trades.map((trade) => (
            <div 
              key={trade.id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <p>Producer: {trade.producer}</p>
              <p>Energy Amount: {trade.energyAmount} kWh</p>
              <p>Price per kWh: {trade.pricePerUnit} USDT</p>
              <button
                onClick={() => handlePurchase(trade.id)}
                className="mt-2 bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600"
              >
                Purchase
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TradeList;

