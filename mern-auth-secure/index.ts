import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/UserRoutes";
import uploadRoutes from "./routes/uploadroutes";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());


app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", uploadRoutes); 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(` Backend running on port${PORT}`));

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

 

