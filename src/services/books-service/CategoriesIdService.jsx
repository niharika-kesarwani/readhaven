import axios from "axios";

export const CategoriesIdService = async (categoryId) =>
  await axios(`/api/categories/${categoryId}`);
