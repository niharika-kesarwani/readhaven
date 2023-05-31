import axios from "axios";

export const addToCartService = async (product, encodedToken) =>
  await axios.post(
    "/api/user/cart",
    { product },
    { headers: { authorization: encodedToken } }
  );
