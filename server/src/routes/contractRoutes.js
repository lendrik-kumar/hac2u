// filepath: /Users/sanketkamboj/Desktop/hac2u/server/src/routes/contractRoutes.js
import express from "express";
import { transferEnergyToken, transferUSDT } from "../controllers/contractController.js";

const router = express.Router();

router.post("/transfer-energy-token", transferEnergyToken);
router.post("/transfer-usdt", transferUSDT);

export default router;