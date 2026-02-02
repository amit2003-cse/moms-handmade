import express from "express";
import { protect } from "../middleware/authMiddleware.js";
// ✅ Import Controller
import { getUsersWithOrderCount } from "../controllers/userController.js";

const router = express.Router();

// Existing Profile Route
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

// ✅ NEW: Admin Users List Route
// (Frontend calls: api.get('/users'))
router.get("/", protect, getUsersWithOrderCount);

export default router;