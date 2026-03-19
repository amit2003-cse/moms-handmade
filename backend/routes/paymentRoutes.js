import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createRazorpayOrder, verifyPayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-order", protect, createRazorpayOrder);
router.post("/verify", protect, verifyPayment);

export default router;