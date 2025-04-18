import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Restricts route access based on authentication
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  console.log(user, "protected route")
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
