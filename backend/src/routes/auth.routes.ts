import { Router } from "express";
import { login, register, googleAuth } from "../controllers/auth.controller";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/google", googleAuth);

export default router;
