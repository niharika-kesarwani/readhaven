import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import { products } from "../backend/db/products";
import { booksReducer, initialBooksState } from "../reducers/BookReducer";
import { BooksService } from "../services/books-service/BooksService";
import { filterTypes } from "../constants/FilterTypes";
import { BooksIdService } from "../services/books-service/BooksIdService";

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [displayFilters, setDisplayFilters] = useState(false);
  const [booksState, booksDispatch] = useReducer(
    booksReducer,
    initialBooksState
  );
  const { DISPLAY_BOOKS, GET_PRODUCT_DETAILS } = filterTypes;

  const getBooks = async () => {
    try {
      const response = await BooksService();
      const {
        status,
        data: { products },
      } = response;
      if (status === 200) {
        booksDispatch({ type: DISPLAY_BOOKS, payload: products });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const getBookById = async (productId) => {
    try {
      const response = await BooksIdService(productId);
      const {
        status,
        data: { product },
      } = response;
      if (status === 200) {
        booksDispatch({ type: GET_PRODUCT_DETAILS, payload: product });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const searchFilteredBooks =
    booksState?.searchInput.length > 0
      ? booksState?.books.filter(({ title }) =>
          title.toLowerCase().includes(booksState?.searchInput.toLowerCase())
        )
      : booksState?.books;

  const sortFilteredBooks =
    booksState?.sortInput.length > 0
      ? searchFilteredBooks?.sort((a, b) =>
          booksState?.sortInput === "LTH"
            ? a?.originalPrice -
              a?.discountPrice -
              (b?.originalPrice - b?.discountPrice)
            : b?.originalPrice -
              b?.discountPrice -
              (a?.originalPrice - a?.discountPrice)
        )
      : searchFilteredBooks;

  const ratingFilteredBooks = sortFilteredBooks?.filter(
    ({ totalStars }) => totalStars >= booksState?.ratingInput
  );

  const categoryFilteredBooks =
    booksState?.categoryInput.length > 0
      ? ratingFilteredBooks?.filter((book) =>
          booksState?.categoryInput.some((category) =>
            book.genres.includes(category)
          )
        )
      : ratingFilteredBooks;

  const toggleFilters = () =>
    setDisplayFilters((displayFilters) => !displayFilters);

  return (
    <BooksContext.Provider
      value={{
        products,
        booksState,
        categoryFilteredBooks,
        booksDispatch,
        displayFilters,
        toggleFilters,
        getBookById,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => useContext(BooksContext);
