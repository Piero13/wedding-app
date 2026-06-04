import { Link } from "react-router-dom"
import { Nav } from "react-bootstrap"

export default function Footer() {
    return (
        <footer className="p-3 h-8 bg-gradient-secondary">
            <p className="m-0 text-center fs-6">Site créé par <Nav.Link className="custom-nav-link fw-bold" to="https://pfdev13.netlify.app" target="_blank" aria-label="Lien vers le site PF DEV 13">PF DEV 13</Nav.Link></p>
        </footer>
    )
}