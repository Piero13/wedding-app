import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase/supabaseClient";
import { validateAccessCode } from "../services/auth/accessService";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

/**
 * Login page for admin and guests
 */
export default function Login() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    code: ""
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdminLogin = async () => {
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
        setError(error.message)
        return
    };

    navigate("/admin")
  };

  const handleGuestLogin = async () => {
    const data = await validateAccessCode(form.code);

    if (!data) {
      setError("Invalid access code");
      return;
    }

    localStorage.setItem("guest_access", form.code);
    navigate("/gallery");
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Connexion</h2>

      <div className="text-center mb-5">
        <Button 
          variant="primary"
          onClick={() => setIsAdmin(false)}
          className="w-10 me-4 border-primaryDark bs-dark"
        >
          Invité
        </Button>{" "}
        
        <Button
          variant="primary"
          onClick={() => setIsAdmin(true)}
          className="w-10 border-primaryDark bs-dark"
        >
          Admin
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {isAdmin ? (
        <div className="w-lg-50 mx-auto border border-2 border-primary p-4 rounded d-flex flex-column align-items-center">
          <Form.Group className="mb-3 w-100">
            <Form.Label>Email</Form.Label>

            <Form.Control
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 w-100">
            <Form.Label>Mot de passe</Form.Label>

            <div className="position-relative">
                <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Mot de passe"
                    onChange={handleChange}
                    required
                />
                <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        right: '10px',
                        opacity: 0.7,
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = 0.7}
                    className='d-flex justify-content-center align-items-center position-absolute top-50'
                >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
            </div>
          </Form.Group>

          <Button onClick={handleAdminLogin}>Connexion admin</Button>
        </div>
      ) : (
        <div className="w-md-60 w-lg-50 mx-auto border border-2 border-primary p-4 rounded d-flex flex-column align-items-center">
          <Form.Group className="mb-3 w-100">
            <Form.Label>Code d'accès</Form.Label>

            <Form.Control
              name="code"
              placeholder="Code d'accès"
              onChange={handleChange}
            />
          </Form.Group>

          <Button
            variant="primary"
            onClick={handleGuestLogin}
            className="w-10 border-primaryDark bs-dark"
          >
            Entrer
          </Button>
        </div>
      )}
    </Container>
  );
}