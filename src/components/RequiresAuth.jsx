import { Navigate, useLocation } from "react-router";
import { useAuth } from "../index";

export const RequiresAuth = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  return token ? children : <Navigate to="/login" state={{ from: location }} />;
};
