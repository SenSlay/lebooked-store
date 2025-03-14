import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/shoppingCartPage/CartItem";
import { useEffect, useMemo, useRef, useState } from "react";

function ShoppingCart() {
  const { cart } = useCart();
  const [isOrderSummaryVisible, setIsOrderSummaryVisible] = useState(true);
  const orderSummaryRef = useRef(null);

  useEffect(() => {
    const orderSummaryElement = orderSummaryRef.current; 
  
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOrderSummaryVisible(entry.isIntersecting);
      },
      {
        root: null, // Use the viewport as the root
        threshold: 0.1, // Lowered threshold for testing
      }
    );
  
    if (orderSummaryElement) {
      observer.observe(orderSummaryElement);
    }
  
    // Cleanup the observer on unmount
    return () => {
      if (orderSummaryElement) {
        observer.unobserve(orderSummaryElement);
      }
    };
  }, []);
  
  const subtotal = useMemo(() => {
    return cart.reduce((acc, book) => acc + book.price * book.quantity, 0);
  }, [cart]);

  return (
    <div className="flex-1 flex justify-center">
      <div className="flex-1 flex flex-col max-w-7xl py-6 lg:py-12 px-3 xl:px-0">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Your Shopping Cart</h1>
          {!isOrderSummaryVisible && (
            <a href="#order-summary" className="font-medium underline text-end">
              Go to Order Summary
            </a>
          )}
        </div>
        <div className="flex justify-between gap-10 flex-col lg:flex-row">
          <div className="w-full lg:w-[80%]">
            <div className="hidden sm:grid grid-cols-[1fr_0.5fr_1fr_0.5fr_90px] lg:grid-cols-[2fr_0.5fr_1fr_0.5fr_90px] gap-4 border-b pb-2 font-semibold [&>h2]:uppercase">
              <h2>Item</h2>
              <h2>Price</h2>
              <h2>Quantity</h2>
              <h2>Total</h2>
            </div>

            {/* Cart Items */}
            <ul className="flex flex-col gap-3">
              {cart.length > 0 ? (
                cart.map((book) => <CartItem key={book.id} book={book} />)
              ) : (
                <p className="text-center mt-4">Your cart is empty.</p>
              )}
            </ul>
          </div>

          <div className="flex flex-col self-center lg:self-start max-w-96 h-fit p-7 border-[1px] border-black" id="order-summary" ref={orderSummaryRef}>
            <h1 className="text-2xl font-semibold mb-5">Order Summary</h1>
            <div className="flex justify-between ">
              <div className="mb-5">
                <p className="font-semibold text-xl">
                  Subtotal 
                </p>
                <p className="text-sm">({cart.length} {cart.length === 1 ? "Item" : "Items"})</p>
              </div>
              <strong className="text-2xl">${subtotal.toFixed(2)}</strong>
            </div>
            <p className="italic text-sm mb-3">Shipping and taxes computed at checkout</p>
            <button className="bg-blue-600 text-white p-2 rounded mb-5 hover:bg-blue-700">Checkout</button>
            <Link to="/books" className="underline text-right">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCart;