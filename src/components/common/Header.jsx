import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';
import SearchSidebar from './SearchSidebar';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import UserMenu from './UserMenu';

function Header() {
  const { cart } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const isBooksPage = location.pathname === '/books';
  const { isLoggedIn, user } = useAuth();

  return (
    <>
      <header className="flex justify-center px-2">
        <div className="flex-1 flex items-center max-w-7xl py-3 px-2 lg:px-0">
          <Link
            to="/"
            className="text-4xl font-bold text-blue-600 hidden lg:inline mr-10"
          >
            LeBooked
          </Link>
          <nav>
            <u className="flex list-none no-underline gap-5">
              <li>
                <Link
                  to="/"
                  className="text-xl hover:underline underline-offset-8"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/books"
                  className="text-xl hover:underline underline-offset-8"
                >
                  Books
                </Link>
              </li>
            </u>
          </nav>
          <div className="flex gap-5 ml-auto text-lg">
            {!isBooksPage && (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex gap-2 hover:underline underline-offset-8"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 hover:scale-110 lg:hover:scale-100"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                <span className="hidden lg:inline">Search</span>
              </button>
            )}
            {isLoggedIn ? <UserMenu username={user.username}/> : (
              <>
                <Link
                to='/signup'
                className="flex gap-2 hover:underline underline-offset-8"
                >
                  <span>Signup</span>
                </Link>
                <Link
                to="/login"
                className="flex gap-2 hover:underline underline-offset-8"
                >
                  <span>Login</span>
                </Link>
              </>
            )}
            <Link
              to="/cart"
              className="flex gap-2 hover:underline underline-offset-8"
            >
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 hover:scale-110 lg:hover:scale-100"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                {cart.length > 0 && (
                  <span
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1.5 py-0.5"
                    data-testid="cart-count"
                  >
                    {cart.length}
                  </span>
                )}
              </div>

              <span className="hidden lg:inline">Cart</span>
            </Link>
          </div>
        </div>
      </header>
      <SearchSidebar
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}

export default Header;
