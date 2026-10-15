import { Router } from "express";
import { loginUser } from "../controllers/authController";

const router = Router();
console.log("loaded routes from mern backend ✅ ");
router.post("/login", loginUser);

export default router;
