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
import { useAuth } from "./../index";

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const { DISPLAY_BOOKS, GET_PRODUCT_DETAILS } = filterTypes;

  const [displayFilters, setDisplayFilters] = useState(false);
  const [booksState, booksDispatch] = useReducer(
    booksReducer,
    initialBooksState
  );
  const [isLoadingBooks, setIsLoadingBooks] = useState(false);
  const [isErrorBooks, setIsErrorBooks] = useState(false);
  const { token } = useAuth();

  const getBooks = async () => {
    setIsLoadingBooks(true);
    try {
      const response = await BooksService();
      const {
        status,
        data: { products },
      } = response;
      if (status === 200) {
        booksDispatch({ type: DISPLAY_BOOKS, payload: products });
        setIsLoadingBooks(false);
      }
    } catch (err) {
      setIsErrorBooks(true);
      console.error(err);
    } finally {
      setIsLoadingBooks(false);
    }
  };

  useEffect(() => {
    token && getBooks();
  }, [token]);

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
        isLoadingBooks,
        isErrorBooks,
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
