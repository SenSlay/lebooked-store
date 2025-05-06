import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { useModal } from '../context/ModalContext';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { showModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Frontend validation
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }
  
    if (username.length < 3 || username.length > 100) {
      setError('Username must be at least 3 characters');
      return;
    }
  
    if (password.length < 6 || password.length > 50) {
      setError('Password must be at least 6 characters');
      return;
    }
  
    // Signup and handle errors
    try {
      await signup(username, password, showModal, navigate);
      showModal('Signup successful!');
      navigate('/');
    } catch (err) {
      if (err.message.includes('400') || err.message.includes('exists')) {
        setError('That username already exists. Please choose another one.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold mb-4 text-center">Signup</h1>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className={error ? "mb-4" : "mb-10"}>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Sign up
        </button>

        <p className="text-center text-gray-500 text-sm mt-4">
          Already have an account?
          <Link to="/login" className="text-blue-500 hover:text-blue-700 ml-1">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;