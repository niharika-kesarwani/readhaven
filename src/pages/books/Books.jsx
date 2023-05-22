import "./Books.css";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useBooks, useCategories } from "../../index.js";
import { BookCard } from "../../components/bookCard/BookCard";
import { filterTypes } from "../../constants/FilterTypes";
import TuneIcon from "@mui/icons-material/Tune";
import CancelIcon from "@mui/icons-material/Cancel";

export const Books = () => {
  const { category } = useParams();
  const {
    booksState: { books, ratingInput, categoryInput },
    categoryFilteredBooks,
    booksDispatch,
    displayFilters,
    toggleFilters,
  } = useBooks();
  const { categories } = useCategories();

  const {
    DISPLAY_BOOKS,
    SEARCH_FILTER,
    SORT_FILTER,
    RATING_FILTER,
    CATEGORY_FILTER,
    CLEAR_FILTER,
  } = filterTypes;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="books">
      <div
        className={
          displayFilters
            ? "books_filters books_filters_mobile"
            : "books_filters"
        }
      >
        <div className="books_filters_heading">
          <h2>Filters</h2>
          <div>
            <button
              onClick={() =>
                booksDispatch({ type: CLEAR_FILTER, payload: books })
              }
            >
              <h4>Clear Filters</h4>
            </button>
            <div onClick={() => toggleFilters()}>
              <CancelIcon className="cancel-btn" />
            </div>
          </div>
        </div>
        <hr />
        <div className="books_filters_price">
          <h3>Sort By Price</h3>
          <p>
            <input
              type="radio"
              name="sort"
              onChange={() =>
                booksDispatch({ type: SORT_FILTER, payload: "HTL" })
              }
            />{" "}
            High To Low
          </p>
          <p>
            <input
              type="radio"
              name="sort"
              onChange={() =>
                booksDispatch({ type: SORT_FILTER, payload: "LTH" })
              }
            />{" "}
            Low To High
          </p>
        </div>
        <hr />
        <div className="books_filters_rating">
          <h3>Sort By Rating</h3>
          <input
            type="range"
            min="1.0"
            max="5.0"
            value={ratingInput}
            onChange={(e) =>
              booksDispatch({ type: RATING_FILTER, payload: e.target.value })
            }
          />
          <div>
            <p>1.0</p>
            <p>5.0</p>
          </div>
        </div>
        <hr />
        <div className="books_filters_category">
          <h3>Sort By Category</h3>
          <ul>
            {categories?.map((category) => (
              <p key={category._id}>
                <input
                  type="checkbox"
                  checked={categoryInput.includes(category.categoryName)}
                  onChange={(e) =>
                    booksDispatch({
                      type: CATEGORY_FILTER,
                      payload: category.categoryName,
                    })
                  }
                />{" "}
                {category.categoryName}
              </p>
            ))}
          </ul>
        </div>
      </div>
      <div className="books_list">
        <div className="books_list_heading">
          <h2>
            Showing All Books{" "}
            <p>(Showing {categoryFilteredBooks?.length} books)</p>
          </h2>
          <div onClick={() => toggleFilters()}>
            <TuneIcon className="tune-icon" />
          </div>
        </div>
        <div className="books_list_block">
          <ul>
            {categoryFilteredBooks?.map((book) => (
              <BookCard book={book} key={book._id} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
