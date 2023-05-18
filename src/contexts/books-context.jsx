import { createContext, useContext, useState } from "react";
import { products } from "../backend/db/products";

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [displayProducts, setDisplayProducts] = useState(
    products?.filter(({ inStock }) => inStock)
  );
  const [displayFilters, setDisplayFilters] = useState(false);

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
