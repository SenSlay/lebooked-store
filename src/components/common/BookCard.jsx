import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useModal } from '../../context/ModalContext';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function BookCard({ book, page }) {
  const { addToCart } = useCart();
  const { showModal } = useModal();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleAddToCart = (book) => {
    if (!isLoggedIn) {
      showModal('Please log in to add items to your cart');
      navigate('/login');
      return;
    }
    addToCart(book);
    showModal('Item added to your cart', (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-20  text-blue-700   required"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
          clipRule="evenodd"
        />
      </svg>
    ));
  };

  return (
    <Link to={`/books/${book.id}`}>
      <div
        className={`flex flex-col min-h-[450px] text-wrap p-4 bg-slate-100 hover:bg-gray-200 rounded
          ${page === 'books' ? 'min-w-[170px] lg:min-w-[200px]' : 'w-[200px] lg:w-[241px]'}`}
      >
        <img
          src={book.imageUrl === "/placeholder.jpg" ? "/images/placeholder.jpg" : book.imageUrl}
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
