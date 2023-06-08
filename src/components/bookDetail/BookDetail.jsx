import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import "./BookDetail.css";
import {
  useAuth,
  useBooks,
  useCategories,
  useWishlist,
  useCart,
} from "../../index";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Loader } from "../loader/Loader";
import { toast } from "react-hot-toast";
import { filterTypes } from "../../constants/filterTypes";

export const BookDetail = () => {
  const { bookId } = useParams();
  const {
    booksState: { books, bookDetail },
    booksDispatch,
    getBookById,
  } = useBooks();
  const { addToWishlist, isPresentInWishlist, deleteFromWishlist } =
    useWishlist();
  const {
    categoriesState: { categories },
    getCategoryById,
  } = useCategories();
  const { isPresentInCart, addToCart } = useCart();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { CLEAR_FILTER } = filterTypes;
  const detailCardTimerId = useRef();

  getBookById(bookId);

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
  } = bookDetail;

  const addToCartBtnHandler = (book) => {
    if (currentUser) {
      isPresentInCart(book) === -1 ? addToCart(book) : navigate("/cart");
    } else {
      navigate("/login");
      toast.error("Please login to continue adding to cart!");
    }
  };

  const addToWishlistBtnHandler = (bookDetail) => {
    if (currentUser) {
      addToWishlist(bookDetail);
    } else {
      navigate("/login");
      toast.error("Please login to continue adding to wishlist!");
    }
  };

  const genreBtnHandler = (genre) => {
    const getCategoryByName = categories?.find(
      ({ categoryName }) => categoryName?.toLowerCase() === genre?.toLowerCase()
    );
    getCategoryById(getCategoryByName?._id);
    navigate("/books");
  };

  const handleDetailCardBtnsClick = (delay, callback, ...args) => {
    clearTimeout(detailCardTimerId.current);
    detailCardTimerId.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  useEffect(() => booksDispatch({ type: CLEAR_FILTER, payload: books }), []);

  return (
    <div className="bookDetail_wrapper">
      {bookId !== _id ? (
        <Loader />
      ) : (
        <div className="bookDetail">
          <div className="bookDetail_image">
            <img src={coverImg} alt={title} />
          </div>
          <div className="bookDetail_content">
            <div className="heading">
              <div className="heading_name">
                <h2>{title}</h2>
                <h3>{author}</h3>
              </div>
              <div onClick={(e) => e.preventDefault()}>
                {currentUser ? (
                  isPresentInWishlist(bookDetail) !== -1 ? (
                    <FavoriteIcon
                      className="wishlist_icon"
                      onClick={() =>
                        handleDetailCardBtnsClick(
                          600,
                          deleteFromWishlist,
                          bookDetail
                        )
                      }
                    />
                  ) : (
                    <FavoriteBorderIcon
                      className="wishlist_icon"
                      onClick={() =>
                        handleDetailCardBtnsClick(
                          600,
                          addToWishlistBtnHandler,
                          bookDetail
                        )
                      }
                    />
                  )
                ) : (
                  <FavoriteBorderIcon
                    className="wishlist_icon"
                    onClick={() =>
                      handleDetailCardBtnsClick(
                        600,
                        addToWishlistBtnHandler,
                        bookDetail
                      )
                    }
                  />
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
              {genres?.map((genre, index) => (
                <button key={index} onClick={() => genreBtnHandler(genre)}>
                  # {genre}
                </button>
              ))}
            </p>
            <button
              className="add_cart_button"
              onClick={(e) =>
                handleDetailCardBtnsClick(600, addToCartBtnHandler, bookDetail)
              }
            >
              <p>
                {currentUser
                  ? isPresentInCart(bookDetail) === -1
                    ? "Add to Cart"
                    : "Go to Cart"
                  : "Add to Cart"}
              </p>
              <ShoppingCartIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
