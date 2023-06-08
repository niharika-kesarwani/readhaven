import "./CartBookCard.css";
import { useCart, useWishlist } from "../../index.js";
import { NavLink } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRef } from "react";

export const CartBookCard = ({ book }) => {
  const { addToWishlist, isPresentInWishlist, deleteFromWishlist } =
    useWishlist();
  const { removeFromCart, updateQuantityInCart } = useCart();
  const cartCardTimerId = useRef();

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

  const removeFromCartBtnHandler = (book) => {
    removeFromCart(book);
  };

  const updateQuantityBtnHandler = (book, actionType) => {
    updateQuantityInCart(book, actionType);
  };

  const handleCartCardBtnsClick = (delay, callback, ...args) => {
    clearTimeout(cartCardTimerId.current);
    cartCardTimerId.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return (
    <NavLink to={`/bookDetails/${_id}`} className="cart_book_card_navlink">
      <li key={_id} className="cart_book_card">
        <div className="cart_book_card_image">
          <img src={coverImg} alt={title} />
        </div>
        <div onClick={(e) => e.preventDefault()}>
          {isPresentInWishlist(book) !== -1 ? (
            <FavoriteIcon
              className="wishlist_icon"
              onClick={() =>
                handleCartCardBtnsClick(600, deleteFromWishlist, book)
              }
            />
          ) : (
            <FavoriteBorderIcon
              className="wishlist_icon"
              onClick={() => handleCartCardBtnsClick(600, addToWishlist, book)}
            />
          )}
        </div>
        <div className="cart_book_card_content">
          <h3 className="cart_book_card_content_title">{title}</h3>
          <p className="cart_book_card_content_author">{author}</p>
          <div className="cart_book_card_content_price_wrapper">
            <div className="cart_book_card_content_price">
              <h2>₹ {originalPrice - discountPrice}</h2>
              <p>₹ {originalPrice}</p>
            </div>
          </div>
          <div className="cart_book_card_qty_remove">
            <div className="cart_book_card_qty_wrapper">
              <div className="cart_book_card_qty">
                <button
                  style={{ cursor: qty <= 1 && "not-allowed" }}
                  disabled={qty <= 1}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCartCardBtnsClick(
                      600,
                      updateQuantityBtnHandler,
                      book,
                      "decrement"
                    );
                  }}
                >
                  -
                </button>
                <p>{qty}</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleCartCardBtnsClick(
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
              <div
                className="cart_book_card_qty_remove_btn"
                onClick={(e) => {
                  e.preventDefault();
                  handleCartCardBtnsClick(600, removeFromCartBtnHandler, book);
                }}
              >
                <DeleteIcon />
              </div>
            </div>
          </div>
        </div>
      </li>{" "}
    </NavLink>
  );
};
