import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import {
  FaHeart,
  FaImages,
  FaEye,
} from "react-icons/fa";

import CoupleUploadForm from "../features/admin/CoupleUploadForm";
import CouplePhotosList from "../features/admin/CouplePhotosList";

import {
  fetchAdminCouplePhotos,
  getCouplePhotosCount,
  getActiveCouplePhotosCount,
} from "../services/admin/couplePhotosService";

import AdminLayout from "../layouts/AdminLayout";

export default function CouplePhotosManager() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        total: 0,
        active: 0,
    });

    /**
     * Chargement principal
     */
    const loadData = async () => {
        try {
        setLoading(true);

        const [
            photosData,
            total,
            active,
        ] = await Promise.all([
            fetchAdminCouplePhotos(),
            getCouplePhotosCount(),
            getActiveCouplePhotosCount(),
        ]);

        setPhotos(photosData || []);
        setStats({
            total,
            active,
        });

        } catch (err) {
        console.error(err);
        }

        setLoading(false);
    };

    useEffect(() => {
        const loadData = async () => {
            try {
            setLoading(true);

            const [
                photosData,
                total,
                active,
            ] = await Promise.all([
                fetchAdminCouplePhotos(),
                getCouplePhotosCount(),
                getActiveCouplePhotosCount(),
            ]);

            setPhotos(photosData || []);
            setStats({
                total,
                active,
            });

            } catch (err) {
            console.error(err);
            }

            setLoading(false);
        };
        loadData();
    }, []);

    if (loading) {
        return (
        <Container className="py-5 text-center">
            <Spinner />
        </Container>
        );
    }

    return (
        <AdminLayout>
            <Container className="pt-5 pb-10">

            {/* HEADER */}
            <div className="mb-5 text-center text-lg-start">
                <h1 className="hero-title text-primary mb-2">
                Photos du Couple
                </h1>

                <p className="text-muted mb-0">
                Gérez les souvenirs affichés sur la page d’accueil.
                </p>
            </div>

            {/* KPI */}
            <Row className="g-4 mb-5">

                <Col md={4}>
                <Card className="border-primary bs-dark h-100 text-center p-4">
                    <FaImages
                    className="text-primary mx-auto mb-3"
                    size={28}
                    />
                    <h6>Total photos</h6>
                    <h2 className="text-primary mb-0">
                    {stats.total}
                    </h2>
                </Card>
                </Col>

                <Col md={4}>
                <Card className="border-primary bs-dark h-100 text-center p-4">
                    <FaEye
                    className="text-primary mx-auto mb-3"
                    size={28}
                    />
                    <h6>Photos visibles</h6>
                    <h2 className="text-primary mb-0">
                    {stats.active}
                    </h2>
                </Card>
                </Col>

                <Col md={4}>
                <Card className="border-primary bs-dark h-100 text-center p-4">
                    <FaHeart
                    className="text-primary mx-auto mb-3"
                    size={28}
                    />
                    <h6>Section Home</h6>
                    <h2 className="text-primary mb-0">
                    Active
                    </h2>
                </Card>
                </Col>

            </Row>

            {/* MAIN CONTENT */}
            <Row className="g-4">

                <Col lg={5}>
                <CoupleUploadForm
                    onUploadSuccess={loadData}
                />
                </Col>

                <Col lg={7}>
                <CouplePhotosList
                    photos={photos}
                    loading={loading}
                    refresh={loadData}
                />
                </Col>

            </Row>

            </Container>
        </AdminLayout>

    );
}