import axios from "axios";

export const booksService = async () => await axios.get("/api/products");
