import axios from "axios";

export const WishlistService = async (encodedToken) => {
  return await axios.get("/api/user/wishlist", {
    headers: { authorization: encodedToken },
  });
};
