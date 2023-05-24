import "./CartBookCard.css";
import { useCart, useWishlist } from "../../index.js";
import { NavLink } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const CartBookCard = ({ book, wishlistPage, cartPage }) => {
  const { addToWishlist, isPresentInWishlist, deleteFromWishlist } =
    useWishlist();
  const { removeFromCart, updateQuantityInCart } = useCart();

  const {
    _id,
    id,
    title,
    author,
    description,
    bookType,
    inStock,
    genres,
    coverImg,
    offers,
    originalPrice,
    qty,
    discountPercent,
    discountPrice,
    totalRatings,
    totalStars,
    __v,
    createdAt,
    updatedAt,
    wishlist,
  } = book;

  const removeFromCartBtnHandler = (e, book) => {
    e.preventDefault();
    removeFromCart(book);
  };

  const updateQuantityBtnHandler = (e, book, actionType) => {
    e.preventDefault();
    updateQuantityInCart(book, actionType);
  };

  return (
    <NavLink to={`/bookDetails/${_id}`} className="cart_book_card_navlink">
      <li key={_id} className="cart_book_card">
        <img src={coverImg} alt={title} />
        <div onClick={(e) => e.preventDefault()}>
          {isPresentInWishlist(book) !== -1 ? (
            <FavoriteIcon
              className="wishlist_icon"
              onClick={() => deleteFromWishlist(book)}
            />
          ) : (
            <FavoriteBorderIcon
              className="wishlist_icon"
              onClick={() => addToWishlist(book)}
            />
          )}
        </div>
        <div className="cart_book_card_content">
          <h3 className="cart_book_card_content_title">{title}</h3>
          <p className="cart_book_card_content_author">{author}</p>
          <div className="cart_book_card_content_price_wrapper">
            <h3 className="cart_book_card_content_price">
              <p>₹ {originalPrice}</p>
              <h2>₹ {originalPrice - discountPrice}</h2>
            </h3>
          </div>
          <div className="cart_book_card_qty_remove">
            <div className="cart_book_card_qty_wrapper">
              <div className="cart_book_card_qty">
                <button
                  disabled={qty === 1}
                  onClick={(e) =>
                    updateQuantityBtnHandler(e, book, "decrement")
                  }
                >
                  -
                </button>
                <p>{qty}</p>
                <button
                  onClick={(e) =>
                    updateQuantityBtnHandler(e, book, "increment")
                  }
                >
                  +
                </button>
              </div>
            </div>
            <button
              className="cart_book_card_button"
              onClick={(e) => removeFromCartBtnHandler(e, book)}
            >
              <p>Remove from Cart</p>
            </button>
          </div>
        </div>
      </li>{" "}
    </NavLink>
  );
};
