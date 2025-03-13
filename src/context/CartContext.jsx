import { createContext, useState, useContext, useCallback } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  
  // Updates quantity (increases or decreases)
  const updateCartQuantity = useCallback((book, newQuantity, isAdding = false) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
  
      if (newCart[book.id]) {
        newCart[book.id].quantity = isAdding
          ? newCart[book.id].quantity + newQuantity
          : Math.max(1, newQuantity);
      } else {
        newCart[book.id] = { ...book, quantity: newQuantity };
      }
  
      return { ...newCart };
    });
  }, [setCart]);

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[id];
      return newCart;
    });
  };
  
  return (
    <CartContext.Provider value={{ cart, updateCartQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);