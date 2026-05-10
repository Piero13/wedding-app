import { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaRing, FaCamera, FaGlassCheers, FaClock, FaExternalLinkAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

import PhotoModal from "../photos/PhotoModal";

export default function WeddingInfos() {
    const [selectedIndex, setSelectedIndex] = useState(null);

    /* Photos modal dataset */
    const allPhotos = [
        {
            id: 1,
            image_url:
                "/images/wedding/mairie.png",
            title: "Mairie du 10ème",
        },

        {
            id: 2,
            image_url:
                "/images/wedding/parc_1.png",
            title: "Parc de la Maison Blanche",
        },

        {
            id: 3,
            image_url:
                "/images/wedding/parc_2.png",
            title: "Parc de la Maison Blanche",
        },

        {
            id: 4,
            image_url:
                "/images/wedding/parc_3.png",
            title: "Parc de la Maison Blanche",
        },

        {
            id: 5,
            image_url:
                "/images/wedding/jardin_passions_1.png",
            title: "Le Jardin des Passions - l'extérieur",
        },

        {
            id: 6,
            image_url:
                "/images/wedding/jardin_passions_2.png",
            title: "Le Jardin des Passions - la salle",
        },
    ];

    /* Sections dataset */
    const sections = [
        {
            icon: <FaRing className="fs-4" />,
            title: "Cérémonie",
            hour: "14h00",
            address: "Mairie du 10ème - 150 Bd Paul Claudel, 13009 Marseille",
            photos: [0],
            website: "https://www.marseille9-10.fr/"
        },

        {
            icon: <FaCamera className="fs-4" />,
            title: "Séance Photo",
            hour: "15h00",
            address: "Parc de la Maison Blanche - 150 Bd Paul Claudel, 13009 Marseille",
            photos: [1, 2, 3],
            website: "https://www.marseille.fr/environnement/presentation"
        },

        {
            icon: <FaGlassCheers className="fs-4" />,
            title: "Fête",
            hour: "18h00",
            address: "Le Jardin Des Passions - 902 RN8, 13780 Cuges-Les-Pins",
            photos: [4, 5],
            website: "https://www.jardindespassions.com/",
            },
    ];

    return (
        <section className="py-6 py-lg-8">
            <Container>
                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="script text-primary fs-1 mb-3">
                        Déroulement de la journée
                    </h2>

                    <p className="text-muted mx-auto mw-22">
                        Voici les différents moments qui rythmeront cette journée unique.
                    </p>
                </div>

                {/* Card */}
                <Row className="g-6 g-lg-7">
                    {sections.map((section, index) => (
                        <Col 
                            xs={12} 
                            md={6} 
                            lg={4}
                            key={section.title}
                        >
                        
                            <motion.div
                                initial={{ opacity: 0, y: 30, }}
                                whileInView={{ opacity: 1, y: 0, }}
                                viewport={{ once: true, }}
                                transition={{ duration: 0.5, delay: index * 0.15, }}
                            >
                                <Card className="h-100 border-primary bs-primaryDark wedding-info-card">
                                    <Card.Body className="p-4 d-flex flex-column ">

                                        {/* Header */}
                                        <div className="d-flex justify-content-center align-items-center mb-3">
                                            {/* Icon */}
                                            <div className="text-primary me-2">
                                                {section.icon}
                                            </div>

                                            {/* Title */}
                                            <h3 className="mb-0">
                                                {section.title}
                                            </h3>
                                        </div>

                                        {/* Hour */}
                                        <div className="d-flex align-items-center mb-3 text-muted">
                                            <div className="me-2">
                                                <FaClock />
                                            </div>
                                            <p className="mb-0">{section.hour}</p>
                                        </div>

                                        {/* Address */}
                                        <div className="d-flex align-items-start mb-4 text-muted">
                                            <div className="me-2">
                                                <FaLocationDot />
                                            </div>
                                            <p className="mb-0">{section.address}</p>
                                        </div>

                                        {/* PHOTOS SLIDER */}
                                        <Swiper
                                            modules={[Pagination]}
                                            pagination={{clickable: true,}}
                                            spaceBetween={12}
                                            slidesPerView={1}
                                            className="wedding-info-swiper w-100"
                                        >

                                        {section.photos.map((photoIndex) => (
                                            <SwiperSlide key={photoIndex}>
                                                <div
                                                    className="wedding-info-photo border border-primary rounded-4"
                                                    onClick={() => setSelectedIndex(photoIndex)}
                                                >

                                                    <img
                                                        src={allPhotos[photoIndex].image_url}
                                                        alt={allPhotos[photoIndex].title}
                                                        loading="lazy"
                                                        className="img-fluid"
                                                    />

                                                </div>
                                            </SwiperSlide>

                                        ))}

                                        </Swiper>

                                        {/* Website link */}
                                        {section.website && (
                                            <Button
                                                href={section.website}
                                                target="_blank"
                                                rel="noreferrer"
                                                variant="primary"
                                                className="mt-4 rounded-pill mx-auto bs-dark border-primarydark px-3 py-2 d-flex align-items-center"
                                            >
                                                <p className="mb-0">Découvrir le lieu</p>
                                                <FaExternalLinkAlt className="ms-2" />
                                            </Button>
                                        )}
                                    </Card.Body>
                                </Card>
                            </motion.div>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Modal */}
            <PhotoModal 
                photos={allPhotos}
                initialIndex={selectedIndex}
                onHide={() => setSelectedIndex(null)}
            />
        </section>
    )
}