import "./Cart.css";
import { useCart } from "../../index";
import { CartBookCard } from "../../components/cartBookCard/CartBookCard";

export const Cart = () => {
  const {
    cartState: { cart },
    totalPrice,
    totalDiscount,
  } = useCart();

  return (
    <div className="cart_page">
      <h1 className="cart_heading">Cart</h1>
      <div className="cart_block">
        <div className="cart_block_items">
          <ul>
            {cart?.map((book) => (
              <CartBookCard book={book} key={book._id} cartPage />
            ))}
          </ul>
        </div>
        <div
          className="cart_block_price_details_wrapper"
          style={{ display: cart.length === 0 && "none" }}
        >
          <div className="cart_block_price_details">
            <div className="cart_block_price_details_heading">
              <h2>Price Details</h2>
              <h2>({cart?.length} item)</h2>
            </div>
            <hr />
            <div className="cart_block_price_details_prices">
              <div>
                <h3>Total Price</h3>
                <h3>{totalPrice}</h3>
              </div>
              <div>
                <h3>Discount</h3>
                <h3>- {totalDiscount}</h3>
              </div>
            </div>
            <hr />
            <div className="cart_block_price_details_final">
              <div>
                <h2>Subtotal</h2>
                <h2>{totalPrice - totalDiscount}</h2>
              </div>
              <button>
                <h2>Checkout</h2>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
