import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx' // ✅ 1. Import kiya
import { GoogleOAuthProvider } from '@react-oauth/google';
import { WishlistProvider } from './context/WishlistContext.jsx'; // ✅ Import

// Tumhari Client ID (.env se ya direct string)
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        
        {/* AuthProvider sabse upar, taaki User ka pata chale */}
        <AuthProvider>
          
          {/* ✅ 2. CartProvider yahan lagaya (Auth ke andar) */}
          <CartProvider>
          <WishlistProvider>
              <App />
            </WishlistProvider>
          </CartProvider>
          
        </AuthProvider>

      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)