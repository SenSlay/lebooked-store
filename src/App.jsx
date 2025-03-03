import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer";
import { BooksProvider } from "./BooksContext";

function App() {
  return (
    <>
      <Header></Header>
      <BooksProvider>
        <Outlet></Outlet>
      </BooksProvider>
      <Footer></Footer>
    </>
  );
}

export default App;
