import { Container } from "react-bootstrap";
import GuestbookList from "../features/goldenbook/GuestbookList";

export default function GoldenBookPublic() {
  return (
    <Container className="py-5">
      <h2 className="text-center mb-4 hero-title text-primary">
        Livre d’or
      </h2>

      <GuestbookList publicView />
    </Container>
  );
}