import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { sendMessage } from "../../services/guest/guestbookService";
import { useToast } from "../../hooks/useToast";

export default function GuestbookForm() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    message: "",
  });

  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendMessage(form);
      showToast("Message envoyé ❤️");

      setForm({
        first_name: "",
        last_name: "",
        email: "",
        message: "",
      });

      e.target.reset();

    } catch {
      showToast("Erreur lors de l'envoi", "danger");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4 w-100 w-md-75 me-md-4 d-flex flex-column">

      <Form.Group className="mb-3">
        <Form.Label className="mb-1">Prénom</Form.Label>

        <Form.Control
          placeholder="Prénom"
          value={form.first_name}
          onChange={(e) =>
            setForm({ ...form, first_name: e.target.value })
          }
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="mb-1">Nom</Form.Label>

        <Form.Control
          placeholder="Nom"
          value={form.last_name}
          onChange={(e) =>
            setForm({ ...form, last_name: e.target.value })
          }
        />        
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="mb-1">Email</Form.Label>

        <Form.Control
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />        
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="mb-1">Message</Form.Label>

        <Form.Control
          placeholder="Votre message"
          as="textarea"
          rows={3}
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
          required
        />        
      </Form.Group>

      <Button type="submit" disabled={!form.message} variant="primary" className="border-primaryDark bs-dark w-10 mx-auto mx-md-0 rounded-5">
        Envoyer
      </Button>
    </Form>
  );
}