import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  
  const addToCart = (book, quantity = 1) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[book.id]) {
        newCart[book.id].quantity += quantity; // Add the specified quantity
      } else {
        newCart[book.id] = { ...book, quantity }; // Add new book with given quantity
      }
      return newCart;
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[id].quantity > 1) {
        newCart[id].quantity -= 1; // Decrease quantity if more than 1
      } else {
        delete newCart[id]; // Remove book if quantity reaches 0
      }
      return newCart;
    });
  };
  
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);