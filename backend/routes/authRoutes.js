import express from "express";
import { registerUser, loginUser, googleAuth } from '../controllers/authController.js'; // ✅ Import badhaya
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post('/google', googleAuth); // ✅ Ye line add karni padegi
export default router;
