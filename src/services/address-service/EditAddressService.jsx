import axios from "axios";

export const EditAddressService = async (addressId, newAddress, encodedToken) =>
  await axios.post(
    `/api/user/address/edit/${addressId}`,
    { address: newAddress },
    {
      headers: { authorization: encodedToken },
    }
  );
