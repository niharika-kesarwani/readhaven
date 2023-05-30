import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ExploreIcon from "@mui/icons-material/Explore";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth, useBooks, useCart, useWishlist } from "../../index.js";
import { filterTypes } from "../../constants/FilterTypes";

export const Header = () => {
  const {
    booksState: { searchInput },
    booksDispatch,
  } = useBooks();
  const { token, logoutHandler } = useAuth();
  const {
    wishlistState: { wishlist },
  } = useWishlist();
  const {
    cartState: { cart },
  } = useCart();
  const { SEARCH_FILTER } = filterTypes;
  const navigate = useNavigate();

  return (
    <div className="header_wrapper">
      <div className="header">
        <NavLink className="navlink header_heading" to="/">
          <h1 className="header_heading">READHAVEN</h1>
        </NavLink>
        <div className="header_action">
          <NavLink title="Explore" className="navlink store" to="/books">
            <ExploreIcon />
          </NavLink>
          <NavLink title="Wishlist" className="navlink wishlist" to="/wishlist">
            <FavoriteOutlinedIcon />
            {token && wishlist?.length > 0 && <p>{wishlist?.length}</p>}
          </NavLink>
          <NavLink title="Cart" className="navlink cart" to="/cart">
            <ShoppingCartIcon />
            {token && cart?.length > 0 && <p>{cart?.length}</p>}
          </NavLink>
          <NavLink title="Profile" className="navlink user" to="/profile">
            <PersonIcon />
          </NavLink>
          <NavLink
            title={token ? "Log out" : "Log in"}
            className="navlink login"
            to={!token && "/login"}
            onClick={token && logoutHandler}
          >
            {token ? <LogoutIcon /> : <LoginIcon />}
          </NavLink>
        </div>
        <div className="header_search">
          <SearchOutlinedIcon />
          <input
            placeholder="Search books..."
            name="search"
            value={searchInput}
            onChange={(e) =>
              booksDispatch({ type: SEARCH_FILTER, payload: e.target.value })
            }
            onKeyPress={(e) => e.which === 13 && navigate("/books")}
          />
        </div>
      </div>
    </div>
  );
};
