import { useEffect, useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FaUsers, FaTrash, FaUserShield, FaUser, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Fetch Users
  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/users');
      setUsers(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 2️⃣ Delete User
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure? This will delete the user permanently.")) return;
    
    try {
      await api.delete(`/users/${id}`);
      toast.success("User deleted successfully");
      setUsers(prev => prev.filter(user => user._id !== id));
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  return (
    // ✅ FIX 1: Responsive Wrapper (Mobile: Col, Desktop: Row)
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      <Sidebar />
      
      {/* Content Area (Mobile Top Padding added) */}
      <div className="flex-1 p-4 pt-20 md:p-8 transition-all duration-300">
        
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaUsers /> User Management <span className="text-sm bg-gray-200 px-2 py-1 rounded-full text-gray-600">({users.length})</span>
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading users...</p>
        ) : (
          <>
            {/* 📱 MOBILE VIEW: User Cards */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {users.map((user) => (
                <div key={user._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative">
                  
                  {/* Header: Name & Role */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">{user.name}</h3>
                      <p className="text-xs text-gray-400 font-mono">ID: {user._id.substring(0, 8)}...</p>
                    </div>
                    {user.role === 'admin' || user.isAdmin ? (
                      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                        <FaUserShield /> Admin
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                        <FaUser /> User
                      </span>
                    )}
                  </div>

                  {/* Body: Email & Date */}
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-orange-400" />
                      <a href={`mailto:${user.email}`} className="truncate">{user.email}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-blue-400" />
                      <span>Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Footer: Delete Button */}
                  <div className="border-t pt-3 flex justify-end">
                    <button 
                      onClick={() => handleDeleteUser(user._id)} 
                      disabled={user.role === 'admin'}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition
                        ${user.role === 'admin' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-red-50 text-red-500 hover:bg-red-100'}
                      `}
                    >
                      <FaTrash size={14} /> Delete User
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* 🖥️ DESKTOP VIEW: Table */}
            <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="p-4">ID</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Joined Date</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b hover:bg-gray-50 transition">
                      <td className="p-4 text-xs font-mono text-gray-500">
                        {user._id.substring(0, 10)}...
                      </td>
                      <td className="p-4 font-semibold text-gray-700">
                        {user.name}
                      </td>
                      <td className="p-4 text-gray-600">
                        <a href={`mailto:${user.email}`} className="hover:text-blue-600 hover:underline">
                          {user.email}
                        </a>
                      </td>
                      <td className="p-4">
                        {user.role === 'admin' || user.isAdmin ? (
                          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold flex items-center w-fit gap-1">
                            <FaUserShield /> Admin
                          </span>
                        ) : (
                          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold flex items-center w-fit gap-1">
                            <FaUser /> Customer
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => handleDeleteUser(user._id)} 
                          className={`p-2 rounded-full transition ${user.role === 'admin' ? 'text-gray-300 cursor-not-allowed' : 'text-red-400 hover:text-red-600 hover:bg-red-50'}`}
                          title="Delete User"
                          disabled={user.role === 'admin'} 
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {!loading && users.length === 0 && (
              <p className="p-8 text-center text-gray-500">No users found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Users;