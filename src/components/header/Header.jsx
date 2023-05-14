import "./Header.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";

export const Header = () => {
  return (
    <div className="header">
      <div className="header_heading">
        <h2>BOOKSMEDIA</h2>
      </div>
      <div className="header_action">
        <div className="wishlist">
          <FavoriteOutlinedIcon />
        </div>
        <div className="cart">
          <ShoppingCartIcon />
        </div>
        <div className="user">
          <PersonIcon />
        </div>
      </div>
      <div className="header_search">
        <SearchOutlinedIcon />
        <input />
      </div>
    </div>
  );
};
