import PropTypes from 'prop-types';
import { createContext, useState, useContext, useCallback } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const updateCartQuantity = useCallback(
    (book, newQuantity, isAdding = false) => {
      setCart((prevCart) => {
        const existingIndex = prevCart.findIndex((item) => item.id === book.id);

        if (existingIndex !== -1) {
          // Update existing item's quantity
          const newCart = [...prevCart];
          newCart[existingIndex].quantity = isAdding
            ? newCart[existingIndex].quantity + newQuantity
            : Math.max(1, newQuantity);
          return newCart;
        } else {
          // Add new book at the beginning (newest item on top)
          return [{ ...book, quantity: newQuantity }, ...prevCart];
        }
      });
    },
    [],
  );

  const removeFromCart = useCallback((bookId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== bookId));
  }, []);

  return (
    <CartContext.Provider value={{ cart, updateCartQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
