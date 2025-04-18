import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Books from './pages/Books';
import ShoppingCart from './pages/ShoppingCart';
import ErrorPage from './pages/ErrorPage';
import BookDetails from './pages/BookDetails';

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
    ],
  },
]);

export default router;
