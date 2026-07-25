import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/UserRoutes";
import uploadRoutes from "./routes/uploadroutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Server is running");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", uploadRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(` Backend running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("!! MongoDB connection failed:", err));
