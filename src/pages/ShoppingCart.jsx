import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/shoppingCartPage/CartItem";
import { useMemo } from "react";

function ShoppingCart() {
  const { cart } = useCart()
  const cartItems = Object.values(cart);

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, book) => acc + book.price * book.quantity, 0);
  }, [cartItems]);

  return (
    <div className="flex-1 flex justify-center">
      <div className="flex-1 flex flex-col max-w-7xl py-12 px-3 xl:px-0">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-semibold">Your Shopping Cart</h1>
          <a href="#order-summary" className="font-medium underline">Check Order Summary</a>
        </div>
        <div className="flex justify-between gap-10 flex-col lg:flex-row">
          <div className="w-[90%]">
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_100px] gap-4 border-b pb-2 font-semibold">
              <h2>Item</h2>
              <h2>Price</h2>
              <h2>Quantity</h2>
              <h2>Total</h2>
            </div>

            {/* Cart Items */}
            <ul>
              {cartItems.length > 0 ? (
                cartItems.map((book) => (
                  <CartItem key={book.id} book={book}></CartItem>
                ))
              ) : (
                <p className="text-center mt-4">Your cart is empty.</p>
              )}
            </ul>
          </div>

          <div className="flex flex-col self-center lg:self-start max-w-96 h-fit p-7 border-[1px] border-black" id="order-summary">
            <h1 className="text-2xl font-semibold mb-5">Order Summary</h1>
            <div className="flex justify-between ">
              <div className="mb-5">
                <p className="font-semibold text-xl">
                  Subtotal 
                </p>
                <p className="text-sm">({cartItems.length} {cartItems.length === 1 ? "Item" : "Items"})</p>
              </div>
              <strong className="text-2xl">${subtotal.toFixed(2)}</strong>
            </div>
            <p className="italic text-sm mb-3">Shipping and taxes computed at checkout</p>
            <button className="bg-blue-600 text-white p-2 rounded mb-5">Checkout</button>
            <Link to="/books" className="underline text-right">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCart;