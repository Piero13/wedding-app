import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import {
  fetchPhotos as fetchPhotosService,
} from "../services/admin/adminService";

import CategoryManager from "../features/admin/CategoryManager";
import UploadForm from "../features/admin/UploadForm";
import PhotoList from "../features/photos/PhotoList";
import AdminLayout from "../layouts/AdminLayout";

export default function PhotosManager() {
    const [photos, setPhotos] = useState([]);

    const loadPhotos = async () => {
        const data = await fetchPhotosService();
        setPhotos(data);
    };

    useEffect(() => {
        const loadPhotos = async () => {
                const data = await fetchPhotosService();
                setPhotos(data);
            };
        loadPhotos();
    }, []);

    return (
        <AdminLayout>
            <Container>
                <h3 className="text-center text-primary hero-title mb-5">
                    Gestion Photos
                </h3>

                <CategoryManager />

                <Row className="mt-4">
                    <Col sm={12} lg={5}>
                        <UploadForm onUploadSuccess={loadPhotos} />
                    </Col>

                    <Col sm={12} lg={7}>
                        <PhotoList photos={photos} refresh={loadPhotos} />
                    </Col>
                </Row>
            </Container>
        </AdminLayout>

    );
}