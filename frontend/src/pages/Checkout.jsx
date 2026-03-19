import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const Checkout = () => {
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    mobile: "",
    address: "",
    pincode: "",
    landmark: "",
    deliveryTime: "Anytime",
  });

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // Redirect logic
  useEffect(() => {
    if (!user) navigate("/login");
    if (cart.length === 0) navigate("/products");
  }, [user, cart, navigate]);

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    // 🛑 VALIDATION
    if (!/^\d{10}$/.test(formData.mobile)) {
      return toast.error("Please enter a valid 10-digit mobile number! 📱");
    }
    if (!/^\d{6}$/.test(formData.pincode)) {
      return toast.error("Please enter a valid 6-digit pincode! 📍");
    }

    setLoading(true);

    try {
      if (paymentMethod === "COD") {
        // 🛍️ COD Flow
        await api.post("/orders", formData);
        toast.success("🎉 Order Placed Successfully!");
        navigate("/orders");
      } else {
        // 💳 Razorpay Flow
        const { data } = await api.post("/payment/create-order");

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.razorpayOrder.amount,
        currency: "INR",
        name: "Mom's Handmade",
        description: "Homemade Snacks Payment",
        order_id: data.razorpayOrder.id,

        // 2️⃣ Payment success handler
        handler: async function (response) {
          try {
            await api.post("/payment/verify", {
              ...response,
              deliveryDetails: formData,
            });

            toast.success("🎉 Payment Successful!");
            navigate("/orders");
          } catch {
            toast.error("Payment verification failed");
          }
        },

        prefill: {
          name: formData.fullName,
          contact: formData.mobile,
        },

        theme: {
          color: "#f97316",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">

        {/* LEFT: Shipping Form */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-orange-50">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            🚚 Shipping Details
          </h2>

          <form onSubmit={handlePayment} className="space-y-4">
            <input
              required
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Full Name"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                required
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="border p-2 rounded"
                placeholder="Mobile"
              />
              <input
                required
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="border p-2 rounded"
                placeholder="Pincode"
              />
            </div>

            <textarea
              required
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              className="w-full border p-2 rounded"
              placeholder="Complete Address"
            ></textarea>

            <input
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Landmark (Optional)"
            />

            {/* Payment Method Selection */}
            <div className="mt-4 pt-4 border-t">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Select Payment Method
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer border p-3 rounded-lg flex-1 justify-center hover:bg-orange-50 transition border-orange-200">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-orange-600"
                  />
                  <span className="font-bold text-gray-800 text-sm">Cash on Delivery</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer border p-3 rounded-lg flex-1 justify-center hover:bg-orange-50 transition border-orange-200">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Pay Now"
                    checked={paymentMethod === "Pay Now"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-orange-600"
                  />
                  <span className="font-bold text-gray-800 text-sm">Pay Now Online</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition disabled:bg-gray-400"
            >
              {loading
                ? "Processing Payment..."
                : `Pay ₹${totalAmount}`}
            </button>
          </form>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-orange-50 h-fit">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            Order Summary
          </h3>

          {cart.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm border-b pb-2 mb-2">
              <span>
                {item.quantity}x {item.name} ({item.weight})
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          <div className="border-t pt-4 font-bold flex justify-between">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>

          <p className="text-xs text-gray-500 mt-2 text-center">
            Payment Method: <strong>{paymentMethod === "COD" ? "Cash on Delivery" : "Razorpay"}</strong>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Checkout;