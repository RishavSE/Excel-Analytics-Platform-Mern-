import { Request, Response } from "express";
import { User } from "../models/User";
import Upload from "../models/upload"; 

export const getAllUsersWithUploads = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    const usersWithUploads = await Promise.all(
      users.map(async (user) => {
        const uploadCount = await Upload.countDocuments({ email: user.email });

        return {
          _id: user._id,
          email: user.email,
          role: user.role,
          uploads: uploadCount,
          lastLogin: user.lastLogin || null,
        };
      })
    );

    res.json(usersWithUploads);
  } catch (err) {
    console.error("❌ Error fetching users with uploads:", err);
    res.status(500).json({ message: "Server error" });
  }
};
