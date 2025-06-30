// controllers/uploadController.ts
import { Request, Response } from "express";
import Upload from "../models/upload";

// GET /api/uploads?email=...
export const getUploadsByEmail = async (req: Request, res: Response) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const uploads = await Upload.find({ email }).sort({ date: -1 });
    res.json(uploads);
  } catch (err) {
    console.error("❌ Upload fetch error:", err);
    res.status(500).json({ error: "Failed to fetch uploads" });
  }
};
