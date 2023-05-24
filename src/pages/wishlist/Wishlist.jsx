import { BookCard } from "../../components/bookCard/BookCard";
import { useWishlist } from "../../index";
import "./Wishlist.css";

export const Wishlist = () => {
  const {
    wishlistState: { wishlist },
  } = useWishlist();

  return (
    <div className="wishlist_page">
      <h1 className="wishlist_heading">Wishlist</h1>
      <div className="wishlist_block">
        <ul>
          {wishlist?.map((item) => (
            <BookCard book={item} key={item._id} wishlistPage />
          ))}
        </ul>
      </div>
    </div>
  );
};
