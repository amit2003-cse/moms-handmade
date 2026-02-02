import { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaCloudUploadAlt, FaSave } from 'react-icons/fa';

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Sweets',
    imageUrl: '',
    tags: ''
  });

  const [prices, setPrices] = useState({
    '250g': '',
    '500g': '',
    '1kg': ''
  });

  // 1️⃣ Load Existing Data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`); // Ensure route matches backend
        
        setFormData({
          name: data.name,
          description: data.description,
          category: data.category,
          imageUrl: data.imageUrl || '',
          tags: data.tags ? data.tags.join(', ') : ''
        });

        if (data.pricePerWeight) {
          setPrices({
            '250g': data.pricePerWeight['250g'] || '',
            '500g': data.pricePerWeight['500g'] || '',
            '1kg': data.pricePerWeight['1kg'] || ''
          });
        }
      } catch (error) {
        toast.error("Failed to fetch product details");
        navigate('/admin/products');
      } finally {
        setFetching(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  // Handle Inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePriceChange = (e) => {
    setPrices({ ...prices, [e.target.name]: e.target.value });
  };

  // 2️⃣ Update Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!prices['250g'] || !prices['500g'] || !prices['1kg']) {
      toast.error("All weight prices are required!");
      setLoading(false);
      return;
    }

    const formattedPrices = {
      "250g": Number(prices['250g']),
      "500g": Number(prices['500g']),
      "1kg": Number(prices['1kg']),
    };

    const productData = {
      ...formData,
      pricePerWeight: formattedPrices,
      tags: formData.tags.split(',').map(tag => tag.trim()),
    };

    try {
      await api.put(`/admin/products/${id}`, productData); 
      toast.success('Product Updated Successfully! ✅');
      navigate('/admin/products');
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Update failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-10 text-center pt-24">Loading Product Details...</div>;

  return (
    // ✅ FIX 1: Wrapper Layout (Mobile: Col, Desktop: Row)
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      <Sidebar />
      
      {/* ✅ FIX 2: Content Padding (Mobile: Top padding for header) */}
      <div className="flex-1 p-4 pt-20 md:p-8 transition-all duration-300">
        
        <button onClick={() => navigate('/admin/products')} className="flex items-center gap-2 text-gray-600 mb-6 hover:text-orange-600 transition">
          <FaArrowLeft /> <span className="text-sm md:text-base">Back to Products</span>
        </button>

        <div className="bg-white p-4 md:p-8 rounded-xl shadow-md max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Edit Product ✏️</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
              <input required name="name" value={formData.name} onChange={handleChange} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
            </div>

            {/* ✅ FIX 3: Category & Tags Grid (Mobile: 1 Col, Desktop: 2 Cols) */}
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
                <label className="block text-sm font-bold text-gray-700 mb-2">Tags</label>
                <input name="tags" value={formData.tags} onChange={handleChange} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-500" />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea required name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-500"></textarea>
            </div>

            {/* ✅ FIX 4: Pricing Grid (Mobile: 1 Col, Small: 3 Cols) */}
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <label className="block text-sm font-bold text-gray-700 mb-3">Pricing per Weight</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">250g Price</label>
                  <input required type="number" name="250g" value={prices['250g']} onChange={handlePriceChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">500g Price</label>
                  <input required type="number" name="500g" value={prices['500g']} onChange={handlePriceChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">1kg Price</label>
                  <input required type="number" name="1kg" value={prices['1kg']} onChange={handlePriceChange} className="w-full border p-2 rounded focus:ring-2 focus:ring-orange-500" />
                </div>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
              <div className="flex gap-2">
                <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-orange-500" />
                <div className="w-12 h-12 flex-shrink-0 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden border">
                  {formData.imageUrl ? <img src={formData.imageUrl} alt="preview" className="w-full h-full object-cover" /> : <FaCloudUploadAlt className="text-gray-400" />}
                </div>
              </div>
            </div>

            {/* Update Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition disabled:bg-gray-400 flex justify-center items-center gap-2 active:scale-95 transform duration-150"
            >
              <FaSave /> {loading ? 'Updating...' : 'Update Product'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;