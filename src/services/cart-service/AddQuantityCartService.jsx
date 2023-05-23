import axios from "axios";

export const AddQuantityCartService = async (
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
