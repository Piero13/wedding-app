import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function HeroBanner({ guest }) {
  const getRedirectPath = () => (guest ? "/guest" : "/login");
  const getLabel = () =>
    guest ? "Accéder à mon espace" : "Accéder à l’espace invité";

  return (
    <div className="hero-banner d-flex align-items-center text-center h-auto h-lg-18 py-6">
      <Container>
        <motion.h1
          className="hero-title text-primary mb-3"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Mariage Alexa & Pierre ❤️
        </motion.h1>

        <motion.div
          className="divider mx-auto my-3"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
        />

        <motion.p className="text-muted mb-4">
          Une journée unique, entourés de ceux qui comptent le plus.
        </motion.p>

        <motion.h3 className="text-primary script mb-2">
          30 Avril 2027
        </motion.h3>

        <Button
          as={Link}
          to={getRedirectPath()}
          className="cta-button mt-3 rounded-5 px-3"
        >
          {getLabel()}
        </Button>
      </Container>
    </div>
  );
}