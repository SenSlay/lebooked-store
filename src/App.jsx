import { Outlet } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { BooksProvider } from './context/BooksContext';
import { CartProvider } from './context/CartContext';
import { ModalProvider } from './context/ModalContext';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, token } = useAuth();

  return (
    <>
      <ModalProvider>
        <CartProvider userId={user?.id} token={token}>
          <BooksProvider>
            <Header />
            <main className="flex-1 flex-grow flex flex-col">
              <Outlet />
            </main>
          </BooksProvider>
        </CartProvider>
      </ModalProvider>
      <Footer />
    </>
  );
}

export default App;
