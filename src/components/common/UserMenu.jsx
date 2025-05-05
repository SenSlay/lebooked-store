import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const UserMenu = ({ username }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="relative group">
      {/* Trigger */}
      <div className="flex gap-2 items-center cursor-pointer hover:underline underline-offset-8">
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
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        <span className="hidden lg:inline">{username}</span>
      </div>

      {/* Dropdown */}
      <div className="absolute right-0 w-40 bg-white border border-gray-200 rounded shadow-lg z-10 hidden group-hover:block">
        <button
          onClick={() => {
            logout(); 
            navigate('/');
          }}
          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;