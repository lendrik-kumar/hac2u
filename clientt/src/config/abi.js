export const EnergyTokenABI = [
	{
	  "inputs": [{"internalType": "uint256", "name": "initialSupply", "type": "uint256"}],
	  "stateMutability": "nonpayable",
	  "type": "constructor"
	},
	{
	  "inputs": [
		{"internalType": "address", "name": "to", "type": "address"},
		{"internalType": "uint256", "name": "amount", "type": "uint256"}
	  ],
	  "name": "mint",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "inputs": [
		{"internalType": "address", "name": "from", "type": "address"},
		{"internalType": "uint256", "name": "amount", "type": "uint256"}
	  ],
	  "name": "burn",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	}
  ];
  
  export const P2PEnergyTradingABI = [
	{
	  "inputs": [
		{"internalType": "address", "name": "_energyToken", "type": "address"},
		{"internalType": "address", "name": "_usdt", "type": "address"}
	  ],
	  "stateMutability": "nonpayable",
	  "type": "constructor"
	},
	{
	  "inputs": [
		{"internalType": "uint256", "name": "energyAmount", "type": "uint256"},
		{"internalType": "uint256", "name": "pricePerUnit", "type": "uint256"}
	  ],
	  "name": "listTrade",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "inputs": [{"internalType": "uint256", "name": "tradeId", "type": "uint256"}],
	  "name": "purchaseEnergy",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
	  "name": "trades",
	  "outputs": [
		{"internalType": "address", "name": "producer", "type": "address"},
		{"internalType": "uint256", "name": "energyAmount", "type": "uint256"},
		{"internalType": "uint256", "name": "pricePerUnit", "type": "uint256"},
		{"internalType": "bool", "name": "isActive", "type": "bool"}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	}
  ];
