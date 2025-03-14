import { Link, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center p-5">
      <h1 className="text-3xl font-bold text-red-600">Oops! Something went wrong.</h1>
      <p className="text-gray-700 mt-3">
        {error?.status === 404
          ? "The page you’re looking for doesn’t exist."
          : "An unexpected error has occurred."}
      </p>
      <p className="text-gray-500">{error?.statusText || error?.message}</p>

      <Link to="/" className="mt-5 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Go to Home
      </Link>
    </div>
  );
}

export default ErrorPage;