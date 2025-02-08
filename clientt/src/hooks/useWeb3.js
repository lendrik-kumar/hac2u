import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export const useWeb3 = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        if (!window.ethereum) {
          throw new Error("Please install MetaMask!");
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        
        setProvider(provider);
        setAccount(accounts[0]);

        // Listen for account changes
        window.ethereum.on('accountsChanged', (accounts) => {
          setAccount(accounts[0]);
        });

      } catch (err) {
        setError(err.message);
      }
    };

    init();

    // Cleanup listener on unmount
    return () => {
      window.ethereum?.removeListener('accountsChanged', setAccount);
    };
  }, []);

  return { provider, account, error };
};

export default useWeb3;
