import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import QuantitySelector from '../common/QuantitySelector';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CartItem = ({ book }) => {
  const { updateCartItemQuantity, removeFromCart, incrementCartItem, decrementCartItem } = useCart();
  const [quantity, setQuantity] = useState(book.quantity);
  const [bookPrice, setBookPrice] = useState(book.price * book.quantity); 

  useEffect(() => {
    if (quantity > 0) {
      setBookPrice(book.price * quantity); 
    }
  }, [quantity, book.price]);

  return (
    <li
      key={book.id}
      className="grid sm:grid-cols-[1fr_0.5fr_1fr_0.5fr_90px] lg:grid-cols-[2fr_0.5fr_1fr_0.5fr_90px] grid-cols-[1fr_auto] gap-4 py-4 border-b items-center"
    >
      <div className="flex items-start lg:items-center gap-3 flex-col lg:flex-row">
        <Link to={`/books/${book.bookId}`}>
          <img
            src={book.imageUrl}
            alt={book.title}
            className="object-cover h-40 lg:h-52 cursor-pointer hover:scale-105"
          />
        </Link>
        <h2 className="text-lg font-semibold">{book.title}</h2>
      </div>

      <p className="font-medium hidden sm:block">${book.price}</p>

      <div className="flex flex-col items-center sm:items-start">
        <p className="font-medium mb-5 sm:hidden">${book.price}</p>
        <QuantitySelector 
          quantity={quantity} 
          setQuantity={setQuantity}
          onIncrement={() => incrementCartItem(book.bookId)}
          onDecrement={() => decrementCartItem(book.bookId)}
          onInputChange={(newQty) => updateCartItemQuantity(book.bookId, newQty)}
          setBookPrice={setBookPrice}
        />
        <p className="font-medium my-5 sm:hidden">
          ${(book.price * quantity).toFixed(2)}
        </p>
        <button
          onClick={() => removeFromCart(book.id)}
          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded sm:hidden"
        >
          Remove
        </button>
      </div>

      <p className="font-medium hidden sm:block">
        ${bookPrice.toFixed(2)}
      </p>

      <button
        onClick={() => window.confirm(`Are you sure you want to remove ${book.title} from your cart?`) && removeFromCart(book.id)}
        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded hidden sm:block"
      >
        Remove
      </button>
    </li>
  );
};

CartItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // String or number ID
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired, // Ensures an image URL is passed
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
