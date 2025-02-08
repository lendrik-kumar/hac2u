import express from "express";
import { loginWithMetaMask } from "../controllers/authController.js";
import { getUserData } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginWithMetaMask);
router.get("/user/:walletAddress", getUserData);

export default router;