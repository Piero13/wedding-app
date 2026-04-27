import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa6";

/**
 * Main navigation bar
 */
export default function AppNavbar() {
  const { user, isAdmin, guest, logout } = useAuth();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);

  const handleLogout = async () => {
    await logout();
    setExpanded(false);
    navigate("/");
  };

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  return (
    <Navbar 
      expand="lg" 
      className="bg-gradient-secondary shadow-sm h-9"
      sticky="top"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <h1 className="fw-bold hero-title fs-4 mb-0">Mariage Alexa & Pierre</h1>
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto align-items-center gap-3 my-3">

            <Nav.Link className="custom-nav-link" as={Link} to="/" onClick={() => setExpanded(false)}>
              Home
            </Nav.Link>

            {/* <Nav.Link className="nav-link" as={Link} to="/guestbook/public">
              Livre d'or
            </Nav.Link> */}

            {guest ? (
              <Nav.Link className="custom-nav-link" as={Link} to="/guest/guestbook" onClick={() => setExpanded(false)}>
                Livre d'or
              </Nav.Link>
            ) : (
              <Nav.Link className="custom-nav-link" as={Link} to="/guestbook/public" onClick={() => setExpanded(false)}>
                Livre d'or
              </Nav.Link>
            )}

            {/* Non connecté */}
            {!user && !guest && (
              <Nav.Link 
                className="custom-nav-link" 
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
                <Nav.Link className="custom-nav-link" as={Link} to={guest ? "/guest/gallery" : "/admin/gallery"} onClick={() => setExpanded(false)}>
                    Photos
                </Nav.Link>
              </>
            )}

            {/* Guest */}
            {guest && (
              <>
                <Nav.Link className="custom-nav-link" as={Link} to="/guest" onClick={() => setExpanded(false)}>
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
                <Nav.Link className="custom-nav-link" as={Link} to="/admin">
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

          {installPrompt && (
            <div className="d-flex flex-column align-items-center ms-lg-3 mt-3 mt-lg-0">
              <Button
                variant="secondary"
                className="border-primaryDark bs-dark mb-2 w-content"
                size="sm"
                onClick={async () => {
                  installPrompt.prompt();
                  await installPrompt.userChoice;
                  setInstallPrompt(null);
                }}
              >
                <FaDownload className="text-primary"/>
              </Button>
              <p className="m-0 fs-7">Installer l'app</p>
            </div>
          )}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}