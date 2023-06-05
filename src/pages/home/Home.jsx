import "./Home.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useBooks, useCategories } from "../../index";
import { filterTypes } from "../../constants/filterTypes";
import { useEffect } from "react";
import { Loader } from "../../components/loader/Loader";
import { Error } from "../../components/error/Error";

export const Home = () => {
  const {
    isLoadingCategories,
    isErrorCategories,
    categoriesState: { categories },
    getCategoryById,
  } = useCategories();

  const {
    booksState: { books },
    booksDispatch,
  } = useBooks();

  const navigate = useNavigate();

  const { CLEAR_FILTER } = filterTypes;

  useEffect(() => {
    booksDispatch({ type: CLEAR_FILTER, payload: books });
  }, []);

  return (
    <div className="home">
      <div className="home_hero">
        <NavLink to="/books">
          <button className="shop_btn">
            <p>SHOP NOW</p>
          </button>
        </NavLink>
      </div>
      <h1>Browse by Category</h1>
      {isLoadingCategories ? (
        <Loader />
      ) : isErrorCategories ? (
        <Error />
      ) : (
        <ul className="home_wrapper">
          {categories?.map(({ _id, categoryName }) => (
            <button
              key={_id}
              className="home_wrapper_item"
              onClick={() => {
                getCategoryById(_id);
                navigate("/books");
              }}
            >
              <p>{categoryName}</p>
            </button>
          ))}
        </ul>
      )}
    </div>
  );
};
