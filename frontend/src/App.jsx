import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';

// Components & Pages
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import MyOrders from './pages/user/MyOrders';
import Wishlist from './pages/Wishlist';
import Footer from "./components/Footer"; // ✅ Imported
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';

// ✅ Admin Pages Imports
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import AdminOrders from './pages/admin/AdminOrders';
import Users from './pages/admin/Users';

// 👮‍♂️ Protected Admin Route Helper
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="p-10 text-center">Loading...</div>;
  
  if (user && user.role === 'admin') {
    return children;
  }
  
  return <Navigate to="/" />;
};

function App() {
  return (
    // ✅ FIX 1: 'flex' aur 'flex-col' add kiya taaki footer bottom pe stick kare
    <div className="flex flex-col min-h-screen bg-orange-50 font-sans text-gray-900">
      <Toaster position="top-center" />
      
      <Navbar />

      {/* ✅ FIX 2: Saare Routes is 'flex-grow' div ke andar daal diye */}
      <div className="flex-grow"> 
        <Routes>
          {/* Customer Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/wishlist" element={<Wishlist />} />
          {/* Info Pages */}
<Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />
<Route path="/privacy" element={<Privacy />} />
          {/* ✅ ADMIN ROUTES */}
          
          {/* 1. Dashboard */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />

          {/* 2. Product List */}
          <Route path="/admin/products" element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          } />

          {/* 3. Add Product */}
          <Route path="/admin/products/add" element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          } />

          {/* 4. Edit Product */}
          <Route path="/admin/products/edit/:id" element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          } />

          {/* 5. Admin Orders List */}
          <Route path="/admin/orders" element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          } />

          {/* 6. User Management */}
          <Route path="/admin/users" element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          } />

        </Routes>
      </div>

      {/* ✅ FIX 3: Footer yahan sabse niche add kiya */}
      <Footer />
      
    </div>
  )
}

export default App;