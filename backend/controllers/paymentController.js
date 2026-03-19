import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import { sendOrderNotification } from "../utils/sendEmail.js";


// 🔹 CREATE RAZORPAY ORDER
export const createRazorpayOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const options = {
      amount: totalAmount * 100, // paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.json({
      razorpayOrder,
      totalAmount,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create payment order" });
  }
};


// 🔹 VERIFY PAYMENT & CREATE ORDER
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      deliveryDetails,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart empty" });
    }

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      image: item.product.imageUrl,
      weight: item.weight,
      quantity: item.quantity,
      price: item.price,
    }));

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      deliveryDetails,
      totalAmount,
      paymentMethod: "Razorpay",
      paymentStatus: "Paid",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    // Send Email Notification to Admin
    await sendOrderNotification(order, "Razorpay Online Payment");

    res.json({
      message: "Payment successful 🎉",
      order,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment verification failed" });
  }
};