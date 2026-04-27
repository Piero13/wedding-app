import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackVisit } from "../../services/admin/analyticsService";

export default function VisitTracker() {
  const location = useLocation();

  useEffect(() => {
    trackVisit(location.pathname);
  }, [location]);

  return null;
}