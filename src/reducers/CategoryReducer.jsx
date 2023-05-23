import { categoryTypes } from "../constants/CategoryTypes";

const { DISPLAY_CATEGORIES } = categoryTypes;

export const categoriesReducer = (state, { type, payload }) => {
  switch (type) {
    case DISPLAY_CATEGORIES:
      return { ...state, categories: payload };
    default:
      return state;
  }
};

export const initialCategoriesState = {
  categories: [],
};
