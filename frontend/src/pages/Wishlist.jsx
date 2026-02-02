import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { FaHeartBroken } from 'react-icons/fa';

const Wishlist = () => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <FaHeartBroken className="text-gray-300 text-6xl mb-4" />
        <h2 className="text-2xl font-bold text-gray-400 mb-2">Your Wishlist is Empty</h2>
        <p className="text-gray-500 mb-6">Save items you love here for later!</p>
        <Link 
          to="/products"
          className="bg-orange-600 text-white px-6 py-2 rounded-full font-bold hover:bg-orange-700 transition"
        >
          Browse Snacks
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        My Favorites ❤️
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          // Reusing ProductCard taaki Cart aur Wishlist logic dono chalein
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;