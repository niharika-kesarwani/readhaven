import axios from "axios";

export const BooksService = async () => await axios.get("/api/products");
