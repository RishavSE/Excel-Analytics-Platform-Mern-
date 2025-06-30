// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import authRoutes from "./routes/authRoutes";

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use("/api", authRoutes);

// console.log("MONGO_URI:", process.env.MONGO_URI);


// mongoose.connect(process.env.MONGO_URI!)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB error", err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

//*****************before upload feature**************************** */
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import authRoutes from "./routes/authRoutes";
// import userRoutes from "./routes/UserRoutes";

// const app = express();
// dotenv.config();

// // ✅ These are required
// app.use(cors());
// app.use(express.json()); // ✅ MOST IMPORTANT — parses incoming JSON

// // ✅ Mount routes
// app.use("/api", authRoutes);
// app.use("/api", userRoutes); 

// mongoose.connect(process.env.MONGO_URI!)
//   .then(() => {
//     console.log("✅ MongoDB connected");
//     app.listen(5000, () => console.log("✅ Backend running on port 5000"));
//   })
//   .catch((err) => console.error("❌ MongoDB connection failed:", err));


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/UserRoutes";
import uploadRoutes from "./routes/uploadroutes"; // ✅ ADD THIS LINE

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

// ✅ Mount API routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", uploadRoutes); // ✅ MOUNT THIS ROUTE

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(5000, () => console.log("✅ Backend running on port 5000"));
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err));
