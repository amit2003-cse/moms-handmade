import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// @desc Get cart
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product"
  );

  res.json(cart || { items: [] });
};

// @desc Add to cart
export const addToCart = async (req, res) => {
  const { productId, weight, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const price = product.pricePerWeight[weight];

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [],
    });
  }

  const existingItem = cart.items.find(
    (item) =>
      item.product.toString() === productId && item.weight === weight
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      weight,
      quantity,
      price,
    });
  }

  await cart.save();
  res.json(cart);
};

// @desc Remove item
export const removeFromCart = async (req, res) => {
  const { productId, weight } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(
    (item) =>
      item.product.toString() !== productId || item.weight !== weight
  );

  await cart.save();
  res.json(cart);
};
