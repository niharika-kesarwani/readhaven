import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useBooks } from "../../index.js";
import { filterTypes } from "../../constants/FilterTypes";

export const Header = () => {
  const {
    booksState: { searchInput },
    booksDispatch,
  } = useBooks();
  const { SEARCH_FILTER } = filterTypes;
  const navigate = useNavigate();

  return (
    <div className="header">
      <NavLink className="navlink header_heading" to="/">
        <h1 className="header_heading">READHAVEN</h1>
      </NavLink>
      <div className="header_action">
        <NavLink className="navlink wishlist" to="/wishlist">
          <FavoriteOutlinedIcon />
          <p>0</p>
        </NavLink>
        <NavLink className="navlink cart" to="/cart">
          <ShoppingCartIcon />
          <p>0</p>
        </NavLink>
        <NavLink className="navlink user" to="/profile">
          <PersonIcon />
        </NavLink>
        <NavLink className="navlink login" to="/login">
          <LoginIcon />
        </NavLink>
        <NavLink className="navlink logout" to="/logout">
          <LogoutIcon />
        </NavLink>
      </div>
      <div className="header_search">
        <SearchOutlinedIcon />
        <input
          value={searchInput}
          onChange={(e) =>
            booksDispatch({ type: SEARCH_FILTER, payload: e.target.value })
          }
          onKeyPress={(e) => e.which === 13 && navigate("/books")}
        />
      </div>
    </div>
  );
};
