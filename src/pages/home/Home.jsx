import "./Home.css";
import { NavLink } from "react-router-dom";
import { useCategories } from "../../index";

export const Home = () => {
  const { categories } = useCategories();

  return (
    <div className="home">
      <div className="home_hero">
        <NavLink to="/books">
          <button className="shop_btn">SHOP NOW</button>
        </NavLink>
      </div>
      <h1>Browse by Category</h1>
      <ul className="home_wrapper">
        {categories?.map(({ _id, categoryName }) => (
          <NavLink
            key={_id}
            to={`/books/${categoryName}`}
            className="home_wrapper_item"
          >
            <p>{categoryName}</p>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};
