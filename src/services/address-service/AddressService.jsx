import axios from "axios";

export const AddressService = async (encodedToken) =>
  await axios.get("/api/user/addresses", {
    headers: { authorization: encodedToken },
  });
