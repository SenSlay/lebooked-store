import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  const addToCart = (book) => {
    setCart((prevCart) => [...prevCart, book]);
  };
  
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((book) => book.id !== id));
  };
  
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);