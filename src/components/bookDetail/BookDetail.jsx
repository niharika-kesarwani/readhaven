import { useParams } from "react-router";
import "./BookDetail.css";
import { useBooks } from "../../index";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const BookDetail = () => {
  const { bookId } = useParams();
  const { displayProducts, handleWishlist } = useBooks();

  const selectedBook = displayProducts?.find(({ _id }) => _id === bookId);

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
  } = selectedBook;

  console.log(selectedBook, selectedBook.wishlist);

  return (
    <div className="bookDetail_wrapper">
      <div className="bookDetail">
        <img src={coverImg} alt={title} />
        <div className="bookDetail_content">
          <div className="heading">
            <div className="heading_name">
              <h2>{title}</h2>
              <h3>{author}</h3>
            </div>
            <div onClick={() => handleWishlist(selectedBook)}>
              {wishlist ? (
                <FavoriteIcon className="wishlist_icon" />
              ) : (
                <FavoriteBorderIcon className="wishlist_icon" />
              )}
            </div>
          </div>
          <div className="price_rating">
            <div className="price">
              <h1>₹{(originalPrice - discountPrice).toFixed(2)}</h1>
              <h2 className="price_original_amount">
                ₹{originalPrice.toFixed(2)}
              </h2>
              <h2 className="price_original_discount">
                {discountPercent}% off
              </h2>
            </div>
            <div className="rating">
              <div className="rating_star">
                <p>{totalStars}</p>
                <StarIcon className="star_icon" />
              </div>
              <div>|</div>
              <p>{totalRatings.toLocaleString("en-US")} ratings</p>
            </div>
          </div>
          <p className="description">{description}</p>
          <p className="genres">
            {genres?.map((genre) => (
              <button># {genre}</button>
            ))}
          </p>
          <button className="button">
            <p>Add To Cart</p>
            <ShoppingCartIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
