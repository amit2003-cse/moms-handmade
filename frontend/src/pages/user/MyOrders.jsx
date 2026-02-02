import { useEffect, useState } from 'react';
import api from '../../services/api';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/my'); // Route confirm karlena backend se
        console.log("Orders Data:", data); // 🔍 Debugging ke liye check karna
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading orders...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">📦 My Orders</h2>
      
      {orders.length === 0 ? (
        <p className="text-gray-500">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white border rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4 border-b pb-2">
                <div>
                  <p className="text-sm text-gray-500">Order ID: {order._id}</p>
                  <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold 
                  ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {order.status || 'Pending'}
                </span>
              </div>

              <div className="space-y-2">
                 <p className="font-semibold text-gray-700">Total Amount: ₹{order.totalAmount}</p>
                 
                 {/* ✅ FIX: Address ab 'deliveryDetails' ke andar se milega */}
                 <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    <p className="font-bold">Shipping To:</p>
                    <p>{order.deliveryDetails?.fullName} ({order.deliveryDetails?.mobile})</p>
                    <p>
                      {order.deliveryDetails?.address}, {order.deliveryDetails?.pincode}
                    </p>
                    {order.deliveryDetails?.landmark && <p className="text-xs text-gray-500">Landmark: {order.deliveryDetails.landmark}</p>}
                 </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;