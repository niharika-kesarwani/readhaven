import "./CartBookCard.css";
import { useCart, useWishlist } from "../../index.js";
import { NavLink } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";

export const CartBookCard = ({ book }) => {
  const { addToWishlist, isPresentInWishlist, deleteFromWishlist } =
    useWishlist();
  const {
    removeFromCart,
    updateQuantityInCart,
    updateQtyBtnClickTime,
    setUpdateQtyBtnClickTime,
  } = useCart();

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
            <div className="cart_book_card_content_price">
              <p>₹ {originalPrice}</p>
              <h2>₹ {originalPrice - discountPrice}</h2>
            </div>
          </div>
          <div className="cart_book_card_qty_remove">
            <div className="cart_book_card_qty_wrapper">
              <div className="cart_book_card_qty">
                <button
                  style={{ cursor: qty === 1 && "not-allowed" }}
                  disabled={
                    new Date().getTime() - updateQtyBtnClickTime < 300 ||
                    qty === 1
                  }
                  onClick={(e) => {
                    setUpdateQtyBtnClickTime(new Date().getTime());
                    updateQuantityBtnHandler(e, book, "decrement");
                  }}
                >
                  -
                </button>
                <p>{qty}</p>
                <button
                  onClick={(e) => {
                    setUpdateQtyBtnClickTime(new Date().getTime());
                    updateQuantityBtnHandler(e, book, "increment");
                  }}
                >
                  +
                </button>
              </div>
              <div
                className="cart_book_card_qty_remove_btn"
                onClick={(e) => removeFromCartBtnHandler(e, book)}
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
