import { useParams } from 'react-router-dom';
import { useState } from 'react';
import QuantitySelector from '../components/common/QuantitySelector';
import { useCart } from '../context/CartContext';
import { useModal } from '../context/ModalContext';
import { useNavigate } from 'react-router-dom';
import { useBooksContext } from '../context/BooksContext';

const BookDetails = () => {
  const { id } = useParams();
  const { books } = useBooksContext();
  const [quantity, setQuantity] = useState(1);
  const { updateCartQuantity, cart } = useCart();
  const { showModal } = useModal();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const book = books.find((b) => b.id.toString() === id);

  const handleAddToCart = () => {
    if (quantity === 0) {
      setError('Quantity must be at least 1.');
      return;
    }
    setError(null);
    updateCartQuantity(book, quantity, true);
    showModal(`Book added to your cart`);
  };

  const handleBuyNow = () => {
    if (quantity === 0) {
      setError('Quantity must be at least 1.');
      return;
    }
    setError(null);

    const existingCartItem = cart.find((item) => item.id === book.id);

    if (!existingCartItem) {
      // Add to cart only if not already present
      updateCartQuantity(book, quantity, true);
    }

    // Redirect to Shopping Cart page
    navigate('/cart');
  };

  if (!book) {
    return <p className="text-center text-red-500">Book not found!</p>;
  }

  return (
    <div className="flex p-2 justify-center box-content">
      <div className="flex-1 flex flex-col lg:flex-row justify-center items-center max-w-7xl lg:gap-20 p-5 lg:p-12">
        <div>
          <img
            src={book.imageUrl}
            alt={book.title}
            className="h-80 lg:h-96 object-cover"
          />
        </div>
        <div className="flex flex-col justify-center items-center text-center lg:justify-start lg:text-start lg:items-start">
          <h1 className="text-3xl font-bold ">{book.title}</h1>
          <p className="text-gray-600 text-lg">By {book.author}</p>
          <p className="mt-4 mb-10 lg:mb-20">{book.description}</p>
          <p className="mt-2 mb-2 text-xl font-semibold">${book.price}</p>

          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          {error && (
            <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>
          )}
          <div className="flex flex-col lg:flex-row gap-5 mt-5">
            <button
              onClick={handleAddToCart}
              className="flex gap-3 justify-center items-center py-2 w-[220px] font-medium rounded border-2 border-blue-600 bg-blue-50 text-black hover:bg-blue-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              Add To Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="py-2 w-[220px] text-center flex items-center justify-center font-medium rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
