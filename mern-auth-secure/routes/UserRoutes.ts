import express from 'express';
import { User } from '../models/User';
import Upload from '../models/upload'; // ✅ import Upload model

const router = express.Router();

// ✅ GET: All Users with Upload Count
router.get('/users', async (_req, res) => {
  try {
    const users = await User.find();
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const enriched = await Promise.all(
      users.map(async (user) => {
        const uploadCount = await Upload.countDocuments({ email: user.email }); // ✅ count by email
        const isActive = user.lastLogin && user.lastLogin >= oneWeekAgo;

        return {
          _id: user._id,
          email: user.email,
          role: user.role,
          uploads: uploadCount,
          lastLogin: user.lastLogin,
          isActive,
        };
      })
    );

    res.status(200).json(enriched);
  } catch (error) {
    console.error("❌ Failed to fetch users:", error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

 // ✅ DELETE: User AND their Uploads
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const email = user.email;

    // Delete the user
    await User.findByIdAndDelete(req.params.id);

    // Delete their upload history
    const result = await Upload.deleteMany({ email });

    res.status(200).json({
      message: 'User and their upload history deleted successfully',
      deletedUploads: result.deletedCount,
    });
  } catch (error) {
    console.error('❌ Error deleting user and uploads:', error);
    res.status(500).json({ error: 'Server error during deletion' });
  }
});

// ✅ GET: User Stats (Total + Active Users)
router.get('/users/stats', async (_req, res) => {
  try {
    const users = await User.find();
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const activeUsers = users.filter(
      (u) => u.lastLogin && u.lastLogin >= oneWeekAgo
    ).length;

    res.status(200).json({ totalUsers: users.length, activeUsers });
  } catch (error) {
    console.error('❌ Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export default router;
