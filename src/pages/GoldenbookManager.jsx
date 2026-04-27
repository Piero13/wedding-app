import { Container } from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";
import GuestbookModeration from "../features/admin/GuestbookModeration";

export default function GoldenbookManager() {
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