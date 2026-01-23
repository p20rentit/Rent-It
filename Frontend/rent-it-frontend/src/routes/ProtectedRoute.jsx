import { Navigate } from "react-router-dom";
import { isLoggedIn, getRole } from "../utils/auth";

function ProtectedRoute({ children, allowedRoles }) {
  console.log("ROLE:", getRole());
  console.log("ALLOWED:", allowedRoles);

  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(getRole())) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;
