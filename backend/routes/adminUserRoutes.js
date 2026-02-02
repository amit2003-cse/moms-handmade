import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { getUsersWithOrderCount } from "../controllers/userController.js";

const router = express.Router();

router.get("/", protect, adminOnly, getUsersWithOrderCount);

export default router;
