import { categoryTypes } from "../constants/categoryTypes";

const { DISPLAY_CATEGORIES, GET_CATEGORY_DETAILS } = categoryTypes;

export const categoriesReducer = (state, { type, payload }) => {
  switch (type) {
    case DISPLAY_CATEGORIES:
      return { ...state, categories: payload };
    case GET_CATEGORY_DETAILS:
      return { ...state, categoryDetail: payload };
    default:
      return state;
  }
};

export const initialCategoriesState = {
  categories: [],
  categoryDetail: {},
};
