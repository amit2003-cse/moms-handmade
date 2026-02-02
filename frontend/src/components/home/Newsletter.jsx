const Newsletter = () => {
    return (
      <div className="py-20 bg-orange-600 relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400 opacity-20 rounded-full translate-x-1/3 translate-y-1/3"></div>
  
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-serif mb-4">
            Join the Mom’s Handmade Family 💌
          </h2>
          <p className="text-orange-100 mb-8 max-w-xl mx-auto text-lg">
            Subscribe to get exclusive offers, new product launches, and a flat <span className="font-bold text-yellow-300">10% OFF</span> on your first order!
          </p>
  
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full px-6 py-4 rounded-full outline-none text-gray-800 shadow-lg focus:ring-4 focus:ring-orange-400"
            />
            <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition shadow-lg whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Newsletter;