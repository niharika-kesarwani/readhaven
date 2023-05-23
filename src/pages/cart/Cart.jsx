import "./Cart.css";
import { useCart } from "../../index";
import { BookCard } from "../../components/bookCard/BookCard";

export const Cart = () => {
  const {
    cartState: { cart },
  } = useCart();

  return (
    <div className="cart_page">
      <h1 className="cart_heading">Cart</h1>
      <div className="cart_block">
        <ul>
          {cart?.map((book) => (
            <BookCard book={book} key={book._id} cartPage />
          ))}
        </ul>
      </div>
    </div>
  );
};
