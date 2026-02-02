import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaBoxOpen, FaClipboardList, FaUsers, FaBars, FaTimes, FaLeaf, FaHome, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext'; // ✅ Auth Context Import kiya

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth(); // ✅ Logout function nikala
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path 
      ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-500/30 translate-x-1" 
      : "text-gray-400 hover:bg-gray-800 hover:text-white hover:translate-x-1";
  };

  const closeSidebar = () => setIsOpen(false);

  // ✅ Logout Handler
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* 📱 MOBILE HEADER */}
      <div className="md:hidden bg-gray-900 text-white p-4 flex justify-between items-center fixed top-0 w-full z-50 shadow-md border-b border-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-orange-500 text-xl"><FaLeaf /></span>
          <span className="font-bold text-lg tracking-wide">Admin Panel</span>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="focus:outline-none p-2 rounded-md hover:bg-gray-800 transition"
        >
          {isOpen ? <FaTimes size={22} className="text-red-400" /> : <FaBars size={22} className="text-orange-400" />}
        </button>
      </div>

      {/* 🌑 OVERLAY */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={closeSidebar}
        ></div>
      )}

      {/* 🖥️ SIDEBAR CONTAINER */}
      <div className={`
        bg-gradient-to-b from-gray-900 to-gray-800 w-64 min-h-screen flex flex-col text-white transition-transform duration-300 ease-out shadow-2xl
        fixed md:static top-0 left-0 z-50 pt-20 md:pt-0 border-r border-gray-800
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 
      `}>
        
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-center border-b border-gray-700/50 hidden md:flex">
          <h1 className="text-2xl font-extrabold tracking-wide flex items-center gap-2">
            <span className="text-white">Mom's</span> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Handmade
            </span>
          </h1>
        </div>

        {/* 🔗 Menu Items */}
        <nav className="flex-1 px-4 py-6 space-y-3 overflow-y-auto">
          
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">Main Menu</p>

          <Link to="/admin" onClick={closeSidebar} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 font-medium ${isActive('/admin')}`}>
            <FaTachometerAlt className="text-lg" /> Dashboard
          </Link>
          
          <Link to="/admin/products" onClick={closeSidebar} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 font-medium ${isActive('/admin/products')}`}>
            <FaBoxOpen className="text-lg" /> Products
          </Link>
          
          <Link to="/admin/orders" onClick={closeSidebar} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 font-medium ${isActive('/admin/orders')}`}>
            <FaClipboardList className="text-lg" /> Orders
          </Link>

          <Link to="/admin/users" onClick={closeSidebar} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 font-medium ${isActive('/admin/users')}`}>
            <FaUsers className="text-lg" /> Users
          </Link>

          {/* 👇 NEW SECTION: System Links */}
          <div className="mt-8 pt-4 border-t border-gray-700/50">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">System</p>
            
            {/* 1. Back to Home Button */}
            <Link 
              to="/" 
              onClick={closeSidebar}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-green-400 transition-all duration-300 font-medium mb-2"
            >
              <FaHome className="text-lg" /> Back to Website
            </Link>

            {/* 2. Logout Button */}
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 font-medium"
            >
              <FaSignOutAlt className="text-lg" /> Logout
            </button>
          </div>

        </nav>

        {/* Footer Info */}
        <div className="p-4 border-t border-gray-700/50 bg-gray-900/50">
          <div className="text-center">
            <p className="text-[10px] text-gray-500">Logged in as Admin</p>
          </div>
        </div>

      </div>
    </>
  );
};

export default Sidebar;