import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

/**
 * Main navigation bar
 */
export default function AppNavbar() {
  const { user, isAdmin, guest } = useAuth();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  console.log(guest)
  console.log(guest)
  console.log(isAdmin)

  return (
    <Navbar expand="lg" className="bg-white shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          ❤️ Mariage
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto align-items-center gap-2">

            {/* Non connecté */}
            {!user && !guest && (
              <Nav.Link as={Link} to="/login">
                Connexion
              </Nav.Link>
            )}

            {/* Guest */}
            {guest && (
              <>
                <span className="me-2">
                  Bonjour {guest.name} ❤️
                </span>

                <Nav.Link as={Link} to="/guest">
                  Mon espace
                </Nav.Link>

                <Button
                  variant="outline-danger"
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
                <Nav.Link as={Link} to="/admin">
                  Admin
                </Nav.Link>

                <Button
                  variant="outline-dark"
                  size="sm"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}