import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BackgroundBeamsWithCollision } from "../../components/ui/background-beams-with-collision.jsx";
import Maps from '../../components/Maps.jsx';
import { useMapContext } from '../../Context/mapContext';
import { ethers } from 'ethers';

function Home() {
  const { isIconClicked } = useMapContext();

  useEffect(() => {
    console.log(isIconClicked);
  }, [isIconClicked]);

  const sellers = [
    { name: "Seller A", energy: "100 kWh", rate: "$0.12/kWh" },
    { name: "Seller B", energy: "200 kWh", rate: "$0.11/kWh" },
    { name: "Seller C", energy: "150 kWh", rate: "$0.13/kWh" }
  ];
  const handleBuyEnergy = async (seller, amount, price) => {
    try {
      if (!window.ethereum) {
        alert('Please install MetaMask!');
        return;
      }

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        'YOUR_CONTRACT_ADDRESS', // Replace with your contract address
        P2PEnergyTrading.abi,
        signer
      );

      const tradeId = 0; // Replace with the actual trade ID
      const tx = await contract.purchaseEnergy(tradeId, {
        value: ethers.utils.parseEther(price.replace('$', ''))
      });

      await tx.wait();
      alert('Energy purchased successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to purchase energy.');
    }
  };
  return (
    <BackgroundBeamsWithCollision>
      <div className="relative flex min-h-screen text-white">
        {/* Sidebar */}
        {isIconClicked && (
  <motion.div
    className="absolute left-0 top-96 h-full w-64 bg-black/50 border-r border-gray-700 p-6 space-y-4 shadow-lg"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-xl font-bold text-center mb-4">Energy Sellers</h2>
    {sellers.map((seller, index) => (
      <div key={index} className="bg-gray-900 p-4 rounded-lg shadow-md">
        <p className="text-lg font-semibold">{seller.name}</p>
        <p className="text-gray-300">Energy: {seller.energy}</p>
        <p className="text-gray-400">Rate: {seller.rate}</p>
        <button className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold w-full"
      //onClick={handleBuyEnergy(seller.name, (seller.energy*seller.rate, seller.rate))}
        >
          Buy Now
        </button>
      </div>
    ))}
  </motion.div>
)}


        {/* Main Content */}
        <div className="flex-1 transition-all">
          <div className="relative w-full max-w-5xl mx-auto px-6 py-10 space-y-6">
            {/* Top Section */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 backdrop-blur-lg bg-black/50 border border-gray-700 shadow-xl p-6 rounded-xl text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {[
                { value: '450', unit: 'kWh', label: 'Available Power', color: 'text-blue-300' },
                { value: '2.4', unit: 'kW', label: 'Current Usage', color: 'text-green-300' },
                { value: '$42', unit: 'USD', label: 'Balance', color: 'text-yellow-300' }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <motion.div className={`text-4xl font-extrabold ${item.color}`} whileHover={{ scale: 1.1 }}>
                    {item.value}
                  </motion.div>
                  <div className="text-gray-300 text-lg">{item.unit}</div>
                  <div className="text-gray-400">{item.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Quick Purchase & Daily Usage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div className="bg-black/50 border backdrop-blur-lg border-gray-700 shadow-xl p-6 rounded-xl" whileHover={{ scale: 1.02 }}>
                <h2 className="font-semibold text-lg mb-4">Quick Purchase</h2>
                <div className="space-y-3">
                  {[
                    { amount: '50 kWh', price: '$25' },
                    { amount: '100 kWh', price: '$45' },
                    { amount: '200 kWh', price: '$85' }
                  ].map((item, index) => (
                    <motion.div key={index} className="flex justify-between px-4 py-2 bg-gray-900 rounded-md cursor-pointer hover:bg-gray-700 transition" whileTap={{ scale: 0.95 }}>
                      <span>{item.amount}</span> <span className="text-blue-300">{item.price}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div className="bg-black/50 border backdrop-blur-lg border-gray-700 shadow-xl p-6 rounded-xl" whileHover={{ scale: 1.02 }}>
                <h2 className="font-semibold text-lg mb-4">Daily Electricity Usage</h2>
                <div className="w-full h-32 bg-gray-900 rounded-lg flex items-center justify-center">
                  <img
                    src="https://images.theconversation.com/files/489836/original/file-20221014-1601-53ifwb.gif?auto=format&fit=clip&ixlib=rb-1.1.0&q=45&w=1000"
                    alt="Daily Electricity Usage Line Graph"
                    className="w-full h-36 rounded-lg"
                  />
                </div>
              </motion.div>
            </div>

            {/* Map Section */}
            <motion.div className="bg-black/50 border backdrop-blur-lg border-gray-700 shadow-xl py-10 px-9 rounded-xl" whileHover={{ scale: 1.02 }}>
              <p className="mb-12 text-3xl font-semibold">Energy Usage Map</p>
              <div className="w-full h-80 mb-4">
                <Maps />
              </div>
            </motion.div>

            {/* Recent Transactions */}
            <motion.div className="bg-black/50 border backdrop-blur-lg border-gray-700 shadow-xl p-6 rounded-xl" whileHover={{ scale: 1.02 }}>
              <h2 className="font-semibold text-lg mb-4">Recent Transactions</h2>
              <div className="space-y-3">
                {[
                  { desc: 'Purchased 50 kWh', amount: '+ $25', color: 'text-green-300' },
                  { desc: 'Usage Payment', amount: '- $18', color: 'text-red-300' },
                  { desc: 'Purchased 100 kWh', amount: '+ $45', color: 'text-green-300' }
                ].map((item, index) => (
                  <motion.div key={index} className="flex justify-between px-4 py-2 bg-gray-900 rounded-md hover:bg-gray-700 transition" whileTap={{ scale: 0.95 }}>
                    <span>{item.desc}</span> <span className={item.color}>{item.amount}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}

export default Home;
