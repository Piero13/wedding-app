import { Button } from "react-bootstrap";
import {
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";

import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function AdminTopbar({ openMenu }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="admin-topbar px-4 py-3 bg-white border-bottom">

      <div className="d-flex justify-content-between align-items-center">

        <div className="d-flex align-items-center gap-3">

          <Button
            variant="light"
            className="d-lg-none"
            onClick={openMenu}
          >
            <FaBars />
          </Button>

          <h5 className="m-0">
            Dashboard Admin
          </h5>
        </div>

        <Button
          variant="outline-primary"
          size="sm"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="me-2" />
          Déconnexion
        </Button>
      </div>
    </header>
  );
}