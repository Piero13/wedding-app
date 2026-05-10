import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import { fetchPublicCouplePhotos } from "../../services/admin/couplePhotosService";
import PhotoModal from "../../features/photos/PhotoModal";

export default function CoupleGallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);

  /**
   * Load public photos
   */
  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const data = await fetchPublicCouplePhotos();
        setPhotos(data || []);
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };

    loadPhotos();
  }, []);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner />
      </Container>
    );
  }

  if (!photos.length) return null;

  return (
    <section className="py-6 py-lg-8 ">

      <Container>

        {/* HEADER */}
        <div className="text-center mb-6 mb-lg-8">

          <h2 className="script text-primary fs-1 mb-3">
            Nos Plus Beaux Souvenirs
          </h2>

          <p className="text-muted mx-auto"
             style={{ maxWidth: 620 }}>
            Quelques instants précieux de notre histoire,
            partagés avec vous.
          </p>

        </div>

        {/* GRID */}
        <Row className="g-4">

          {photos.map((photo, index) => (
            <Col
              xs={12}
              sm={6}
              lg={4}
              key={photo.id}
            >
              <motion.div
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
              >
                <div
                  className="couple-photo-card border border-primary bs-dark"
                  onClick={() =>
                    setSelectedIndex(index)
                  }
                >
                  <img
                    src={photo.image_url}
                    alt={photo.title}
                    loading="lazy"
                    className="img-fluid w-100"
                  />

                  <div className="couple-photo-overlay">

                    <h5 className="mb-1">
                      {photo.title}
                    </h5>

                    {photo.description && (
                      <p className="small mb-0">
                        {photo.description}
                      </p>
                    )}

                  </div>

                </div>
              </motion.div>
            </Col>
          ))}

        </Row>

      </Container>

      {/* MODAL */}
      <PhotoModal
        photos={photos}
        initialIndex={selectedIndex}
        onHide={() =>
          setSelectedIndex(null)
        }
      />

    </section>
  );
}