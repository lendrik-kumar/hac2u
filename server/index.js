import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 3000;

connectDB();

const app = express();
app.use(express.json());
app.use(cors())



const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });