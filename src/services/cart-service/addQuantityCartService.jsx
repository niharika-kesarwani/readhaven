import axios from "axios";

export const addQuantityCartService = async (
  productId,
  encodedToken,
  actionType
) =>
  await axios.post(
    `/api/user/cart/${productId}`,
    { action: { type: actionType } },
    {
      headers: { authorization: encodedToken },
    }
  );
