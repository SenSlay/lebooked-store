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
    <li key={book.id} className="grid grid-cols-[2fr_1fr_1fr_1fr_90px] gap-4 py-2 border-b items-center">
      <div className="flex items-start lg:items-center gap-3 flex-col lg:flex-row">
        <img src={book.image} alt={book.title} className="object-cover h-40" />
        <h2 className="text-lg font-semibold">{book.title}</h2>
      </div>

      <p className="font-bold">${book.price}</p>

      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

      <p className="font-bold">${(book.price * quantity).toFixed(2)}</p>

      <button 
        onClick={() => removeFromCart(book.id)} 
        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
      >
        Remove
      </button>
    </li>
  );
};

export default CartItem;