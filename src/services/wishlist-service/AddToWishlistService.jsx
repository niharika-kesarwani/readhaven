import axios from "axios";

export const addToWishlistService = async (product, encodedToken) =>
  await axios.post(
    "/api/user/wishlist",
    { product },
    { headers: { authorization: encodedToken } }
  );
