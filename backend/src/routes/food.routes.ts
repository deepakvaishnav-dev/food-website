import { Router } from "express";
import { getFoods } from "../controllers/food.controller";

const router = Router();

router.get("/foods", getFoods);

export default router;
