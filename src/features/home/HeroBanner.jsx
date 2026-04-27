import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function HeroBanner({ guest }) {
  const getRedirectPath = () =>
    guest ? "/guest" : "/login";

  const getLabel = () =>
    guest
      ? "Accéder à mon espace"
      : "Accéder à l’espace invité";

  return (
    <section className="hero-banner d-flex align-items-center text-center min-vh-75 py-6 py-lg-8">

      <Container>

        <motion.h1
          className="hero-title text-primary mb-3"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Mariage Alexa & Pierre ❤️
        </motion.h1>

        <motion.div
          className="divider mx-auto my-4"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2 }}
        />

        <motion.p
          className="text-muted fs-5 mb-4 mx-auto"
          style={{ maxWidth: 620 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          Une journée unique, entourés de ceux qui comptent le plus.
        </motion.p>

        <motion.h3
          className="text-primary script mb-4 fs-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          30 Avril 2027
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Button
            as={Link}
            to={getRedirectPath()}
            className="cta-button rounded-pill px-4 py-2 bs-dark"
          >
            {getLabel()}
          </Button>
        </motion.div>

      </Container>

    </section>
  );
}