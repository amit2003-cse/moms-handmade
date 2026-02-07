import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";
import connectDB from "../config/db.js";

dotenv.config();
await connectDB();

const products = [
  {
    name: "Besan Ladoo",
    description: "Pure desi ghee se bane traditional besan ladoo",
    category: "Sweets",
    pricePerWeight: {
      "250g": 120,
      "500g": 220,
      "1kg": 420,
    },
    imageUrl:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    tags: ["🔥 Best Seller"],
  },
  {
    name: "Milk Barfi",
    description: "Soft aur creamy homemade milk barfi",
    category: "Sweets",
    pricePerWeight: {
      "250g": 150,
      "500g": 280,
      "1kg": 540,
    },
    imageUrl:
      "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a",
    tags: ["New Launch"],
  },
  {
    name: "Namak Para",
    description: "Crispy namak para – chai ke saath perfect",
    category: "Crunchy",
    pricePerWeight: {
      "250g": 80,
      "500g": 150,
      "1kg": 280,
    },
    imageUrl:
      "https://images.unsplash.com/photo-1621939514649-280e2ee25f16",
  },
  {
    name: "Spicy Masala Mix",
    description: "Teekha aur chatpata homemade masala mix",
    category: "Spicy",
    pricePerWeight: {
      "250g": 90,
      "500g": 170,
      "1kg": 320,
    },
    imageUrl:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d",
  },
  {
    name: "Dry Fruit Ladoo",
    description: "Healthy dry fruits se bane energy ladoo",
    category: "Sweets",
    pricePerWeight: {
      "250g": 220,
      "500g": 420,
      "1kg": 820,
    },
    imageUrl:
      "https://images.unsplash.com/photo-1617692855027-33b14f061079",
    tags: ["Premium"],
  },
  {
    name: "Aloo Bhujia",
    description: "Classic spicy aloo bhujia namkeen",
    category: "Spicy",
    pricePerWeight: {
      "250g": 70,
      "500g": 130,
      "1kg": 250,
    },
    imageUrl:
      "https://images.unsplash.com/photo-1600628422019-6c9e89b2b7fa",
  },
];

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Products seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedProducts();