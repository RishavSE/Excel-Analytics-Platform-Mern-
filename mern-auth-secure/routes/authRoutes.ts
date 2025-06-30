
import express from "express";
import { loginUser, registerUser, resetPassword } from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser); 
console.log("loaded routes from mern auth ✅ ");
router.post("/login", loginUser);
router.post("/reset-password", resetPassword); // ✅ Added for forgot password

export default router;

