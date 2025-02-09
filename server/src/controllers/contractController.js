import dotenv from "dotenv";
dotenv.config(); // Ensure .env is loaded before anything else

import { ethers } from "ethers";
import {EnergyTokenABI} from "../../../contracts/EnergyToken.mjs" ;
import {MockUSDTABI} from "../../../contracts/MockUSDT.mjs" ;


// Ensure required environment variables are present
if (!process.env.BLOCKCHAIN_RPC_URL || !process.env.PRIVATE_KEY || 
    !process.env.ENERGY_TOKEN_ADDRESS || !process.env.USDT_TOKEN_ADDRESS) {
    throw new Error("Missing required environment variables. Check .env file.");
}

const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL); // Updated for ethers v6
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const energyTokenContract = new ethers.Contract(process.env.ENERGY_TOKEN_ADDRESS, EnergyTokenABI, wallet);
const usdtContract = new ethers.Contract(process.env.USDT_TOKEN_ADDRESS, MockUSDTABI, wallet);

export const transferEnergyToken = async (req, res) => {
    const { receiver, amount } = req.body;

    try {
        const tx = await energyTokenContract.transfer(receiver, ethers.parseUnits(amount, 18)); // Updated for ethers v6
        await tx.wait();
        res.status(200).json({ message: "EnergyToken transfer successful", transactionHash: tx.hash });
    } catch (error) {
        console.error("EnergyToken transfer failed:", error);
        res.status(500).json({ error: "EnergyToken transfer failed", details: error.message });
    }
};

export const transferUSDT = async (req, res) => {
    const { receiver, amount } = req.body;

    try {
        const tx = await usdtContract.transfer(receiver, ethers.parseUnits(amount, 18)); // Updated for ethers v6
        await tx.wait();
        res.status(200).json({ message: "USDT transfer successful", transactionHash: tx.hash });
    } catch (error) {
        console.error("USDT transfer failed:", error);
        res.status(500).json({ error: "USDT transfer failed", details: error.message });
    }
};