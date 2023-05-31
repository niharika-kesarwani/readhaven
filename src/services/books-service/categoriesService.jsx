import axios from "axios";

export const categoriesService = async () => await axios.get("/api/categories");
