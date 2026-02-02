import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  
  const { login, register, googleLogin } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoginView) {
      await login(formData.email, formData.password);
    } else {
      await register(formData.name, formData.email, formData.password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff7ed] px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border-t-4 border-orange-600">
        
        {/* 1️⃣ Header */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isLoginView ? 'Welcome Back! 👋' : 'Join Mom’s Handmade 🧡'}
        </h2>

        {/* 2️⃣ MANUAL FORM (Email/Password) */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Name Field (Sirf Register me dikhega) */}
          {!isLoginView && (
            <div>
              <label className="block text-gray-600 mb-1 text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Ex. Amit Kumar"
                required={!isLoginView}
              />
            </div>
          )}

          <div>
            <label className="block text-gray-600 mb-1 text-sm font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="user@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 transition duration-200"
          >
            {isLoginView ? 'Login' : 'Sign Up'}
          </button>
        </form>

        {/* 3️⃣ DIVIDER (OR) */}
        <div className="relative flex py-6 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* 4️⃣ GOOGLE BUTTON */}
        <div className="flex justify-center w-full">
            <GoogleLogin
                onSuccess={(response) => googleLogin(response)}
                onError={() => console.log('Login Failed')}
                theme="outline"
                size="large"
                width="100%" // Button ko full width karne ki koshish
                text={isLoginView ? "signin_with" : "signup_with"}
            />
        </div>

        {/* 5️⃣ TOGGLE LINK */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          {isLoginView ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLoginView(!isLoginView)}
            className="text-orange-600 font-bold hover:underline"
          >
            {isLoginView ? 'Register here' : 'Login here'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;