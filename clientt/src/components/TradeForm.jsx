import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useContract } from '../hooks/useContract.js';

const TradeForm = () => {
  const { contracts } = useContract();
  const [energyAmount, setEnergyAmount] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const energyInWei = ethers.utils.parseUnits(energyAmount, 18);
      const priceInWei = ethers.utils.parseUnits(pricePerUnit, 6);
      
      const tx = await contracts.p2pTrading.listTrade(energyInWei, priceInWei);
      await tx.wait();
      
      setEnergyAmount('');
      setPricePerUnit('');
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label className="block text-sm font-medium text-white">Energy Amount (kWh)</label>
        <input
          type="number"
          value={energyAmount}
          onChange={(e) => setEnergyAmount(e.target.value)}
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-white">Price per kWh (USDT)</label>
        <input
          type="number"
          value={pricePerUnit}
          onChange={(e) => setPricePerUnit(e.target.value)}
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'List Trade'}
      </button>
    </form>
  );
};

export default TradeForm;
