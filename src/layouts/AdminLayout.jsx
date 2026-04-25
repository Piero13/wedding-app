import { useState } from "react";
import { Container, Row, Col, Offcanvas } from "react-bootstrap";

import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";

export default function AdminLayout({ children }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Container fluid className="p-0 min-vh-100 bg-light">

      {/* MOBILE MENU */}
      <Offcanvas
        show={showMenu}
        onHide={() => setShowMenu(false)}
        className="d-lg-none"
      >
        <Offcanvas.Body className="p-0">
          <AdminSidebar closeMenu={() => setShowMenu(false)} />
        </Offcanvas.Body>
      </Offcanvas>

      <Row className="g-0 min-vh-100">

        {/* Desktop sidebar */}
        <Col lg={2} className="d-none d-lg-block">
          <AdminSidebar />
        </Col>

        {/* Content */}
        <Col lg={10}>
          <AdminTopbar openMenu={() => setShowMenu(true)} />

          <main className="p-4 fade-page">
            {children}
          </main>
        </Col>

      </Row>
    </Container>
  );
}