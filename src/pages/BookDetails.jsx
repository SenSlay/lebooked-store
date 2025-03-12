import { useParams } from "react-router-dom";
import { useContext } from "react";
import { BooksContext } from "../context/BooksContext";

const BookDetails = () => {
  const { id } = useParams();
  const { books } = useContext(BooksContext);

  const book = books.find((b) => b.id.toString() === id);

  if (!book) {
    return <p className="text-center text-red-500">Book not found!</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img src={book.image} alt={book.title} className="w-64 h-80 object-cover mx-auto" />
      <h1 className="text-3xl font-bold mt-4">{book.title}</h1>
      <p className="text-gray-600 text-lg">{book.author}</p>
      <p className="mt-4">{book.description}</p>
      <p className="mt-2 text-xl font-semibold">Price: ${book.price}</p>
    </div>
  );
};

export default BookDetails;