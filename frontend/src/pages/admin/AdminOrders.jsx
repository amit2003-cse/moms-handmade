import { useEffect, useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FaBoxOpen, FaClock, FaMapMarkerAlt, FaRupeeSign } from 'react-icons/fa';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Fetch All Orders
  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/admin/orders');
      setOrders(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 2️⃣ Handle Status Change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.put(`/admin/orders/${orderId}`, { status: newStatus });
      toast.success(`Order marked as ${newStatus}`);
      fetchOrders();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  // Status Color Helper
  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
      case 'Shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-orange-100 text-orange-700 border-orange-200';
    }
  };

  return (
    // ✅ FIX 1: Responsive Layout Wrapper
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      <Sidebar />
      
      {/* Content Area with Mobile Top Padding */}
      <div className="flex-1 p-4 pt-20 md:p-8 transition-all duration-300">
        
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaBoxOpen /> Manage Orders
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading orders...</p>
        ) : (
          <>
            {/* 📱 MOBILE VIEW: Cards (Sirf choti screen pe dikhenge) */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {orders.map((order) => (
                <div key={order._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  
                  {/* Card Header: ID & Date */}
                  <div className="flex justify-between items-start mb-3 pb-3 border-b border-gray-100">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">Order ID</span>
                      <span className="text-xs font-mono text-gray-600">#{order._id.slice(-6)}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-gray-400 block">Date</span>
                      <span className="text-xs text-gray-600 flex items-center justify-end gap-1">
                        <FaClock size={10} /> {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Customer Details */}
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-800 text-lg">
                      {order.deliveryDetails?.fullName || order.user?.name || "Unknown"}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-start gap-1 mt-1">
                      <FaMapMarkerAlt className="mt-1 text-orange-400 flex-shrink-0" />
                      {order.deliveryDetails?.address || order.address}, {order.deliveryDetails?.pincode || order.pincode}
                    </p>
                  </div>

                  {/* Total & Status Action */}
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                    <div className="font-bold text-gray-800 text-lg flex items-center">
                      <FaRupeeSign size={14} /> {order.totalAmount}
                    </div>
                    
                    <select 
                      value={order.status} 
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`text-xs font-bold px-2 py-1.5 rounded border outline-none cursor-pointer ${getStatusColor(order.status)}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

            {/* 🖥️ DESKTOP VIEW: Table (Sirf badi screen pe dikhega) */}
            <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-gray-50 transition">
                      <td className="p-4 text-xs font-mono text-gray-500">
                        {order._id}
                      </td>
                      <td className="p-4">
                        <p className="font-bold text-gray-800">
                          {order.deliveryDetails?.fullName || order.user?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {order.deliveryDetails?.address || order.address}, {order.deliveryDetails?.pincode}
                        </p>
                      </td>
                      <td className="p-4 font-bold text-green-600">
                        ₹{order.totalAmount}
                      </td>
                      <td className="p-4 text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      
                      {/* Status Dropdown */}
                      <td className="p-4">
                        <select 
                          value={order.status} 
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className={`border rounded px-3 py-1 text-sm font-bold cursor-pointer outline-none transition
                            ${getStatusColor(order.status)}
                          `}
                        >
                          <option value="Pending">Pending ⏳</option>
                          <option value="Processing">Processing ⚙️</option>
                          <option value="Shipped">Shipped 🚚</option>
                          <option value="Delivered">Delivered ✅</option>
                          <option value="Cancelled">Cancelled ❌</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {orders.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-400">No orders received yet.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;