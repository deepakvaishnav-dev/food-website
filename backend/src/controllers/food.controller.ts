import { Request, Response } from "express";
import { Food } from "../models/food.model";

export const getFoods = async (
  req: Request<
    unknown,
    unknown,
    unknown,
    {
      sortBy: string;
      page: string;
      type: string;
      sortOrder: string;
      search: string;
    }
  >,
  res: Response
) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const { type, sortBy, sortOrder, search } = req.query;
  const filter: any = {};

  if (type) filter.type = type;
  if (search) {
    const searchWords = search
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    if (searchWords.length > 0) {
      filter.$and = searchWords.map((word) => ({
        $or: [
          { name: { $regex: word, $options: "i" } },
          { description: { $regex: word, $options: "i" } },
        ],
      }));
    }
  }
  let sort: any = {};
  if (sortBy && sortOrder) {
    const sortFields = sortBy.split(",");
    sortFields.forEach((field: string) => {
      sort[field] = sortOrder === "desc" ? -1 : 1;
    });
  }

  const foods = await Food.find(filter).sort(sort).skip(skip).limit(limit);
  const total = await Food.countDocuments(filter);

  
  res.json({
    data: foods,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  });
};
