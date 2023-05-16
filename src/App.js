import "./App.css";
import Mockman from "mockman-js";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Home } from "./pages/home/Home";
import { Books } from "./pages/books/Books";
import { Cart } from "./pages/cart/Cart";
import { Wishlist } from "./pages/wishlist/Wishlist";
import { User } from "./pages/user/User";
import { Error } from "./components/error/Error";
import { Footer } from "./components/footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/user" element={<User />} />
        <Route path="/mockman" element={<Mockman />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
