import { useEffect, useState } from "react";
import { Row, Col, Card, Badge, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
  FaUsers,
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
      title: "Photos",
      text: "Gérer la galerie",
      icon: <FaImages size={28} />,
      value: stats.photos,
      path: "/admin/photos",
    },
    {
      title: "Photos en attente",
      text: "Validation requise",
      icon: <FaClock size={28} />,
      value: stats.pendingPhotos,
      path: "/admin/photos",
      danger: true,
    },
    {
      title: "Messages",
      text: "Livre d’or",
      icon: <FaEnvelope size={28} />,
      value: stats.messages,
      path: "/admin/goldenbook",
    },
    {
      title: "Messages attente",
      text: "Modération",
      icon: <FaUsers size={28} />,
      value: stats.pendingMessages,
      path: "/admin/goldenbook",
      danger: true,
    },
  ];

  if (loading) {
    return <Spinner className="d-block mx-auto mb-5" />;
  }

  return (
    <section className="mb-5">

      <h2 className="mb-4">Vue rapide</h2>

      <Row className="g-4">

        {cards.map((card, i) => (
          <Col md={6} lg={3} key={i}>

            <Card
              className="dashboard-card h-100 border-primary"
              onClick={() => navigate(card.path)}
            >
              <Card.Body>

                <div className="d-flex justify-content-between align-items-center mb-3">

                  <div className="text-primary">
                    {card.icon}
                  </div>

                  <Badge
                    bg={card.danger ? "danger" : "primary"}
                    className="fs-6 px-3 py-2"
                  >
                    {card.value}
                  </Badge>

                </div>

                <Card.Title>{card.title}</Card.Title>

                <Card.Text className="text-muted">
                  {card.text}
                </Card.Text>

              </Card.Body>
            </Card>

          </Col>
        ))}

      </Row>

    </section>
  );
}