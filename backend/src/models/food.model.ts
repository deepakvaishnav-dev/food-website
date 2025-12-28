import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  _id: String,
  name: String,
  type: { type: String, enum: ["veg", "non-veg"] },
  price: Number,
  weight: String,
  image: String,
  description: String,
  isAvailable: Boolean,
  rating: Number
});

export const Food = mongoose.model("Food", foodSchema);
