import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function Header() {
  const { cart } = useCart();
  
  return (
    <header className="flex justify-center px-2">
      <div className="flex-1 flex items-center max-w-7xl py-3 px-2 lg:px-0">
        <Link to='/' className="text-4xl font-bold text-blue-600 hidden lg:inline mr-10">LeBooked</Link>
        <nav>
          <u className="flex list-none no-underline gap-5">
            <li>
              <Link to="/" className="text-xl hover:underline underline-offset-8">Home</Link>
            </li>
            <li>
              <Link to="/books" className="text-xl hover:underline underline-offset-8">Books</Link>
            </li>
          </u>
        </nav>
        <div className="flex gap-5 ml-auto text-lg">
          <button onClick={e => e.preventDefault()} className="flex gap-2 hover:underline underline-offset-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:scale-110 lg:hover:scale-100">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <span className="hidden lg:inline">Search</span>
          </button>
          <a href="javascript:void(0)" className="flex gap-2 hover:underline underline-offset-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:scale-110 lg:hover:scale-100">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <span className="hidden lg:inline">Account</span>
          </a>
          <Link to="/cart" className="flex gap-2 hover:underline underline-offset-8">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 hover:scale-110 lg:hover:scale-100">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1.5 py-0.5">
                  {cart.length}
                </span>
              )}
            </div>

            <span className="hidden lg:inline">Cart</span>

          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header;