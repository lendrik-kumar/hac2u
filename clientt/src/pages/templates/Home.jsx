import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundBeamsWithCollision } from "../../components/ui/background-beams-with-collision.jsx";
import Maps from '../../components/Maps.jsx';
import { useMapContext } from '../../Context/mapContext';
import { ethers } from 'ethers';
import TradeList from '../../components/TradeList.jsx';
import { useWeb3 } from '../../hooks/useWeb3.js';
import { useContract } from '../../hooks/useContract';


function Home() {
  const { account, error } = useWeb3();
  const { isIconClicked } = useMapContext();
  const { contracts } = useContract();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [recentPurchases, setRecentPurchases] = useState([]);
const [totalEnergyPurchased, setTotalEnergyPurchased] = useState(0);


  useEffect(() => {
    console.log(isIconClicked);
  }, [isIconClicked]);
 
  
  const [loading, setLoading] = useState(false);



  const sellers = [
    { 
      name: "Seller A", 
      energy: "100 kWh", 
      rate: "$0.12/kWh",
      address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", // Add actual seller address
      tradeId: 0
    },
    { 
      name: "Seller B", 
      energy: "200 kWh", 
      rate: "$0.11/kWh",
      address: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", // Add actual seller address
      tradeId: 1
    },
    { 
      name: "Seller C", 
      energy: "150 kWh", 
      rate: "$0.13/kWh",
      address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906", // Add actual seller address
      tradeId: 2
    }
  ];
  const handleBuyEnergy = async (seller) => {
    if (!account || !contracts) {
      alert('Please connect your wallet first');
      return;
    }
  
    setLoading(true);
    try {
      // Parse energy amount and rate
      const energyAmount = parseFloat(seller.energy.split(' ')[0]);
      const rate = parseFloat(seller.rate.replace('$', '').split('/')[0]);
      const totalPrice = energyAmount * rate;
  
      // Convert to Wei
      const energyInWei = ethers.utils.parseUnits(energyAmount.toString(), 18);
      const priceInWei = ethers.utils.parseUnits(totalPrice.toString(), 6);
  
      // Approve USDT spending
      const approveTx = await contracts.usdt.approve(
        contracts.p2pTrading.address,
        priceInWei
      );
      await approveTx.wait();
  
      // Get the trade ID for this seller
      // You'll need to implement a way to get the trade ID
      // For now, let's assume it's stored in the seller object or retrieved from the contract
      const tradeId = 0; 
  
      // Execute purchase with only the trade ID
      const purchaseTx = await contracts.p2pTrading.purchaseEnergy(tradeId);
      await purchaseTx.wait();
 
      setPopupMessage(`${seller.energy} energy successfully added to your account`);
      setShowPopup(true);
      const newPurchase = {
        id: Date.now(),
        energy: seller.energy,
        amount: `$${(parseFloat(seller.energy) * parseFloat(seller.rate.replace('$', '').split('/')[0])).toFixed(2)}`,
        seller: seller.name,
        date: new Date().toLocaleString()
      };
  
      setRecentPurchases(prevPurchases => {
        const updatedPurchases = [newPurchase, ...prevPurchases].slice(0, 5); // Keep only last 5 purchases
        return updatedPurchases;
      });

      setTotalEnergyPurchased(prevTotal => 
        prevTotal + parseFloat(seller.energy.split(' ')[0])
      );
      
      // Hide popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      
   

    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Failed to purchase energy: ' + error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <BackgroundBeamsWithCollision>
      <div className="relative flex min-h-screen text-white">
{ isIconClicked &&
      <motion.div className="bg-black/50 border backdrop-blur-lg border-gray-700 shadow-xl py-4 w-auto rounded-xl" whileHover={{ scale: 1.02 }}>
  <div className="flex justify-between items-center mb-4">
    <h2 className="font-semibold text-lg pl-7">Recent Purchases  </h2>
    <div className="text-blue-300 pl-6 ">
      Total Energy: {totalEnergyPurchased.toFixed(2)} kWh
    </div>

  </div>
  <div className="space-y-3">
    {recentPurchases.length === 0 ? (
      <div className="text-center text-gray-400">No purchases yet</div>
    ) : (
      recentPurchases.map((purchase) => (
        <>
        <motion.div 
          key={purchase.id} 
          className="flex justify-between px-4 py-2 bg-gray-900 rounded-md hover:bg-gray-700 transition"
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex flex-col">
            <span>{`Purchased ${purchase.energy} from ${purchase.seller}`}</span>
            <span className="text-sm text-gray-400">{purchase.date}</span>
          </div>
          <span className="text-green-300">{purchase.amount}</span>
        </motion.div>
      
        </>
        
      ))
    )}
  </div>
</motion.div>
}

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
              <span>{popupMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

<button 
  className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold w-full disabled:bg-gray-600 disabled:cursor-not-allowed"
  onClick={() => handleBuyEnergy(seller)}
  disabled={loading}
>
  {loading ? 'Processing...' : 'Buy Now'}
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
                  { desc: `Purchased  kWh`, amount: '+ $25', color: 'text-green-300' },
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
