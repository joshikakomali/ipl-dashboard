import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userRole = localStorage.getItem("userRole");

  return (userRole === "admin" || userRole === "manager") ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;