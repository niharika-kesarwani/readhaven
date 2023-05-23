import { createContext, useContext, useEffect, useReducer } from "react";
import { CategoriesService } from "../services/books-service/CategoriesService";
import {
  categoriesReducer,
  initialCategoriesState,
} from "../reducers/CategoryReducer";
import { categoryTypes } from "../constants/CategoryTypes";

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categoriesState, categoriesDispatch] = useReducer(
    categoriesReducer,
    initialCategoriesState
  );
  const { DISPLAY_CATEGORIES } = categoryTypes;

  const getCategories = async () => {
    try {
      const response = await CategoriesService();
      const {
        status,
        data: { categories },
      } = response;
      if (status === 200) {
        categoriesDispatch({ type: DISPLAY_CATEGORIES, payload: categories });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categoriesState, categoriesDispatch }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);
