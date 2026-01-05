import mongoose, { Document } from "mongoose";

export interface ICartItem {
  foodId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ICart extends Document {
  userId: string;
  items: ICartItem[];
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

const cartItemSchema = new mongoose.Schema({
  foodId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  image: { type: String, required: true },
});

const cartSchema = new mongoose.Schema<ICart>(
  {
    userId: { type: String, required: true, unique: true },
    items: [cartItemSchema],
    totalPrice: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

cartSchema.pre("save", async function () {
  this.totalPrice = this.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
});

export const Cart = mongoose.model<ICart>("Cart", cartSchema);
