import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Guest() {

  return (
    <Container className="py-5 text-center">

      <h2 className="mb-4 hero-title text-primary">
        Bienvenue ❤️
      </h2>

      <p className="mb-5">
        Découvrez les souvenirs de cette journée unique
      </p>

      <div className="d-flex justify-content-center gap-3">

        <Button className="w-10" as={Link} to="/guest/gallery">
          Galerie
        </Button>

        <Button className="w-10" as={Link} to="/guest/guestbook" variant="outline-danger">
          Livre d’or
        </Button>

      </div>

    </Container>
  );
}