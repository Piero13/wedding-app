import { Container } from "react-bootstrap";
import GuestbookModeration from "../features/admin/GuestbookModeration";
import AdminLayout from "../layouts/AdminLayout";

export default function GoldenBookManager() {
  return (
    <AdminLayout>
        <Container className="py-5">
            <h1 className="text-center text-primary hero-title mb-5">
                Livre d’or
            </h1>

            <GuestbookModeration />
        </Container>
    </AdminLayout>
  );
}