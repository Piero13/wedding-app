import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

/**
 * Main navigation bar
 */
export default function AppNavbar() {
  const { user, isAdmin, guest, logout } = useAuth();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleLogout = async () => {
    await logout();
    setExpanded(false);
    navigate("/");
  };

  return (
    <Navbar 
      expand="lg" 
      className="bg-gradient-secondary shadow-sm"
      sticky="top"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <h1 className="fw-bold hero-title fs-4">Mariage Alexa & Pierre</h1>
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto align-items-center gap-2">

            <Nav.Link className="nav-link" as={Link} to="/" onClick={() => setExpanded(false)}>
              Home
            </Nav.Link>

            {/* <Nav.Link className="nav-link" as={Link} to="/guestbook/public">
              Livre d'or
            </Nav.Link> */}

            {guest ? (
              <Nav.Link className="nav-link" as={Link} to="/guest/guestbook" onClick={() => setExpanded(false)}>
                Livre d'or
              </Nav.Link>
            ) : (
              <Nav.Link className="nav-link" as={Link} to="/guestbook/public" onClick={() => setExpanded(false)}>
                Livre d'or
              </Nav.Link>
            )}

            {/* Non connecté */}
            {!user && !guest && (
              <Nav.Link 
                className="nav-link" 
                as={Link} 
                to="/login" 
                onClick={() => setExpanded(false)}
                aria-label="Se connecter"
              >
                Connexion
              </Nav.Link>
            )}

            {/* Guest or Admin gallery */}
            {(guest || isAdmin) && (
              <>
                <Nav.Link className="nav-link" as={Link} to={guest ? "/guest/gallery" : "/admin/gallery"} onClick={() => setExpanded(false)}>
                    Photos
                </Nav.Link>
              </>
            )}

            {/* Guest */}
            {guest && (
              <>
                <Nav.Link className="nav-link" as={Link} to="/guest" onClick={() => setExpanded(false)}>
                  Mon espace
                </Nav.Link>

                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={handleLogout}
                  aria-label="Se déconnecter"
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
                  aria-label="Se déconnecter"
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