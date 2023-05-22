import { filterTypes } from "../constants/FilterTypes";

const { DISPLAY_BOOKS } = filterTypes;

export const booksReducer = (state, { type, payload }) => {
  switch (type) {
    case DISPLAY_BOOKS:
      return { ...state, books: payload };
    default:
      return state;
  }
};

export const initialBooksState = {
  books: [],
  filteredBooks: [],
  searchInput: "",
  sortInput: "",
  ratingInput: 1.0,
  categoryInput: [],
};
