import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 bg-gray-100">
      <form className="p-6 rounded-lg shadow-md w-96 bg-white border-2">
      <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-10">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Log in
        </button>
        <p className="text-center text-gray-500 text-sm mt-4">
          Don't have an account?
          <Link to="/signup" className="text-blue-500 hover:text-blue-700 ml-1">
            Sign up 
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;