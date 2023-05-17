import { createContext, useContext } from "react";
import { products } from "../backend/db/products";

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  return (
    <BooksContext.Provider value={{ products }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => useContext(BooksContext);
