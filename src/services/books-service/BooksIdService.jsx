import axios from "axios";

export const BooksIdService = async (productId) =>
  await axios.get(`/api/products/${productId}`);
