import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: String,
    image: String,
    weight: String,
    quantity: Number,
    price: Number,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [orderItemSchema],

    deliveryDetails: {
      fullName: String,
      mobile: String,
      address: String,
      pincode: String,
      landmark: String,
      deliveryTime: String,
    },

    totalAmount: Number,

    paymentMethod: {
      type: String,
      default: "COD",
    },

    // ✅ FIX: Enum list badha di hai taaki Admin panel ke saare options chalein
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;