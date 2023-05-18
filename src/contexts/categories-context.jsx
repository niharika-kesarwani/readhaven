import { createContext, useContext } from "react";
import { categories } from "../backend/db/categories";

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  return (
    <CategoriesContext.Provider value={{ categories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);
