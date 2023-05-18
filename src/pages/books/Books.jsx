import "./Books.css";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useBooks, useCategories } from "../../index.js";
import { BookCard } from "../../components/bookCard/BookCard";
import TuneIcon from "@mui/icons-material/Tune";
import CancelIcon from "@mui/icons-material/Cancel";

export const Books = () => {
  const { category } = useParams();
  const { displayProducts, displayFilters, toggleFilters } = useBooks();
  const { categories } = useCategories();

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
            <button>
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
            <input type="radio" name="sort" /> High To Low
          </p>
          <p>
            <input type="radio" name="sort" /> Low To High
          </p>
        </div>
        <hr />
        <div className="books_filters_rating">
          <h3>Sort By Rating</h3>
          <input type="range" min="1.0" max="5.0" />
          <div>
            <p>1.0</p>
            <p>5.0</p>
          </div>
        </div>
        <hr />
        <div className="books_filters_category">
          <h3>Sort By Category</h3>
          <ul>
            {categories?.map(({ categoryName }) => (
              <p>
                <input type="checkbox" /> {categoryName}
              </p>
            ))}
          </ul>
        </div>
      </div>
      <div className="books_list">
        <div className="books_list_heading">
          <h2>
            Showing All Books <p>(Showing {displayProducts.length} books)</p>
          </h2>
          <div onClick={() => toggleFilters()}>
            <TuneIcon className="tune-icon" />
          </div>
        </div>
        <ul>
          {displayProducts?.map((book) => (
            <BookCard book={book} />
          ))}
        </ul>
      </div>
    </div>
  );
};
