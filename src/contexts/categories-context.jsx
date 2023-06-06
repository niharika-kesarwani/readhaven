import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { categoriesService } from "../services/books-service/categoriesService";
import {
  categoriesReducer,
  initialCategoriesState,
} from "../reducers/categoryReducer";
import { filterTypes } from "../constants/filterTypes";
import { categoryTypes } from "../constants/categoryTypes";
import { categoriesIdService } from "../services/books-service/categoriesIdService";
import { useBooks } from "./../index";

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
    setIsLoadingCategories(true);
    try {
      const response = await categoriesService();
      const {
        status,
        data: { categories },
      } = response;
      if (status === 200) {
        categoriesDispatch({ type: DISPLAY_CATEGORIES, payload: categories });
        setIsLoadingCategories(false);
      }
    } catch (err) {
      setIsErrorCategories(true);
      console.error(err);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getCategoryById = async (categoryId) => {
    try {
      setIsLoadingCategories(true);
      const response = await categoriesIdService(categoryId);
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

  const getCategoryByName = (searchCategory) =>
    categoriesState?.categories?.find(
      ({ categoryName }) => categoryName === searchCategory
    );

  return (
    <CategoriesContext.Provider
      value={{
        isLoadingCategories,
        isErrorCategories,
        categoriesState,
        categoriesDispatch,
        getCategoryById,
        getCategoryByName,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);
