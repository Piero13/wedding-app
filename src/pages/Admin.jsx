import { useEffect, useState } from "react";
import { fetchPhotos as fetchPhotosService } from "../services/admin/adminService";
import { Container, Row, Col } from "react-bootstrap";
import UploadForm from "../features/admin/UploadForm";
import PhotoList from "../features/admin/PhotoList";
import GuestbookModeration from "../features/admin/GuestbookModeration";
import CategoryManager from "../features/admin/CategotyManager"

export default function Admin() {
    const [photos, setPhotos] = useState([]);

    const loadPhotos = async () => {
        try {
            const data = await fetchPhotosService();
            setPhotos(data);
        } catch (err) {
            console.error("Error fetching photos:", err);
        }
    };

    useEffect(() => {
        const loadPhotos = async () => {
            try {
                const data = await fetchPhotosService();
                setPhotos(data);
            } catch (err) {
                console.error("Error fetching photos:", err);
            }
        };

        loadPhotos();
    }, []);;
    
    return (
        <Container className="py-5">
            <h2 className="mb-4 text-center">Admin Dashboard</h2>

            <CategoryManager />

            <section>
                <Row>
                    <Col sm={12} lg={5}>
                        <UploadForm onUploadSuccess={loadPhotos}/>
                    </Col>
                    <Col sm={12} lg={7}>
                        <PhotoList photos={photos} refresh={loadPhotos}/>                
                    </Col>
                </Row>
            </section>

            
            <GuestbookModeration />
        </Container>
    );
}