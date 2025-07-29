import express, { Request, Response } from "express";
import multer from "multer";
import xlsx from "xlsx";
import Upload from "../models/upload";
import { getUploadsByEmail } from "../controllers/uploadcontroller";

const router = express.Router();

// ✅ Multer setup: use memory storage for Excel parsing
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Custom type for request with file
interface CustomRequest extends Request {
  file?: Express.Multer.File;
}

// ✅ GET uploads by email
router.get("/uploads", getUploadsByEmail);

// ✅ POST: upload and parse Excel
router.post(
  "/upload",
  upload.single("file") as unknown as express.RequestHandler,
  async (req: CustomRequest, res: Response) => {

  try {
    const file = req.file;
    const email = req.body.email;

    if (!file || !email) {
      return res.status(400).json({ error: "Missing file or email" });
    }

    const workbook = xlsx.read(file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    const newUpload = new Upload({
      email,
      filename: file.originalname,
      rows: jsonData.length,
      date: new Date().toISOString(),
      data: jsonData,
    });

    await newUpload.save();

    res.status(200).json({
      message: "✅ Upload successful",
      rows: jsonData.length,
      data: jsonData,
    });
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});
// ✅ Count total uploads (for admin dashboard)
router.get("/uploads-count", async (req: Request, res: Response) => {
  try {
    const count = await Upload.countDocuments(); // total number of documents
    res.status(200).json({ count });
  } catch (err) {
    console.error("❌ Count error:", err);
    res.status(500).json({ error: "Failed to count uploads" });
  }
});


// ✅ DELETE: remove upload by ID
router.delete("/uploads/:id", async (req: Request, res: Response) => {
  try {
    const deleted = await Upload.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Upload not found" });
    }
    res.status(200).json({ message: "✅ Upload deleted successfully" });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ error: "Failed to delete upload" });
  }
});

export default router;
