import "dotenv/config";
import mongoose from "mongoose";
import { Cart } from "../models/cart.model";

async function dropIndex() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to MongoDB");

    // Drop the old index if it exists
    try {
      await Cart.collection.dropIndex("user_1");
      console.log("Dropped index user_1");
    } catch (error) {
      console.log("Index user_1 not found or already dropped");
    }

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error:", error);
  }
}

dropIndex();
