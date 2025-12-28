import { Request, Response } from "express";
import { Food } from "../models/food.model";

export const getFoods = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const { type, minPrice, maxPrice } = req.query;
  const filter: any = {};

  if (type) filter.type = type;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const foods = await Food.find(filter).skip(skip).limit(limit);
  const total = await Food.countDocuments(filter);

  res.json({
    data: foods,
    totalPages: Math.ceil(total / limit),
    currentPage: page
  });
};
