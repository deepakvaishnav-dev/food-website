import { Request, Response } from "express";
import mongoose from "mongoose";
import { Cart, ICartItem } from "../models/cart.model";

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId || typeof userId !== "string")
      return res.status(401).json({ message: "Unauthorized" });

    const cart = await Cart.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });
    if (!cart) {
      return res.json({ items: [], totalPrice: 0 });
    }

    res.json({ items: cart.items, totalPrice: cart.totalPrice });
  } catch (error) {
    console.error("Error in getCart:", error);
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).toString() });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId || typeof userId !== "string")
      return res.status(401).json({ message: "Unauthorized" });

    const { foodId, name, price, quantity, image } = req.body;

    // Validation
    if (!foodId || !name || typeof price !== "number" || price < 0 || !image) {
      return res.status(400).json({ message: "Invalid item data" });
    }

    const qty = quantity && quantity > 0 ? quantity : 1;

    // Find cart or create new
    let cart = await Cart.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });
    if (!cart)
      cart = new Cart({
        userId: new mongoose.Types.ObjectId(userId),
        items: [],
      });

    // Check if item exists
    const existingItem = cart.items.find(
      (item) => item.foodId.toString() === foodId,
    );

    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      cart.items.push({
        foodId: new mongoose.Types.ObjectId(foodId),
        name,
        price,
        quantity: qty,
        image,
      });
    }

    // Save cart (pre-save hook updates totalPrice)
    await cart.save();

    res.json({ items: cart.items, totalPrice: cart.totalPrice });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).toString() });
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId || typeof userId !== "string")
      return res.status(401).json({ message: "Unauthorized" });

    const { foodId, quantity } = req.body;

    if (!foodId || typeof quantity !== "number" || quantity <= 0) {
      return res.status(400).json({ message: "Invalid foodId or quantity" });
    }

    const cart = await Cart.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((item) => item.foodId.toString() === foodId);
    if (!item)
      return res.status(404).json({ message: "Item not found in cart" });

    item.quantity = quantity;
    await cart.save();

    res.json({ items: cart.items, totalPrice: cart.totalPrice });
  } catch (error) {
    console.error("Error in updateCartItem:", error);
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).toString() });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId || typeof userId !== "string")
      return res.status(401).json({ message: "Unauthorized" });

    const { foodId } = req.params;

    const cart = await Cart.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.foodId.toString() !== foodId);
    await cart.save();

    res.json({ items: cart.items, totalPrice: cart.totalPrice });
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).toString() });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId || typeof userId !== "string")
      return res.status(401).json({ message: "Unauthorized" });

    const cart = await Cart.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.json({ items: [], totalPrice: 0 });
  } catch (error) {
    console.error("Error in clearCart:", error);
    res
      .status(500)
      .json({ message: "Server error", error: (error as Error).toString() });
  }
};
