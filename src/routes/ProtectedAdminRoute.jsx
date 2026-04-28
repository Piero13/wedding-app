import { Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";

/**
 * Protect admin routes
 */
export default function ProtectedAdminRoute({ children }) {
  const { user, isAdmin, loading } = useAuth();

  // attend restauration session
  if (loading && !user) {
    return null;
  }

  // pas connecté
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // connecté mais pas admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
