import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function Countdown() {
  const weddingDate = new Date("2027-04-30T00:00:00");

  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = weddingDate - now;

      if (diff <= 0) return clearInterval(interval);

      setTimeLeft({
        Jours: Math.floor(
          diff / (1000 * 60 * 60 * 24)
        ),
        Heures: Math.floor(
          (diff / (1000 * 60 * 60)) % 24
        ),
        Minutes: Math.floor(
          (diff / 1000 / 60) % 60
        ),
        Secondes: Math.floor(
          (diff / 1000) % 60
        ),
      });
    }, 1000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="py-6 py-lg-8 bg-gradient-secondaryLight">

      <Container>

        <div className="text-center mb-5">
          <h2 className="script text-primary fs-1 mb-3">
            Avant le grand jour
          </h2>

          <p className="text-muted">
            Le compte à rebours est lancé.
          </p>
        </div>

        <Row className="g-4 justify-content-center">

          {Object.entries(timeLeft).map(
            ([key, value]) => (
              <Col
                xs={6}
                md={2}
                key={key}
              >
                <Card className="border-primary text-center p-4 h-100 countdown-card bs-primaryDark">

                  <h2 className="text-primary mb-2">
                    {value}
                  </h2>

                  <small className="text-muted">
                    {key}
                  </small>

                </Card>
              </Col>
            )
          )}

        </Row>

      </Container>

    </section>
  );
}