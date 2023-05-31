import axios from "axios";

export const removeAddressService = async (addressId, encodedToken) =>
  await axios.delete(`/api/user/address/remove/${addressId}`, {
    headers: { authorization: encodedToken },
  });
