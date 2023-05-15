import "./Home.css";
import { NavLink } from "react-router-dom";

export const Home = () => {
  return (
    <div className="home">
      <NavLink to="/books">
        <button className="shop-btn">SHOP NOW</button>
      </NavLink>
    </div>
  );
};
