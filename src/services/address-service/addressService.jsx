import axios from "axios";

export const addressService = async (encodedToken) =>
  await axios.get("/api/user/addresses", {
    headers: { authorization: encodedToken },
  });
