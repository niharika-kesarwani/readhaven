import axios from "axios";

export const CategoriesService = async () => await axios.get("/api/categories");
