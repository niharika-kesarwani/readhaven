import { filterTypes } from "../constants/filterTypes";

const {
  DISPLAY_BOOKS,
  SEARCH_FILTER,
  SORT_FILTER,
  RATING_FILTER,
  CATEGORY_FILTER,
  CLEAR_FILTER,
  GET_PRODUCT_DETAILS,
} = filterTypes;

export const booksReducer = (state, { type, payload }) => {
  switch (type) {
    case DISPLAY_BOOKS:
      return { ...state, books: payload };
    case SEARCH_FILTER:
      return { ...state, searchInput: payload };
    case SORT_FILTER:
      return { ...state, sortInput: payload };
    case RATING_FILTER:
      return { ...state, ratingInput: payload };
    case CATEGORY_FILTER:
      return state.categoryInput.includes(payload)
        ? {
            ...state,
            categoryInput: state.categoryInput.filter(
              (category) => category !== payload
            ),
          }
        : {
            ...state,
            categoryInput: [...state.categoryInput, payload],
          };
    case CLEAR_FILTER:
      return {
        ...initialBooksState,
        books: payload,
      };
    case GET_PRODUCT_DETAILS:
      return { ...state, bookDetail: payload };
    default:
      return state;
  }
};

export const initialBooksState = {
  books: [],
  searchInput: "",
  sortInput: "",
  ratingInput: 1.0,
  categoryInput: [],
  bookDetail: {},
};
