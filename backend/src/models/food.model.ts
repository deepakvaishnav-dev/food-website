import mongoose, { Schema, Document } from "mongoose";

export interface IFood extends Document {
  name: string;
  type: "veg" | "non-veg";
  price: number;
  weight: string;
  image: string;
  description: string;
  isAvailable: boolean;
  rating: number;
}

const foodSchema = new Schema<IFood>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["veg", "non-veg"],
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    weight: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

export const Food = mongoose.model<IFood>("Food", foodSchema);
