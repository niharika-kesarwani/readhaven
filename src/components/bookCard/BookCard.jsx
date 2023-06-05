import "./BookCard.css";
import { useAuth, useBooks, useCart, useWishlist } from "../../index.js";
import { NavLink, useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import { toast } from "react-hot-toast";

export const BookCard = ({ book, wishlistPage }) => {
  const { getBookById } = useBooks();
  const { addToWishlist, isPresentInWishlist, deleteFromWishlist } =
    useWishlist();
  const { addToCart, isPresentInCart, updateQuantityInCart } = useCart();
  const { currentUser } = useAuth();
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
    if (currentUser) {
      isPresentInCart(book) === -1 ? addToCart(book) : navigate("/cart");
    } else {
      navigate("/login");
      toast.error("Please login to continue adding to cart!");
    }
  };

  const updateQuantityBtnHandler = (e, book, actionType) => {
    e.preventDefault();
    updateQuantityInCart(book, actionType);
  };

  const addToWishlistBtnHandler = (book) => {
    if (currentUser) {
      addToWishlist(book);
    } else {
      navigate("/login");
      toast.error("Please login to continue adding to wishlist!");
    }
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
          {currentUser ? (
            isPresentInWishlist(book) !== -1 ? (
              <FavoriteIcon
                className="wishlist_icon"
                onClick={() => deleteFromWishlist(book)}
              />
            ) : (
              <FavoriteBorderIcon
                className="wishlist_icon"
                onClick={() => addToWishlistBtnHandler(book)}
              />
            )
          ) : (
            <FavoriteBorderIcon
              className="wishlist_icon"
              onClick={() => addToWishlistBtnHandler(book)}
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
            <p>₹ {originalPrice - discountPrice}</p>
            <p>₹ {originalPrice}</p>
          </h3>
          {!wishlistPage && (
            <button
              className="book_card_button"
              onClick={(e) => addToCartBtnHandler(e, book)}
            >
              <p>
                {currentUser
                  ? isPresentInCart(book) === -1
                    ? "Add to Cart"
                    : "Go to Cart"
                  : "Add to Cart"}
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
              <div className="book_card_button_text">
                {isPresentInCart(book) === -1 ? (
                  "Add to Cart"
                ) : (
                  <div className="book_card_wishlist_qty">
                    <p>Added to Cart</p>
                    <p>+</p>
                  </div>
                )}
              </div>
            </button>
          )}
        </div>
      </li>{" "}
    </NavLink>
  );
};
