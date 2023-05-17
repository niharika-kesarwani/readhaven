import "./Home.css";
import { NavLink } from "react-router-dom";
import { categories } from "../../backend/db/categories";

export const Home = () => {
  return (
    <div className="home">
      <div className="home-hero">
        <NavLink to="/books">
          <button className="shop-btn">SHOP NOW</button>
        </NavLink>
      </div>
      <h1>Browse by Category</h1>
      <ul className="home-wrapper">
        {categories?.map(({ _id, categoryName }) => (
          <NavLink
            key={_id}
            to={`/books/${categoryName}`}
            className="home-wrapper-item"
          >
            {categoryName}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};
