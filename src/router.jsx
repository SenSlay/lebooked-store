import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Books from './pages/Books';
import ShoppingCart from './pages/ShoppingCart';
import ErrorPage from './pages/ErrorPage';
import BookDetails from './pages/BookDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PublicRoute from './components/router/PublicRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/books', element: <Books /> },
      { path: '/cart', element: <ShoppingCart /> },
      { path: '/books/:id', element: <BookDetails /> },
      { path: '/login', element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
        ),
      },
      { path: '/signup', element: (
        <PublicRoute>
          <Signup />
        </PublicRoute>
        ),
      }
    ],
  },
]);

export default router;
