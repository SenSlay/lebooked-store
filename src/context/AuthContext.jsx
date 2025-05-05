// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext({ user: null });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
          logout();
        } else {
          setToken(storedToken);
          setUser(storedUser ? JSON.parse(storedUser) : null);
        }
      } catch (err) {
        console.error('Invalid token:', err);
        logout();
      }
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const signup = async (username, password, showModal, navigate) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (res.status === 401) {
        showModal?.('Session expired. Please log in again.');
        logout();
        navigate?.('/login');
        return;
      }
  
      if (!res.ok) {
        const errorData = await res.json();
        showModal?.(errorData?.error || 'Signup failed.');
        return;
      }
  
      const data = await res.json();
      login(data.user, data.token);
      showModal?.('Signup successful!');
      navigate?.('/');
    } catch (err) {
      console.error('Signup error:', err.message);
      showModal?.('An unexpected error occurred.');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn: !!user && !!token, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext) || { user: null };