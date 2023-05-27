import { BookCard } from "../../components/bookCard/BookCard";
import { Error } from "../../components/error/Error";
import { Loader } from "../../components/loader/Loader";
import { useWishlist } from "../../index";
import "./Wishlist.css";
import { NavLink } from "react-router-dom";

export const Wishlist = () => {
  const {
    isLoadingWishlist,
    isErroWishlist,
    wishlistState: { wishlist },
  } = useWishlist();

  return (
    <div className="wishlist_page">
      <h1 className="wishlist_heading">Wishlist</h1>
      <div className="wishlist_block">
        {isLoadingWishlist ? (
          <Loader />
        ) : isErroWishlist ? (
          <Error />
        ) : wishlist?.length === 0 ? (
          <div className="wishlist_empty">
            <h2>Oops! Your wishlist is empty! </h2>
            <NavLink to="/books">
              <button>Start shopping!</button>
            </NavLink>
          </div>
        ) : (
          <ul>
            {wishlist?.map((item) => (
              <BookCard book={item} key={item._id} wishlistPage />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
