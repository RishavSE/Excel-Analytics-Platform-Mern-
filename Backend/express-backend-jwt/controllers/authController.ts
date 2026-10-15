
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const loginUser = (req: Request, res: Response) => {
  const { email, role } = req.body;

  const token = jwt.sign({ email, role }, process.env.JWT_SECRET || "defaultSecret", {
    expiresIn: "1h",
  });
  return res.json({ token });
};
