import axios from "axios";

export const AddToCartService = async (product, encodedToken) =>
  await axios.post(
    "/api/user/cart",
    { product },
    { headers: { authorization: encodedToken } }
  );
