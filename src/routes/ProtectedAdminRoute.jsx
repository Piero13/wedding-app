import { Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";

/**
 * Protect admin routes
 */
export default function ProtectedAdminRoute({ children }) {
  const { user, isAdmin, loading } = useAuth();

  // waiting session restauration
  if (loading && !user) {
    return null;
  }

  // not connected
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // connected not admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
