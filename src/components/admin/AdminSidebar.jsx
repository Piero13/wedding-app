import { Nav, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

import {
  FaChartPie,
  FaImages,
  FaBookOpen,
  FaUsers,
  FaHeart,
  FaTimes,
} from "react-icons/fa";

export default function AdminSidebar({ closeMenu }) {
  const { pathname } = useLocation();

  const links = [
    { label: "Dashboard", path: "/admin", icon: <FaChartPie /> },
    { label: "Photos mariage", path: "/admin/photos", icon: <FaImages /> },
    { label: "Photos souvenirs", path: "/admin/couple-photos", icon: <FaImages /> },
    { label: "Livre d'or", path: "/admin/goldenbook", icon: <FaBookOpen /> },
    { label: "Invités", path: "/admin/guests", icon: <FaUsers /> },
  ];

  return (
    <aside className="admin-sidebar">

      {/* HEADER */}
      <div className="p-4 text-center border-bottom border-primary position-relative">
        
        {/* Close button (mobile only) */}
        <Button
          variant="light"
          size="sm"
          className="position-absolute top-0 end-0 m-2 d-lg-none border-primary text-primary"
          onClick={closeMenu}
        >
          <FaTimes />
        </Button>

        <h4 className="hero-title text-primary m-0">
          <FaHeart className="me-2" />
          Mariage
        </h4>
      </div>

      {/* NAV */}
      <Nav className="flex-column p-3 gap-2">
        {links.map((item) => (
          <Nav.Link
            key={item.path}
            as={Link}
            to={item.path}
            onClick={closeMenu}
            className={`admin-link ${
              pathname === item.path ? "active" : ""
            }`}
          >
            <span className="me-2">{item.icon}</span>
            {item.label}
          </Nav.Link>
        ))}
      </Nav>
    </aside>
  );
}