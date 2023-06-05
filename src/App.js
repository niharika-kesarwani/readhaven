import "./App.css";
import Mockman from "mockman-js";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Header } from "./components/header/Header";
import { Home } from "./pages/home/Home";
import { Books } from "./pages/books/Books";
import { BookDetail } from "./components/bookDetail/BookDetail";
import { Cart } from "./pages/cart/Cart";
import { Wishlist } from "./pages/wishlist/Wishlist";
import { SignUp } from "./pages/signUp/SignUp";
import { Login } from "./pages/login/Login";
import { Profile } from "./pages/profile/Profile";
import { ProfileHome } from "./pages/profile/home/ProfileHome";
import { ProfileAddress } from "./pages/profile/address/ProfileAddress";
import { Logout } from "./pages/logout/Logout";
import { Error } from "./components/error/Error";
import { Footer } from "./components/footer/Footer";
import { GoToTop } from "./components/goToTop/GoToTop";
import {
  TokenRequiresAuth,
  CurrentUserRequiresAuth,
} from "./components/RequiresAuth";
import { Checkout } from "./pages/checkout/Checkout";

function App() {
  return (
    <>
      <Header />
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{ top: "10%" }}
        toastOptions={{ style: { maxWidth: 500 } }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/bookDetails/:bookId" element={<BookDetail />} />
        <Route
          path="/cart"
          element={
            <TokenRequiresAuth>
              <CurrentUserRequiresAuth>
                <Cart />
              </CurrentUserRequiresAuth>
            </TokenRequiresAuth>
          }
        />
        <Route
          path="/wishlist"
          element={
            <TokenRequiresAuth>
              <CurrentUserRequiresAuth>
                <Wishlist />
              </CurrentUserRequiresAuth>
            </TokenRequiresAuth>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <CurrentUserRequiresAuth>
              <Profile />
            </CurrentUserRequiresAuth>
          }
        >
          <Route path="" element={<ProfileHome />} />
          <Route path="address" element={<ProfileAddress />} />
        </Route>
        <Route
          path="/checkout"
          element={
            <TokenRequiresAuth>
              <CurrentUserRequiresAuth>
                <Checkout />
              </CurrentUserRequiresAuth>
            </TokenRequiresAuth>
          }
        />
        <Route path="/logout" element={<Logout />} />
        <Route path="/mockman" element={<Mockman />} />
        <Route path="/*" element={<Error />} />
      </Routes>
      <Footer />
      <GoToTop />
    </>
  );
}

export default App;
