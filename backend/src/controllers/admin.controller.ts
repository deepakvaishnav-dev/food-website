import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { Order } from "../models/order.model";
import { Food } from "../models/food.model";

export const adminLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.password || !user.isAdmin) {
      return res.status(400).json({ message: "Invalid admin credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid admin credentials" });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: true },
      process.env.JWT_SECRET!,
      {
        expiresIn: "24h",
      },
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalOrders = await Order.countDocuments();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayOrders = await Order.countDocuments({
      createdAt: { $gte: today },
    });
    const totalFoodItems = await Food.countDocuments();
    const totalUsers = await User.countDocuments({ isAdmin: false });
    const totalRevenueResult = await Order.aggregate([
      { $match: { paymentStatus: "completed" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const totalRevenue = totalRevenueResult[0]?.total || 0;

    res.json({
      totalOrders,
      todayOrders,
      totalFoodItems,
      totalUsers,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ isAdmin: false }).select(
      "name email isBlocked createdAt",
    );
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const toggleUserBlock = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.isBlocked = !user.isBlocked;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllFoods = async (req: Request, res: Response) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const addFood = async (req: Request, res: Response) => {
  const { name, type, price, weight, image, description, category } = req.body;

  try {
    const food = new Food({
      _id: Date.now().toString(),
      name,
      type,
      price,
      weight,
      image,
      description,
      isAvailable: true,
      rating: 0,
    });
    await food.save();
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateFood = async (req: Request, res: Response) => {
  const { foodId } = req.params;
  const updates = req.body;

  try {
    const food = await Food.findByIdAndUpdate(foodId, updates, { new: true });
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteFood = async (req: Request, res: Response) => {
  const { foodId } = req.params;

  try {
    const food = await Food.findByIdAndDelete(foodId);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.json({ message: "Food deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const toggleFoodAvailability = async (req: Request, res: Response) => {
  const { foodId } = req.params;

  try {
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    food.isAvailable = !food.isAvailable;
    await food.save();
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
