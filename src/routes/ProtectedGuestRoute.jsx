import { Navigate } from "react-router-dom";

/**
 * Protect guest routes
 */
export default function ProtectedGuestRoute({ children }) {
  const access = localStorage.getItem("guest_access");

  if (!access) return <Navigate to="/login" replace />;

  return children;
}
