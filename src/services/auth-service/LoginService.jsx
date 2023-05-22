import axios from "axios";

export const LoginService = async (email, password) =>
  await axios.post("/api/auth/login", {
    email: email,
    password: password,
  });
