import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer";
import { BooksProvider } from "./context/BooksContext";
import { CartProvider } from "./context/CartContext";
import { ModalProvider } from "./context/ModalContext";

function App() {
  return (
    <CartProvider>
      <ModalProvider>
        <Header />
        <BooksProvider>
          <Outlet />
        </BooksProvider>
        <Footer />
      </ModalProvider>
    </CartProvider>
  );
}

export default App;
