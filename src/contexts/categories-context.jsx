import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { CategoriesService } from "../services/books-service/CategoriesService";
import {
  categoriesReducer,
  initialCategoriesState,
} from "../reducers/CategoryReducer";
import { filterTypes } from "../constants/FilterTypes";
import { categoryTypes } from "../constants/CategoryTypes";
import { CategoriesIdService } from "../services/books-service/CategoriesIdService";
import { useBooks } from "./books-context";

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categoriesState, categoriesDispatch] = useReducer(
    categoriesReducer,
    initialCategoriesState
  );
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isErrorCategories, setIsErrorCategories] = useState(false);

  const { booksDispatch } = useBooks();

  const { CATEGORY_FILTER } = filterTypes;
  const { DISPLAY_CATEGORIES, GET_CATEGORY_DETAILS } = categoryTypes;

  const getCategories = async () => {
    try {
      setIsLoadingCategories(true);
      const response = await CategoriesService();
      const {
        status,
        data: { categories },
      } = response;
      if (status === 200) {
        setIsLoadingCategories(false);
        categoriesDispatch({ type: DISPLAY_CATEGORIES, payload: categories });
      }
    } catch (err) {
      setIsErrorCategories(true);
      console.error(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getCategoryById = async (categoryId) => {
    try {
      setIsLoadingCategories(true);
      const response = await CategoriesIdService(categoryId);
      const {
        status,
        data: { category },
      } = response;
      if (status === 200) {
        setIsLoadingCategories(false);
        categoriesDispatch({ type: GET_CATEGORY_DETAILS, payload: category });
        booksDispatch({
          type: CATEGORY_FILTER,
          payload: category.categoryName,
        });
      }
    } catch (err) {
      setIsErrorCategories(true);
      console.error(err);
    }
  };

  return (
    <CategoriesContext.Provider
      value={{
        isLoadingCategories,
        isErrorCategories,
        categoriesState,
        categoriesDispatch,
        getCategoryById,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);
