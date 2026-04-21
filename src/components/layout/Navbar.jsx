import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

/**
 * Main navigation bar
 */
export default function AppNavbar() {
  const { user, isAdmin, guest, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-gradient-secondary shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          ❤️ Mariage
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto align-items-center gap-2">

            <Nav.Link className="nav-link" as={Link} to="/">
              Home
            </Nav.Link>

            <Nav.Link className="nav-link" as={Link} to="/guestbook/public">
              Livre d'or
            </Nav.Link>

            {/* Non connecté */}
            {!user && !guest && (
              <Nav.Link className="nav-link" as={Link} to="/login">
                Connexion
              </Nav.Link>
            )}

            {/* Guest */}
            {guest && (
              <>
                <Nav.Link className="nav-link" as={Link} to="/guest">
                  Mon espace
                </Nav.Link>

                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={handleLogout}
                >
                  Se déconnecter
                </Button>
              </>
            )}

            {/* Admin */}
            {isAdmin && (
              <>
                <Nav.Link className="nav-link" as={Link} to="/admin">
                  Admin
                </Nav.Link>

                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={handleLogout}
                >
                  Se déconnecter
                </Button>
              </>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}