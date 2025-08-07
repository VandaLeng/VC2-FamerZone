import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart items from localStorage on mount
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // Save cart items to localStorage whenever cartItems changes
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    console.log("Adding to cart in context:", product);
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      newQuantity === 0
        ? prevItems.filter((item) => item.id !== id)
        : prevItems.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeItem }}>
      {console.log("CartProvider rendering with items:", cartItems)}
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);