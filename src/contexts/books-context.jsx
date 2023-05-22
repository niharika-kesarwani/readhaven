import { createContext, useContext, useEffect, useReducer } from "react";
import { products } from "../backend/db/products";
import { booksReducer, initialBooksState } from "../reducers/BookReducer";
import { BooksService } from "../services/books-service/BooksService";
import { filterTypes } from "../constants/FilterTypes";

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
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

  // const handleWishlist = (handleBook) =>
  //   setDisplayProducts(
  //     displayProducts?.map((book) =>
  //       book.id === handleBook.id ? { ...book, wishlist: !book.wishlist } : book
  //     )
  //   );

  // const wishlistCount = displayProducts?.filter(
  //   ({ wishlist }) => wishlist
  // ).length;

  // const toggleFilters = () =>
  //   setDisplayFilters((displayFilters) => !displayFilters);

  return (
    <BooksContext.Provider
      value={{
        products,
        booksState,
        categoryFilteredBooks,
        booksDispatch,
        // displayProducts,
        // handleWishlist,
        // wishlistCount,
        // displayFilters,
        // toggleFilters,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => useContext(BooksContext);
