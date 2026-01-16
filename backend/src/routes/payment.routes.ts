import { Router } from "express";
import {
  createPaymentIntent,
  confirmPayment,
} from "../controllers/payment.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/create-payment-intent", createPaymentIntent);
router.post("/confirm-payment", confirmPayment);

export default router;
