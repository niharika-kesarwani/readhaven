import "./Header.css";
import { NavLink } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useBooks } from "../../index.js";

export const Header = () => {
  const { wishlistCount } = useBooks();

  return (
    <div className="header">
      <NavLink className="navlink header_heading" to="/">
        <h1 className="header_heading">READHAVEN</h1>
      </NavLink>
      <div className="header_action">
        <NavLink className="navlink wishlist" to="/wishlist">
          <FavoriteOutlinedIcon />
          <p>{wishlistCount}</p>
        </NavLink>
        <NavLink className="navlink cart" to="/cart">
          <ShoppingCartIcon />
          <p>0</p>
        </NavLink>
        <NavLink className="navlink user" to="/login">
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
        <input />
      </div>
    </div>
  );
};
