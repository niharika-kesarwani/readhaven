import { createContext, useContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [showPassword, setShowPassword] = useState({
    login: false,
    signUp: false,
    signUpConfirm: false,
  });

  const toggleLoginPassword = () =>
    setShowPassword({ ...showPassword, login: !showPassword.login });

  const toggleSignUpPassword = () =>
    setShowPassword({ ...showPassword, signUp: !showPassword.signUp });

  const toggleSignUpConfirmPassword = () =>
    setShowPassword({
      ...showPassword,
      signUpConfirm: !showPassword.signUpConfirm,
    });

  return (
    <LoginContext.Provider
      value={{
        showPassword,
        toggleLoginPassword,
        toggleSignUpPassword,
        toggleSignUpConfirmPassword,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
