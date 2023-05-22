import axios from "axios";

export const SignUpService = async (email, password, firstName, lastName) =>
  await axios.post("/api/auth/signup", {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  });
