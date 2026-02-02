import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaArrowRight, FaMinus, FaPlus } from 'react-icons/fa'; // ✅ Icons Import kiye

const Cart = () => {
  const { cart, removeFromCart, addToCart, decreaseQuantity } = useCart(); // ✅ Functions Import kiye
  const navigate = useNavigate();

  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-gray-400 mb-4">Your cart is empty ☹️</h2>
        <button 
          onClick={() => navigate('/products')}
          className="bg-orange-600 text-white px-6 py-2 rounded-full font-bold hover:bg-orange-700 transition"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Shopping Cart ({cart.length})</h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        
        {/* LEFT: Cart Items List */}
        <div className="md:col-span-2 space-y-4">
          {cart.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              
              {/* Image & Info */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img 
                  src={item.imageUrl || "https://placehold.co/100"} 
                  alt={item.name} 
                  className="w-20 h-20 object-cover rounded-md border" 
                />
                
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">Weight: {item.weight}</p>
                  <p className="text-orange-600 font-bold mt-1">₹{item.price}</p>
                </div>
              </div>

              {/* Quantity Controls & Remove */}
              <div className="flex items-center gap-6 mt-4 sm:mt-0">
                
                {/* 🔢 Quantity Logic */}
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    onClick={() => decreaseQuantity(item.productId, item.weight)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 transition disabled:opacity-50"
                    disabled={item.quantity <= 1} // 1 se kam na ho
                  >
                    <FaMinus size={12} />
                  </button>
                  
                  <span className="px-4 font-bold text-gray-800">{item.quantity}</span>
                  
                  <button 
                    // Reuse addToCart for +1 logic
                    onClick={() => addToCart({ _id: item.productId, name: item.name }, item.weight, item.price)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 transition"
                  >
                    <FaPlus size={12} />
                  </button>
                </div>

                {/* 🗑️ Delete Button */}
                <button 
                  onClick={() => removeFromCart(item.productId, item.weight)}
                  className="text-red-500 hover:text-red-700 p-2 bg-red-50 rounded-full transition"
                  title="Remove Item"
                >
                  <FaTrash />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* RIGHT: Bill Summary (Same as before) */}
        <div className="bg-white p-6 rounded-lg shadow-md h-fit border-t-4 border-orange-600">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <div className="flex justify-between mb-2 text-gray-600">
            <span>Subtotal</span>
            <span>₹{totalAmount}</span>
          </div>
          <div className="flex justify-between mb-4 text-gray-600">
            <span>Shipping</span>
            <span className="text-green-600 font-bold">Free</span>
          </div>
          <div className="border-t pt-4 flex justify-between text-2xl font-bold text-gray-800 mb-6">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>

          <button 
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold flex justify-center items-center gap-2 hover:bg-orange-700 transition shadow-lg"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout <FaArrowRight />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Cart;