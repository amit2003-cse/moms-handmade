import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

async function runTests() {
  console.log("🚀 Starting API Tests...");
  let token = "";
  let userId = "";

  try {
    // 1. REGISTER USER
    console.log("Testing Registration...");
    const email = `testuser_${Date.now()}@example.com`;
    const resReg = await api.post('/auth/register', { name: "Test User", email, password: "password123" });
    token = resReg.data.token;
    userId = resReg.data._id;
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log("✅ Registration passed");

    // 2. CREATE A PRODUCT (Need Admin) - Skipping exact creation, we'll fetch existing first
    let product;
    const resProd = await api.get('/products');
    if (resProd.data.length > 0) {
      product = resProd.data[0];
      console.log(`Using product: ${product.name}`);
    } else {
      console.log("No products found, test might fail on cart/wishlist.");
    }

    if (product) {
      // 3. TEST WISHLIST ADD/REMOVE
      console.log("Testing Wishlist Toggle...");
      await api.post('/wishlist/toggle', { productId: product._id });
      let wlRes = await api.get('/wishlist');
      if (wlRes.data.products?.some(p => p._id === product._id) || wlRes.data.some?.(p => p._id === product._id)) {
        console.log("✅ Wishlist Add passed");
      } else {
        console.error("❌ Wishlist Add failed");
      }

      await api.post('/wishlist/toggle', { productId: product._id });
      wlRes = await api.get('/wishlist');
      if (!wlRes.data.products?.some(p => p._id === product._id) && !wlRes.data.some?.(p => p._id === product._id)) {
        console.log("✅ Wishlist Remove passed");
      } else {
        console.error("❌ Wishlist Remove failed");
      }

      // 4. TEST CART MERGE (Force Cart Add)
      console.log("Testing Cart API...");
      await api.post('/cart/add', { productId: product._id, weight: '250g', quantity: 2 });
      let cartRes = await api.get('/cart');
      if (cartRes.data.items?.length > 0) {
        console.log("✅ Cart Add passed");
      }

      // 5. TRY CREATING PAYMENT ORDER (SUCCESS CASE)
      console.log("Testing Payment Flow (Create Order)...");
      try {
        const payRes = await api.post('/payment/create-order');
        if (payRes.data.razorpayOrder) {
           console.log("✅ Payment Create Order passed");
        }
      } catch (err) {
        console.error("❌ Payment Create Order Failed:", err.response?.data || err.message);
      }
    }

    // 6. TEST ERROR HANDLING (FORCE API FAILURE)
    console.log("Testing API Failure Handling...");
    try {
      await api.post('/auth/login', { email: "wrong@example.com", password: "wrong" });
      console.error("❌ API Failure Handling failed (didn't reject)");
    } catch (err) {
      if (err.response?.status === 401) {
        console.log("✅ API Error appropriately rejected (401)");
      }
    }

    console.log("🎉 All Tests Completed!");

  } catch (error) {
    console.error("❌ Fatal Error during tests:", error.response?.data || error.message);
  }
}

runTests();
