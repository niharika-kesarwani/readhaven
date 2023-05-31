import "./Books.css";
import { useEffect } from "react";
import { useBooks, useCategories } from "../../index.js";
import { BookCard } from "../../components/bookCard/BookCard";
import { filterTypes } from "../../constants/filterTypes";
import TuneIcon from "@mui/icons-material/Tune";
import CancelIcon from "@mui/icons-material/Cancel";
import { Loader } from "../../components/loader/Loader";
import { Error } from "../../components/error/Error";

export const Books = () => {
  const {
    isLoadingBooks,
    isErrorBooks,
    booksState: { books, ratingInput, categoryInput, sortInput },
    categoryFilteredBooks,
    booksDispatch,
    displayFilters,
    toggleFilters,
  } = useBooks();

  const {
    isLoadingCategories,
    isErrorCategories,
    categoriesState: { categories },
    getCategoryById,
  } = useCategories();

  const { SORT_FILTER, RATING_FILTER, CLEAR_FILTER } = filterTypes;

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
              checked={sortInput?.includes("HTL")}
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
              checked={sortInput?.includes("LTH")}
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
          {isLoadingCategories ? (
            <Loader />
          ) : isErrorCategories ? (
            <Error />
          ) : (
            <ul>
              {categories?.map(({ _id, categoryName }) => (
                <p key={_id}>
                  <input
                    type="checkbox"
                    checked={categoryInput.includes(categoryName)}
                    onChange={() => getCategoryById(_id)}
                  />{" "}
                  {categoryName}
                </p>
              ))}
            </ul>
          )}
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
        {isLoadingBooks || isLoadingCategories ? (
          <Loader />
        ) : isErrorBooks || isLoadingCategories ? (
          <Error />
        ) : (
          <div className="books_list_block">
            <ul>
              {categoryFilteredBooks?.map((book) => (
                <BookCard book={book} key={book._id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
