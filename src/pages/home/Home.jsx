import "./Home.css";
import { NavLink } from "react-router-dom";

export const Home = () => {
  return (
    <div className="home">
      <div className="home-hero">
        <NavLink to="/books">
          <button className="shop-btn">SHOP NOW</button>
        </NavLink>
      </div>
    </div>
  );
};
