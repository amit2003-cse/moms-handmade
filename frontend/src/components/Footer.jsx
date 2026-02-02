import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 pt-16 pb-8 mt-auto border-t-4 border-orange-600">
      <div className="container mx-auto px-6">
        
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-white font-serif tracking-wide">
              Mom's <span className="text-orange-500">Handmade</span> 🍪
            </h3>
            <p className="text-sm leading-7 text-gray-400">
              Ghar ka bana swadisht snacks aur mithaiyan directly aapke darwaze tak. 
              Pyar se banaya gaya, shuddhata ka wada.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider border-b-2 border-orange-600 inline-block pb-1">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Shop Now', 'About Us', 'Contact'].map((item, index) => {
                const path = item === 'Home' ? '/' : item === 'Shop Now' ? '/products' : `/${item.toLowerCase().replace(' ', '')}`;
                return (
                  <li key={index}>
                    <Link 
                      to={path} 
                      className="text-sm hover:text-orange-500 transition-all duration-300 hover:pl-2 block"
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider border-b-2 border-orange-600 inline-block pb-1">Customer Care</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/orders" className="text-sm hover:text-orange-500 transition-all duration-300 hover:pl-2 block">My Orders</Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm hover:text-orange-500 transition-all duration-300 hover:pl-2 block">Shopping Cart</Link>
              </li>
              <li>
                <Link to="/login" className="text-sm hover:text-orange-500 transition-all duration-300 hover:pl-2 block">Login / Register</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm hover:text-orange-500 transition-all duration-300 hover:pl-2 block">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider border-b-2 border-orange-600 inline-block pb-1">Contact Us</h4>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3 text-sm">
                <FaMapMarkerAlt className="text-orange-500 mt-1 text-lg" />
                <span>Model Town, Ludhiana, <br/> Punjab, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FaPhoneAlt className="text-orange-500" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FaEnvelope className="text-orange-500" />
                <span>support@momshandmade.com</span>
              </li>
            </ul>

            {/* Social Icons with Hover Colors */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 hover:text-white transition duration-300 shadow-lg">
                <FaFacebookF />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-pink-600 hover:text-white transition duration-300 shadow-lg">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-400 hover:text-white transition duration-300 shadow-lg">
                <FaTwitter />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Separator Line */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p className="mb-2 md:mb-0">
            © {new Date().getFullYear()} Mom's Handmade. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span>Made with</span> 
            <FaHeart className="text-red-500 animate-pulse" /> 
            <span>by Amit</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;