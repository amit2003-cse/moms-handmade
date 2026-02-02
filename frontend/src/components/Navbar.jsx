import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaUserCircle, FaSignOutAlt, FaHeart, FaBars, FaTimes, FaTachometerAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const isAdmin = user?.role === 'admin'; // ✅ Check if Admin

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/login');
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-orange-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        
        {/* UPPER ROW: Logo + Actions */}
        <div className="flex justify-between items-center">
          
          {/* 1. Logo */}
          <Link to="/" className="text-2xl font-bold font-serif tracking-wide hover:text-yellow-200 transition">
            Mom’s Handmade 🍪
          </Link>

          {/* 2. Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            
            {/* Common Links (Sabke liye) */}
            <Link to="/" className="hover:text-yellow-200 transition font-medium">Home</Link>
            <Link to="/products" className="hover:text-yellow-200 transition font-medium">Shop</Link>
            
            {/* 🛑 CUSTOMER ONLY SECTION (Admin ko ye nahi dikhega) */}
            {!isAdmin && (
              <>
                {/* Wishlist */}
                <Link to="/wishlist" className="hover:text-yellow-200 transition" title="Wishlist">
                  <FaHeart size={22} />
                </Link>

                {/* Cart */}
                <Link to="/cart" className="relative hover:text-yellow-200 transition">
                  <FaShoppingCart size={22} />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-3 bg-white text-orange-600 text-xs font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                      {cart.length}
                    </span>
                  )}
                </Link>
              </>
            )}

            {/* Auth Links */}
            {user ? (
              <div className="flex items-center gap-4 border-l border-orange-400 pl-4">
                
                {/* 👮‍♂️ ADMIN VIEW */}
                {isAdmin ? (
                  <Link 
                    to="/admin" 
                    className="flex items-center gap-2 bg-white text-orange-700 px-4 py-1.5 rounded-lg font-bold hover:bg-gray-100 transition shadow-md"
                  >
                    <FaTachometerAlt /> Dashboard
                  </Link>
                ) : (
                  /* 👤 CUSTOMER VIEW */
                  <Link to="/orders" className="hover:text-yellow-200 transition text-sm font-medium">
                    My Orders
                  </Link>
                )}
                
                {/* User Name Badge */}
                <span className={`text-sm font-medium px-3 py-1 rounded-full border border-orange-400 ${isAdmin ? 'bg-red-700' : 'bg-orange-700'}`}>
                  {isAdmin ? 'Admin' : user.name.split(' ')[0]}
                </span>

                <button onClick={handleLogout} className="text-white hover:text-red-200 transition" title="Logout">
                  <FaSignOutAlt size={20} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 bg-white text-orange-600 px-4 py-1.5 rounded-full font-bold text-sm hover:bg-yellow-100 transition shadow-sm">
                <FaUserCircle size={18} /> Login
              </Link>
            )}
          </div>

          {/* 3. Mobile Hamburger (Icons Logic Inside) */}
          <div className="md:hidden flex items-center gap-4">
            
            {/* 🛑 Mobile Cart: Only for Customers */}
            {!isAdmin && (
              <Link to="/cart" className="relative text-white" onClick={closeMenu}>
                <FaShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-orange-600 text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}

            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
            </button>
          </div>
        </div>

        {/* ✅ MOBILE MENU DROPDOWN */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-orange-500 flex flex-col space-y-4 animate-fade-in-down bg-orange-600">
            <Link to="/" onClick={closeMenu} className="block py-2 hover:text-yellow-200 border-b border-orange-500">🏠 Home</Link>
            <Link to="/products" onClick={closeMenu} className="block py-2 hover:text-yellow-200 border-b border-orange-500">🛍️ Shop</Link>
            
            {/* 🛑 Mobile Customer Links */}
            {!isAdmin && (
              <Link to="/wishlist" onClick={closeMenu} className="block py-2 hover:text-yellow-200 border-b border-orange-500">❤️ Wishlist</Link>
            )}

            {user ? (
              <>
                <div className="flex items-center gap-2 py-2 text-yellow-200 font-bold border-b border-orange-500">
                  <FaUserCircle /> Hi, {user.name} {isAdmin && '(Admin)'}
                </div>
                
                {/* 👮‍♂️ Mobile Admin Link */}
                {isAdmin ? (
                  <Link 
                    to="/admin" 
                    onClick={closeMenu} 
                    className="block py-2 bg-white text-orange-700 font-bold px-2 rounded mt-2 text-center"
                  >
                    ⚡ Open Admin Panel
                  </Link>
                ) : (
                  <Link to="/orders" onClick={closeMenu} className="block py-2 hover:text-yellow-200 border-b border-orange-500">📦 My Orders</Link>
                )}
                
                <button onClick={handleLogout} className="w-full text-left py-2 text-red-200 hover:text-white font-bold flex items-center gap-2 mt-2">
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={closeMenu} className="block py-2 font-bold text-yellow-200 border-b border-orange-500">
                🔐 Login / Signup
              </Link>
            )}
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;