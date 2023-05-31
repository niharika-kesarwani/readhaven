import axios from "axios";

export const addAddressService = async (newAddress, encodedToken) =>
  await axios.post(
    "/api/user/address/add",
    { address: newAddress },
    {
      headers: { authorization: encodedToken },
    }
  );
