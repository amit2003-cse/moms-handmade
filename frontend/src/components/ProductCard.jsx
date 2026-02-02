import { useState } from 'react';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const weights = product.pricePerWeight ? Object.keys(product.pricePerWeight) : [];
  const [selectedWeight, setSelectedWeight] = useState(weights[0] || 'Standard');
  
  const currentPrice = product.pricePerWeight ? product.pricePerWeight[selectedWeight] : product.price;

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product._id);

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, currentPrice);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 relative group flex flex-col">
      
      {/* Product Image - Mobile: h-32, Desktop: h-48 */}
      <div className="h-32 sm:h-48 overflow-hidden relative w-full bg-gray-100">
        <img 
          src={product.imageUrl || "https://placehold.co/400x300?text=Snack"} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />
        
        {/* Heart Button - Thoda chota kiya mobile ke liye */}
        <button 
          onClick={() => toggleWishlist(product)}
          className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full shadow-md transition transform active:scale-90
            ${isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white text-gray-400 hover:text-red-500'}
          `}
        >
          {isWishlisted ? <FaHeart size={14} className="sm:w-5 sm:h-5"/> : <FaRegHeart size={14} className="sm:w-5 sm:h-5"/>}
        </button>
      </div>

      {/* Details - Padding kam ki mobile ke liye */}
      <div className="p-2 sm:p-4 flex flex-col flex-grow justify-between">
        <div>
           {/* Title - Text size responsive */}
           <h3 className="text-sm sm:text-lg font-bold text-gray-800 mt-1 line-clamp-1">
             {product.name}
           </h3>

           {/* Dropdown & Price Row */}
           <div className="mt-2 sm:mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
             
             {/* Dropdown */}
             <select 
               value={selectedWeight}
               onChange={(e) => setSelectedWeight(e.target.value)}
               className="bg-gray-50 border border-gray-300 text-xs sm:text-sm rounded px-1 py-1 outline-none w-full sm:w-auto"
             >
               {weights.map((w) => <option key={w} value={w}>{w}</option>)}
             </select>

             {/* Price */}
             <span className="text-sm sm:text-xl font-bold text-orange-600">
               ₹{currentPrice}
             </span>
           </div>
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          className="w-full mt-3 bg-orange-600 text-white py-1.5 sm:py-2 rounded-lg font-semibold text-xs sm:text-base flex items-center justify-center gap-1.5 hover:bg-orange-700 transition active:scale-95"
        >
          <FaShoppingCart className="text-xs sm:text-base" /> 
          <span>Add</span> <span className="hidden sm:inline">to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;