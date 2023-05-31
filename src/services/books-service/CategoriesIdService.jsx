import axios from "axios";

export const categoriesIdService = async (categoryId) =>
  await axios(`/api/categories/${categoryId}`);
