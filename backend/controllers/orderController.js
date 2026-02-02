import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

// @desc Place order (COD)
export const placeOrder = async (req, res) => {
  const {
    fullName,
    mobile,
    
    address,
    pincode,
    landmark,
    deliveryTime,
  } = req.body;

  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product"
  );

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
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
    deliveryDetails: {
      fullName,
      mobile,
      address,
      pincode,
      landmark,
      deliveryTime,
    },
    totalAmount,
  });

  // Clear cart after order
  cart.items = [];
  await cart.save();

  res.status(201).json({
    message: "🎉 Order placed successfully!",
    order,
  });
};

// @desc Get logged-in user's orders
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  res.json(orders);
};
