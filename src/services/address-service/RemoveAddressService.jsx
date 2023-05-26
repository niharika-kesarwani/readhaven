import axios from "axios";

export const RemoveAddressService = async (addressId, encodedToken) =>
  await axios.delete(`/api/user/address/remove/${addressId}`, {
    headers: { authorization: encodedToken },
  });
