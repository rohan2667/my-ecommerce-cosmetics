import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// Helper function to compare cart items
const isSameProduct = (a, b) =>
  a.id === b.id &&
  a.selectedColor?.name === b.selectedColor?.name &&
  a.selectedSize === b.selectedSize;

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => isSameProduct(item, product));
      if (existingIndex !== -1) {
        const updated = [...prev];
        const item = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        updated[existingIndex] = item;
        return updated;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const decrementFromCart = (product) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => isSameProduct(item, product));
      if (existingIndex === -1) return prev;

      const updated = [...prev];
      if (updated[existingIndex].quantity > 1) {
        const item = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity - 1,
        };
        updated[existingIndex] = item;
      } else {
        updated.splice(existingIndex, 1);
      }
      return updated;
    });
  };

  const removeFromCart = (product) => {
    setCart((prev) => prev.filter((item) => !isSameProduct(item, product)));
  };

  // Optional: Update quantity directly
  const updateQuantity = (product, quantity) => {
    if (quantity <= 0) {
      removeFromCart(product);
      return;
    }
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => isSameProduct(item, product));
      if (existingIndex === -1) return prev;

      const updated = [...prev];
      updated[existingIndex] = { ...updated[existingIndex], quantity };
      return updated;
    });
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, decrementFromCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
