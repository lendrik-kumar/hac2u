import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const loginWithMetaMask = async (req, res) => {
  try {
    const { walletAddress, email, username } = req.body;

    if (!walletAddress || !email || !username) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let user = await User.findOne({ walletAddress });

    if (!user) {
      user = await User.create({
        walletAddress,
        email,
        username
      });
    }

    const token = jwt.sign({ id: user._id, walletAddress: user.walletAddress }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getUserData = async (req, res) => {
    try {
      const { walletAddress } = req.params;
      const user = await User.findOne({ walletAddress });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }