import axios from "axios";

export const wishlistService = async (encodedToken) => {
  return await axios.get("/api/user/wishlist", {
    headers: { authorization: encodedToken },
  });
};
