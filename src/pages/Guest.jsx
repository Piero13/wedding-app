import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegImages } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";
import GuestUploadForm from "../features/goldenbook/GuestUploadForm";
import { useAuth } from "../hooks/useAuth";

export default function Guest() {
  const {guest} = useAuth();
  console.log(guest)

  return (
    <Container className="py-5 px-4 text-center d-flex flex-column align-items-center">

      <h2 className="mb-5 hero-title text-primary">
        Bienvenue {guest.name} ❤️
      </h2>

      <div className="w-18 p-3 pb-4 mb-4 rounded-3 border border-primary bg-white d-flex flex-column align-items-center">
        <p className="mb-3">
          <FaRegImages className="fs-4 me-2 text-primary" />
          Découvrez les souvenirs de cette journée unique 
        </p>

        <Button as={Link} to="/guest/gallery" variant="primary" className="border-primaryDark w-10 bs-dark rounded-5 mx-auto">
          Galerie
        </Button>
      </div>

      <div className="w-18 p-3 pb-4 mb-4 rounded-3 border border-primary bg-white d-flex flex-column align-items-center">
        <p className="mb-3">
          <FaBookOpen className="fs-4 me-2 text-primary" />
          Laissez un message dans notre livre d'or 
        </p>

        <Button as={Link} to="/guest/guestbook" variant="primary" className="w-10 border-primaryDark bs-dark rounded-5 mx-auto">
          Livre d’or
        </Button>
      </div>

      <div className="w-18 p-3 pb-4 mb-4 rounded-3 border border-primary bg-white d-flex flex-column align-items-center">
        <GuestUploadForm />
      </div>

    </Container>
  );
}