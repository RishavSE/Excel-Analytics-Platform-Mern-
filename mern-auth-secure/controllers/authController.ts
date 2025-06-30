import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

// 🔐 Generate JWT token
const generateToken = (email: string, role: string): string => {
  return jwt.sign({ email, role }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
};

// ✅ Register
export const registerUser = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const user = new User({ email, password: hashedPassword, role });
    await user.save();

    const token = generateToken(email, role);
    res.status(201).json({
      message: "User registered",
      token,
      role,
      email,
    });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ message: "Registration error" });
  }
};

// ✅ Login
export const loginUser = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  try {
    console.log("🔐 Login request:", { email, password, role });

    const user = await User.findOne({ email, role });
    if (!user) {
      console.log("❌ User not found or role mismatch");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password);
    console.log("🔑 Password match:", isMatch);

    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user.email, user.role);

    // ✅ Add logs to show token in terminal
    console.log("✅ Login successful!");
    console.log("🔐 JWT Token generated for user:", user.email);
    console.log("📦 Token:", token);
    console.log("👤 Role:", user.role);
    console.log("🕒 Time:", new Date().toLocaleString());

    user.lastLogin = new Date();
    await user.save();

    res.json({
      token,
      role: user.role,
      email: user.email,
      message: "Login successful",
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};


// ✅ Reset Password
export const resetPassword = async (req: Request, res: Response) => {
  const { email, newPassword } = req.body;
  console.log("📩 Reset password request received:", { email, newPassword });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword.trim(), 10);
    user.password = hashedPassword;

    await user.save();

    console.log("✅ Password successfully updated for:", email);
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("❌ Reset Password Error:", error);
    res.status(500).json({ message: "Server error during password reset" });
  }
};

