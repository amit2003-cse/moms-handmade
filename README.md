# 🍪 Mom's Handmade

A full-stack **MERN e-commerce web application** for selling homemade snacks online.  
Users can browse products, add items to cart/wishlist, place orders, and pay using **Razorpay or Cash on Delivery (COD)**.

This project demonstrates a complete real-world e-commerce flow including **authentication, cart management, order processing, admin dashboard, and payment gateway integration.**

---

## 🚀 Live Demo
Frontend: (Add your deployed link)  
Backend API: (Add your deployed link)

---

# 🧑‍💻 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication

### Payment
- Razorpay Payment Gateway
- Cash on Delivery (COD)

---

# ✨ Features

## 👤 User Features

- User Registration & Login (JWT Auth)
- Google Login (optional)
- Browse homemade snacks
- Product weight selection (250g / 500g / 1kg)
- Dynamic pricing
- Add to Cart
- Add to Wishlist
- Update item quantity
- Remove items
- Checkout with shipping details
- Razorpay online payment
- Cash on Delivery
- Order history tracking

---

## 🛍️ Product Features

- Product categories
- Product tags (Best Seller / New Launch)
- Dynamic weight-based pricing
- Lazy loaded images
- Responsive product grid

---

## 🛒 Cart System

- Persistent cart for logged-in users
- Guest cart using localStorage
- Backend synchronized cart
- Quantity increment/decrement
- Auto cart clearing after order

---

## 💳 Payment System

Integrated **Razorpay Payment Gateway**

Flow:
1. Backend creates Razorpay order
2. Frontend opens Razorpay popup
3. User completes payment
4. Backend verifies payment signature
5. Order stored in database
6. Cart cleared automatically

Supports:
- Razorpay Online Payment
- Cash on Delivery

---

## 📦 Order System

- Shipping address form
- Order summary
- Order status tracking
- Payment status tracking

Order statuses:
- Pending
- Processing
- Shipped
- Delivered
- Cancelled

---

## 🧑‍💼 Admin Features

Admin dashboard allows:

- Add products
- Edit products
- Delete products
- View all orders
- Update order status
- View registered users

---

# 📂 Project Structure
moms_handmade/
│
├── frontend/
│ ├── components
│ ├── pages
│ ├── context
│ ├── services
│ └── App.jsx
│
├── backend/
│ ├── config
│ ├── controllers
│ ├── models
│ ├── routes
│ ├── middleware
│ └── server.js

---

# ⚙️ Installation

## 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/moms-handmade.git
cd moms-handmade
2️⃣ Install Backend Dependencies

cd backend
npm install

3️⃣ Setup Backend Environment

Create .env

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret

RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
4️⃣ Start Backend
npm run dev
5️⃣ Install Frontend Dependencies
cd ../frontend
npm install
6️⃣ Setup Frontend Environment

Create .env

VITE_API_BASE_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY=your_public_key
7️⃣ Start Frontend
npm run dev
🧪 Seed Dummy Data

Populate database with sample products.

node seed/productSeed.js
🔐 Authentication

Uses JWT based authentication

Protected routes:

/cart
/wishlist
/orders
/admin
