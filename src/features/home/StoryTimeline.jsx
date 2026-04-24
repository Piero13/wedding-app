import { Row, Col } from "react-bootstrap";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaHeart, FaRing, FaGlassCheers, FaBaby } from "react-icons/fa";

const events = [
  {
    icon: <FaHeart className="fs-4 fs-lg-2" />,
    title: "Notre rencontre",
    date: "05.07.2016",
    text: "Un coup de foudre",
  },
  {
    icon: <FaBaby className="fs-4 fs-lg-2" />,
    title: "Une naissance",
    date: "30.04.2018",
    text: "Le plus beau cadeau",
  },
  {
    icon: <FaRing className="fs-4 fs-lg-2" />,
    title: "La demande",
    date: "14.12.2025",
    text: "Une demande magique",
  },
  {
    icon: <FaGlassCheers className="fs-4 fs-lg-2" />,
    title: "Oui pour la vie",
    date: "30.04.2027",
    text: "Cap sur le grand jour",
  },
];

export default function StoryTimeline() {
  return (
    <section className="py-5 text-center bg-gradient-secondaryLight px-md-10 px-lg-25 w-100">
        <div className="d-flex flex-column align-items-center">
            <h3 className="timeline-title script text-primary mb-5 fs-1">
                Notre Histoire
            </h3>

            <div className="timeline">

                {events.map((e, i) => (
                <motion.div
                    key={i}
                    className="timeline-item"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    viewport={{ once: true }}
                >
                    <div className="timeline-icon">
                    {e.icon}
                    </div>

                    <div className="timeline-content">
                    <h4 className="fs-5">{e.title}</h4>
                    <span className="timeline-date">{e.date}</span>
                    <p>{e.text}</p>
                    </div>
                </motion.div>
                ))}

            </div>
        </div>


    </section>
  );
}