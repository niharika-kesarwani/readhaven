import axios from "axios";

export const editAddressService = async (addressId, newAddress, encodedToken) =>
  await axios.post(
    `/api/user/address/edit/${addressId}`,
    { address: newAddress },
    {
      headers: { authorization: encodedToken },
    }
  );
