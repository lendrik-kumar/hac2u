import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

export default User;