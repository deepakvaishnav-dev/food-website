import { Router } from "express";
import {
  adminLogin,
  getDashboardStats,
  getAllOrders,
  updateOrderStatus,
  getAllUsers,
  toggleUserBlock,
  getAllFoods,
  addFood,
  updateFood,
  deleteFood,
  toggleFoodAvailability,
} from "../controllers/admin.controller";
import { adminMiddleware } from "../middleware/admin.middleware";

const router = Router();

// Admin login (no auth required)
router.post("/login", adminLogin);

// Protected admin routes
router.use(adminMiddleware);

router.get("/dashboard", getDashboardStats);
router.get("/orders", getAllOrders);
router.put("/orders/:orderId/status", updateOrderStatus);
router.get("/users", getAllUsers);
router.put("/users/:userId/block", toggleUserBlock);
router.get("/foods", getAllFoods);
router.post("/foods", addFood);
router.put("/foods/:foodId", updateFood);
router.delete("/foods/:foodId", deleteFood);
router.put("/foods/:foodId/availability", toggleFoodAvailability);

export default router;
