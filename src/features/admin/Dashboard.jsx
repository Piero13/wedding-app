// src/features/admin/Dashboard.jsx
import { useEffect, useState } from "react";
import { Row, Col, Card, Badge, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import {
  getPhotosCount,
  getPendingPhotosCount,
  getMessagesCount,
  getPendingMessagesCount,
} from "../../services/admin/adminService";

import {
  FaImages,
  FaClock,
  FaEnvelope,
  FaComments,
  FaArrowRight,
} from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    photos: 0,
    pendingPhotos: 0,
    messages: 0,
    pendingMessages: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [
          photos,
          pendingPhotos,
          messages,
          pendingMessages,
        ] = await Promise.all([
          getPhotosCount(),
          getPendingPhotosCount(),
          getMessagesCount(),
          getPendingMessagesCount(),
        ]);

        setStats({
          photos,
          pendingPhotos,
          messages,
          pendingMessages,
        });
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };

    loadStats();
  }, []);

  const cards = [
    {
      title: "Galerie Photos",
      text: "Gérer les uploads et modérer les images.",
      icon: <FaImages className="fs-4 fs-md-3 text-light" />,
      value: stats.photos,
      path: "/admin/photos",
      variant: "primary",
    },
    {
      title: "Photos en attente",
      text: "Valider les nouvelles photos invitées.",
      icon: <FaClock className="fs-4 fs-md-3 text-light" />,
      value: stats.pendingPhotos,
      path: "/admin/photos",
      variant: "primary",
    },
    {
      title: "Livre d’or",
      text: "Consulter tous les messages reçus.",
      icon: <FaEnvelope className="fs-4 fs-md-3 text-light" />,
      value: stats.messages,
      path: "/admin/goldenbook",
      variant: "primary",
    },
    {
      title: "Messages en attente",
      text: "Approuver les nouveaux messages.",
      icon: <FaComments className="fs-4 fs-md-3 text-light" />,
      value: stats.pendingMessages,
      path: "/admin/goldenbook",
      variant: "primary",
    },
  ];

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="mb-5">

      <div className="mb-4">
        <h2 className="mb-1 text-dark fw-bold">
          Vue rapide
        </h2>

        <p className="text-muted mb-0">
          Gérez votre site mariage en un coup d'œil.
        </p>
      </div>

      <Row className="g-4">
        {cards.map((card, i) => (
          <Col md={6} xl={3} key={i}>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: i * 0.08,
              }}
            >
              <Card
                className="dashboard-v2-card h-100 border-primary shadow-sm"
                onClick={() => navigate(card.path)}
              >
                <Card.Body className="p-4 d-flex flex-column">

                  {/* top */}
                  <div className="d-flex justify-content-between align-items-start mb-4">

                    <div
                      className={`d-flex align-items-center bg-primary justify-content-center w-7 h-7 w-lg-8 h-lg-8 rounded-4 ${card.variant}`}
                    >
                      {card.icon}
                    </div>

                    <Badge
                      bg={
                        card.variant === "danger"
                          ? "danger"
                          : "primary"
                      }
                      className="rounded-pill px-3 py-2 fs-6"
                    >
                      {card.value}
                    </Badge>

                  </div>

                  {/* body */}
                  <h5 className="fw-bold mb-2">
                    {card.title}
                  </h5>

                  <p className="text-muted small flex-grow-1 mb-4">
                    {card.text}
                  </p>

                  {/* footer */}
                  <div className="dashboard-v2-link">
                    Ouvrir
                    <FaArrowRight className="ms-2" />
                  </div>

                </Card.Body>
              </Card>
            </motion.div>

          </Col>
        ))}
      </Row>
    </section>
  );
}