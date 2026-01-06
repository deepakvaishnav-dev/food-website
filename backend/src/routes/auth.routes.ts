import { Router } from "express";
import {
  login,
  register,
  googleAuth,
  getUser,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/google", googleAuth);
router.get("/me", authMiddleware, getUser);

export default router;
