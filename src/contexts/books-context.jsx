import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { products } from "../backend/db/products";
import { booksReducer, initialBooksState } from "../reducers/BookReducer";
import { BooksService } from "../services/books-service/BooksService";
import { filterTypes } from "../constants/FilterTypes";

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [displayProducts, setDisplayProducts] = useState(
    products?.filter(({ inStock }) => inStock)
  );
  const [displayFilters, setDisplayFilters] = useState(false);
  const [booksState, booksDispatch] = useReducer(
    booksReducer,
    initialBooksState
  );
  const { DISPLAY_BOOKS } = filterTypes;

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

  const handleWishlist = (handleBook) =>
    setDisplayProducts(
      displayProducts?.map((book) =>
        book.id === handleBook.id ? { ...book, wishlist: !book.wishlist } : book
      )
    );

  const wishlistCount = displayProducts?.filter(
    ({ wishlist }) => wishlist
  ).length;

  const toggleFilters = () =>
    setDisplayFilters((displayFilters) => !displayFilters);

  return (
    <BooksContext.Provider
      value={{
        products,
        booksState,
        booksDispatch,
        displayProducts,
        handleWishlist,
        wishlistCount,
        displayFilters,
        toggleFilters,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => useContext(BooksContext);
