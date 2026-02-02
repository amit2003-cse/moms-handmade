import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  // 1️⃣ Load Wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        try {
          const { data } = await api.get('/wishlist');
          
          // ✅ FIX: Backend response structure handle karna
          // Log says: { products: Array(0) }
          if (Array.isArray(data)) {
            setWishlist(data);
          } else if (data && Array.isArray(data.products)) { 
            // 👈 Ye line add kari hai (Backend 'products' key bhej raha hai)
            setWishlist(data.products);
          } else if (data && Array.isArray(data.items)) {
            setWishlist(data.items);
          } else {
            console.error("Invalid wishlist format:", data);
            setWishlist([]); 
          }

        } catch (error) {
          console.error("Wishlist fetch error", error);
          setWishlist([]); 
        }
      } else {
        setWishlist([]); 
      }
    };
    fetchWishlist();
  }, [user]);

  // 2️⃣ Toggle Wishlist
  const toggleWishlist = async (product) => {
    if (!user) {
      toast.error("Please login to use Wishlist 💖");
      return;
    }

    try {
      const currentList = Array.isArray(wishlist) ? wishlist : [];
      const isAlreadyInWishlist = currentList.some(item => item._id === product._id);
      
      // Optimistic UI Update
      if (isAlreadyInWishlist) {
        setWishlist(prev => prev.filter(item => item._id !== product._id));
        toast.success("Removed from Wishlist");
      } else {
        setWishlist(prev => [...prev, product]);
        toast.success("Added to Wishlist ❤️");
      }

      await api.post('/wishlist/toggle', { productId: product._id });

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // Helper Check
  const isInWishlist = (productId) => {
    if (!Array.isArray(wishlist)) return false; 
    return wishlist.some(item => item._id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);