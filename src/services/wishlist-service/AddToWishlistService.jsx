import axios from "axios";

export const AddToWishlistService = async (product, encodedToken) =>
  await axios.post(
    "/api/user/wishlist",
    { product },
    { headers: { authorization: encodedToken } }
  );
