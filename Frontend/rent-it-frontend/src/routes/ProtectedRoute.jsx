import { Navigate } from "react-router-dom";
import { isLoggedIn, getRole } from "../utils/auth";

function ProtectedRoute({ children, allowedRoles }) {
  console.log("ROLE:", getRole());
  console.log("ALLOWED:", allowedRoles);

  // ❌ Not logged in → login page
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  // Get normalized role once
  const userRole = getRole();

  // ❌ Role not allowed → unauthorized page
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Access granted
  return children;
}

export default ProtectedRoute;
