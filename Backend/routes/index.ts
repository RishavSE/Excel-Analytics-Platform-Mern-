import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "../routes/authRoutes";
import userRoutes from "../routes/UserRoutes";
import uploadRoutes from "../routes/uploadroutes"; // ✅ ADD THIS LINE

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", uploadRoutes); // ✅ MOUNT THIS ROUTE

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

