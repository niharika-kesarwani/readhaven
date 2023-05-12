import "./Header.css";

export const Header = () => {
  return (
    <div className="header">
      <div className="header_heading">
        <h2>BooksMedia</h2>
      </div>
      <div className="header_action">
        <p className="login">Login</p>
        <p className="wishlist">Wishlist</p>
        <p className="cart">Cart</p>
      </div>
      <div className="header_search">
        <input />
      </div>
    </div>
  );
};
