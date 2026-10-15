import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
// import authRoutes from "../mern-auth-secure/routes/authRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
