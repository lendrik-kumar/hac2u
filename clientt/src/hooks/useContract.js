import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { P2PEnergyTrading } from '../../../contracts/p2pEnergy.js';
import { EnergyTokenABI } from '../../../contracts/EnergyToken.mjs';
import { MockUSDTABI } from '../../../contracts/MockUSDT.mjs';
// import { EnergyTokenABI } from '../../../contracts/EnergyToken.js';
// import { MockUSDTABI } from '../../../contracts/MockUSDT.js';

const CONTRACT_ADDRESSES = {
  P2P_TRADING: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
  ENERGY_TOKEN: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  USDT_TOKEN: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
};

export function useContract() {
  const [contracts, setContracts] = useState(null);

  useEffect(() => {
    const initializeContracts = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const p2pTrading = new ethers.Contract(
          CONTRACT_ADDRESSES.P2P_TRADING,
          P2PEnergyTrading,
          signer
        );

        const energyToken = new ethers.Contract(
          CONTRACT_ADDRESSES.ENERGY_TOKEN,
          EnergyTokenABI,
          signer
        );

        const usdt = new ethers.Contract(
          CONTRACT_ADDRESSES.USDT_TOKEN,
          MockUSDTABI,
          signer
        );

        setContracts({ p2pTrading, energyToken, usdt });
      } catch (error) {
        console.error('Failed to initialize contracts:', error);
      }
    };

    if (window.ethereum) {
      initializeContracts();
    }
  }, []);

  return { contracts };
}
