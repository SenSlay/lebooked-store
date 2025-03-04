import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer";
import { BooksProvider } from "./context/BooksContext";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Header />
      <BooksProvider>
        <Outlet />
      </BooksProvider>
      <Footer />
    </CartProvider>
  );
}

export default App;
