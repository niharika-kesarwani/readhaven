import "./Cart.css";
import { useCart } from "../../index";
import { CartBookCard } from "../../components/cartBookCard/CartBookCard";
import { Loader } from "../../components/loader/Loader";
import { Error } from "../../components/error/Error";
import { NavLink } from "react-router-dom";

export const Cart = () => {
  const {
    isLoadingCart,
    isErrorCart,
    cartState: { cart },
    totalPrice,
    totalDiscount,
  } = useCart();

  return (
    <div className="cart_page">
      <h1 className="cart_heading">Cart</h1>
      {isLoadingCart ? (
        <Loader />
      ) : isErrorCart ? (
        <Error />
      ) : cart?.length === 0 ? (
        <div className="cart_empty">
          <h2>Oops! Your cart is empty! </h2>
          <NavLink to="/books">
            <button>Start shopping!</button>
          </NavLink>
        </div>
      ) : (
        <div className="cart_block">
          <div className="cart_block_items">
            <ul>
              {cart?.map((book) => (
                <CartBookCard book={book} key={book._id} cartPage />
              ))}
            </ul>
          </div>
          <div className="cart_block_price_details_wrapper">
            <div className="cart_block_price_details">
              <div className="cart_block_price_details_heading">
                <h2>Price Details</h2>
                <h2>
                  ({cart?.length} item{cart?.length > 1 && "s"})
                </h2>
              </div>
              <hr />
              <div className="cart_block_price_details_prices">
                <div>
                  <h3>Total Price</h3>
                  <h3 className="cart_block_rupee">{totalPrice}</h3>
                </div>
                <div>
                  <h3>Discount</h3>
                  <h3 className="cart_block_rupee">- {totalDiscount}</h3>
                </div>
              </div>
              <hr />
              <div className="cart_block_price_details_final">
                <div>
                  <h2>Subtotal</h2>
                  <h2 className="cart_block_rupee">
                    {totalPrice - totalDiscount}
                  </h2>
                </div>
                <NavLink to="/checkout">
                  <button>
                    <h2>Checkout</h2>
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
