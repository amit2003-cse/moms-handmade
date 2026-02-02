import { useEffect, useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaRupeeSign } from 'react-icons/fa';
import toast from 'react-hot-toast';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Products fetch karne ka function
  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products'); // Route verify karlena
      setProducts(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete karne ka function
  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/admin/products/${id}`); 
      toast.success("Product Deleted");
      fetchProducts(); 
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  // Helper to get price safely
  const getStartPrice = (product) => {
    if (product.pricePerWeight) {
      // Pehla available price utha lo (usually 250g)
      return Object.values(product.pricePerWeight)[0];
    }
    return 'N/A';
  };

  return (
    // ✅ FIX 1: Wrapper Layout (Mobile: Col, Desktop: Row)
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      <Sidebar />
      
      {/* Content Area (Mobile Top Padding added) */}
      <div className="flex-1 p-4 pt-20 md:p-8 transition-all duration-300">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Manage Products</h1>
          <Link 
            to="/admin/products/add" 
            className="bg-green-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 text-sm md:text-base shadow-md transition"
          >
            <FaPlus /> <span className="hidden sm:inline">Add New</span><span className="sm:hidden">Add</span>
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : (
          <>
            {/* 📱 MOBILE VIEW: Product Cards (Grid Layout) */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {products.map((p) => (
                <div key={p._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                  
                  {/* Image */}
                  <img 
                    src={p.imageUrl || "https://placehold.co/100"} 
                    alt={p.name} 
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200" 
                  />
                  
                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 line-clamp-1">{p.name}</h3>
                    <p className="text-xs text-gray-500 mb-1">{p.category}</p>
                    <p className="text-green-600 font-bold text-sm flex items-center">
                      <FaRupeeSign size={12} /> {getStartPrice(p)}
                    </p>
                  </div>

                  {/* Actions (Vertical Buttons on Mobile) */}
                  <div className="flex flex-col gap-3 border-l pl-3 border-gray-100">
                    <Link 
                      to={`/admin/products/edit/${p._id}`} 
                      className="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded-full"
                    >
                      <FaEdit size={16} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(p._id)} 
                      className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* 🖥️ DESKTOP VIEW: Table (Hidden on Mobile) */}
            <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="p-4">Image</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price (Start)</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p._id} className="border-b hover:bg-gray-50 transition">
                      {/* 1. Image */}
                      <td className="p-4">
                        <img 
                          src={p.imageUrl || "https://placehold.co/100"} 
                          alt="" 
                          className="w-12 h-12 object-cover rounded border border-gray-200" 
                        />
                      </td>
                      
                      {/* 2. Name */}
                      <td className="p-4 font-bold text-gray-800">{p.name}</td>
                      
                      {/* 3. Category */}
                      <td className="p-4">
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs border border-gray-200">
                          {p.category}
                        </span>
                      </td>
                      
                      {/* 4. Price */}
                      <td className="p-4 text-green-600 font-bold">
                        ₹{getStartPrice(p)}
                      </td>
                      
                      {/* 5. Actions */}
                      <td className="p-4 flex gap-4">
                        <Link 
                          to={`/admin/products/edit/${p._id}`} 
                          className="text-blue-500 hover:text-blue-700 transition transform hover:scale-110"
                          title="Edit"
                        >
                          <FaEdit size={20} />
                        </Link>

                        <button 
                          onClick={() => handleDelete(p._id)} 
                          className="text-red-500 hover:text-red-700 transition transform hover:scale-110"
                          title="Delete"
                        >
                          <FaTrash size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {products.length === 0 && !loading && (
              <div className="text-center py-12">
                 <p className="text-gray-400 text-lg">No products found.</p>
                 <p className="text-gray-400 text-sm">Click "Add New" to create one.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;