import { Outlet } from "react-router-dom"
import Header from "./components/common/Header"
import Footer from "./components/common/Footer";
import { BooksProvider } from "./context/BooksContext";
import { CartProvider } from "./context/CartContext";
import { ModalProvider } from "./context/ModalContext";

function App() {
  return (
    <>
      <CartProvider>
        <ModalProvider>
          <BooksProvider>
            <Header />
            <main className="flex-1 flex-grow flex flex-col">
              <Outlet />
            </main>
          </BooksProvider>
        </ModalProvider>
      </CartProvider>
      <Footer />
    </>
  );
}

export default App;
