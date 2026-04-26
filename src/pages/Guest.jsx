import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegImages } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";
import GuestUploadForm from "../features/goldenbook/GuestUploadForm";

export default function Guest() {

  return (
    <Container className="py-5 px-4 text-center d-flex flex-column">

      <h2 className="mb-5 hero-title text-primary">
        Bienvenue ❤️
      </h2>

      <p className="mb-3">
        Découvrez les souvenirs de cette journée unique 
        <FaRegImages className="fs-4 ms-2 mb-2" />
      </p>

      <Button as={Link} to="/guest/gallery" variant="primary" className="border-primaryDark w-10 bs-dark rounded-5 mb-5 mx-auto">
        Galerie
      </Button>

      <p className="mb-3">
        Laissez un message dans notre livre d'or 
        <FaBookOpen className="fs-4 ms-2 mb-2" />
      </p>

      <Button as={Link} to="/guest/guestbook" variant="primary" className="w-10 border-primaryDark bs-dark rounded-5 mx-auto mb-5">
        Livre d’or
      </Button>



      <GuestUploadForm />

    </Container>
  );
}