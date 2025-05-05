import PropTypes from 'prop-types';
import { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { useModal } from './ModalContext';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const CartContext = createContext();

export const CartProvider = ({ children, userId, token }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
  const { showModal } = useModal();
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Load cart on mount
  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
      try {
        const res = await fetch(`${baseUrl}/cart`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
           },
        });
        if (!res.ok) throw new Error('Failed to fetch cart');
        const data = await res.json();
        setCart(data);
        console.log('Cart loaded:', data);
      } catch (err) {
        console.error('Error loading cart:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId, token, baseUrl]);

  // Add book to cart
  const addToCart = useCallback(
    async (book) => {
      try {
        console.log(token)
        // Add book to cart
        const res = await fetch(`${baseUrl}/cart/${book.id}`, {
          method: 'POST',
          headers: { 
            'Authorization': `Bearer ${token}`,
           },
        });

        console.log('Response:', res);
        if (!res.ok) throw new Error('Failed to update cart');
        
        // Fetch updated cart
        const cartRes = await fetch(`${baseUrl}/cart`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
           },
        });
        if (!cartRes.ok) throw new Error('Failed to fetch cart');

        const updatedCart = await cartRes.json();

        setCart(updatedCart);
      } catch (err) {
        console.error('Error updating cart:', err.message);
      }
    },
    [token, baseUrl],
  );

  const updateCartItemQuantity = useCallback(
    async (bookId, quantity) => {
      try {
        console.log('test')
        const res = await fetch(`${baseUrl}/cart/${bookId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity }),
        });

        if (res.status === 401) {
          showModal('Session expired. Please log in again.');
          logout();
          navigate('/login');
          return;
        }

        if (!res.ok) throw new Error('Failed to update item quantity');

        const cartRes = await fetch(`${baseUrl}/cart`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
           },
        });
        const updatedCart = await cartRes.json();
        setCart(updatedCart);
      } catch (err) {
        console.error('Error updating item quantity:', err.message);
      }
    },
    [token, baseUrl, showModal, logout, navigate]
  );

  const incrementCartItem = useCallback(
    async (bookId) => {
      try {
        const res = await fetch(`${baseUrl}/cart/${bookId}/increment`, {
          method: 'PATCH',
          headers: { 
            'Authorization': `Bearer ${token}`,
           },
        });

        if (res.status === 401) {
          showModal('Session expired. Please log in again.');
          logout();
          navigate('/login');
          return;
        }

        if (!res.ok) throw new Error('Failed to increment item');

        const cartRes = await fetch(`${baseUrl}/cart`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
           },
        });
        const updatedCart = await cartRes.json();
        setCart(updatedCart);
      } catch (err) {
        console.error('Error incrementing item:', err.message);
      }
    },
    [token, baseUrl, showModal, logout, navigate]
  );

  const decrementCartItem = useCallback(
    async (bookId) => {
      try {
        const res = await fetch(`${baseUrl}/cart/${bookId}/decrement`, {
          method: 'PATCH',
          headers: { 
            'Authorization': `Bearer ${token}`,
           },
        });

        if (res.status === 401) {
          showModal('Session expired. Please log in again.');
          logout();
          navigate('/login');
          return;
        }

        if (!res.ok) throw new Error('Failed to decrement item');

        const cartRes = await fetch(`${baseUrl}/cart`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
           },
        });
        const updatedCart = await cartRes.json();
        setCart(updatedCart);
      } catch (err) {
        console.error('Error decrementing item:', err.message);
      }
    },
    [token, baseUrl, showModal, logout, navigate]
  );

  const removeFromCart = useCallback(
    async (itemId) => {
      try {
        const res = await fetch(`${baseUrl}/cart/${itemId}`, {
          method: 'DELETE',
          headers: { 
            'Authorization': `Bearer ${token}`,
           },
        });

        if (res.status === 401) {
          showModal('Session expired. Please log in again.');
          logout();
          navigate('/login');
          return;
        }

        if (!res.ok) throw new Error('Failed to remove item');

        const cartRes = await fetch(`${baseUrl}/cart`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
           },
        });
        const updatedCart = await cartRes.json();
        setCart(updatedCart);
      } catch (err) {
        console.error('Error removing from cart:', err.message);
      }
    },
    [token, baseUrl, showModal, logout, navigate]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateCartItemQuantity,
        incrementCartItem,
        decrementCartItem,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
