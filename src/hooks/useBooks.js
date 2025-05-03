import { useState, useEffect } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/';

const useBooks = (url = API_BASE_URL) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${url}/books/?limit=40`);
        if (!response.ok) throw new Error('Failed to fetch books');

        const data = await response.json();
        setBooks(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [url]);

  return { books, loading, error };
};

export default useBooks;
