import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cart, setCart } = useCart(); // setCart chahiye taaki order ke baad empty kar sakein
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    mobile: '',
    address: '',
    pincode: '',
    landmark: '',
    deliveryTime: 'Anytime'
  });

  const [loading, setLoading] = useState(false);

  // Redirect if Cart Empty or Not Logged In
  useEffect(() => {
    if (!user) navigate('/login');
    if (cart.length === 0) navigate('/products');
  }, [user, cart, navigate]);

  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 📡 Backend Call: Order Place karo
      // Note: Backend cart session use karega items ke liye
      await api.post('/orders', formData);
      
      toast.success('🎉 Order Placed Successfully!');
      
      // Cart Clear karo (Frontend side)
      // Note: Backend bhi apne end pe clear karega, par UI update zaroori hai
      // Agar Context me clearCart function nahi hai, to direct state empty kar rahe hain (Best practice: add clearCart in Context)
      window.location.href = "/orders"; // Page refresh/redirect to orders
      
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Order failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        
        {/* LEFT: Shipping Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🚚 Shipping Details</h2>
          
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1">Full Name</label>
              <input required name="fullName" value={formData.fullName} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Amit Kumar" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 text-sm mb-1">Mobile No.</label>
                <input required name="mobile" value={formData.mobile} onChange={handleChange} className="w-full border p-2 rounded" placeholder="9876543210" />
              </div>
              <div>
                <label className="block text-gray-600 text-sm mb-1">Pincode</label>
                <input required name="pincode" value={formData.pincode} onChange={handleChange} className="w-full border p-2 rounded" placeholder="110001" />
              </div>
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Complete Address</label>
              <textarea required name="address" value={formData.address} onChange={handleChange} rows="3" className="w-full border p-2 rounded" placeholder="House No, Street, Area..."></textarea>
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Landmark (Optional)</label>
              <input name="landmark" value={formData.landmark} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Near Temple" />
            </div>

            {/* Submit Button (Mobile pe niche dikhega) */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition mt-4 disabled:bg-gray-400"
            >
              {loading ? 'Placing Order...' : `Confirm Order - ₹${totalAmount}`}
            </button>
          </form>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h3>
          
          <div className="space-y-3 max-h-60 overflow-y-auto mb-4 custom-scrollbar">
            {cart.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm border-b pb-2">
                <div className="flex items-center gap-2">
                  <span className="bg-gray-200 px-2 py-1 rounded text-xs">{item.quantity}x</span>
                  <span>{item.name} <span className="text-gray-500">({item.weight})</span></span>
                </div>
                <span className="font-medium">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span className="text-primary">₹{totalAmount}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Payment Method: <strong>Cash on Delivery (COD)</strong>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;