import "./BookCard.css";
import { useRef } from "react";
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
  const { addToCart, isPresentInCart, updateQuantityInCart, findItemInCart } =
    useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const cardTimerId = useRef();

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

  const addToCartBtnHandler = (book) => {
    if (currentUser) {
      isPresentInCart(book) === -1 ? addToCart(book) : navigate("/cart");
    } else {
      navigate("/login");
      toast.error("Please login to continue adding to cart!");
    }
  };

  const updateQuantityBtnHandler = (book, actionType) => {
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

  const handleCardBtnsClick = (delay, callback, ...args) => {
    clearTimeout(cardTimerId.current);
    cardTimerId.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return (
    <NavLink
      onClick={() => getBookById(_id)}
      to={`/bookDetails/${_id}`}
      className="book_card_navlink"
    >
      <li key={_id} className="book_card">
        <div className="book_image_card">
          <img src={coverImg} alt={title} />
        </div>
        <div onClick={(e) => e.preventDefault()}>
          {currentUser ? (
            isPresentInWishlist(book) !== -1 ? (
              <FavoriteIcon
                className="wishlist_icon"
                onClick={() =>
                  handleCardBtnsClick(600, deleteFromWishlist, book)
                }
              />
            ) : (
              <FavoriteBorderIcon
                className="wishlist_icon"
                onClick={() =>
                  handleCardBtnsClick(600, addToWishlistBtnHandler, book)
                }
              />
            )
          ) : (
            <FavoriteBorderIcon
              className="wishlist_icon"
              onClick={() =>
                handleCardBtnsClick(600, addToWishlistBtnHandler, book)
              }
            />
          )}
        </div>
        <div className="book_card_content">
          <div className="book_card_ratings_row">
            <div className="book_card_ratings">
              <p>{totalStars}</p>
              <div className="star_icon">
                <StarIcon />
              </div>
            </div>
            <p>({totalRatings.toLocaleString("en-US")})</p>
          </div>
          <h3 className="book_card_content_title">{title}</h3>
          <p className="book_card_content_author">{author}</p>
          <h3 className="book_card_content_price">
            <p>₹ {originalPrice - discountPrice}</p>
            <p>₹ {originalPrice}</p>
          </h3>
          {!wishlistPage &&
            (currentUser ? (
              isPresentInCart(book) !== -1 ? (
                <div className="book_card_btn_qty_wrapper">
                  <div className="cart_book_card_qty">
                    <button
                      className="book_card_button"
                      style={{
                        cursor: findItemInCart(_id).qty <= 1 && "not-allowed",
                      }}
                      disabled={findItemInCart(_id).qty <= 1}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCardBtnsClick(
                          600,
                          updateQuantityBtnHandler,
                          book,
                          "decrement"
                        );
                      }}
                    >
                      -
                    </button>
                    <p>{findItemInCart(_id).qty}</p>
                    <button
                      className="book_card_button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCardBtnsClick(
                          600,
                          updateQuantityBtnHandler,
                          book,
                          "increment"
                        );
                      }}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="book_card_button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCardBtnsClick(600, addToCartBtnHandler, book);
                    }}
                  >
                    <p>Go to Cart</p>
                  </button>
                </div>
              ) : (
                <button
                  className="book_card_button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCardBtnsClick(600, addToCartBtnHandler, book);
                  }}
                >
                  <p>Add to Cart</p>
                </button>
              )
            ) : (
              <button
                className="book_card_button"
                onClick={(e) => {
                  e.preventDefault();
                  handleCardBtnsClick(600, addToCartBtnHandler, book);
                }}
              >
                <p>Add to Cart</p>
              </button>
            ))}
          {wishlistPage && (
            <button
              className="book_card_button"
              onClick={(e) => {
                e.preventDefault();
                isPresentInCart(book) === -1
                  ? handleCardBtnsClick(600, addToCartBtnHandler, book)
                  : handleCardBtnsClick(
                      600,
                      updateQuantityBtnHandler,
                      book,
                      "increment"
                    );
              }}
            >
              <div className="book_card_button_text">
                {isPresentInCart(book) === -1 ? (
                  "Add to Cart"
                ) : (
                  <div className="book_card_wishlist_qty">
                    <p>Added to Cart</p>
                    <p>{findItemInCart(_id).qty}</p>
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
