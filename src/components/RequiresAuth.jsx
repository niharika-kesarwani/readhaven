import { Navigate, useLocation } from "react-router";
import { useAuth } from "../index";

export const TokenRequiresAuth = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  return token ? children : <Navigate to="/login" state={{ from: location }} />;
};

export const CurrentUserRequiresAuth = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  return currentUser ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};
