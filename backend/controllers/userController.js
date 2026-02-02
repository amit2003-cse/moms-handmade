import User from "../models/User.js";
import Order from "../models/Order.js";

// @desc Get all users with order stats
// @route GET /api/users
export const getUsersWithOrderCount = async (req, res) => {
  try {
    // ✅ Change: 'role' aur 'createdAt' bhi select karo
    const users = await User.find().select("name email role createdAt");

    const usersWithOrders = await Promise.all(
      users.map(async (user) => {
        const orderCount = await Order.countDocuments({ user: user._id });
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,          // ✅ Added
          createdAt: user.createdAt, // ✅ Added
          orders: orderCount,
        };
      })
    );

    res.json(usersWithOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};