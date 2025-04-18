import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useModal } from '../../context/ModalContext';
import PropTypes from 'prop-types';

function BookCard({ book, page }) {
  const { updateCartQuantity } = useCart();
  const { showModal } = useModal();

  const handleAddToCart = (book) => {
    updateCartQuantity(book, 1, true);
    showModal('Item added to your cart');
  };

  return (
    <Link to={`/books/${book.id}`}>
      <div
        className={`flex flex-col min-h-[450px] text-wrap p-4 bg-slate-100 hover:bg-gray-200 rounded
          ${page === 'books' ? 'min-w-[170px] lg:min-w-[200px]' : 'w-[200px] lg:w-[241px]'}`}
      >
        <img
          src={book.image}
          alt="Book"
          className="bg-white w-[170px] h-[250px] self-center mb-2"
        />
        <h2 className="text-lg font-semibold">{book.title}</h2>
        <h3 className="mb-auto text-gray-700">{book.author}</h3>

        <p className="text-xl font-semibold mb-1">${book.price}</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleAddToCart(book);
          }}
          className="border-2 border-solid border-blue-600 uppercase text-blue-600 text-lg font-semibold hover:bg-blue-600 hover:text-white p-0.5"
        >
          ADD TO CART
        </button>
      </div>
    </Link>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // String or number ID
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired, // Ensures an image URL is passed
    price: PropTypes.number.isRequired,
  }).isRequired,
  page: PropTypes.string,
};

export default BookCard;
