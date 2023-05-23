import axios from "axios";

export const DeleteWishlistService = async (productId, token) =>
  await axios.delete(`/api/user/wishlist/${productId}`, {
    headers: { authorization: token },
  });
