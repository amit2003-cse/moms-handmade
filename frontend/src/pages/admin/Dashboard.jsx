import { useEffect, useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import { FaBoxOpen, FaClipboardList, FaUsers, FaRupeeSign } from 'react-icons/fa';
import api from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/stats');
        setStats(data);
      } catch (error) {
        console.error("Failed to load stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Helper Card Component (Hover effect add kiya hai)
  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 border-b-4 transform transition hover:scale-105 duration-200" style={{ borderColor: color }}>
      <div className="p-4 rounded-full text-white shadow-sm" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm font-semibold">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">
          {loading ? "..." : value}
        </h3>
      </div>
    </div>
  );

  return (
    // ✅ FIX 1: Layout Wrapper (Mobile: Column, Desktop: Row)
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      
      {/* Sidebar apne aap adjust hoga (kyunki humne Sidebar component fix kar diya hai) */}
      <Sidebar />
      
      {/* ✅ FIX 2: Content Area Padding */}
      {/* Mobile: pt-20 (Header ke liye jagah), p-4 (Side gap) */}
      {/* Desktop: p-8 (Normal gap) */}
      <div className="flex-1 p-4 pt-20 md:p-8 transition-all duration-300">
        
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">
          Admin Dashboard 📊
        </h1>
        
        {/* Stats Grid - Already Responsive via Tailwind classes */}
        {/* Mobile: 1 col, Tablet: 2 cols, Desktop: 4 cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          
          <StatCard 
            title="Total Revenue" 
            value={`₹${stats.totalSales.toLocaleString()}`} 
            icon={<FaRupeeSign size={24} />} 
            color="#16a34a" 
          />

          <StatCard 
            title="Total Orders" 
            value={stats.totalOrders} 
            icon={<FaClipboardList size={24} />} 
            color="#ea580c" 
          />

          <StatCard 
            title="Total Products" 
            value={stats.totalProducts} 
            icon={<FaBoxOpen size={24} />} 
            color="#2563eb" 
          />

          <StatCard 
            title="Total Users" 
            value={stats.totalUsers} 
            icon={<FaUsers size={24} />} 
            color="#9333ea" 
          />

        </div>

        {/* Recent Activity / Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Quick Actions</h3>
          <p className="text-gray-500 text-sm md:text-base">
            Go to "Orders" tab to manage pending deliveries or update shipping status.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;