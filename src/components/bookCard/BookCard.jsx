import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import { useBooks } from "../../index.js";
import "./BookCard.css";

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
  return (
    <li key={_id} className="book_card">
      <img src={coverImg} alt={title} />
      <button onClick={() => handleWishlist(book)}>
        {wishlist ? (
          <FavoriteIcon className="wishlist_icon" />
        ) : (
          <FavoriteBorderIcon className="wishlist_icon" />
        )}
      </button>
      <div className="books_card_ratings">
        <p>{totalStars}</p>
        <StarIcon className="star_icon" /> |{" "}
        <p>{totalRatings.toLocaleString("en-US")}</p>
      </div>
      <div className="books_card_content">
        <h3 className="books_card_content_title">{title}</h3>
        <p className="books_card_content_author">{author}</p>
        <h3 className="books_card_content_price">
          <span>₹ {originalPrice}</span>₹ {originalPrice - discountPrice}
        </h3>
        <button>
          <p>Add to Cart</p>
        </button>
      </div>
    </li>
  );
};
