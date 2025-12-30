import { Router } from "express";
import { getFoods } from "../controllers/food.controller";

const router = Router();

router.get("/", getFoods);

export default router;
