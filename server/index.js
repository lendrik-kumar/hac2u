import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import cors from "cors";
import authRoutes from "./src/routes/userRoutes.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";

dotenv.config();
const port = process.env.PORT || 3000;

connectDB();

const app = express();
app.use(express.json());
app.use(cors())

app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);

const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });