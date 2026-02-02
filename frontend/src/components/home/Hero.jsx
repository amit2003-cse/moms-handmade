import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative bg-orange-50 min-h-[90vh] flex items-center overflow-hidden">
      
      {/* Background Blobs (Modern Touch) */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-200 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm font-bold tracking-wide uppercase inline-block mb-4">
            100% Homemade Goodness 🏡
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight font-serif mb-6">
            Taste the <span className="text-orange-600">Nostalgia</span> of Maa’s Kitchen
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
            Authentic Indian snacks made with pure Desi Ghee and love. 
            Bilkul waisa swaad, jaisa bachpan mein ghar par milta tha.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/products" 
              className="bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30 hover:bg-orange-700 hover:scale-105 transition-all duration-300"
            >
              Shop Now 🛍️
            </Link>
            <Link 
              to="/about" 
              className="px-8 py-4 rounded-full font-bold text-lg text-orange-600 border-2 border-orange-600 hover:bg-orange-50 transition-all duration-300"
            >
              Our Story 📖
            </Link>
          </div>
        </motion.div>

        {/* Right: Hero Image (Floating Animation) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Main Image Placeholder - Replace src with your actual ladoo/snack image */}
          <motion.img 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            src="https://img.freepik.com/free-photo/view-indian-sweets-served-plate_23-2149669614.jpg?w=1000" 
            alt="Indian Sweets"
            className="w-full max-w-lg mx-auto drop-shadow-2xl rounded-3xl rotate-3 hover:rotate-0 transition-all duration-500"
          />
          
          {/* Floating Badge */}
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 3, delay: 1, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3"
          >
            <div className="bg-green-100 p-2 rounded-full text-2xl">🌿</div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Ingredients</p>
              <p className="font-bold text-gray-800">100% Natural</p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;