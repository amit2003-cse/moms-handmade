import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

// @desc    Get Admin Dashboard Stats
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    // 1. Total Counts (Parallel mein fetch karo taaki fast ho)
    const [totalOrders, totalProducts, totalUsers] = await Promise.all([
      Order.countDocuments(),
      Product.countDocuments(),
      User.countDocuments(),
    ]);

    // 2. Total Sales Calculation (Aggregation)
    // Hum sirf wo orders jodenge jo "Cancelled" nahi hain
    const salesData = await Order.aggregate([
      { $match: { status: { $ne: "Cancelled" } } },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalAmount" }, // 'totalAmount' field ka sum
        },
      },
    ]);

    // Agar koi sale nahi hui to 0, warna total value
    const totalSales = salesData.length > 0 ? salesData[0].totalSales : 0;

    res.json({
      totalOrders,
      totalProducts,
      totalUsers,
      totalSales,
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};