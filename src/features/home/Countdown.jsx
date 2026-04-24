import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

export default function Countdown() {
  const weddingDate = new Date("2027-04-30T00:00:00");

  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = weddingDate - now;

      if (diff <= 0) return clearInterval(interval);

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="text-center py-5">
      <h3 className="text-primary mb-4">⏳ Avant le grand jour</h3>

      <div className="d-flex justify-content-center gap-4 countdown">
        {Object.entries(timeLeft).map(([key, value]) => (
          <div key={key}>
            <h4 className="fs-1 shadow-text">{value}</h4>
            <small>{key}</small>
          </div>
        ))}
      </div>
    </Container>
  );
}