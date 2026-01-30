import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/UserRoutes";
import uploadRoutes from "./routes/uploadroutes";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());


app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", uploadRoutes); 


mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(5000, () => console.log(" Backend running on port 5000"));
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err));
