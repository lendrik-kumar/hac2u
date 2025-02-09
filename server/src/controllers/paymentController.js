import { ethers } from "ethers";
import {EnergyTokenABI} from "../../../contracts/EnergyToken.mjs";
import dotenv from "dotenv";

dotenv.config();

export const processPayment = async (req, res) => {
  const { sender, receiver, amount } = req.body;

  try {
    console.log("BLOCKCHAIN_RPC_URL:", process.env.BLOCKCHAIN_RPC_URL);
    console.log("PRIVATE_KEY:", process.env.PRIVATE_KEY ? "Loaded" : "Not Loaded");
    console.log("ENERGY_TOKEN_ADDRESS:", process.env.ENERGY_TOKEN_ADDRESS);

    if (!process.env.BLOCKCHAIN_RPC_URL || !process.env.PRIVATE_KEY || !process.env.ENERGY_TOKEN_ADDRESS) {
      throw new Error("Missing environment variables");
    }

    console.log("Connecting to blockchain...");
    const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contract = new ethers.Contract(process.env.ENERGY_TOKEN_ADDRESS, EnergyTokenABI, wallet);

    console.log("Sending transaction...");
    const tx = await contract.transfer(receiver, ethers.utils.parseUnits(amount, 18));
    await tx.wait();

    console.log("Transaction successful:", tx.hash);
    res.status(200).json({ message: "Payment successful", transactionHash: tx.hash });
  } catch (error) {
    console.error("Payment failed:", error);
    res.status(500).json({ error: "Payment failed", details: error.message });
  }
};