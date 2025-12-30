import mongoose, { Document } from "mongoose";

interface IFood extends Document {
  // _id: string;
  name: string;
  type: "veg" | "non-veg";
  price: number;
  weight: string;
  image: string;
  description: string;
  isAvailable: boolean;
  rating: number;
}

const foodSchema = new mongoose.Schema<IFood>({
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

export  const Food = mongoose.model<IFood>("Food", foodSchema);
