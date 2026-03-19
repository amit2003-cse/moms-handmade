/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import api from "../services/api";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  /* ===============================
     🔁 FETCH CART (BACKEND = TRUTH)
  =============================== */
  const fetchCartFromBackend = async () => {
    try {
      const { data } = await api.get("/cart");

      const normalizedCart = (data.items || []).map((item) => ({
        productId: item.product._id,
        name: item.product.name,
        imageUrl: item.product.imageUrl,
        weight: item.weight,
        quantity: item.quantity,
        price: item.price,
      }));

      setCart(normalizedCart);
    } catch (error) {
      console.error("Fetch cart error:", error);
    }
  };

  // (Moved useEffect down below mergeGuestCart)

  /* ===============================
     👤 GUEST CART HELPER
  =============================== */
  const updateGuestCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("guestCart", JSON.stringify(newCart));
  };
  
  /* ===============================
     🔄 MERGE GUEST CART ON LOGIN
  =============================== */
  const mergeGuestCart = async () => {
    const localCart = JSON.parse(localStorage.getItem("guestCart")) || [];
    if (localCart.length > 0) {
      try {
        for (const item of localCart) {
          await api.post("/cart/add", {
            productId: item.productId,
            weight: item.weight,
            quantity: item.quantity,
          });
        }
        localStorage.removeItem("guestCart");
        await fetchCartFromBackend();
      } catch (error) {
        console.error("Failed to merge guest cart", error);
      }
    } else {
      await fetchCartFromBackend();
    }
  };

  /* ===============================
     🟡 INITIAL LOAD (LOGIN / LOGOUT)
  =============================== */
  useEffect(() => {
    if (user) {
      mergeGuestCart();
    } else {
      const localCart =
        JSON.parse(localStorage.getItem("guestCart")) || [];
      setCart(localCart);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  /* ===============================
     ➕ ADD / INCREASE QUANTITY
  =============================== */
  const addToCart = async (product, weight) => {
    if (user) {
      try {
        await api.post("/cart/add", {
          productId: product._id,
          weight,
          quantity: 1,
        });

        await fetchCartFromBackend();
        toast.success("Added to cart 🛒");
      } catch (error) {
        console.error(error);
        toast.error("Failed to add item");
      }
    } else {
      // Guest logic
      const existingIndex = cart.findIndex(
        (item) =>
          item.productId === product._id && item.weight === weight
      );

      let newCart = [...cart];

      if (existingIndex !== -1) {
        newCart[existingIndex].quantity += 1;
      } else {
        newCart.push({
          productId: product._id,
          name: product.name,
          imageUrl: product.imageUrl,
          weight,
          quantity: 1,
          price: product.pricePerWeight[weight],
        });
      }

      updateGuestCart(newCart);
      toast.success("Added to cart 🛒");
    }
  };

  /* ===============================
     ➖ DECREASE QUANTITY
  =============================== */
  const decreaseQuantity = async (productId, weight) => {
    const item = cart.find(
      (i) => i.productId === productId && i.weight === weight
    );

    if (!item) return;

    if (item.quantity === 1) {
      removeFromCart(productId, weight);
      return;
    }

    if (user) {
      try {
        await api.post("/cart/add", {
          productId,
          weight,
          quantity: -1,
        });

        await fetchCartFromBackend();
      } catch (error) {
        console.error(error);
        toast.error("Failed to update quantity");
      }
    } else {
      const newCart = cart.map((i) =>
        i.productId === productId && i.weight === weight
          ? { ...i, quantity: i.quantity - 1 }
          : i
      );
      updateGuestCart(newCart);
    }
  };

  /* ===============================
     🗑️ REMOVE ITEM
  =============================== */
  const removeFromCart = async (productId, weight) => {
    if (user) {
      try {
        await api.post("/cart/remove", { productId, weight });
        await fetchCartFromBackend();
        toast.success("Removed from cart");
      } catch (error) {
        console.error(error);
        toast.error("Failed to remove item");
      }
    } else {
      const newCart = cart.filter(
        (item) =>
          !(item.productId === productId && item.weight === weight)
      );
      updateGuestCart(newCart);
      toast.success("Removed from cart");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        mergeGuestCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
