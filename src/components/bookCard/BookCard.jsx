import "./BookCard.css";
import { useBooks, useCart, useWishlist } from "../../index.js";
import { NavLink, useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";

export const BookCard = ({ book, wishlistPage, cartPage }) => {
  const { getBookById } = useBooks();
  const { addToWishlist, isPresentInWishlist, deleteFromWishlist } =
    useWishlist();
  const { addToCart, isPresentInCart, removeFromCart, updateQuantityInCart } =
    useCart();
  const navigate = useNavigate();

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

  const addToCartBtnHandler = (e, book) => {
    e.preventDefault();
    isPresentInCart(book) === -1 ? addToCart(book) : navigate("/cart");
  };

  const removeFromCartBtnHandler = (e, book) => {
    e.preventDefault();
    removeFromCart(book);
  };

  const updateQuantityBtnHandler = (e, book, actionType) => {
    e.preventDefault();
    updateQuantityInCart(book, actionType);
  };

  return (
    <NavLink
      onClick={() => getBookById(_id)}
      to={`/bookDetails/${_id}`}
      className="book_card_navlink"
    >
      <li key={_id} className="book_card">
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
        <div className="book_card_ratings">
          <div>
            <p>{totalStars}</p>
            <StarIcon className="star_icon" />
          </div>
          <div>|</div>
          <p>{totalRatings.toLocaleString("en-US")}</p>
        </div>
        <div className="book_card_content">
          <h3 className="book_card_content_title">{title}</h3>
          <p className="book_card_content_author">{author}</p>
          <h3 className="book_card_content_price">
            <p>₹ {originalPrice}</p>
            <p>₹ {originalPrice - discountPrice}</p>
          </h3>
          {!cartPage && !wishlistPage && (
            <button
              className="book_card_button"
              onClick={(e) => addToCartBtnHandler(e, book)}
            >
              <p>
                {isPresentInCart(book) === -1 ? "Add to Cart" : "Go to Cart"}
              </p>
            </button>
          )}
          {wishlistPage && (
            <button
              className="book_card_button"
              onClick={(e) =>
                isPresentInCart(book) === -1
                  ? addToCartBtnHandler(e, book)
                  : updateQuantityBtnHandler(e, book, "increment")
              }
            >
              <p className="book_card_button_text">
                {isPresentInCart(book) === -1 ? (
                  "Add to Cart"
                ) : (
                  <div className="book_card_wishlist_qty">
                    <p>Added to Cart</p>
                    <p>+</p>
                  </div>
                )}
              </p>
            </button>
          )}
          {cartPage && (
            <div className="book_card_qty_remove">
              <div className="book_card_qty">
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
              <button
                className="book_card_button"
                onClick={(e) => removeFromCartBtnHandler(e, book)}
              >
                <p>Remove from Cart</p>
              </button>
            </div>
          )}
        </div>
      </li>{" "}
    </NavLink>
  );
};
