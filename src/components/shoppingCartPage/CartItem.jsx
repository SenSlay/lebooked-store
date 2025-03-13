import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import QuantitySelector from "../common/QuantitySelector";

const CartItem = ({ book }) => {
  const { updateCartQuantity, removeFromCart } = useCart();
  const [quantity, setQuantity] = useState(book.quantity); 

  // Sync cart whenever quantity changes
  useEffect(() => {
    updateCartQuantity(book, quantity); // Update global cart state
  }, [quantity, updateCartQuantity, book]); 

  return (
    <li key={book.id} className="grid sm:grid-cols-[1fr_0.5fr_1fr_0.5fr_90px] lg:grid-cols-[2fr_0.5fr_1fr_0.5fr_90px] grid-cols-[1fr_auto] gap-4 py-4 border-b items-center">
      <div className="flex items-start lg:items-center gap-3 flex-col lg:flex-row">
        <img src={book.image} alt={book.title} className="object-cover h-40 lg:h-52" />
        <h2 className="text-lg font-semibold">{book.title}</h2>
      </div>

      <p className="font-medium hidden sm:block">${book.price}</p>

      <div className="flex flex-col items-center sm:items-start">
        <p className="font-medium mb-5 sm:hidden">${book.price}</p>
        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
        <p className="font-medium my-5 sm:hidden">${(book.price * quantity).toFixed(2)}</p>
        <button 
          onClick={() => removeFromCart(book.id)} 
          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded sm:hidden"
        >
          Remove
        </button>
      </div>

      <p className="font-medium hidden sm:block">${(book.price * quantity).toFixed(2)}</p>

      <button 
        onClick={() => removeFromCart(book.id)} 
        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded hidden sm:block"
      >
        Remove
      </button>
    </li>
  );
};

export default CartItem;