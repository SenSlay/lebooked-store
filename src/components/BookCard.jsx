import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useModal } from "../context/ModalContext";

function BookCard({ book }) {
  const { addToCart } = useCart();
  const { showModal } = useModal();

  const handleAddToCart = (book) => {
    addToCart(book);
    showModal("Item added to your cart"); 
  };

  return (
    <Link to={`/books/${book.id}`}>
        <div className="flex flex-col w-[200px] lg:w-[250px] min-h-[450px] text-wrap p-4 bg-slate-200 rounded">
            <img src={book.image} alt="" className="bg-white w-[180px] h-[250px] px-2 self-center mb-2"/>
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <h3 className="mb-auto text-gray-700">{book.author}</h3>
            
            <p className="text-xl font-semibold mb-1">${book.price}</p>
          <button onClick={(e) => {e.preventDefault(); handleAddToCart(book);}} className="border-2 border-solid border-blue-600 uppercase text-blue-600 text-lg font-semibold hover:bg-blue-600 hover:text-white p-0.5">ADD TO CART</button>
        </div>
    </Link>
  )
}

export default BookCard;