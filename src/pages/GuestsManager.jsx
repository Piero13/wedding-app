// src/pages/GuestsManager.jsx
import { Container } from "react-bootstrap";
import UploadGuest from "../features/guest/UploadGuest";
import AdminLayout from "../layouts/AdminLayout";

export default function GuestsManager() {
  return (
    <AdminLayout>
        <Container className="py-5">
            <h1 className="hero-title text-primary text-center mb-4">
                Gestion des invités
            </h1>

            <UploadGuest />
        </Container>
    </AdminLayout>
  );
}