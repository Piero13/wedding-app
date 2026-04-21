import { Container } from "react-bootstrap";
import GuestbookList from "../features/guest/GuestbookList";

export default function GoldenBookPublic() {
  return (
    <Container className="py-5">
      <h2 className="text-center fs-1 mb-4 hero-title text-primary">
        Livre d’or
      </h2>

      <GuestbookList publicView />
    </Container>
  );
}