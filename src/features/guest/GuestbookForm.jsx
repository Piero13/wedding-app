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
    <Form onSubmit={handleSubmit} className="mb-4">

      <Form.Control
        className="mb-2"
        placeholder="Prénom"
        value={form.first_name}
        onChange={(e) =>
          setForm({ ...form, first_name: e.target.value })
        }
        required
      />

      <Form.Control
        className="mb-2"
        placeholder="Nom"
        value={form.last_name}
        onChange={(e) =>
          setForm({ ...form, last_name: e.target.value })
        }
      />

      <Form.Control
        className="mb-2"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <Form.Control
        className="mb-2"
        placeholder="Votre message"
        as="textarea"
        rows={3}
        value={form.message}
        onChange={(e) =>
          setForm({ ...form, message: e.target.value })
        }
        required
      />

      <Button type="submit" disabled={!form.message}>
        Envoyer
      </Button>
    </Form>
  );
}