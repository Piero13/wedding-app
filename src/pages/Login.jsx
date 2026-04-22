import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase/supabaseClient";
import { validateAccessCode } from "../services/auth/accessService";
import { Form, Button, Container } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useToast } from "../hooks/useToast";
import { useAuth } from "../hooks/useAuth";

/**
 * Login page for admin and guests
 */
export default function Login() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { loginGuest } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
    code: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Admin login
   */
  const handleAdminLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      showToast("Email ou mot de passe invalide", "danger");
      return;
    }

    navigate("/admin");
  };

  /**
   * Guest login (FIXED)
   */
  const handleGuestLogin = async () => {
    const data = await validateAccessCode(form.code);

    if (!data) {
      showToast("Code d'accès invalide", "danger");
      return;
    }

    // ✅ stocker l'objet household complet
    loginGuest(data);

    navigate("/guest");
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4 hero-title text-primary">Connexion</h2>

      <div className="text-center mb-5">
        <Button
          variant={!isAdmin ? "primary" : "secondary"}
          onClick={() => setIsAdmin(false)}
          className="w-9 me-3 border-primaryDark"
        >
          Invité
        </Button>

        <Button
          variant={isAdmin ? "primary" : "secondary"}
          onClick={() => setIsAdmin(true)}
          className="w-9 border-primaryDark"
        >
          Admin
        </Button>
      </div>

      {isAdmin ? (
        <div className="mx-auto border p-4 rounded" style={{ maxWidth: 400 }}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mot de passe</Form.Label>

            <div className="position-relative">
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="position-absolute top-50 end-0 translate-middle-y me-2"
                style={{ cursor: "pointer" }}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </Form.Group>

          <Button className="w-100" onClick={handleAdminLogin}>
            Connexion
          </Button>
        </div>
      ) : (
        <div className="mx-auto border p-4 rounded" style={{ maxWidth: 400 }}>
          <Form.Group className="mb-3">
            <Form.Label>Code d'accès</Form.Label>
            <Form.Control name="code" onChange={handleChange} />
          </Form.Group>

          <Button 
            variant="primary" 
            className="w-100 border-primaryDark" 
            onClick={handleGuestLogin}
          >
            Entrer
          </Button>
        </div>
      )}
    </Container>
  );
}