// import { Request, Response } from "express";
// import jwt from "jsonwebtoken";

// export const loginUser = (req: Request, res: Response) => {
//   const { email, password, role } = req.body;
//    console.log("🟡 Incoming login:", email, password, role); 
//   if (
//     (role === "admin" && email === "admin@gmail.com" && password === "admin123") ||
//     (role === "user" && email === "user@gmail.com" && password === "user123")
//   ) {
//     const token = jwt.sign({ email, role }, process.env.JWT_SECRET!, { expiresIn: "1h" });
//     return res.json({ token });
//   }

//   return res.status(401).json({ message
// : "Invalid credentials" });
// };

import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const loginUser = (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  console.log("🔐 Login Attempt:", email, password, role); // ✅ Must print

  if (
    (role === "admin" && email === "admin@gmail.com" && password === "admin123") 
    // (role === "user" && email === "user@gmail.com" && password === "user123")
  ) {
    const token = jwt.sign({ email, role }, process.env.JWT_SECRET || "defaultSecret", {
      expiresIn: "1h",
    });
    return res.json({ token });
  }

//   return res.status(401).json({ message: "Invalid credentials Rishav" });
// };
// export const loginUser = async (req: Request, res: Response) => {
//   const { email, password, role } = req.body;
//   console.log("🔐 Login attempt:", { email, password, role }); // <== ADD THIS

//   const user = await User.findOne({ email });
//   if (!user || user.role !== role) return res.status(401).json({ message: "Invalid credentials" });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

//   const token = jwt.sign({ email, role }, process.env.JWT_SECRET!, { expiresIn: "1h" });
//   res.json({ token });
// };
