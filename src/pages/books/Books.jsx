import "./Books.css";
import { useEffect } from "react";
import { useBooks, useCategories } from "../../index.js";
import { BookCard } from "../../components/bookCard/BookCard";
import { filterTypes } from "../../constants/filterTypes";
import TuneIcon from "@mui/icons-material/Tune";
import CancelIcon from "@mui/icons-material/Cancel";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
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
    getCategoryByName,
  } = useCategories();

  const { SORT_FILTER, RATING_FILTER, CLEAR_FILTER } = filterTypes;
  const ratingsList = ["1.0", "2.0", "3.0", "4.0", "5.0"];

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
          <div className="books_filters_heading_title">
            <h2>Filters</h2>
            <div>
              <button
                onClick={() =>
                  booksDispatch({ type: CLEAR_FILTER, payload: books })
                }
              >
                <h4>Clear Filters</h4>
              </button>
              <div onClick={() => toggleFilters(false)}>
                <CancelIcon className="cancel-btn" />
              </div>
            </div>
          </div>
          {categoryInput.length > 0 && (
            <div className="books_filters_selected">
              {categoryInput?.map((category) => (
                <div
                  className="books_filters_selected_card"
                  onClick={() =>
                    getCategoryById(getCategoryByName(category)._id)
                  }
                >
                  <p>{category}</p>
                  <div>
                    <ClearOutlinedIcon />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <hr />
        <div className="books_filters_price">
          <h3>Sort By Price</h3>
          <p
            onClick={() => booksDispatch({ type: SORT_FILTER, payload: "LTH" })}
            className={sortInput?.includes("LTH") ? "input_checked" : undefined}
          >
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
          <p
            onClick={() => booksDispatch({ type: SORT_FILTER, payload: "HTL" })}
            className={sortInput?.includes("HTL") ? "input_checked" : undefined}
          >
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
            {ratingsList?.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
        <hr />
        <div className="books_filters_category">
          <h3>Sort By Category</h3>
          <ul>
            {categories?.map(({ _id, categoryName }) => (
              <p key={_id} onClick={() => getCategoryById(_id)}>
                <input
                  type="checkbox"
                  id={_id}
                  checked={categoryInput.includes(categoryName)}
                  readOnly
                />{" "}
                {categoryName}
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
          <div onClick={() => toggleFilters(true)}>
            <TuneIcon className="tune-icon" />
          </div>
        </div>
        {isLoadingBooks || isLoadingCategories ? (
          <Loader />
        ) : isErrorBooks || isErrorCategories ? (
          <Error />
        ) : (
          <div className="books_list_block">
            {categoryFilteredBooks.length === 0 ? (
              <h2 className="book_list_empty">
                Oops! No book matches your preference!{" "}
              </h2>
            ) : (
              <ul>
                {categoryFilteredBooks?.map((book) => (
                  <BookCard book={book} key={book._id} />
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
