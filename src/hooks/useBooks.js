import { useState, useEffect } from 'react';
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

const fetchBookImage = async (title, author) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}+inauthor:${encodeURIComponent(author)}&key=${API_KEY}`,
    );
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return '/placeholder.jpg'; // Default placeholder if no image found
    }

    const matchedBook =
      data.items.find(
        (item) =>
          item.volumeInfo.title.toLowerCase().includes(title.toLowerCase()) &&
          (author
            ? item.volumeInfo.authors?.some((a) =>
                a.toLowerCase().includes(author.toLowerCase()),
              )
            : true),
      ) || data.items[0];

    return matchedBook.volumeInfo.imageLinks?.thumbnail || '/placeholder.jpg';
  } catch (error) {
    console.error('Error fetching book image:', error);
    return '/placeholder.jpg';
  }
};

const useBooks = (url = '/db.json') => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch books');

        const data = await response.json();

        // Fetch images for each book
        const booksWithImages = await Promise.all(
          data.books.map(async (book) => {
            const image = await fetchBookImage(book.title, book.author);
            return { ...book, image };
          }),
        );

        setBooks(booksWithImages);
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
