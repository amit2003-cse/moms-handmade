import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"; // ✅ Import decode

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 1️⃣ App start hote hi check karo: Kya user pehle se logged in hai?
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Token sahi hai ya nahi, verify karne ke liye profile fetch karo
          const { data } = await api.get('/users/profile');
          setUser(data);
        } catch (error) {
          console.error("Session expired", error);
          localStorage.removeItem('token'); // Agar token invalid hai toh hata do
          setUser(null);
        }
      }
      setLoading(false);
    };
    checkUserLoggedIn();
  }, []);

  // 2️⃣ LOGIN Function
  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      
      // Data save karo
      localStorage.setItem('token', data.token);
      setUser(data); // Backend response me user info honi chahiye
      
      toast.success(`Welcome back, ${data.name}! 👋`);
      navigate('/'); // Home page pe bhej do
      return true;
    } catch (error) {
      // Backend se error message dikhao (e.g., "Invalid Credentials")
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return false;
    }
  };

  // 3️⃣ REGISTER Function
  const register = async (name, email, password) => {
    try {
      const { data } = await api.post('/auth/register', { name, email, password });
      
      localStorage.setItem('token', data.token);
      setUser(data);
      
      toast.success('Account created successfully! 🎉');
      navigate('/');
      return true;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return false;
    }
  };

  // 4️⃣ LOGOUT Function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/login');
  };
  // 5️⃣ GOOGLE LOGIN Function
  const googleLogin = async (credentialResponse) => {
    try {
      // Google se jo token mila usse decode karo
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google User:", decoded);

      const { name, email, sub } = decoded; // sub = googleId

      // Backend ko data bhejo
      const { data } = await api.post('/auth/google', { 
        name, 
        email, 
        googleId: sub 
      });
      
      // Save data locally
      localStorage.setItem('token', data.token);
      setUser(data);
      
      toast.success(`Google Login Successful! Welcome ${data.name}`);
      navigate('/');
      return true;

    } catch (error) {
      console.error(error);
      toast.error('Google Login Failed');
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, googleLogin, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom Hook taaki har jagah easily use kar sakein
export const useAuth = () => useContext(AuthContext);