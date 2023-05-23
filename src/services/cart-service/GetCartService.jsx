import axios from "axios";

export const GetCartService = async (encodedToken) =>
  await axios.get("/api/user/cart", {
    headers: { authorization: encodedToken },
  });
