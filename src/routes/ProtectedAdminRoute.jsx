import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/**
 * Protect admin routes
 */
export default function ProtectedAdminRoute({ children }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
