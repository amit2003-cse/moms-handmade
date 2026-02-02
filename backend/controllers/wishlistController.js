import Wishlist from "../models/Wishlist.js";

// @desc Get wishlist
export const getWishlist = async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
    "products"
  );
  res.json(wishlist || { products: [] });
};

// @desc Toggle wishlist
export const toggleWishlist = async (req, res) => {
  const { productId } = req.body;

  let wishlist = await Wishlist.findOne({ user: req.user._id });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      user: req.user._id,
      products: [],
    });
  }

  const exists = wishlist.products.includes(productId);

  if (exists) {
    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );
  } else {
    wishlist.products.push(productId);
  }

  await wishlist.save();
  res.json(wishlist);
};
