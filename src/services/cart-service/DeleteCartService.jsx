import axios from "axios";

export const DeleteCartService = async (productId, encodedToken) =>
  await axios.delete(`/api/user/cart/${productId}`, {
    headers: { authorization: encodedToken },
  });
