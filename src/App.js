import "./App.css";
import Mockman from "mockman-js";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Home } from "./pages/home/Home";
import { Books } from "./pages/books/Books";
import { BookDetail } from "./components/bookDetail/BookDetail";
import { Cart } from "./pages/cart/Cart";
import { Wishlist } from "./pages/wishlist/Wishlist";
import { User } from "./pages/user/User";
import { Error } from "./components/error/Error";
import { Footer } from "./components/footer/Footer";
import { GoToTop } from "./components/goToTop/GoToTop";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:category" element={<Books />} />
        <Route path="/bookDetails/:bookId" element={<BookDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/user" element={<User />} />
        <Route path="/mockman" element={<Mockman />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer />
      <GoToTop />
    </>
  );
}

export default App;
