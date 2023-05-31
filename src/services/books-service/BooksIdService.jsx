import axios from "axios";

export const booksIdService = async (productId) =>
  await axios.get(`/api/products/${productId}`);
