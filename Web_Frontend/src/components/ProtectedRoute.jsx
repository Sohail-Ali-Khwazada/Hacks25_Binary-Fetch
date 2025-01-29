
import { Navigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const {authUser} = useAuthContext(); 

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
