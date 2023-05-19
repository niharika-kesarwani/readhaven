import "./BookCard.css";
import { useBooks } from "../../index.js";
import { NavLink } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";

export const BookCard = ({ book }) => {
  const { handleWishlist } = useBooks();

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
    discountPercent,
    discountPrice,
    totalRatings,
    totalStars,
    __v,
    createdAt,
    updatedAt,
    wishlist,
  } = book;

  const wishlistBtnHandler = (e, book) => {
    e.preventDefault();
    handleWishlist(book);
  };

  const cartBtnHandler = (e) => e.preventDefault();

  return (
    <NavLink to={`/bookDetails/${_id}`} className="book_card_navlink">
      <li key={_id} className="book_card">
        <img src={coverImg} alt={title} />z
        <div onClick={(e) => wishlistBtnHandler(e, book)}>
          {wishlist ? (
            <FavoriteIcon className="wishlist_icon" />
          ) : (
            <FavoriteBorderIcon className="wishlist_icon" />
          )}
        </div>
        <div className="books_card_ratings">
          <div>
            <p>{totalStars}</p>
            <StarIcon className="star_icon" />
          </div>
          <div>|</div>
          <p>{totalRatings.toLocaleString("en-US")}</p>
        </div>
        <div className="books_card_content">
          <h3 className="books_card_content_title">{title}</h3>
          <p className="books_card_content_author">{author}</p>
          <h3 className="books_card_content_price">
            <span>₹ {originalPrice}</span>₹ {originalPrice - discountPrice}
          </h3>
          <button onClick={(e) => cartBtnHandler(e)}>
            <p>Add to Cart</p>
          </button>
        </div>
      </li>{" "}
    </NavLink>
  );
};
