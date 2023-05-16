import "./Header.css";
import { NavLink } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";

export const Header = () => {
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
        <NavLink className="navlink user" to="/user">
          <PersonIcon />
        </NavLink>
      </div>
      <div className="header_search">
        <SearchOutlinedIcon />
        <input />
      </div>
    </div>
  );
};
