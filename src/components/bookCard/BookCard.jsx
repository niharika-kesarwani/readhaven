import "./BookCard.css";
import { useWishlist } from "../../index.js";
import { NavLink } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";

export const BookCard = ({ book }) => {
  const { addToWishlist, isPresentInWishlist, deleteFromWishlist } =
    useWishlist();

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

  return (
    <NavLink to={`/bookDetails/${_id}`} className="book_card_navlink">
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
          <button className="book_card_button">
            <p>Add to Cart</p>
          </button>
        </div>
      </li>{" "}
    </NavLink>
  );
};
