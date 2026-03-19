<div align="center">
  <img src="https://img.icons8.com/color/96/000000/cookies.png" alt="Cookies Logo" width="80"/>
  <h1>🍪 Mom's Handmade</h1>
  <p><strong>A Production-Ready Full-Stack MERN E-Commerce Web Application</strong></p>

  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node" />
    <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  </p>
</div>

---

A robust and scalable e-commerce platform dedicated to selling high-quality homemade snacks. Designed with a focus on **performance**, **clean architecture**, and an exceptional **user experience (UX)**. Built to demonstrate enterprise-level web development practices, this application manages the entirety of the e-commerce lifecycle—from secure authentication to payment processing and administrative inventory control.

## 🌟 Live Demo
- **Frontend Link:** https://moms-handmade.netlify.app/
- **Backend API:** https://moms-handmade-backend.onrender.com/

*(Note: Provide snapshots below to give recruiters a quick glance without needing to log in!)*

---

## 🚀 Key Features

### 🛒 For the Customers
* **Secure Authentication**: JWT-based email/password authentication alongside seamless **Google OAuth** integration.
* **Persistent Cart & Wishlist**: State management synchronized with the backend database or local storage, allowing users to transition fluidly between sessions.
* **Smart Shopping Ecosystem**: Support for multiple product weight variants (e.g., 250g, 500g, 1kg) with dynamic price calculation algorithms.
* **Payment Gateway Integration**: Embedded **Razorpay Integration** for processing secure digital real-time transactions and a smooth **Cash on Delivery (COD)** checkout flow.
* **Modern Interactive UI**: Crafted with React 19 and styled utilizing **Tailwind CSS**. Micro-interactions and transition animations are powered by **Framer Motion**.
* **AI-Powered Customer Support**: Integrated front-end **Chatbot** feature to handle automated customer engagements.
* **Automated Emails**: Integrated with the **Resend API** for fast transactional email dispatching.

### 🛡️ For the Administrators
* **Role-Based Access Control (RBAC)**: Securely limits application boundaries exclusively for administrators.
* **Complete Inventory Control**: Powerful CRUD (Create, Read, Update, Delete) dashboards for seamless modification of the product catalog.
* **Order fulfillment & Tracking**: Real-time status modification capability (ex. Pending &rarr; Shipped &rarr; Delivered) tracked on the central Admin dashboard.
* **User Management Dashboard**: Centralized view for administrators to track and manage registered users.

---

## 🛠 Tech Stack & Dependencies

### **Frontend Architecture**
* **Core:** React 19, Vite
* **Styling:** Tailwind CSS, Framer Motion
* **Routing:** React Router v7
* **Data Fetching:** Axios
* **Tooling & State:** React Hot Toast, JWT-Decode, `@react-oauth/google`

### **Backend Infrastructure**
* **Server:** Node.js, Express.js (v5)
* **Database & ORM:** MongoDB Atlas, Mongoose
* **Security:** JSON Web Tokens (JWT), `bcryptjs`, CORS enablement
* **3rd Party API Integration:** Razorpay SDK (Payments), Resend SDK (Email Automation)

---

## 📐 System Architecture

The application strictly adheres to the **MVC (Model-View-Controller)** pattern on the backend while utilizing a **Service/Context-driven component pattern** on the frontend to maintain maximum code modularity.

```text
moms_handmade/
├── frontend/
│   ├── src/
│   │   ├── components/  # Extracted, reusable UI elements (Navbars, Cards, Modals)
│   │   ├── pages/       # High-level route views (Checkout, Dashboard, Products)
│   │   ├── services/    # Business logic encapsulation (API Fetch wrappers)
│   │   └── context/     # React Context APIs managing global states
│
├── backend/
│   ├── controllers/     # Independent functional logic processing requests endpoints
│   ├── models/          # Mongoose Schemas (User, Order, Product, Cart)
│   ├── routes/          # Express route declarations explicitly mapped to controllers
│   ├── middleware/      # Application-layer functions handling authorization/validation
│   └── config/          # Environment configuration & DB connection setups
```

---

## 🏃 Getting Started (Local Development Environment)

### Prerequisites
- Node.js (`v18+`)
- MongoDB connection string (Atlas or Local)
- Razorpay Test API Keys
- Resend API Keys

### Installation & Execution Guide

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/moms-handmade.git
cd moms-handmade
```

**2. Configure the Backend**
```bash
cd backend
npm install
```
Create a `.env` file within the `backend/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_cluster_connection_string
JWT_SECRET=your_hyper_secure_jwt_secret_key

RAZORPAY_KEY_ID=your_razorpay_test_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret

RESEND_API_KEY=your_resend_api_key
```
Spin up the backend development server:
```bash
npm run dev
```

**3. Configure the Frontend**
```bash
cd ../frontend
npm install
```
Create a `.env` file within the `frontend/` directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY=your_razorpay_public_test_key
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```
Launch the frontend client:
```bash
npm run dev
```

---

## 🔒 Selected API Endpoints

A quick overview of key application-layer endpoints designed for scalability.

| HTTP Method | API Endpoint | Description | Middleware/Access |
| ----------- | ------------ | ----------- | ----------------- |
| `POST` | `/api/auth/login` | Authenticate user & dispense JWT | Public |
| `POST` | `/api/auth/register`| Register brand new customer account | Public |
| `GET`  | `/api/products` | Retrieve catalog entries | Public |
| `POST` | `/api/payment/createOrder` | Initialize Razorpay payment intent struct | `verifyToken` |
| `GET` | `/api/admin/orders`| Retrieve centralized tracking records | `verifyAdmin` |

---

## 📸 Platform Screenshots

*(Add your high-resolution PNGs here highlighting the elegant UI/UX design to immediately capture recruiter interest)*

- **Home Page / Infinite Scroll**
- **Dynamic Fast Checkout Flow**
- **Admin Command Center**
- **Authentication Gateway**

---

## 📈 Future Roadmap & Scalability Ideas

- [ ] **Webhooks Implementation:** For robust background verification of Razorpay asynchronous events.
- [ ] **Redis Caching:** Memory-based caching optimization for generic product query fetches.
- [ ] **Dockerization:** Containerizing the Node and React environments to ensure platform-agnostic setups.
- [ ] **Product Reviews System:** Enable community feedback to increase product-market fit.

---

<div align="center">
  <h3>🧑‍💻 Let's Connect!</h3>
  <p>Architected and Developed by <b>Amit</b></p>
  <p>A passionate Full Stack Engineer (MERN) obsessed with crafting scalable, business-centric web architectures.</p>

  <p>
    <a href="https://github.com/amit2003-cse">GitHub Profile</a> •
    <a href="https://www.linkedin.com/in/amit-kumar-1a0b3c2d3/">LinkedIn Profile</a> •
    <a href="mailto:amit4321sg@gmail.com">Email Me</a>
  </p>
  
  <p><i>If you found this integration helpful or are looking for a highly capable developer for your engineering team, feel free to reach out or drop a ⭐ on this repo!</i></p>
</div>
