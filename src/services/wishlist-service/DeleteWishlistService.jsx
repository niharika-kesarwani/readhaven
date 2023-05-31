import axios from "axios";

export const deleteWishlistService = async (productId, token) =>
  await axios.delete(`/api/user/wishlist/${productId}`, {
    headers: { authorization: token },
  });
