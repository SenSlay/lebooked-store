import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  
  const addToCart = (book) => {
    setCart((prevCart) => {
      console.log('test')
      const newCart = { ...prevCart };
      if (newCart[book.id]) {
        newCart[book.id].quantity += 1; // Increase quantity if book exists
      } else {
        newCart[book.id] = { ...book, quantity: 1 }; // Add new book
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