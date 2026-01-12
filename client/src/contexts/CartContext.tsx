import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface Food {
  _id: string;
  name: string;
  type: string;
  price: number;
  weight: string;
  image: string;
  description: string;
  isAvailable: boolean;
  rating: number;
}

interface CartItem {
  foodId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (food: Food) => Promise<void>;
  removeFromCart: (foodId: string) => Promise<void>;
  updateQuantity: (foodId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalPrice: number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { token, logout } = useAuth();

  const fetchCart = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setCart(data.items || []);
      else if (res.status === 401) logout();
      else console.error("Fetch cart error:", data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const addToCart = async (food: Food) => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          foodId: food._id,
          name: food.name,
          price: food.price,
          quantity: 1,
          image: food.image,
        }),
      });
      const data = await res.json();
      if (res.ok) setCart(data.items || []);
      else if (res.status === 401) logout();
      else console.error("Add to cart error:", data);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (foodId: string) => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart/remove/${foodId}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      if (res.ok) setCart(data.items || []);
      else if (res.status === 401) logout();
      else console.error("Remove cart error:", data);
    } catch (err) {
      console.error("Failed to remove from cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (foodId: string, quantity: number) => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart/update`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ foodId, quantity }),
        }
      );
      const data = await res.json();
      if (res.ok) setCart(data.items || []);
      else if (res.status === 401) logout();
      else console.error("Update cart error:", data);
    } catch (err) {
      console.error("Failed to update cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!token) return;
    setLoading(true);
    setCart([]); // Clear local state immediately
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart/clear`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) logout();
        else console.error("Clear cart error:", data);
        // Optionally refetch cart if clear failed
        fetchCart();
      }
    } catch (err) {
      console.error("Failed to clear cart:", err);
      // Optionally refetch cart if clear failed
      fetchCart();
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
