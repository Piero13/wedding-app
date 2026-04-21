import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"

/**
 * Home page
 */
export default function Home() {
    const { guest } = useAuth();

    const getRedirectPath= () => {
        if (guest) return "/guest";
        return "/login";
    };

    const getLabel = () => {
        if (guest) return "Accéder à mon espace";
        return "Accéder à l’espace invité";
    };

    return (
        <Container className="text-center py-5 d-flex flex-column justify-content-center align-items-center min-vh-100">

        {/* Logo / Title */}
        <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h2 className="mb-3 hero-title fs-1 text-primary">
            Mariage Alexa & Pierre ❤️
            </h2>
        </motion.div>

        {/* Divider */}
        <motion.div
            className="divider my-3"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5 }}
        />

        {/* Subtitle */}
        <motion.p
            className="text-muted mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
        >
            Une journée unique, entourés de ceux et celles qui comptent le plus.
        </motion.p>

        {/* Date */}
        <motion.div
            className="mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
        >
            <h3 className="text-primary script mb-3">📅 30 Avril 2026</h3>
            <p className="text-muted">Lieu tenu secret…</p>
        </motion.div>

        {/* CTA */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
        > 
            <Button
                as={Link}
                to={getRedirectPath()}
                variant="primary"
                className="px-3 border-primaryDark bs-dark cta-button"
            >
                {getLabel()}
            </Button>
        </motion.div>

        </Container>
    );
}