import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaArrowRight, FaStar, FaLeaf } from 'react-icons/fa';

const Hero = () => {
  // Animation Variants for Staggered Effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Har element 0.2s ke gap pe aayega
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  return (
    <div className="relative bg-orange-50 min-h-[90vh] flex items-center overflow-hidden">
      
      {/* 1. Grain Texture Overlay (For Handmade Feel) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }}>
      </div>

      {/* 2. Animated Background Blobs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-orange-200/40 rounded-full blur-[100px]"
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], x: [0, 50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-yellow-200/40 rounded-full blur-[80px]"
      />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* LEFT: Text Content with Staggered Animation */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-orange-100 px-4 py-1.5 rounded-full shadow-sm mb-6">
            <span className="bg-green-100 text-green-700 p-1 rounded-full text-xs">🌿</span>
            <span className="text-orange-800 text-sm font-bold tracking-wide uppercase">100% Homemade Goodness</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] font-serif mb-6">
            Taste the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-500">Nostalgia</span> <br/>
            of Maa’s Kitchen
          </motion.h1>

          {/* Subtext */}
          <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
            Authentic Indian snacks made with pure <span className="font-semibold text-orange-700">Desi Ghee</span> and love. 
            Bilkul waisa swaad, jaisa bachpan mein ghar par milta tha.
          </motion.p>
          
          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
            <Link 
              to="/products" 
              className="group bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-orange-500/30 hover:bg-orange-700 hover:shadow-2xl hover:shadow-orange-500/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
            >
              Order Now 
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/about" 
              className="px-8 py-4 rounded-full font-bold text-lg text-orange-700 hover:bg-orange-100/50 transition-all duration-300"
            >
              Our Story
            </Link>
          </motion.div>

          {/* Social Proof Section (Trust Builder) */}
          <motion.div variants={itemVariants} className="mt-10 flex items-center gap-4">
             <div className="flex -space-x-3">
                {[1,2,3,4].map((i) => (
                    <img key={i} className="w-10 h-10 rounded-full border-2 border-white" src={`https://i.pravatar.cc/100?img=${i+20}`} alt="User" />
                ))}
             </div>
             <div>
                <div className="flex text-yellow-400 text-sm">
                    <FaStar/><FaStar/><FaStar/><FaStar/><FaStar/>
                </div>
                <p className="text-sm text-gray-500 font-medium">Loved by <span className="text-gray-900 font-bold">1,200+</span> Happy Families</p>
             </div>
          </motion.div>

        </motion.div>

        {/* RIGHT: Hero Image Composition */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative lg:h-[600px] flex items-center justify-center"
        >
            {/* Background Circle behind Image */}
            <div className="absolute w-[90%] h-[90%] bg-gradient-to-tr from-orange-200 to-yellow-100 rounded-full opacity-50 blur-md animate-pulse"></div>

            {/* Main Image */}
            <motion.img 
                animate={{ y: [-15, 15, -15] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                src="https://img.freepik.com/free-photo/view-indian-sweets-served-plate_23-2149669614.jpg?w=1000" 
                alt="Indian Sweets Plate"
                className="relative w-full max-w-md mx-auto drop-shadow-2xl rounded-[2rem] z-10 border-4 border-white/50"
            />
            
            {/* Floating Card 1: Ingredients */}
            <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1, y: [0, -10, 0] }}
                transition={{ delay: 1, duration: 4, repeat: Infinity, repeatType: "reverse" }}
                className="absolute top-10 right-0 md:-right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white z-20 max-w-[160px]"
            >
                <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center text-green-600 mb-2">
                    <FaLeaf />
                </div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Ingredients</p>
                <p className="font-bold text-gray-800 leading-tight">100% Natural & Organic</p>
            </motion.div>

            {/* Floating Card 2: Rating */}
            <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1.2, duration: 5, repeat: Infinity, repeatType: "reverse" }}
                className="absolute bottom-20 left-0 md:-left-8 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white z-20 flex items-center gap-3"
            >
                <div className="text-center">
                    <p className="text-2xl font-extrabold text-orange-600">4.9</p>
                    <div className="flex text-yellow-400 text-[10px]">
                        <FaStar/><FaStar/><FaStar/><FaStar/><FaStar/>
                    </div>
                </div>
                <div className="text-xs font-semibold text-gray-600 w-20 leading-tight">
                    Best Rated Sweet Shop
                </div>
            </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;