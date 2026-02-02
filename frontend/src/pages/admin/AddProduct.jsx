import { useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCloudUploadAlt } from 'react-icons/fa';

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 1️⃣ Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Sweets',
    imageUrl: '',
    tags: ''
  });

  // 2️⃣ Pricing State
  const [prices, setPrices] = useState({
    '250g': '',
    '500g': '',
    '1kg': ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePriceChange = (e) => {
    setPrices({ ...prices, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!prices['250g'] || !prices['500g'] || !prices['1kg']) {
      toast.error("Please enter prices for all weights");
      setLoading(false);
      return;
    }

    const formattedPrices = {
      "250g": Number(prices['250g']),
      "500g": Number(prices['500g']),
      "1kg": Number(prices['1kg']),
    };

    const tagsArray = formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [];

    const productData = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      pricePerWeight: formattedPrices,
      imageUrl: formData.imageUrl,
      tags: tagsArray,
    };

    try {
      await api.post('/products', productData);
      toast.success('Product Added Successfully! 🎉');
      navigate('/admin/products');
    } catch (error) {
      console.error("Upload Error:", error.response?.data);
      const errorMsg = error.response?.data?.message || 'Failed to add product';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    // ✅ FIX 1: Layout Wrapper (Desktop: Row, Mobile: Col)
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      
      {/* Sidebar (Apne aap adjust hoga) */}
      <Sidebar />
      
      {/* ✅ FIX 2: Main Content Area */}
      {/* Mobile pe 'pt-20' diya taaki header ke piche na chhupe */}
      <div className="flex-1 p-4 md:p-8 pt-20 md:pt-8 transition-all duration-300">
        
        <button onClick={() => navigate('/admin/products')} className="flex items-center gap-2 text-gray-600 mb-6 hover:text-orange-600 transition">
          <FaArrowLeft /> <span className="text-sm md:text-base">Back to Products</span>
        </button>

        <div className="bg-white p-4 md:p-8 rounded-xl shadow-md max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Add New Snack 🍪</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
              <input required name="name" value={formData.name} onChange={handleChange} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" placeholder="Ex. Besan Ladoo" />
            </div>

            {/* ✅ FIX 3: Category & Tags (Mobile: 1 Col, Desktop: 2 Cols) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full border p-3 rounded-lg bg-white focus:ring-2 focus:ring-orange-500">
                  <option value="Sweets">Sweets 🍬</option>
                  <option value="Spicy">Spicy 🌶️</option>
                  <option value="Crunchy">Crunchy 🥨</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Tags (Comma separated)</label>
                <input name="tags" value={formData.tags} onChange={handleChange} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-500" placeholder="Ex. Best Seller" />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea required name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-500" placeholder="About the product..."></textarea>
            </div>

            {/* ✅ FIX 4: Pricing Section (Mobile: Stacked/Small Grid, Desktop: 3 Cols) */}
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <label className="block text-sm font-bold text-gray-700 mb-3">Pricing per Weight (₹)</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">250g Price *</label>
                  <input required type="number" name="250g" value={prices['250g']} onChange={handlePriceChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-orange-500" placeholder="100" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">500g Price *</label>
                  <input required type="number" name="500g" value={prices['500g']} onChange={handlePriceChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-orange-500" placeholder="190" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">1kg Price *</label>
                  <input required type="number" name="1kg" value={prices['1kg']} onChange={handlePriceChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-orange-500" placeholder="350" />
                </div>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
              <div className="flex gap-2">
                <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-500" placeholder="https://..." />
                <div className="w-12 h-12 flex-shrink-0 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden border">
                  {formData.imageUrl ? <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" /> : <FaCloudUploadAlt className="text-gray-400" />}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition disabled:bg-gray-400 active:scale-95 transform duration-150"
            >
              {loading ? 'Saving...' : 'Create Product'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;