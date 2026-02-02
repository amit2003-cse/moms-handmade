import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["Sweets", "Spicy", "Crunchy"],
      required: true,
    },

    pricePerWeight: {
      "250g": { type: Number, required: true },
      "500g": { type: Number, required: true },
      "1kg": { type: Number, required: true },
    },

    imageUrl: {
      type: String,
    },

    tags: [
      {
        type: String,
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
