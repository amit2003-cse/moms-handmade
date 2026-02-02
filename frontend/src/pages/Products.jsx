import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom'; // 👈 IMPORT THIS
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaSortAmountDown, FaTimes } from 'react-icons/fa';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 1️⃣ URL se Category read karne ke liye Hook
  const [searchParams, setSearchParams] = useSearchParams();
  
  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  
  // Initial category URL se lo, agar nahi hai toh 'All'
  const categoryFromUrl = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || 'All');

  // Backend Schema ke hisaab se Categories (Exact Spelling)
  const categories = ['All', 'Sweets', 'Spicy', 'Crunchy'];

  // 2️⃣ API Call (Saara data ek baar le aao)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 3️⃣ Jab URL change ho (Home page se click karne par), State update karo
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    } else {
      setSelectedCategory('All');
    }
  }, [categoryFromUrl]);

  // Function to update Category and URL both
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      setSearchParams({}); // Remove query param
    } else {
      setSearchParams({ category: cat }); // Set query param
    }
  };

  // 🧠 MAIN LOGIC: Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let result = products;

    // A. Filter by Category (Exact Match with Mongoose Schema)
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // B. Filter by Search (Name or Description)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        (p.description && p.description.toLowerCase().includes(query)) ||
        (p.tags && p.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    // C. Sort by Price
    // Helper: Price nikaalne ka tareeka (kyunki pricePerWeight object hai)
    const getPrice = (p) => {
      if (!p.pricePerWeight) return 0;
      // 250g ka price uthao, ya jo bhi pehla available ho
      return p.pricePerWeight['250g'] || Object.values(p.pricePerWeight)[0] || 0;
    };

    if (sortOrder === 'low-high') {
      result = [...result].sort((a, b) => getPrice(a) - getPrice(b));
    } else if (sortOrder === 'high-low') {
      result = [...result].sort((a, b) => getPrice(b) - getPrice(a));
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortOrder]);

  // 🦴 Skeleton Loader
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 animate-pulse">
      <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="flex justify-between mt-auto">
        <div className="h-8 w-20 bg-gray-200 rounded"></div>
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      
      {/* 🟠 Header Banner */}
      <div className="bg-orange-600 text-white py-12 px-4 text-center mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold font-serif mb-2">Our Fresh Collection 🛍️</h1>
          <p className="text-orange-100">Handpicked snacks made with love & purity.</p>
        </div>
        <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-yellow-400 opacity-20 rounded-full translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        
        {/* 🎛️ Controls Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center sticky top-20 z-30 transition-all duration-300">
          
          {/* Search Bar */}
          <div className="relative w-full md:w-1/3">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search snacks (e.g. Ladoo)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border rounded-full focus:ring-2 focus:ring-orange-400 outline-none text-gray-700 bg-gray-50"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500">
                <FaTimes />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border
                  ${selectedCategory === cat 
                    ? 'bg-orange-600 text-white border-orange-600 shadow-md transform scale-105' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-600'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full md:w-auto">
            <div className="flex items-center gap-2 border px-4 py-2 rounded-full bg-white text-gray-600 cursor-pointer hover:border-orange-300">
              <FaSortAmountDown />
              <select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-transparent outline-none cursor-pointer appearance-none pr-4 font-medium text-sm w-full md:w-auto"
              >
                <option value="default">Sort by: Relevant</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* 📦 Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filteredProducts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100"
          >
            <div className="text-6xl mb-4 grayscale opacity-50">🍪</div>
            <h3 className="text-xl font-bold text-gray-800">No snacks match your filters!</h3>
            <p className="text-gray-500 mt-2">Try searching for something else or clear filters.</p>
            <button 
              onClick={() => {setSearchQuery(''); handleCategoryChange('All'); setSortOrder('default');}}
              className="mt-4 text-orange-600 font-bold hover:underline bg-orange-50 px-4 py-2 rounded-full"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  key={product._id}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Products;