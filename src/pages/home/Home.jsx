import "./Home.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useBooks, useCategories } from "../../index";
import { filterTypes } from "../../constants/FilterTypes";
import { useEffect } from "react";

export const Home = () => {
  const { categories } = useCategories();
  const {
    booksState: { books },
    booksDispatch,
  } = useBooks();
  const navigate = useNavigate();
  const { CATEGORY_FILTER, CLEAR_FILTER } = filterTypes;

  useEffect(() => {
    booksDispatch({ type: CLEAR_FILTER, payload: books });
  }, []);

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
          <button
            key={_id}
            className="home_wrapper_item"
            onClick={() => {
              booksDispatch({
                type: CATEGORY_FILTER,
                payload: categoryName,
              });
              navigate("/books");
            }}
          >
            <p>{categoryName}</p>
            <p>|</p>
          </button>
        ))}
      </ul>
    </div>
  );
};
